/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonBase,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  DataGrid,
  MenuItem,
  Menu,
  Box,
  Collapse,
  Typography,
  Select,
  Grid,
  GridToolbar,
  Stack,
  ListItemText,
  esES,
  FormLabel,
  Autocomplete,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table } from "antd";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiRequests from "src/app/Personas/Empleados/EmpleadosService";
import History from 'src/@history/@history';

function EmpleadosIndex() {

  // Para tener la variable de fecha actual
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString(); // Convert to ISO 8601 format


  //Variable para navegar entre paginas
  const navigate = useNavigate();

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [mostrarAgregar, setmostrarAgregar] = useState(false);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  //Constante de los valores de los textfield de la pantalla
  const [empl_Id, setId] = useState("");
  const [empl_Nombre, setNombre] = useState("");
  const [empl_Apellido, setApellido] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [empl_DNI, setDNI] = useState("");
  const [empl_Sexo, setSexo] = useState("");
  const [eciv_Id, setEcivId] = useState(0);
  const [empl_FechaNacimiento, setFechaNacimiento] = useState("");
  const [empl_Telefono, setTelefono] = useState("");
  const [empl_Direccion, setDireccion] = useState("");
  const [pvin_Id, setPvinId] = useState(0);
  const [empl_CorreoElectronico, setCorreoElectronico] = useState("");
  const [carg_Id, setCargId] = useState(0);
  const [empl_EsAduana, setEsAduana] = useState(0);

  //Valores en string de ddls
  const [escv_Nombre, setEscv_Nombre] = useState("");
  const [pvin_Nombre, setPvin_Nombre] = useState("");
  const [carg_Nombre, setCarg_Nombre] = useState("");

  //Campos de Auditoria
  const [usuarioCreacion, setUsuarioCreacion] = useState("");
  const [usuraioModificador, setUsuarioModificador] = useState("");
  const [FechaCreacion, setFechaCreacion] = useState();
  const [FechaModificacion, setModificacion] = useState();
  const FechaCreacionForm = new Date(FechaCreacion).toLocaleString();

  //Constante solo para que quitar el error de los textfield no controlados
  const [message, setMessage] = useState();

  //Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([]);

  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    CargarDatosTabla();
  }, []);

  //Constante para cargar datos a las tablas
  const CargarDatosTabla = async () => {
    try {
      const employees = await apiRequests.listarEmpleados();
      const rows = employees.map((item, index) => {
        return {
          key: index,
          empl_Id: item.empl_Id,
          empl_Nombre: item.empl_Nombres,
          empl_Apellido: item.empl_Apellidos,
          empl_DNI: item.empl_DNI,
          empl_Sexo: item.empl_Sexo,
          eciv_Id: item.escv_Id,
          empl_FechaNacimiento: item.empl_FechaNacimiento,
          empl_Telefono: item.empl_Telefono,
          empl_Direccion: item.empl_DireccionExacta,
          pvin_Id: item.pvin_Id,
          empl_CorreoElectronico: item.empl_CorreoElectronico,
          carg_Id: item.carg_Id,
          empl_EsAduana: item.empl_EsAduana,

          nombreCompleto: item.empl_Nombres + " " + item.empl_Apellidos,
          escv_Nombre: item.escv_Nombre,
          pvin_Nombre: item.pvin_Nombre,
          carg_Nombre: item.carg_Nombre,

          usuarioCreacion: item.usuarioCreacionNombre,
          usuraioModificador: item.usuarioModificacionNombre,
          FechaCreacion: item.empl_FechaCreacion,
          FechaModificacion: item.empl_FechaModificacion,
        };
      });
      setDataTabla(rows);
    } catch (error) {
      console.log(error);
    }
  };

  //Constante para el detalle de las pantallas
  const DetallesTabla = (empl_Id) => {
    const Detalles = DataTabla.find((registro) => registro.empl_Id === empl_Id);

    setId(Detalles.empl_Id);
    setNombreCompleto(Detalles.nombreCompleto);
    setDNI(Detalles.empl_DNI);
    setSexo(Detalles.empl_Sexo);
    setEscv_Nombre(Detalles.escv_Nombre);
    setFechaNacimiento(Detalles.empl_FechaNacimiento);
    setTelefono(Detalles.empl_Telefono);
    setDireccion(Detalles.empl_Direccion);
    setPvin_Nombre(Detalles.pvin_Nombre);
    setCorreoElectronico(Detalles.empl_CorreoElectronico);
    setCarg_Nombre(Detalles.carg_Nombre);
    setUsuarioCreacion(Detalles.usuarioCreacion);
    setUsuarioModificador(Detalles.usuraioModificador);
    setFechaCreacion(Detalles.FechaCreacion);
    setModificacion(Detalles.FechaModificacion);
  };

  //Constantes para el dialog de eliminar
  const [Eliminar, setEliminar] = useState(false);
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const deleteEmpleado = async () => {
    try {
      const payload = {
        empl_Id: empl_Id,
        usua_UsuarioEliminacion: 1,
        empl_FechaEliminacion: formattedCurrentDate
      };

      const response = await apiRequests.deleteEmpleados(payload);
      console.log(response)
      if (response.data.messageStatus === "1") {
        ToastSuccessEliminar();
        CargarDatosTabla();
        DialogEliminar();
      }
      else {
        ToastError();
        DialogEliminar();
      }

    }
    catch (error) {
      throw error;
    }
  };

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEditEmpleados = (empl_Id) => {
    const EmpleadoData = DataTabla.find((registro) => registro.empl_Id === empl_Id);
    enviarEmpleadosEditData(EmpleadoData)
  };

  const enviarEmpleadosEditData = (empleadoData) => {
    History.push('Empleados/Editar', empleadoData);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (empl_Id) => {
    DetallesTabla(empl_Id);
    MostrarCollapseDetalles();
    handleClose(empl_Id);
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (id) => {
    setId(id);
    DialogEliminar();
    handleClose(id);
  };

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "ID",
      dataIndex: "empl_Id",
      key: "empl_Id",
      sorter: (a, b) => a.empl_Id - b.empl_Id, //sorting para Numeros
    },
    {
      title: "Nombre Completo",
      dataIndex: "nombreCompleto",
      key: "nombreCompleto",
      sorter: (a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto),
    },
    {
      title: "DNI",
      dataIndex: "empl_DNI",
      key: "empl_DNI",
      sorter: (a, b) => a.empl_DNI.localeCompare(b.empl_DNI),
    },
    {
      title: "Estado Civil",
      dataIndex: "escv_Nombre",
      key: "escv_Nombre",
      sorter: (a, b) => a.escv_Nombre.localeCompare(b.escv_Nombre),
    },
    {
      title: "Sexo",
      dataIndex: "empl_Sexo",
      key: "empl_Sexo",
      sorter: (a, b) => a.empl_Sexo.localeCompare(b.empl_Sexo),
    },
    {
      title: "Cargo",
      dataIndex: "carg_Nombre",
      key: "carg_Nombre",
      sorter: (a, b) => a.carg_Nombre.localeCompare(b.carg_Nombre),
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.empl_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.empl_Id)}
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
              id={`menu-${params.empl_Id}`}
              anchorEl={anchorEl[params.empl_Id]}
              keepMounted
              open={Boolean(anchorEl[params.empl_Id])}
              onClose={() => handleClose(params.empl_Id)}
            >
              <MenuItem onClick={() => handleEditEmpleados(params.empl_Id)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.empl_Id)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.empl_Id)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

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
  const camposToFilter = [
    "empl_Id",
    "nombreCompleto",
    "empl_DNI",
    "eciv_Id",
    "empl_Sexo",
    "carg_Id",
  ];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
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

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
  const ToastSuccessEliminar = () => {
    toast.success("Registro eliminado correctamente.", {
      theme: "dark",
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

  const ToastError = () => {
    toast.error("Ocurrió un error.", {
      theme: "dark",
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: "50px",
      },
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  const defaultEmpleadosValues = {
    empl_Nombre: "",
    empl_Apellido: "",
    empl_DNI: "",
    empl_Sexo: "",
    eciv_Id: 0,
    empl_FechaNacimiento: "",
    empl_Telefono: "",
    empl_Direccion: "",
    pvin_Id: 0,
    empl_CorreoElectronico: "",
    carg_Id: 0,
    empl_EsAdmin: 0,
  };

  const EmpleadosSchema = yup.object().shape({
    empl_Nombre: yup.string().required(""),
    empl_Apellido: yup.string().required(""),
    empl_DNI: yup.string().required(""),
    empl_Sexo: yup.string().required(""),
    eciv_Id: yup.string().required(""),
    empl_FechaNacimiento: yup.string().required(""),
    empl_Telefono: yup.string().required(""),
    empl_Direccion: yup.string().required(""),
    pvin_Id: yup.string().required(""),
    empl_CorreoElectronico: yup.string().required(""),
    carg_Id: yup.string().required(""),
    empl_EsAduana: yup.string().required(""),
  });

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante que nos ayuda para las validaciones con yup para los formularios
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultEmpleadosValues,
    mode: "all",
    resolver: yupResolver(EmpleadosSchema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  // Validaciones Editar

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Editar Registro

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
        image="https://i.ibb.co/tD9Rjwz/EMPLEADOS.png"
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
              onClick={() => {
                navigate("/Empleados/Crear");
              }}
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

            {/* Barra de Busqueda en la Tabla */}
            <TextField
              style={{ borderRadius: "10px" }}
              placeholder="Buscar"
              value={searchText}
              onChange={handleSearchChange}
              size="small"
              variant="outlined"
              inputprops={{
                startadornment: (
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
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
            }}
            columns={columns}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              className: "decoration-white",
            }}
          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}

      {/* Collapse de los Detalles */}
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
              <h2>Detalles del Empleado</h2>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="empl_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Empleado:
                    </Typography>
                    <Typography>{empl_Id}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="empl_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre Completo:
                    </Typography>
                    <Typography>{nombreCompleto}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="empl_DNI">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      N° de Identidad:
                    </Typography>
                    <Typography>{empl_DNI}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="empl_Sexo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Sexo:
                    </Typography>
                    <Typography>{empl_Sexo}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="escv_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Estado Civil:
                    </Typography>
                    <Typography>{escv_Nombre}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="carg_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Cargo:
                    </Typography>
                    <Typography>{carg_Nombre}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="empl_Telefono">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Teléfono:
                    </Typography>
                    <Typography>{empl_Telefono}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="empl_Direccion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Dirección:
                    </Typography>
                    <Typography>{empl_Direccion}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="pvin_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Provincia:
                    </Typography>
                    <Typography>{pvin_Nombre}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="empl_CorreoElectronico">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Correo Electrónico:
                    </Typography>
                    <Typography>{empl_CorreoElectronico}</Typography>
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
                      <Icon style={iconStyle}>date_range</Icon>Fecha y hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={tableCellStyle}>{usuarioCreacion}</td>
                    <td style={tableCellStyle}>{FechaCreacionForm}</td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{usuraioModificador}</td>
                    <td style={tableCellStyle}>
                      {FechaModificacion
                        ? new Date(FechaModificacion).toLocaleString()
                        : ""}
                    </td>
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
      {/* Collapse para mostrar los detalles de un registro fin */}

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
              onClick={deleteEmpleado}
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

export default EmpleadosIndex;
