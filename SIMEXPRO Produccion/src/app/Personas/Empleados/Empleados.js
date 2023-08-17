/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
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
  Grid,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Table, Tag } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apiRequests from "src/app/Personas/Empleados/EmpleadosService";
import History from "src/@history/@history";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import empleadosService from "src/app/Personas/Empleados/EmpleadosService";

import estilosTablaDetalles from "src/styles/tablaDetalles";
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";

import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { ToastError, ToastSuccess } from "src/styles/toastsFunctions";

function EmpleadosIndex() {
  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles
  // const [mostrarEditar, setmostrarEditar] = useState(false); //Para editar
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  // const [mostrarAgregar, setmostrarAgregar] = useState(false); //Para agregar

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = useState(10);

  //Campos para guardar el registro de una fila
  const [datosFila, setDatosFila] = useState({});

  //Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([]);

  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    EmpleadosGetData();
  }, []);

  //Constante para cargar datos a las tablas
  const EmpleadosGetData = async () => {
    try {
      setDataTabla(await empleadosService.listar());
    } catch (error) {
      console.log(error.message);
    }
  };
 
 
  //Constante para cargar datos a las tablas
  const EmpleadosAccion = async () => {
    try {
      if(habilitar){
        const response = await empleadosService.deshabilitar(datosFila)
        if(response.data.data['messageStatus'] === "1"){
          ToastSuccess('El registro ha sido deshabilitado')
        }else{
          ToastError('No se pudo deshabilitar el registro')
        }
      }else{
        const response = await empleadosService.habilitar(datosFila)
        if(response.data.data['messageStatus'] === "1"){
          ToastSuccess('El registro ha sido habilitado')
        }else{
          ToastError('No se pudo habilitar el registro')
        }
      }
      setDataTabla(await empleadosService.listar());
      DialogEliminar()
    } catch (error) {
      console.log(error.message);
    }
  };

  //Constantes para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);
  const [habilitar, setHabilitar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Necesario para el boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEditEmpleados = (params) => {
    History.push('/Empleados/editar',params)
    handleClose(params.empl_Id);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (params) => {
    setDatosFila(params);
    CollapseDetalles();
    handleClose(params.empl_Id);
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (params) => {
    setDatosFila(params);
    if(params.empl_Estado){
      setHabilitar(true);
    }else{
      setHabilitar(false);
    }
    DialogEliminar()
    handleClose(params.empl_Id);
  };

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Nombres",
      dataIndex: "empl_NombreCompleto",
      key: "empl_NombreCompleto",
      // render: (text, record) => `${record.empl_Nombres} ${record.empl_Apellidos}`, // sirve para unir textos 
      sorter: (a, b) => a.empl_NombreCompleto.localeCompare(b.empl_NombreCompleto),
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
      title: "Estado",
      dataIndex: "empl_Estado",
      key: "empl_Estado",
      render: (text, record) => {return(record.empl_Estado? <Tag color="green">Habilitado</Tag>: <Tag color="red">deshabilitado</Tag>)},
      sorter: (a, b) => a.empl_Estado.localeCompare(b.empl_Estado),
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
              <MenuItem onClick={() => handleEditEmpleados(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
                {params.empl_Estado? <><HighlightOffIcon></HighlightOffIcon>ㅤDeshabilitar</> : <><AddCircleOutlineIcon></AddCircleOutlineIcon>Habilitar</>}
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
  };

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = [
    "empl_Id",
    "empl_Nombres",
    "empl_Apellidos", 
    "empl_NombreCompleto", 
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

  //Constante para mostrar el collapse de detalles un registro
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
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
                History.push("/Empleados/Crear");
              }}
            >
              Nuevo
            </Button>
          </Stack>
          {/* Botón de Nuevo Fin */}

          {/* Select para las filas de la tabla inicio*/}
          <Stack direction="row" spacing={1}>
            <label className='mt-8'>Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            {/* Barra de Busqueda en la Tabla */}
            <TextField
              style={{ borderRadius: '10px' }}
              placeholder='Buscar'
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
              emptyText: LoadingIcon()
            }}
            columns={columns}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
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
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px" }}>
                <Chip label="Detalles del Empleado" />
              </Divider>
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
                    <Typography>{datosFila['empl_Id']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="empl_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre Completo:
                    </Typography>
                    <Typography>{datosFila['empl_NombreCompleto']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="empl_DNI">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      N° de Identidad:
                    </Typography>
                    <Typography>{datosFila['empl_DNI']}</Typography>
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
                    <Typography>{datosFila['empl_Sexo']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="escv_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Estado Civil:
                    </Typography>
                    <Typography>{datosFila['escv_Nombre']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="carg_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Cargo:
                    </Typography>
                    <Typography>{datosFila['carg_Nombre']}</Typography>
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
                    <Typography>{datosFila['empl_Telefono']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="empl_Direccion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Dirección:
                    </Typography>
                    <Typography>{datosFila['empl_DireccionExacta']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="pvin_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Provincia:
                    </Typography>
                    <Typography>{datosFila['pvin_Nombre']}</Typography>
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
                    <Typography>{datosFila['empl_CorreoElectronico']}</Typography>
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
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>Accion
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>Usuario
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>Fecha y hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{datosFila['usuarioCreacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{new Date(datosFila['empl_FechaCreacion']).toLocaleString()}</td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{datosFila['usuarioModificacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                       {datosFila['empl_FechaModificacion']
                        ? new Date(datosFila['empl_FechaModificacion']).toLocaleString()
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
                  onClick={CollapseDetalles}
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
          Confirmación de {habilitar? "deshabilitación": "habilitacion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea {habilitar? "deshabilitar": "habilitar"} este registro?
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
              onClick={EmpleadosAccion}
            >
              {habilitar? "Deshabilitar": "Habilitar"}
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
