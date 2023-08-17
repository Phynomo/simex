/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  MenuItem,
  Divider,
  Chip,
  Menu,
  FormControlLabel,
  Switch,
  Autocomplete,
  Box,
  Collapse,
  Typography,
  Select,
  Grid,
  Stack,
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  FormLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
//Imports de validaciones
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table, Tag,Image  } from "antd";
import axios from 'axios';

//Imports tabla
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";
import { useHistory } from "react-router-dom";
import { ConsoleSqlOutlined } from "@ant-design/icons";

//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";

//Import ddls
import load_DDLs from "src/app/loadDDLs/Load_DDL";

//import Toast
import "react-toastify/dist/ReactToastify.css";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
  ToastDefault,
} from "src/styles/toastsFunctions";
import usuarioservice from "./UsuariosService";

  {/*Constantes para validaciones Agregar inicio */ }
  const camposUsuarios = {
    NombreUsuario: "",
    ContraUsuario: "",
    Empleado: null,
    UsuarioRol: null,
  };

  const schemaUsuarios = yup.object().shape({
    NombreUsuario: yup.string().trim().max(150).required(),
    ContraUsuario: yup.string().max(150).required(),
    Empleado: yup.object().required(""),
    UsuarioRol: '',
  });
  {/*Constantes para validaciones Agregar fin */ }

  {/*Constantes para validaciones Editar inicio */ }
  const camposUsuariosEditar = {
    NombreUsuarioEditar: "",
    EmpleadoEditar: null,
    UsuarioRolEditar: null,
  };

  const schemaUsuariosEditar = yup.object().shape({
    NombreUsuarioEditar: yup.string().trim().max(150).required(),
    EmpleadoEditar:yup.object().required(""),
    UsuarioRolEditar: ''
  });
   {/*Constantes para validaciones Editar fin */ }

function UsuariosIndex() {


  const fileInputRef = useRef(null);
 
  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);
  
  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [Activar, setActivar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [Id, setId] = useState(0);
  const [DetallesTabla, setDetallesTabla] = useState([])
  const [checked, setChecked] = React.useState(false);
  const [image, setimage] = useState('https://i.ibb.co/tLVHzJs/imagen-usuario.png');

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  const camposToFilter = ["key", "usua_Nombre", "empleadoNombreCompleto", "role_Descripcion"];

  /* Datos de la tabla */
  const [data, setData] = useState([]);

  //constante que me carga la imagen por defecto del usuario en caso que no seleccione una
  const [userImage, setUserImage] = useState("https://i.ibb.co/8MKqj1C/Avatar-Usuario.png");

  //Variables DDL
  const [Empleados_DDL, setEmpleados_DDL] = useState([]);
  const [Roles_DDL, setRoles_DDL] = useState([]);

  //Variables oara setear la cantidad de registro que se mostraran en la tabla
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  //Cargado de las variables DDL
  async function ddls() {
    setEmpleados_DDL(await load_DDLs.EmpleadosNoTieneUsuario());
    setRoles_DDL(await load_DDLs.Roles());
  }

  //Peticion para cargar datos de la tabla
  const UsuariosGetData = async () => {
    try {
      setData(await usuarioservice.listar());
    } catch (error) {
      console.log(error.message);
    }
  };

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = async() => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    setTimeout(() => {
      reset(camposUsuarios);
    setChecked(false);
    setimage('https://i.ibb.co/tLVHzJs/imagen-usuario.png');
    }, "1000");
    setEmpleados_DDL(await load_DDLs.EmpleadosNoTieneUsuario());
  };

  /* Controlador del Index(Tabla) */
  const VisibilidadTablaEditar = async() => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    setTimeout(() => {
      resetEditar(camposUsuariosEditar);
      setChecked(false);
      setimage('https://i.ibb.co/tLVHzJs/imagen-usuario.png');
    }, "1000");
    setEmpleados_DDL(await load_DDLs.EmpleadosNoTieneUsuario());
  };

  //Controlar el cambio de estado de si Administrador
  const handleChangeAdmin = (event) => {
    setChecked(event.target.checked);
  };

   //Controlador de la barra buscadora de la tabla
   const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante para el cerrrar las opciones del boton de opciones  
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const DialogActivar = () => {
    setActivar(!Activar);
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (datos) => {
    setValue('NombreUsuario', datos['usua_Id']);
    DialogEliminar();
    handleClose(datos.usua_Id);
  };

  const handleActive = (datos) => {
    if(datos.usua_Estado){  
      ToastError("Este usuario esta activo");
      handleClose(datos.usua_Id);
    }else{
      setValue('NombreUsuario', datos['usua_Id']);
      DialogActivar();
      handleClose(datos.usua_Id);
    }
  };

  const handleDetails = (datos) => {
    setDetallesTabla(datos);
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    setimage(datos.usua_Image);
    handleClose(datos.usua_Id);
  };

  //Handle que inicia la funcion de editar
  const handleEdit = async(datos) => {
    setimage(datos.usua_Image)

    setValueEditar('NombreUsuarioEditar',datos.usua_Nombre)

    if(datos.usua_EsAdmin)
    setChecked(true);
    else
    setChecked(false);

    const nuevoEmpleado = {
      value: datos.empl_Id,
      label: datos.empleadoNombreCompleto
    };
    Empleados_DDL.push(nuevoEmpleado)

    setValueEditar(
      "EmpleadoEditar",
       Empleados_DDL.find((empleados_DDL) => empleados_DDL.value === datos.empl_Id) //importante para cargar bien los ddl al editar
    );
    
    setValueEditar(
      "UsuarioRolEditar",
       Roles_DDL.find((roles_DDL) => roles_DDL.value === datos.role_Id) //importante para cargar bien los ddl al editar
    );
    setId(datos.usua_Id)
    setTimeout(() => {
      setmostrarIndex(!mostrarIndex);
      setmostrarEditar(!mostrarEditar);
    }, "250");
    
    handleClose(datos.usua_Id);
  };


  //Constante que filtra las imagenes por medio de un FileReader
  //que basicamente proporciona una interfaz para leer de
  //forma asíncrona el contenido de un
  //archivo desde una aplicación web
  const handleImageChange = (e) => {  
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setimage(reader.result);
      };
    } else {
      ToastWarning("Archivo incorrecto");
    }
  };

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    UsuariosGetData();
  }, []);

  //Constante de las columnas del index
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Usuario",
      dataIndex: "usua_Nombre",
      key: "usua_Nombre",
      sorter: (a, b) => a.usua_Nombre.localeCompare(b.usua_Nombre), //sorting para Letras
    },
    {
      title: "Empleado",
      dataIndex: "empleadoNombreCompleto",
      key: "empleadoNombreCompleto",
      sorter: (a, b) => a.empleadoNombreCompleto.localeCompare(b.empleadoNombreCompleto), //sorting para Letras
    },
    {
      title: "Rol",
      dataIndex: "role_Descripcion",
      key: "role_Descripcion",
      sorter: (a, b) => a.role_Descripcion.localeCompare(b.role_Descripcion), //sorting para Letras
    },
    {
      title: "Estado",
      dataIndex: "usua_Estado",
      key: "usua_Estado",
      render: (text, record) => {return(record.usua_Estado? <Tag color="green">Activo</Tag>: <Tag color="red">Inactivo</Tag>)},
      // sorter: (a, b) => a.usua_Estado.localeCompare(b.usua_Estado), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.usua_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.usua_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.usua_Id)}
              variant="contained"
              style={{
                borderRadius: "10px",
                backgroundColor: "#634A9E",
                color: "white",
              }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.usua_Id}`}
              anchorEl={anchorEl[params.usua_Id]}
              keepMounted
              open={Boolean(anchorEl[params.usua_Id])}
              onClose={() => handleClose(params.usua_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>
              <MenuItem onClick={() => handleActive(params)}>
                <Icon>toggle_off</Icon>ㅤActivar Usuario
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = data.filter((row) => {
    if (searchText === "") {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue =
          typeof value === "number"
            ? value.toString()
            : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === "number"
            ? searchText.toString()
            : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  });


  //Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
      camposUsuarios, //Campos del formulario
      mode: "all",
      resolver: yupResolver(schemaUsuarios), //Esquema del formulario
    });

  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors  } = formState;

  //Datos del formulario
  const datosWatch = watch();


   //Declaracion del formulario de editar
   const { handleSubmit:handleSubmitEditar,reset:resetEditar, control:controlEditar, watch:watchEditar, formState:formStateEditar, setValue:setValueEditar } = useForm({
    camposUsuariosEditar, //Campos del formulario
    mode: "all",
    resolver: yupResolver(schemaUsuariosEditar), //Esquema del formulario
  });

  //Validacion de campos vacios y errores
  const { isValid:isValidEditar, dirtyFields:dirtyFieldsEditar, errors:errorsEditar  } = formStateEditar;

  //Datos del formulario
  const datosWatchEditar = watchEditar();

  //Controlador del formulario
  const GuardarUsuarios = () => {
    if((datosWatch.UsuarioRol === null) && !checked){
      ToastWarning("Completa todos los campos");
    }else{
      if (isValid) {
        // Validacion de campos completos
          usuariosCreate();
      } else {
        ToastWarning("Completa todos los campos");
      }
    }
  };

  //Controlador del formulario
  const EditarUsuarios = () => {      
    if((datosWatchEditar.UsuarioRolEditar === undefined || datosWatchEditar.UsuarioRolEditar === null ) && !checked){
      ToastWarning("Completa todos los campos");
    }else{
      if(datosWatchEditar.NombreUsuarioEditar != '' && datosWatchEditar.EmpleadoEditar != null) {
        // Validacion de campos completos
          usuariosEdit();
      } else {
        ToastWarning("Completa todos los campos");
      }
   }
  };

  //Peticion para crear un registro
  const usuariosCreate = async () => {
    try {
      const response = await usuarioservice.crear(datosWatch,image,checked);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");
        setTimeout(() => {
          reset(camposUsuarios);
        }, "500");
        UsuariosGetData();
        VisibilidadTabla();
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El nombre de usuario ya existe");
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

  // Peticion para editar un registro
  const usuariosEdit = async () => {
    try {
      const response = await usuarioservice.editar(datosWatchEditar,Id,image,checked);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha editado exitosamente");
        setTimeout(() => {
          resetEditar(camposUsuariosEditar);
        }, "500");
        UsuariosGetData();
        VisibilidadTablaEditar();
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

  // Peticion para eliminar un registro
  const ususariosDelete = async () => {
    try {
      const response = (await usuarioservice.eliminar(datosWatch))
      if(response === 3){
        DialogEliminar()
        ToastError('El usuario que desea eliminar esta siendo utilizado en este momento')
      }else{
        if (response.data.data.codeStatus == 1) {
          ToastSuccess('El registro se ha eliminado exitosamente')
          UsuariosGetData();
          DialogEliminar()
          reset(camposUsuarios)
        } else if (response.data.data.messageStatus.includes("0")) {
          ToastError('El registro está en uso')
        }
      }
    } catch (error) {
      ToastError('Error inesperado')
    }
  };

  // Peticion para activar un registro
  const ususariosActivar = async () => {
    try { 
      const response = (await usuarioservice.activar(datosWatch))
      if (response.data.data.codeStatus == 1) {
        ToastSuccess('El usuario ha sido activado exitosamente')
        UsuariosGetData();
        DialogActivar()
        reset(camposUsuarios)
      } else if (response.data.data.messageStatus.includes("0")) {
        ToastError('El registro está en uso')
      }
    } catch (error) {
      ToastError('Error inesperado')
    }
  };


  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/RgGNgZP/USUARIOS.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Botón de Nuevo */}
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={()=>{
                VisibilidadTabla()
                setEditar(false)
              }}
            >
              Nuevo
            </Button>
          </Stack>

          <Stack direction="row" spacing={1}>
            <label className="mt-8">Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                // label="Filas"
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>

            {/* Barra de Busqueda en la Tabla */}
            <TextField
              style={{ borderRadius: "10px" }}
              placeholder="Buscar"
              value={searchText}
              onChange={handleSearchChange}
              size="small"
              variant="outlined"
              inputProps={{
                startadornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </CardContent>

      {/* Tabla */}
      <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            size="small"
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(),
            }}
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
            }}
          />
        </div>
      </Collapse>

      {/* Collapse para el formulario de agregar un registro incio*/}
      <form onSubmit={handleSubmit((_data) => { })}> 
      <Collapse in={mostrarAgregar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
          <Grid item xs={12}>
                <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip
                    label={"Agregar Usuario"}
                  />
                </Divider>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="little-profilePhynomo text-center">
                <div
                  className="pro-img"
                  style={{
                    marginTop: "0",
                    width: "300px",
                    height: "300px",
                    overflow: "hidden",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", 
                    borderRadius: '50%'
                  }}
                >{image == null ? (
                    <img
                      src="https://i.ibb.co/RTnx082/kisspng-computer-icons-user-clip-art-user-5abf13db298934-2968784715224718991702.jpg"
                      alt="user"
                    />
                  ) : (
                    <Image
                    width={300}
                    style={{
                      marginTop: "0",
                      width: "400px",
                      height: "300px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", 
                      borderRadius: '50%'
                    }}
                    src={image}
                  />
                  )}
                </div>
                <br/>
                <Button
                  startIcon={<Icon>image</Icon>}
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "10px",
                    marginRight: "10px",
                  }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  Seleccionar imagen
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </Grid>
            
            <Grid item xs={8} style={{ marginTop: "30px" }}>
              <Grid container spacing={3}>
                {/* Etiqueta "Nuevo Usuario" */}
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></Grid>

                {/* Left column for TextFields */}
                <Grid item xs={6}>
                <FormControl fullWidth>
                <FormLabel error={!!errors.NombreUsuario} id="group-label">Nombre Usuario</FormLabel>
                  <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined"
                          placeholder="Ingrese el nombre de usuario"
                          inputProps={{
                            maxLength: 150,
                          }}
                          error={!!errors.NombreUsuario}
                        ></TextField>
                      )}
                      name="NombreUsuario"
                      control={control}
                    >                 
                  </Controller>
              </FormControl>

              <FormControl fullWidth>
                <FormLabel error={!!errors.ContraUsuario} id="group-label">Contraseña</FormLabel>
                    <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="outlined"
                            placeholder="Ingrese la contraseña"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start"></InputAdornment>
                              ),
                            }}
                            error={!!errors.ContraUsuario} 
                          ></TextField>
                        )}
                        name="ContraUsuario"
                        control={control}
                      >                   
                    </Controller>
              </FormControl>

              <div className="mt-48 mb-16" style={{ marginTop: "15px" }}>
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Switch
                        label="¿Es administrador?"
                        labelplacement="top"
                        checked={checked}
                        onChange={handleChangeAdmin}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label="¿Es administrador?"
                    labelPlacement="top"
                    style={{ marginTop: "25px", marginRight: "20px" }}
                  />
                </FormControl>
              </div>
                </Grid>

                <Grid item xs={6}>
                <FormControl fullWidth>
                    <FormLabel error={!!errors.Empleado}>Empleados</FormLabel>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            id="Empleado"
                            isOptionEqualToValue={(option, value) =>
                              option.value === value?.value
                            }
                            options={Empleados_DDL}
                            value={datosWatch.Empleado ?? null}
                            onChange={(event, value) => {
                              setValue("Empleado", value);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} error={!!errors.Empleado} />
                            )}
                          />
                        )}
                        name="Empleado"
                        error={!!errors.Empleado}
                        control={control}
                      />
                </FormControl>

                <FormControl fullWidth>
                    <FormLabel error={!!errors.UsuarioRol}>Roles</FormLabel>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            id="UsuarioRol"
                            isOptionEqualToValue={(option, value) =>
                              option.value === value?.value
                            }
                            options={Roles_DDL}
                            value={datosWatch.UsuarioRol ?? null}
                            onChange={(event, value) => {
                              setValue("UsuarioRol", value);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} error={!!errors.UsuarioRol} />
                            )}
                          />
                        )}
                        name="UsuarioRol"
                        error={!!errors.UsuarioRol}
                        control={control}
                      />
                </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "right",
              }}
            >
              <Button
                startIcon={<Icon>check</Icon>}
                variant="contained"
                color="primary"
                style={{
                  borderRadius: "10px",
                  marginRight: "10px",
                }}
                sx={{
                  backgroundColor: "#634A9E",
                  color: "white",
                  "&:hover": { backgroundColor: "#6e52ae" },
                }}
                onClick={GuardarUsuarios}
                type="submit"
              >
                Guardar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: "10px" }}
                sx={{
                  backgroundColor: "#DAD8D8",
                  color: "black",
                  "&:hover": { backgroundColor: "#BFBABA" },
                }}
                onClick={VisibilidadTabla}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      </form>
      {/* Collapse para el formulario de agregar un registro Fin*/}

      {/* Collapse para mostrar los detalles de un registro inicio*/}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                <Chip color='default' label="Detalle de usuarios" />
              </Divider>
            </Grid>
            <br></br>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={8}>
            <Image
                    width={300}
                    style={{
                      marginTop: "0",
                      width: "400px",
                      height: "300px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", 
                      borderRadius: '50%'
                    }}
                    src={image}
                  />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Usuario Id:
                    </Typography>
                    <Typography>{DetallesTabla['usua_Id']}</Typography>
                  </InputLabel>
                </Grid>
                <Grid item xs={1}></Grid>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de usuario:
                  </Typography>
                  <Typography>{DetallesTabla['usua_Nombre']}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre empleado:
                    </Typography>
                    <Typography>{DetallesTabla['empleadoNombreCompleto']}</Typography>
                  </InputLabel>
                </Grid>
                <Grid item xs={1}></Grid>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Rol:
                  </Typography>
                  <Typography>{DetallesTabla['role_Descripcion']}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ¿Es administrador?:
                    </Typography>
                    <Typography>{ DetallesTabla['usua_EsAdmin'] ? "Es administrador" : "No es administrador"}</Typography>
                  </InputLabel>
                </Grid>
              </Box>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <table
                id="detallesTabla"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>Accion
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>Usuario
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>Fecha y
                      hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DetallesTabla['usuarioCreacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DetallesTabla['usua_FechaCreacion'] ? new Date(DetallesTabla['usua_FechaCreacion']).toLocaleString() : ""}</td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DetallesTabla['usuarioModificacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DetallesTabla['usua_FechaModificacion'] ? new Date(DetallesTabla['usua_FechaModificacion']).toLocaleString() : ""}</td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <div className="card-footer">
                <Button
                  variant="contained"
                  startIcon={<Icon>arrow_back</Icon>}
                  onClick={() => {
                    setmostrarIndex(!mostrarIndex);
                    setmostrarDetalles(!mostrarDetalles);
                  }}
                >
                  Regresar
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para mostrar los detalles de un registro fin*/}


      {/* Collapse para el formulario de editar un registro incio*/}
      <form onSubmit={handleSubmitEditar((_data) => { })}> 
      <Collapse in={mostrarEditar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
          <Grid item xs={12}>
                <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip
                    label={"Editar Usuario"}
                  />
                </Divider>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="little-profilePhynomo text-center">
                <div
                  className="pro-img"
                  style={{
                    marginTop: "0",
                    width: "300px",
                    height: "300px",
                    overflow: "hidden",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", 
                    borderRadius: '50%'
                  }}
                >{image == null ? (
                    <img
                      src="https://i.ibb.co/RTnx082/kisspng-computer-icons-user-clip-art-user-5abf13db298934-2968784715224718991702.jpg"
                      alt="user"
                    />
                  ) : (
                    <Image
                    width={300}
                    style={{
                      marginTop: "0",
                      width: "400px",
                      height: "300px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", 
                      borderRadius: '50%'
                    }}
                    src={image}
                  />
                  )}
                </div>
                <br/>
                <Button
                  startIcon={<Icon>image</Icon>}
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "10px",
                    marginRight: "10px",
                  }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  Seleccionar imagen
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
            </Grid>
            
            <Grid item xs={8} style={{ marginTop: "30px" }}>
              <Grid container spacing={3}>
                {/* Etiqueta "Nuevo Usuario" */}
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></Grid>

                {/* Left column for TextFields */}
                <Grid item xs={6}>
                <FormControl fullWidth>
                <FormLabel error={!!errorsEditar.NombreUsuarioEditar} id="group-label">Nombre Usuario</FormLabel>
                  <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined"
                          placeholder="Ingrese el nombre de usuario"
                          inputProps={{
                            maxLength: 150,
                          }}
                          error={!!errorsEditar.NombreUsuarioEditar}
                        ></TextField>
                      )}
                      name="NombreUsuarioEditar"
                      control={controlEditar}
                    >                 
                  </Controller>
              </FormControl>

                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Switch
                        label="¿Es administrador?"
                        labelplacement="top"
                        checked={checked}
                        onChange={handleChangeAdmin}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label="¿Es administrador?"
                    labelPlacement="top"
                    style={{ marginTop: "25px", marginRight: "20px" }}
                  />
                </FormControl>
                </Grid>

                <Grid item xs={6}>
                <FormControl fullWidth>
                    <FormLabel error={!!errorsEditar.EmpleadoEditar}>Empleados</FormLabel>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            id="EmpleadoEditar"
                            isOptionEqualToValue={(option, value) =>
                              option.value === value?.value
                            }
                            options={Empleados_DDL}
                            value={datosWatchEditar.EmpleadoEditar ?? null}
                            onChange={(event, value) => {
                              setValueEditar("EmpleadoEditar", value);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} error={!!errorsEditar.EmpleadoEditar} />
                            )}
                          />
                        )}
                        name="EmpleadoEditar"
                        error={!!errorsEditar.EmpleadoEditar}
                        control={controlEditar}
                      />
                </FormControl>

                <FormControl fullWidth>
                    <FormLabel error={!!errorsEditar.UsuarioRolEditar}>Roles</FormLabel>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            id="UsuarioRolEditar"
                            isOptionEqualToValue={(option, value) =>
                              option.value === value?.value
                            }
                            options={Roles_DDL}
                            value={datosWatchEditar.UsuarioRolEditar ?? null}
                            onChange={(event, value) => {
                              setValueEditar("UsuarioRolEditar", value);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} error={!!errorsEditar.UsuarioRolEditar} />
                            )}
                          />
                        )}
                        name="UsuarioRolEditar"
                        error={!!errorsEditar.UsuarioRolEditar}
                        control={controlEditar}
                      />
                </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "right",
              }}
            >
              <Button
                startIcon={<Icon>check</Icon>}
                variant="contained"
                color="primary"
                style={{
                  borderRadius: "10px",
                  marginRight: "10px",
                }}
                sx={{
                  backgroundColor: "#634A9E",
                  color: "white",
                  "&:hover": { backgroundColor: "#6e52ae" },
                }}
                type="submit"
                onClick={EditarUsuarios}
              >
                Guardar
              </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: "10px" }}
                sx={{
                  backgroundColor: "#DAD8D8",
                  color: "black",
                  "&:hover": { backgroundColor: "#BFBABA" },
                }}
                onClick={VisibilidadTablaEditar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      </form>
      {/* Collapse para el formulario de editar un registro Fin*/}


      <Dialog
        open={Eliminar}
        fullWidth={true}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={ususariosDelete}
            >
              Eliminar
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>


      <Dialog
        open={Activar}
        fullWidth={true}
        onClose={DialogActivar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmación de activación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea activar este usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
            }}
          >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={ususariosActivar}
            >
              Activar
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#DAD8D8",
                color: "black",
                "&:hover": { backgroundColor: "#BFBABA" },
              }}
              onClick={DialogActivar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default UsuariosIndex;
