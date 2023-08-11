/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
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
  Menu,
  Box,
  Collapse,
  Typography,
  Select,
  Autocomplete,
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table } from "antd";
import axios from 'axios';
import "src/styles/custom-pagination.css";


function CargosIndex() {
  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  //Constante de los valores de los textfield de la pantalla
  const [id, setid] = useState("");
  const [cargos, setcargos] = useState("");
  const [usuarioCreacion, setUsuarioCreacion] = useState("");
  const [usuraioModificador, setUsuarioModificador] = useState("");
  const [FechaCreacion, setFechaCreacion] = useState();
  const [FechaModificacion, setModificacion] = useState();

  //Constante solo para que quitar el error de los textfield no controlados
  const [message, setMessage] = useState();

  
  //Constante para asignar los valores a la tabla y mapear
  const[DataTabla, setDataTabla] = useState([])


  // Variables para validar campos
  const CargosValidar = (cargos) => {
    if (!cargos || cargos.trim() === '') {
      return true;
    }
    else {
      return false;
    }
  };

  const guardarCargos = (data) => {
    console.log(data);
    // Acá se llaman todos los campos a validar
    const ErroresArray = [
      CargosValidar(data.cargos)
    ]

    // Se define la variable donde guardaremos los errores
    let errors = 0;

    // Se recorre el arreglo y se buscan los errores
    for (let i = 0; i < ErroresArray.length; i++) {
      if (ErroresArray[i] === true) {
        errors++;
      }
    }

    // Se utiliza la varibale de errores y se evalua en base a ella.
    if (errors == 0) {
      console.log("aqui va??")

      let values = {
        carg_Nombre: data.cargos,
        usua_UsuarioCreacion: 1,
        carg_FechaCreacion: new Date()  
      }
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      axios.post(process.env.REACT_APP_API_URL+'api/Cargos/Insertar',values,{
        headers: customHeaders,
      })
      .then(response =>{
        console.log(response, "respuesta")
        if(response.data.data != null){
          if (response.data.data.messageStatus === "1") {  
            console.log("Meow ya crea y valida");       
            ToastSuccess();

            CerrarCollapseAgregar();     
        }else {
          if(response.data.data.messageStatus.includes("Violation of UNIQUE KEY constraint 'UQ_Gral_tbCargos__carg_Nombre'.")){
            ToastInfoWarning();
          }else{
            ToastErrorApi();    
          } 
        }  
        }else{
          ToastErrorApi();
        }
      }).catch = (error) => {

      }

    }
    else {
      console.log(errors);
      console.log("aqui entra vacio");
      ToastWarning();
    }
  };



  const EditarCargos = async () => {
    try {
      const formData = watch(); 

      const ErroresArray = [
        CargosValidar(formData.cargosEditar)
      ]
      let errors = 0;

      for (let i = 0; i < ErroresArray.length; i++) {
        if (ErroresArray[i] === true) {
          errors++;
        }
      }
      if (errors == 0) {

      console.log(formData.cargosEditar, "khaaa")// Obtengo los datos del formulario con react-hook-form
      const payload = {
        carg_Id: id, 
        carg_Nombre: formData.cargosEditar, 
        usua_UsuarioModificacion: 1,
        carg_FechaModificacion: new Date()  
      };
  
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      
      const response = await axios.post(
        process.env.REACT_APP_API_URL + `api/Cargos/Editar`, 
        payload,
        {
          headers: customHeaders,
        }
      );
  
      if (response.data.data != null && response.data.data.messageStatus === "1") {
        // aqui actualiza
        ToastSuccessEditar();
        CerrarCollapseEditar();
      } else {
        //repetidos
        if(response.data.data.messageStatus.includes("Violation of UNIQUE KEY constraint 'UQ_Gral_tbCargos__carg_Nombre'.")){
          ToastInfoWarning();
        }else{
          ToastErrorApi();    
        } 
      }
    }
    else {
      console.log(errors);
      console.log("aqui entra vacio");
      ToastWarning();
    }
    } catch (error) {
      ToastErrorApi();
    }
  };


  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    CargarDatosTabla()
  }, []);


  //Constante para cargar datos a las tablas
  const CargarDatosTabla = async () => {
    try {
    const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      const response = await axios.get(process.env.REACT_APP_API_URL+'api/Cargos/Listar', {
        headers: customHeaders,
      }); 
      console.log(response)
      const rows = response.data.data.map((item,index) => {
        return {
          key:index,
          id: item.carg_Id,
          cargos: item.carg_Nombre,
          usuario: item.usuarioCreacionNombre,
          fechaCrea: item.carg_FechaCreacion,
          modificador: item.usuarioModificacionNombre,
          fechaModifica: item.carg_FechaModificacion
          
        }
      });
      setDataTabla(rows);
    } catch (error) {
    }
  };


  //Constantes para el dialog de eliminar
  const [Eliminar, setEliminar] = useState(false);
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Constante para el detalle de las pantallas
  const DetallesTabla = (id) => {
    const Detalles = DataTabla.find(registro => registro.id === id);
  
    setid(Detalles.id);
    setcargos(Detalles.cargos);
    setUsuarioCreacion(Detalles.usuario);
    setUsuarioModificador(Detalles.modificador);
    setFechaCreacion(Detalles.fechaCrea);

    if(Detalles.modificador != null ){
     
      setModificacion(Detalles.fechaModifica);
    }
    else{
      setModificacion("");
    }
  };     

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (id, cargos) => {
    setValue("cargosEditar", cargos); 
    setcargos(cargos);
    setid(id);  
    MostrarCollapseEditar();
    handleClose(id);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (id) => {
    DetallesTabla(id);
    MostrarCollapseDetalles();
    handleClose(id);
  };

   //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

   //Constante de las columnas del index
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id, //sorting para Numeros
    },
    {
      title: "Cargos",
      dataIndex: "cargos",
      key: "cargos",
      sorter: (a, b) => a.cargos.localeCompare(b.cargos), //sorting para Letras
    },
    {
      title: "Usuario Creador",
      dataIndex: "usuario",
      key: "usuario",
      sorter: (a, b) => a.usuario.localeCompare(b.usuario), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.id)}
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
              id={`menu-${params.id}`}
              anchorEl={anchorEl[params.id]}
              keepMounted
              open={Boolean(anchorEl[params.id])}
              onClose={() => handleClose(params.id)}
            >
               <MenuItem onClick={() => handleEdit(params.id, params.cargos)}>
              <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  //Constante para que se carguen los datos en la tabla del index
  const data = [];
  for (let i = 1; i < 51; ++i) {
    data.push({
      key: i.toString(),
      id: i.toString(),
      cargos: "Hola" + i,
     
    });
  }

  //Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["id", "cargos"];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
    if (searchText === "") {
      return true;  // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue = typeof value === 'number' ? value.toString() : value.toString().toLowerCase();
        const formattedSearchText = typeof searchText === 'number' ? searchText.toString() : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  });



  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
  const ToastSuccess = () => {
    toast.success('Datos ingresados correctamente.', {
      theme: 'dark',
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  const ToastWarning = () => {
    toast.warning('No se permiten campos vacios.', {
      theme: 'dark',
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

    const ToastInfoWarning = () => {
      toast.warning('El dato que desea ingresar ya existe.', {
        theme: 'dark',
        //  position: toast.POSITION.BOTTOM_RIGHT
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }

    const ToastErrorApi = () => {
      toast.warning('Error en el proceso de la peticion.', {
        theme: 'dark',
        //  position: toast.POSITION.BOTTOM_RIGHT
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }
    const ToastSuccessEditar = () => {
      toast.success('Datos editados correctamente.', {
        theme: 'dark',
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }

  //Constante de los datos por defecto que tendran los formulario
  const defaultcargosValues = {
    cargos: "",
  };

  //Constante de los datos que serán requeridos para el formulario
  const cargosSchema = yup.object().shape({
    cargos: yup.string().required(),
    proceso: yup.string().required()
  });

  //Constante para mostrar el collapse de agregar un registro
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultcargosValues);
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultcargosValues);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante para cerrar el collapse de agregar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultcargosValues);
    CargarDatosTabla();
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
   // reset(defaultcargosValues);
    CargarDatosTabla();
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante que nos ayuda para las validaciones con yup para los formularios 
  const { handleSubmit, register, reset, control, watch, formState,setValue  } = useForm({
    defaultcargosValues,
    mode: "all",
    resolver: yupResolver(cargosSchema),
  });


  const { isValid, dirtyFields, errors } = formState;


  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Constante para ejecutar las validaciones y el envio del formulario en el boton de agregar en el collapse de agregar
  const AgregarRegistro = () => {
    const formData = watch();
    guardarCargos(formData);
    setTimeout(() => {
      handleSubmit();
    }, "250");
  };

  const EditarRegistro = () => {
    EditarCargos();
    setTimeout(() => {
      handleSubmit()();
      reset(defaultcargosValues);
     }, "1000");
  };


  //Constante para alinear los iconos de la tabla de detalles con los headers de la tabla y cambiar el color a los iconos
  const iconStyle = {
    marginRight: "5px",
    verticalAlign: "middle",
    color: "#634a9e",
  };

  //Constante para los estilos de los headers de la tabla de detalles
  const tableHeaderStyle = {
    verticalAlign: "middle",
    padding: "15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f2f2f2",
  };

  //Constante para los estilos de los filas de la tabla de detalles
  const tableRowStyle = {
    "&:hover": {
      backgroundColor: "coral",
    },
  };

  //Constante para los estilos de los celdas de la tabla de detalles
  const tableCellStyle = {
    verticalAlign: "middle",
    padding: "15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/J2xKpCp/CARGOS.png"
        alt="Encabezado de la carta"
      />
      {/*Collapse del index*/}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Botón de Nuevo Inicio*/}
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
              onClick={MostrarCollapseAgregar}
            >
              Nuevo
            </Button>
          </Stack>
          {/* Botón de Nuevo Fin */}

          {/* Select para las filas de la tabla inicio*/}
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
          {/* Select para las filas de la tabla fin*/}

            {/* Barra de Busqueda en la Tabla inicio */}
            <TextField
              style={{ borderRadius: "10px" }}
              placeholder="Buscar"
              value={searchText}
              onChange={handleSearchChange}
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* Barra de Busqueda en la Tabla fin */}
          </Stack>
        </CardContent>
      </Collapse>

      {/* Mostrar tabla index inicio*/}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              className: "custom-pagination",
            }}
          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}



  {/* Collapse para el formulario de agregar un registro inicio*/}
  <Collapse in={mostrarAgregar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
          <Grid item xs={3} style={{ marginTop: '30px' }} ></Grid>
          <Grid item xs={6} style={{ marginTop: '30px' }} >

          <Controller
                   render={({ field }) => (
                    <FormControl error={!!errors.cargos} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Cargo
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.cargos}
                      placeholder=""
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  )}
                  name="cargos"
                  control={control}
                />
            </Grid>

            <Grid item xs={12}sx={{display: "flex",justifyContent: "right",alignItems: "right",}}>
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
                onClick={AgregarRegistro}
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
                onClick={CerrarCollapseAgregar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para el formulario de agregar un registro fin*/}



      {/* Collapse para el formulario de editar un registro inicio*/}
      <Collapse in={mostrarEditar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
          <Grid item xs={3} style={{ marginTop: '30px' }} ></Grid>
          <Grid item xs={6} style={{ marginTop: '30px' }} >

          <Controller
          render={({ field }) => (
            <FormControl error={!!errors.cargos} fullWidth>
              <FormLabel className="font-medium text-10" component="legend">
                Cargo
              </FormLabel>
              <TextField
                {...register("cargosEditar")}
                variant="outlined"
                error={!!errors.cargos}
                placeholder=""
                fullWidth={true}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
              />
            </FormControl>
          )}
          name="cargos" 
          control={control}
        />

            </Grid>

            <Grid item xs={12}sx={{display: "flex",justifyContent: "right",alignItems: "right",}}>
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
                onClick={EditarRegistro}
              >
                Editar
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
                onClick={CerrarCollapseEditar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para el formulario de editar un registro fin*/}

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
              <h2>Detalles de Cargos</h2>   
              </Grid>   
              <Grid item xs={12} style={{marginBottom:"25px", marginLeft:"30px"}}>  
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ flex: 1 }} >
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Id del Cargo:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Descripción del Cargo:
                      </Typography>
                      <Typography>{cargos}</Typography>
                    </InputLabel>
                </Box>
               
                </Box>
                </Grid> 
                <Grid item xs={12}>            
                      <table
                        id="detallesTabla"
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <thead>
                          <tr>
                            <th style={tableHeaderStyle}>
                              <Icon style={iconStyle}>edit</Icon>Accion
                            </th>
                            <th style={tableHeaderStyle}>
                              <Icon style={iconStyle}>person</Icon>Usuario
                            </th>
                            <th style={tableHeaderStyle}>
                              <Icon style={iconStyle}>date_range</Icon>Fecha y
                              hora
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={tableRowStyle}>
                            <td style={tableCellStyle}>
                              <strong>Creación</strong>
                            </td>
                            <td style={tableCellStyle}>{usuarioCreacion}</td>
                            <td style={tableCellStyle}>{FechaCreacion  ? new Date(FechaCreacion).toLocaleString(): ""}</td>
                          </tr>
                          <tr style={tableRowStyle}>
                          <td style={tableCellStyle}>
                            <strong>Modificación</strong>
                          </td>
                          <td style={tableCellStyle}>{usuraioModificador}</td>
                          <td style={tableCellStyle}>{FechaModificacion ? new Date(FechaModificacion).toLocaleString() : ""}</td>
                        </tr>
                        </tbody>
                      </table>
                      </Grid> 
              <br></br>
              <Grid item xs={12}>    
              <div className="card-footer">
                <Button
                  variant="contained"
                  onClick={CerrarCollapseDetalles}
                  startIcon={<Icon>arrow_back</Icon>}
                >
                  Regresar
                </Button>
              </div>
              </Grid>
              </Grid>  
        </CardContent>
      </Collapse>
      {/* Collapse para mostrar los detalles de un registro fin*/}

      {/* Dialog para eliminar un registro inicio*/}
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
              onClick={DialogEliminar}
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
      {/* Dialog para eliminar un registro fin*/}
      <ToastContainer/>
    </Card>
  );
}

export default CargosIndex;
