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
  Divider,
  Chip,
  Menu,
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
import InputMask from 'react-input-mask';
import SearchIcon from "@mui/icons-material/Search";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table } from "antd";
import axios from 'axios';
import "src/styles/custom-pagination.css";
import FormaEnvioService from "./FormaEnvioService";
import LoadingIcon from "src/styles/iconoCargaTabla";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
  ToastDefault,
} from "src/styles/toastsFunctions";

{/*Yup para formulario de agregar Inicio */ }

//Constante para campos por defecto
const campos = {
  CodigoFormaEnvio: '',
  FormaEnvio: '',
};

//Constante para indicar que el valor es requerido
const schema = yup.object().shape({
  CodigoFormaEnvio: yup.string().trim().max(2).required(),
  FormaEnvio: yup.string().trim().required()
});

{/*Yup para formulario de agregar Fin */ }

function FormaDeEnvioIndex() {

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  const camposToFilter = ["key", "foen_Codigo", "foen_Descripcion"];
  const [anchorEl, setAnchorEl] = useState({});
  const [idEditar, setidEditar] = useState(0);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.foen_Id);
  };

  const handleDelete = (datos) => {
    setValue('foen_Codigo', datos['foen_Id']);
    DialogEliminar()
    handleClose(datos.foen_Id);
  };

  //Handle que inicia la funcion de editar
  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    setidEditar(datos['foen_Id'])
    //insertar aca las variables necesarias en su formulario
    setValue("CodigoFormaEnvio", datos["foen_Codigo"]);
    setValue("FormaEnvio", datos["foen_Descripcion"]);
    handleClose(datos.foen_Id);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: 'Codigo forma de envio',
      dataIndex: 'foen_Codigo',
      key: 'foen_Codigo',
      sorter: (a, b) => a.foen_Codigo.localeCompare(b.foen_Codigo),
    },
    {
      title: 'Forma de envio',
      dataIndex: 'foen_Descripcion',
      key: 'foen_Descripcion',
      sorter: (a, b) => a.foen_Descripcion.localeCompare(b.foen_Descripcion),
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) =>
        <div key={params.foen_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.foen_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.foen_Id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.foen_Id}`}
              anchorEl={anchorEl[params.foen_Id]}
              keepMounted
              open={Boolean(anchorEl[params.foen_Id])}
              onClose={() => handleClose(params.foen_Id)}
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
            </Menu>
          </Stack>
        </div>
      ,
    },
  ];

  const [data, setData] = useState([]);

  const FormaEnvioaGetData = async () => {
    try {
      setData(await FormaEnvioService.listar());
    } catch (error) {
      console.log(error.message);
    }
  };

  const FormaEnvioCreate = async () => {
    try {
      const response = (await FormaEnvioService.crear(datosWatch))
      if (response.data.data.messageStatus == '1') {
        ToastSuccess('El registro se ha insertado exitosamente')
        FormaEnvioaGetData();
        VisibilidadTabla()
        reset(campos)
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarning('El registro ya existe')
      }
    } catch (error) {
      console.log(error.message);
      ToastError('Error inesperado')
    }
  };

  const FormaEnvioEdit = async () => {
    try {
      const response = (await FormaEnvioService.editar(datosWatch, idEditar))
      if (response.data.data.messageStatus == '1') {
        ToastSuccess('El registro se ha editado exitosamente')
        FormaEnvioaGetData();
        VisibilidadTabla()
        reset(campos)
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarning('El registro ya existe')
      }
    } catch (error) {
      console.log(error.message);
      ToastError('Error inesperado')
    }
  };

  const FormaEnvioDelete = async () => {
    try {
      const response = (await FormaEnvioService.eliminar(datosWatch))
      if (response.data.data.messageStatus == '1') {
        ToastSuccess('El registro se ha eliminado exitosamente')
        FormaEnvioaGetData();
        DialogEliminar()
        reset(campos)
      } else if (response.data.data.messageStatus.includes("0")) {
        ToastError('El registro está en uso')
      }
    } catch (error) {
      console.log(error.message);
      ToastError('Error inesperado')
    }
  };

  useEffect(() => {
    FormaEnvioaGetData();
  }, []);

  {
    /* Función para mostrar la tabla y mostrar agregar */
  }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(campos);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  {
    /* Filtrado de datos */
  }
  const filteredRows = data.filter((row) => {
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

  //Constante useForm para el formulario de Agregar que nos proporciona todas las opciones para validar con yup
  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    campos,
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const datosWatch = watch();


  const GuardarFormaEnvio = () => {
    if (isValid) {
      if (!editar) {
        FormaEnvioCreate()
      } else {
        FormaEnvioEdit()
      }
    } else {
      ToastWarning('Completa todos los campos')
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/ZfHJNBP/FORMAS-DE-ENV-O.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

          {/* Botón de Nuevo */}
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#634A9E', color: 'white',
                "&:hover": { backgroundColor: '#6e52ae' },
              }}
              onClick={() => {
                VisibilidadTabla()
                setEditar(false)
              }}
            >
              Nuevo
            </Button>
          </Stack>

          <Stack direction="row" spacing={1}>
            <label className='mt-8'>Filas por página:</label>
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

        {/* Mostrar tabla index inicio*/}
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
      {/* Mostrar tabla index fin*/}


      {/* Collapse para el formulario de agregar un registro inicio*/}
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
                    label={editar ? "Editar Formas de envio" : "Agregar Formas de envio"}
                  />
                </Divider>
            </Grid>
              <Grid item xs={6}>
                <FormControl error={!!errors.CodigoFormaEnvio} fullWidth>
                  <FormLabel
                    className="font-medium text-10"
                    component="legend"
                  >
                    Codigo de la forma de envio
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        disabled={editar}
                        error={!!errors.CodigoFormaEnvio}
                        fullWidth={true}
                        inputProps={{
                          maxLength: 2,
                        }}
                      />
                    )}
                    name="CodigoFormaEnvio"
                    control={control}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>         
                <Controller
                  render={({ field }) => (
                    <FormControl error={!!errors.FormaEnvio} fullWidth>
                      <FormLabel
                        className="font-medium text-10"
                        component="legend"
                      >
                        Forma de envio
                      </FormLabel>
                      <TextField
                        {...field}
                        variant="outlined"
                        error={!!errors.FormaEnvio}
                        fullWidth={true}
                        inputProps={{
                          startadornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  )}
                  name="FormaEnvio"
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                <Button
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={GuardarFormaEnvio}
                >
                  Guardar
                </Button>

                <Button
                  startIcon={<Icon>close</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px' }}
                  sx={{
                    backgroundColor: '#DAD8D8', color: 'black',
                    "&:hover": { backgroundColor: '#BFBABA' },
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
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                <Chip color='default' label="Detalle Formas de envio" />
              </Divider>
            </Grid>
            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id de la forma de envio:
                  </Typography>
                  <Typography>{DatosDetalles['foen_Id']}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Codigo de la forma de envio:
                  </Typography>
                  <Typography>{DatosDetalles['foen_Codigo']}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Forma de envio descripción:
                  </Typography>
                  <Typography>{DatosDetalles["foen_Descripcion"]}</Typography>
                </InputLabel>
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
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['usuarioCreacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['foen_FechaCreacion'] ? new Date(DatosDetalles['foen_FechaCreacion']).toLocaleString() : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['usuarioModificacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['foen_FechaModificacion'] ? new Date(DatosDetalles['foen_FechaModificacion']).toLocaleString() : ""}
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
                  onClick={() => {
                    setmostrarIndex(!mostrarIndex);
                    setmostrarDetalles(!mostrarDetalles);
                  }}
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
        fullWidth="md"
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
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: '#634A9E', color: 'white',
                "&:hover": { backgroundColor: '#6e52ae' },
              }}
              onClick={FormaEnvioDelete}
            >
              Eliminar
            </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#DAD8D8', color: 'black',
                "&:hover": { backgroundColor: '#BFBABA' },
              }}
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Card>

  );
}

export default FormaDeEnvioIndex;