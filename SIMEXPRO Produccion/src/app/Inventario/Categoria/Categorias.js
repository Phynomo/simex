/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
  Autocomplete,
  Box,
  FormLabel,
  Divider,
  Chip
} from "@mui/material";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { height } from '@mui/system';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DownOutlined } from '@ant-design/icons';
import { keyBy, values } from 'lodash';
import { id } from 'date-fns/locale';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
//Imports tabla
import { Badge, Dropdown, Space, Table } from "antd";
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
//Import service
import CategoriasServices from './CategoriaService';
//Import ddls
import load_DDLs from "src/app/loadDDLs/Load_DDL";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
  ToastDefault,
} from "src/styles/toastsFunctions";

function CategoriaIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});

  //Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([])

  //Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  //Variable que guarda los datos de detalles
  const [DatosDetalles, setDatosDetalles] = useState({});


  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    CategoriaGetData();
  }, []);


  const DefaultCategoria = {
    id: "",
    categoria: "",
  };

  const schema = yup.object().shape({
    id: yup.string(),
    categoria: yup.string().trim().required(""),
  });


  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    DefaultCategoria,
    mode: 'all',
    resolver: yupResolver(schema),
  });

  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();

  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };


  const handleEdit = async (datos) => {
    handleClose(datos.cate_Id);
    MostrarCollapseEditar()
    setEditar(true);
    //insertar aca las variables necesarias en su formulario
    setValue("id", datos["cate_Id"]);
    setValue("categoria", datos["cate_Descripcion"]);

  };


  const handleDetails = (datos) => {
    setDatosDetalles(datos);
    MostrarCollapseDetalles();
    handleClose(datos.cate_Id);
  };

  //Constante para mostrar el collapse de agregar un registro
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(DefaultCategoria);
  };
  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(DefaultCategoria);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  const handleDelete = (id) => {
    DialogEliminar(id)
    handleClose(id);
  };


  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };


  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key
    },
    {
      title: 'Categoria',
      dataIndex: 'cate_Descripcion',
      key: 'cate_Descripcion',
      sorter: (a, b) => a.cate_Descripcion.localeCompare(b.cate_Descripcion),
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) => (
        <div key={params.cate_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.cate_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.cate_Id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.cate_Id}`}
              anchorEl={anchorEl[params.cate_Id]}
              keepMounted
              open={Boolean(anchorEl[params.cate_Id])}
              onClose={() => handleClose(params.cate_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  //Peticion para cargar datos de la tabla
  const CategoriaGetData = async () => {
    try {
      setDataTabla(await CategoriasServices.listar());
    } catch (error) {
      console.log(error.message);
    }
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los DefaultCategoria])
  const CerrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(DefaultCategoria);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };



  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ["key", "cate_Descripcion"];

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

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    reset(DefaultCategoria);
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);

  };

  //Peticion para crear un registro
  const CategoriaCreate = async () => {
    try {
      const response = await CategoriasServices.crear(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");
        CategoriaGetData();
        VisibilidadTabla();
        reset(DefaultCategoria);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }
  };

  // Peticion para editar un registro
  const CategoriaEdit = async () => {
    try {
      const response = await CategoriasServices.editar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha editado exitosamente");
        CategoriaGetData();
        CerrarEditar();
        reset(DefaultCategoria);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }
  };


  const GuardarCategoria = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        CategoriaCreate();
      } else {
        CategoriaEdit();
      }
    } else {
      ToastWarning("Completa todos los campos");
    }
  };


  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/xM7RJcZ/CATEGORIAS.png"
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
                MostrarCollapseAgregar();
                setEditar(false);
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
      </Collapse>


      {/* Tabla */}
      <Collapse in={mostrarIndex}>
        <div className='center' style={{ width: '95%', margin: 'auto' }}>

          <Table
            columns={columns}

            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas
              , className: "custom-pagination",
            }}

          />
        </div>
      </Collapse>
      {/* Tabla */}


      {/* Formulario Agregar */}
    <form onSubmit={handleSubmit((_data) => console.log(_data))}>
    <Collapse in={mostrarAdd}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip
                    label={editar ? "Editar Categoria" : "Agregar Categoria"}
                  />
                </Divider>
            </Grid>
            <Grid item xs={2}></Grid>
              <Grid item xs={8}>
              <FormLabel error={!!errors.categoria}>Categoria</FormLabel>
                <Controller render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.categoria}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                  name='categoria'
                  control={control} />
              </Grid>
              <Grid item xs={2}></Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                <Button
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  onClick={GuardarCategoria}
                  style={{ borderRadius: '10px', marginRight: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E', color: 'white',
                    "&:hover": { backgroundColor: '#6e52ae' },
                  }}
                  type='submit'
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
      {/* Formulario Agregar */}

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
            <Grid item xs={12}>
            <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip
                    label={editar ? "Editar Categoria" : "Agregar Categoria"}
                  />
                </Divider>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <FormLabel error={!!errors.categoria}>Categoria</FormLabel>
                <Controller render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.categoria}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                  name='categoria'
                  control={control} />
              </Grid>
            <Grid item xs={2}></Grid>

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
                onClick={GuardarCategoria}
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
                onClick={CerrarEditar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para el formulario de editar un registro fin*/}


      {/* Inicia del collapse Detalles */}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles de la Categoria" />
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
                    Id de la Categoria:
                  </Typography>
                  <Typography>{DatosDetalles["cate_Id"]}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de la Categoria:
                  </Typography>
                  <Typography>{DatosDetalles["cate_Descripcion"]}</Typography>
                </InputLabel>
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
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>
                      Accion
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>
                      Usuario
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>
                        date_range
                      </Icon>
                      Fecha y hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioCreacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["cate_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["cate_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioModificacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["cate_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["cate_FechaModificacion"]
                        ).toLocaleString()
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
                  onClick={() => {
                    CerrarDetalles();
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
      {/* Fin del Collapse Detalles */}


      {/* Modal de eliminar */}
      <Dialog
        open={Eliminar}
        fullWidth
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
              onClick={DialogEliminar}
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
      {/* Modal de eliminar */}
    </Card>
  );
}

export default CategoriaIndex;




