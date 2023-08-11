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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table } from "antd";
import axios from 'axios';
import "src/styles/custom-pagination.css";
import { useHistory } from "react-router-dom";
import { ConsoleSqlOutlined } from "@ant-design/icons";

function UsuariosIndex() {

  //Token de la API para subir imagenes
  const apikey = "7e4e4920016a49b1dfc06d5af4e9ffc3";

  const fileInputRef = useRef(null);

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);


  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  //Constante de los valores de los textfield de la pantalla
  const [id, setid] = useState("");
  const [usuario, setusuario] = useState("");
  const [empleados, setempleados] = useState("");
  const [rol, setrol] = useState('');
  const [administrador, setadministrador] = useState('');
  const [idEliminar, setidEliminar] = useState(0);
  const [image, setimage] = useState('https://i.ibb.co/tLVHzJs/imagen-usuario.png');
  const [checked, setChecked] = React.useState(false);
  const [checkedEditar, setCheckedEditar] = React.useState(false);
  const [empleadoSeleccionado, setempleadoSeleccionado] = useState('')
  const [rolSeleccionado, setrolSeleccionado] = useState('')
  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([])
  const [DataDetalles, setDataDetalles] = useState([])
  const [empleadoEdit, setempleadoEdit] = useState([])
  const [message, setMessage] = useState();


  const camposToFilter = ["id", "usuario", "empleado", "rol"];

  //constante que me carga la imagen por defecto del usuario en caso que no seleccione una
  const [userImage, setUserImage] = useState(
    "https://i.ibb.co/8MKqj1C/Avatar-Usuario.png"
  );

  //Listados para los select
  const [empleadosList, setEmpleadosList] = useState([]);
  const [rolesList, setRolesList] = useState([]);

  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    CargarDatosTabla();
    CargasDatosEmpleadosDdl();
    CargasRolesDdl();
  }, []);

  //
  const handleChangeAdmin = (event) => {
    setChecked(event.target.checked);
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
      ToastWarningImagen();
    }
  };

  //Constante para cargar los datos de los Dddl
  const CargasDatosEmpleadosDdl = async () => {
    const customHeaders = {
      XApiKey: "4b567cb1c6b24b51ab55248f8e66e5cc",
    };
    const responseDdl = await axios.get(
      process.env.REACT_APP_API_URL + "api/Empleados/Listar",
      {
        headers: customHeaders,
      }
    );
    console.log(responseDdl.data.data)
    setEmpleadosList(
      responseDdl.data.data.map((item) => ({
        empl_Id: item.empl_Id,
        empleado: item.empl_Nombres + ' ' + item.empl_Apellidos,
      }))
    );
  };


  //Constante para cargar los datos de los Dddl
  const CargasRolesDdl = async () => {
    const customHeaders = {
      XApiKey: "4b567cb1c6b24b51ab55248f8e66e5cc",
    };
    const responseDdl = await axios.get(
      process.env.REACT_APP_API_URL + "api/Roles/Listar",
      {
        headers: customHeaders,
      }
    );
    setRolesList(
      responseDdl.data.data.map((item) => ({
        role_Id: item.role_Id,
        rol: item.role_Descripcion,
      }))
    );
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const EliminarRegistro = async () => {
    let payload = {
      usua_Id: idEliminar,
      usua_UsuarioEliminacion: 1,
      usua_FechaEliminacion: new Date()
    };
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    const response = await axios.post(process.env.REACT_APP_API_URL + 'api/Usuarios/Eliminar', payload, {
      headers: customHeaders,
    });
    console.log(response)
    if (response.data.data.codeStatus === 1) {
      DialogEliminar();
      CargarDatosTabla();
      ToastSuccessEliminar();
    } else {
      ToastErrorApi();
    }
  }

  const handleDetails = (id, usuario, empleado, rol) => {
    DetallesTabla(id, usuario, empleado, rol);
    MostrarCollapseDetalles();
    handleClose(id);
  };

  //Constante para el detalle de las pantallas
  const DetallesTabla = (id, usuario, empleado, rol) => {
    setid(id);
    setusuario(usuario);
    setempleados(empleado);
    setrol(rol);
    console.log(id)
    const detalles = DataDetalles.find(d => d.usua_Id === id)
    if (detalles.usua_EsAdmin)
      setadministrador("Es administrador")
    else
      setadministrador("No es administrador")
    const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
    tableRows[0].cells[1].textContent = detalles.usua_Nombre;
    tableRows[0].cells[2].textContent = detalles.usua_FechaCreacion;
    tableRows[1].cells[1].textContent = detalles.usua_UsuarioModificacion;
    tableRows[1].cells[2].textContent = detalles.usua_FechaModificacion;
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (id) => {
    DialogEliminar();
    setidEliminar(id);
    handleClose(id);
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

  //constante para cargar la tabla
  const CargarDatosTabla = async () => {
    try {
      const customHeaders = {
        XApiKey: "4b567cb1c6b24b51ab55248f8e66e5cc",
      };
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "api/Usuarios/Listar",
        {
          headers: customHeaders,
        }
      );
      const rows = response.data.map((item, index) => {
        return {
          key: index,
          id: item.usua_Id,
          usuario: item.usua_Nombre,
          empleado: item.empleadoNombreCompleto,
          rol: item.role_Descripcion,
          estado: item.usua_Estado.toString() == 'false' ? 'Inactivo' : 'Activo'
        };
      });
      setDataTabla(rows);
      setDataDetalles(response.data);
    } catch (error) { }
  };

  //Constante de las columnas del index
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id, //sorting para Numeros
    },
    {
      title: "Usuario",
      dataIndex: "usuario",
      key: "usuario",
      sorter: (a, b) => a.usuario.localeCompare(b.usuario), //sorting para Letras
    },
    {
      title: "Empleado",
      dataIndex: "empleado",
      key: "empleado",
      sorter: (a, b) => a.emplado.localeCompare(b.empleado), //sorting para Letras
    },
    {
      title: "Rol",
      dataIndex: "rol",
      key: "rol",
      sorter: (a, b) => a.rol.localeCompare(b.rol), //sorting para Letras
    },
    {
      title: "Esta Activo?",
      dataIndex: "estado",
      key: "estado",
      sorter: (a, b) => a.estado.localeCompare(b.estado), //sorting para Letras
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
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id, params.usuario, params.empleado, params.rol)}>
                <Icon>visibility</Icon> Detalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.id)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];



  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };

  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    resetUsuarios(camposUsuarios);
  };

  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    resetUsuarios(camposUsuarios);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    resetUsuarios(camposUsuarios);
  };

  const CerrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    resetUsuarios(camposUsuarios);
    CargarDatosTabla();
  };

  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    resetUsuarios(camposUsuarios);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };


  {/*Constantes para validaciones de agregar inicio */ }
  const camposUsuarios = {
    userNombreUsuario: "",
    userContraseña: "",
    empleado: '',
    rol: '',
    userEsAdmin: false,
  };

  const schemaUsuarios = yup.object().shape({
    userNombreUsuario: yup.string().required(),
    userContraseña: yup.string().required(),
    empleado: yup.object().required(),
    rol: yup.object().required(),
    userEsAdmin: yup.bool(),
  });

  const {
    handleSubmit: handleSubmitUsuarios,
    reset: resetUsuarios,
    control: controlUsuarios,
    formState: formUsuarios,
    watch: watchUsuarios,
    setValue: setValueUsuarios,
  } = useForm({
    camposUsuarios,
    mode: "all",
    resolver: yupResolver(schemaUsuarios),
  });

  const {
    isValid: isValidUsuarios,
    dirtyFields: dirtyFieldsUsuarios,
    errors: errorsUsuarios,
  } = formUsuarios;

  {/*Constantes para validaciones de agregar fin */ }

  {/*Constantes para validaciones de editar inicio */ }
  const camposUsuariosEditar = {
    userNombreUsuarioEditar: "",
    empleadoEditar: '',
    rolEditar: '',
    userEsAdminEditar: false,
  };

  const schemaUsuariosEditar = yup.object().shape({
    userNombreUsuarioEditar: yup.string().required(),
    empleadoEditar: yup.object().required(),
    rolEditar: yup.object().required(),
    userEsAdminEditar: yup.bool(),
  });

  const handleEdit = (params) => {
    console.log(params)
    MostrarCollapseEditar();
    setValueUsuariosEditar('userNombreUsuarioEditar', params['usuario'])
    console.log(empleadosList)
    setValueUsuariosEditar('empleadoEditar', empleadosList.find(empleado => empleado.label === params['empleado']))
    setValueUsuariosEditar('rolEditar', rolesList.find(roles => roles.label === params['rol']))
    console.log(watchUsuariosEditar())

    handleClose(params['id']);
  };

  const {
    handleSubmit: handleSubmitUsuariosEditar,
    reset: resetUsuariosEditar,
    control: controlUsuariosEditar,
    formState: formUsuariosEditar,
    watch: watchUsuariosEditar,
    setValue: setValueUsuariosEditar,
  } = useForm({
    camposUsuariosEditar,
    mode: "all",
    resolver: yupResolver(schemaUsuariosEditar),
  });

  const {
    isValid: isValidUsuariosEditar,
    dirtyFields: dirtyFieldsUsuariosEditar,
    errors: errorsUsuariosEditar,
  } = formUsuarios;

  {/*Constantes para validaciones de editar fin */ }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const ToastSuccess = () => {
    toast.success("Datos ingresados correctamente.", {
      theme: "dark",
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: "50px",
      },
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  const ToastSuccessEditar = () => {
    toast.success("Datos Editados correctamente.", {
      theme: "dark",
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: "50px",
      },
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  const ToastWarning = () => {
    toast.warning("No se permiten campos vacios.", {
      theme: "dark",
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: "50px",
      },
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  const ToastInfoWarning = () => {
    toast.warning("El dato que desea ingresar ya existe.", {
      theme: "dark",
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: "50px",
      },
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  const ToastWarningImagen = () => {
    toast.warning("El archivo no es valido", {
      theme: "dark",
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: "50px",
      },
      autoClose: 1500,
      closeOnClick: true,
    });
  };


  const ToastErrorApi = () => {
    toast.warning("Error en el proceso de los.", {
      theme: "dark",
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: "50px",
      },
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
  const ToastSuccessEliminar = () => {
    toast.success('Datos eliminado correctamente.', {
      theme: 'dark',
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

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

  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de agregar
  const ValidacionAgregar = async (data) => {
    let isValid = true;
    console.log(data)
    if (data.empleado != null || data.rol != null) {
      if (data.userNombreUsuario != null || data.userContraseña != null) {
        if (data.userNombreUsuario.trim() === "" || data.userContraseña.trim() === "" || data.empleado[0] === "" || data.rol === "") {
          ToastWarning();
          console.log("Masiso")
          return isValid;
        } else {
          isValid = false;
          let respuesta = await EjecutarEndPoint(data);
          if (respuesta === 1) {
            ToastSuccess();
            CerrarCollapseAgregar();
          } if (respuesta === 2) {
            ToastInfoWarning();
          } if (respuesta === 3) {
            ToastErrorApi();
          } if (respuesta === 4) {
            ToastErrorApi();
          }
          return isValid;
        }
      } else {
        return isValid;
      }
    } else {
      ToastWarning();
      return isValid;
    }
  }

  //Ejecutar end point de tipo async para esperar la respuesta
  const EjecutarEndPoint = async (data) => {
    let payload = {
      usua_Nombre: data.userNombreUsuario,
      usua_Contrasenia: data.userContraseña,
      empl_Id: data.empleado,
      role_Id: data.rol,
      usua_EsAdmin: checked,
      usua_Image: image,
      usua_UsuarioCreacion: 1,
      usua_FechaCreacion: new Date(),
    };
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + 'api/Usuarios/Insertar',
        payload,
        {
          headers: customHeaders,
        }
      );
      console.log(response)
      if (response.data.data != null) {
        if (response.data.data.messageStatus === '1') {
          return 1;
        } else {
          if (response.data.data.messageStatus.includes('UNIQUE')) {
            return 2;
          } else {
            return 3;
          }
        }
      } else {
        return 4;
      }
    } catch (error) {
      return 4;
    }
  };

  const EjecutarEndPointEditar = async (data) => {
    let payload = {
      usua_Id:id,
      empl_Id: empleadoSeleccionado,
      usua_Image: image,
      role_Id: rolSeleccionado,
      usua_EsAdmin: checkedEditar,
      usua_UsuarioModificacion: 1,
      tipa_FechaModificacion: new Date()  
    }
    console.log(payload)
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    try {
      const response =  await axios.post(process.env.REACT_APP_API_URL+'api/Areas/Editar',payload,{
        headers: customHeaders,
      })   
      if (response.data.data != null) {
        if (response.data.data.messageStatus === '1') {
          return 1;
        } else {
          if (response.data.data.messageStatus.includes('UNIQUE')) {
            return 2;
          } else {
            return 3;
          }
        }
      } else {
        return 4;
      }
    } catch (error) {
      return 4;
    }
  };

  //Constante para ejecutar las validaciones y el envio del formulario en el boton de agregar en el collapse de agregar
  const AgregarRegistro = async () => {
    const validationResult = await ValidacionAgregar(watchUsuarios());
    if (validationResult) {
      handleSubmitUsuarios(ValidacionAgregar)();
    }
  };

  //Constante para ejecutar las validaciones y el envio del formulario en el boton de agregar en el collapse de agregar
  const EditarRegistro = async () => {
    const validationResult = await ValidacionEditar(watchUsuariosEditar());
    if (validationResult) {
      handleSubmitUsuariosEditar(ValidacionEditar)();
    }
  };

  const ValidacionEditar = async (data) => {
    let isValid = true;
    console.log(data)
    if (data.empleadoEditar != null || data.rolEditar != null) {
      if (data.userNombreUsuarioEditar != null) {
        if (data.userNombreUsuarioEditar.trim() === "" || data.empleadoEditar[0] === "" || data.rolEditar[0] === "") {
          ToastWarning();
          return isValid = true;
        } else {
          isValid = false;
          let respuesta = await EjecutarEndPointEditar(data);
          if(respuesta === 1){
            ToastSuccess();
         CerrarCollapseEditar();                     
          } if (respuesta === 2){
            ToastInfoWarning();
          } if(respuesta  === 3){
            ToastErrorApi();
          } if(respuesta === 4){
            ToastErrorApi();
          }
          return isValid;
        }
      } else {
        return isValid;
      }
    } else {
      ToastWarning();
      return isValid;
    }
  }

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <ToastContainer />
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
              onClick={MostrarCollapseAgregar}
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
      </Collapse>

      {/* Tabla */}
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

      {/* Collapse para el formulario de agregar un registro incio*/}

      <Collapse in={mostrarAgregar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
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
                  }}
                >
                  {image == null ? (
                    <img
                      src="https://i.ibb.co/tLVHzJs/imagen-usuario.png"
                      alt="user"
                    />
                  ) : (
                    <img
                      src={image}
                      alt="uploaded image"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                </div>
                <br></br>
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
                    <FormLabel error={!!errorsUsuarios.userNombreUsuario} id="group-label">Nombre Usuario</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined"
                          placeholder="Ingrese el nombre de usuario"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                          }}
                          error={!!errorsUsuarios.userNombreUsuario}
                        ></TextField>
                      )}
                      name="userNombreUsuario"
                      control={controlUsuarios}
                    ></Controller>
                  </FormControl>

                  <FormControl fullWidth>
                    <FormLabel error={!!errorsUsuarios.userContraseña} id="group-label">Contraseña</FormLabel>
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
                          error={!!errorsUsuarios.userContraseña}
                        ></TextField>
                      )}
                      name="userContraseña"
                      control={controlUsuarios}
                    ></Controller>
                  </FormControl>

                  <div className="mt-48 mb-16" style={{ marginTop: "15px" }}>
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={
                          <Switch
                            label="¿Es administrador?"
                            labelPlacement="top"
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
                  <Controller
                    defaultValue={["Selecciona una opción"]}
                    render={({ field }) => (
                      <FormControl error={!!errorsUsuarios.empleado} fullWidth>
                        <FormLabel
                          className="font-medium text-10"
                          component="legend"
                        >
                          Empleado
                        </FormLabel>
                        <Select
                          {...field}
                          fullWidth
                          error={!!errorsUsuarios.empleado}
                          defaultValue="0"
                          inputProps={{
                            startadornment: <InputAdornment position="start" />,
                          }}
                        >
                          {empleadosList.map(empleado => (
                            <MenuItem key={empleado.empl_Id} value={empleado.empl_Id}>
                              {empleado.empleado}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    name="empleado"
                    control={controlUsuarios}
                  />

                  <Controller
                    defaultValue={["Selecciona una opción"]}
                    render={({ field }) => (
                      <FormControl error={!!errorsUsuarios.rol} fullWidth>
                        <FormLabel
                          className="font-medium text-10"
                          component="legend"
                        >
                          Roles
                        </FormLabel>
                        <Select
                          {...field}
                          fullWidth
                          error={!!errorsUsuarios.rol}
                          defaultValue="0"
                          inputProps={{
                            startadornment: <InputAdornment position="start" />,
                          }}
                        >
                          {rolesList.map(rol => (
                            <MenuItem key={rol.role_Id} value={rol.role_Id}>
                              {rol.rol}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    name="rol"
                    control={controlUsuarios}
                  />
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
      {/* Collapse para el formulario de agregar un registro Fin*/}

      {/* Collapse para el formulario de editar un registro incio*/}

      <Collapse in={mostrarEditar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
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
                  }}
                >
                  {image == null ? (
                    <img
                      src="https://i.ibb.co/tLVHzJs/imagen-usuario.png"
                      alt="user"
                    />
                  ) : (
                    <img
                      src={image}
                      alt="uploaded image"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                </div>
                <br></br>
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
                  <Controller
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <FormLabel error={!!errorsUsuariosEditar.userNombreUsuarioEditar} id="group-label">Nombre Usuario</FormLabel>
                        <TextField
                          {...field}
                          id="userNombreUsuarioEditar"
                          placeholder="Ingrese el nombre de usuario"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"></InputAdornment>
                            ),
                          }}
                          error={!!errorsUsuariosEditar.userNombreUsuarioEditar}
                        ></TextField>
                      </FormControl>
                    )}
                    name="userNombreUsuarioEditar"
                    control={controlUsuariosEditar}
                  ></Controller>
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <FormLabel
                          className="font-medium text-10"
                          component="legend"
                        >
                          Empleado
                        </FormLabel>
                        <Select
                          {...field}
                          fullWidth
                          value={empleadoSeleccionado}
                          onChange={e => {
                            setempleadoSeleccionado(e.target.value)
                          }}
                         
                        >
                          {empleadosList.map(empleado => (
                            <MenuItem key={empleado.empl_Id} value={empleado.empl_Id}>
                              {empleado.empleado}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    name="empleadoEditar"
                    control={controlUsuariosEditar}
                  />

                </Grid>

                <Grid item xs={6}>
                  <Controller
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <FormLabel
                          className="font-medium text-10"
                          component="legend"
                        >
                          Roles
                        </FormLabel>
                        <Select
                          {...field}
                          fullWidth
                          value={rolSeleccionado}
                          onChange={e => {
                            setrolSeleccionado(e.target.value)
                          }}
                        >
                          {rolesList.map(rol => (
                            <MenuItem key={rol.role_Id} value={rol.role_Id}>
                              {rol.rol}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    name="rolEditar"
                    control={controlUsuariosEditar}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={
                        <Switch
                          label="¿Es administrador?"
                          labelPlacement="top"
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
      {/* Collapse para el formulario de editar un registro Fin*/}

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
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Usuario Id:
                    </Typography>
                    <Typography>{id}</Typography>
                  </InputLabel>
                </Grid>
                <Grid item xs={1}></Grid>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de usuario:
                  </Typography>
                  <Typography>{usuario}</Typography>
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
                    <Typography>{empleados}</Typography>
                  </InputLabel>
                </Grid>
                <Grid item xs={1}></Grid>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Rol:
                  </Typography>
                  <Typography>{rol}</Typography>
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
                    <Typography>{administrador}</Typography>
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
                    <td style={tableCellStyle}></td>
                    <td style={tableCellStyle}></td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}></td>
                    <td style={tableCellStyle}></td>
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
              onClick={EliminarRegistro}
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
      <ToastContainer />
    </Card>
  );
}

export default UsuariosIndex;
