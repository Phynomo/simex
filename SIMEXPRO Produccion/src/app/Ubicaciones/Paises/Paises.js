/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */
/* eslint-disable import/order */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Divider,
  Chip,
} from '@mui/material';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';

// Imports de validaciones
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Imports tabla
import { Table } from 'antd';
import LoadingIcon from 'src/styles/iconoCargaTabla';
import 'src/styles/custom-pagination.css';
// import tabla detalles
import estilosTablaDetalles from 'src/styles/tablaDetalles';
// Import service
import paisesService from './PaisesService';
// Import ddls
import load_DDLs from 'src/app/loadDDLs/Load_DDL';
// import Toast
import 'react-toastify/dist/ReactToastify.css';
import { ToastSuccess, ToastWarning, ToastError } from 'src/styles/toastsFunctions';

/* Campos del formulario */
const defaultPaisesValues = {
  id: '', // id necesario para el editar
  pais_Id: 0,
  pais_Codigo: '',
  pais_Nombre: '',
  usua_UsuarioCreacion: '',
  pais_FechaCreacion: '',
  usua_UsuarioModificacion: '',
  pais_FechaModificacion: '',
  usua_UsuarioEliminacion: '',
  pais_FechaEliminacion: '',
};

/* Esquema del fomulario (validaciones) */
// En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
  id: yup.string(),
  pais_Codigo: yup
    .string()
    .trim()
    .required('')
    .matches(/^[A-Z]{2}$/, ''),
  pais_Nombre: yup.string().trim().required(''),
});

function PaisesIndex() {
  // Variables DDL
  const [paises_DDL, setPaises_DDL] = useState([]);

  // Cargado de las variables DDL
  async function ddls() {
    setPaises_DDL(await load_DDLs.paises());
  }

  // variable para la barra de busqueda
  const [searchText, setSearchText] = useState('');

  // Variables para los collapse
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  // Variable donde se guardan los datos del detalle seleccionado
  const [DatosDetalles, setDatosDetalles] = useState({});

  // variable para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  // Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  // Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(10);

  // Variable que hace algo con el menu XD
  const [anchorEl, setAnchorEl] = useState({});

  /* Datos de la tabla */
  const [data, setData] = useState([]);

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultPaisesValues);
  };

  // Controlador del dialog(modal) eliminar
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  // Controlador del collapse detalles
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  // controlador de las fillas a mostrar
  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };

  // abre el menu al cual se le dio click
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  // Cierra el menu abierto
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  // Handle que inicia la funcion de editar
  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    // insertar aca las variables necesarias en su formulario
    setValue('pais_Id', datos.pais_Id);
    setValue('pais_Codigo', datos.pais_Codigo);
    setValue('pais_Nombre', datos.pais_Nombre);
    handleClose(datos.pais_Id);
  };

  // Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); // se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.pais_Id);
  };

  // Handle delete en este caso no necesario (si quere mas info ir a la pantalla "TiposIdentidad")
  const handleDelete = (datos) => {
    // en caso de ocupar eliminar
    handleClose(datos.pais_Id);
  };

  {
    /* Columnas de la tabla */
  }
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key, // sorting para Numeros
    },
    {
      title: 'Código',
      dataIndex: 'pais_Codigo',
      key: 'pais_Codigo',
      sorter: (a, b) => a.pais_Codigo.localeCompare(b.pais_Codigo), // sorting para Letras
    },
    {
      title: 'País',
      dataIndex: 'pais_Nombre',
      key: 'pais_Nombre',
      sorter: (a, b) => a.pais_Nombre.localeCompare(b.pais_Nombre), // sorting para Letras
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) => (
        <div key={params.pais_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.pais_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.pais_Id)}
              variant="contained"
              style={{
                borderRadius: '10px',
                backgroundColor: '#634A9E',
                color: 'white',
              }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.pais_Id}`}
              anchorEl={anchorEl[params.pais_Id]}
              keepMounted
              open={Boolean(anchorEl[params.pais_Id])}
              onClose={() => handleClose(params.pais_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              {/* <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem> */}
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  // Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ['key', 'pvin_Codigo', 'pvin_Nombre', 'pais_Nombre'];

  // Constante que ayuda a filtrar el datatable
  const filteredRows = data.filter((row) => {
    if (searchText === '') {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue =
          typeof value === 'number' ? value.toString() : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === 'number' ? searchText.toString() : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  });

  // Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    defaultPaisesValues, // Campos del formulario
    mode: 'all',
    resolver: yupResolver(accountSchema), // Esquema del formulario
  });

  // Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  // Datos del formulario
  const datosWatch = watch();

  // Peticion para cargar datos de la tabla
  const paisesGetData = async () => {
    try {
      setData(await paisesService.listar());
    } catch (error) {
      console.log(error.message);
    }
  };

  // Peticion para crear un registro
  const paisesCreate = async () => {
    try {
      const response = await paisesService.crear(datosWatch);
      console.log(datosWatch);
      if (response.data.data.messageStatus == '1') {
        ToastSuccess('El registro se ha insertado exitosamente');
        paisesGetData();
        VisibilidadTabla();
        reset(defaultPaisesValues);
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarning('El registro ya existe');
      }
    } catch (error) {
      console.log(error.message);
      ToastError('Error inesperado');
    }
  };

  // Peticion para editar un registro
  const paisesEdit = async () => {
    try {
      const response = await paisesService.editar(datosWatch);
      if (response.data.data.messageStatus === '1') {
        ToastSuccess('El registro se ha editado exitosamente');
        paisesGetData();
        VisibilidadTabla();
        reset(defaultPaisesValues);
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarning('El registro ya existe');
      }
    } catch (error) {
      console.log(error.message);
      ToastError('Error inesperado');
    }
  };

  // useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    paisesGetData();
  }, []);

  // Controlador del formulario
  const GuardarPais = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        paisesCreate();
      } else {
        paisesEdit();
      }
    } else {
      ToastWarning('Completa todos los campos');
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/TMsGt9m/PAISES-1.png"
        alt="Encabezado de la carta"
      />
      {/* Inicio del Collapse incial (Tabla/Index) */}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {/* Botón de Nuevo */}
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#634A9E',
                color: 'white',
                '&:hover': { backgroundColor: '#6e52ae' },
              }}
              onClick={() => {
                VisibilidadTabla();
                setEditar(false);
              }}
            >
              Nuevo
            </Button>
          </Stack>

          {/* Filtros de la tabla (Filas/Buscar) */}
          <Stack direction="row" spacing={1}>
            <label className="mt-8">Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                onChange={handleChangeFilas}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            {/* Barra de Busqueda en la Tabla */}
            <TextField
              style={{ borderRadius: '10px' }}
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
          </Stack>
        </CardContent>

        {/* Declaracion de la tabla */}
        <div className="center" style={{ width: '95%', margin: 'auto' }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            size="small"
            locale={{
              triggerDesc: 'Ordenar descendente',
              triggerAsc: 'Ordenar ascendente',
              cancelSort: 'Cancelar',
              emptyText: LoadingIcon(),
            }}
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: 'custom-pagination',
            }}
          />
        </div>
      </Collapse>
      {/* Fin del Collapse incial (Tabla/Index) */}

      {/* Inicio del Formulario */}
      <form onSubmit={handleSubmit((_data) => {})}>
        <Collapse in={mostrarAdd}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip label={editar ? 'Editar País' : 'Agregar País'} />
                </Divider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.pais_Codigo}>Código del País</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        disabled={editar}
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 2, // Limitar a 2 caracteres
                        }}
                        error={!!errors.pais_Codigo}
                      />
                    )}
                    name="pais_Codigo"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.pais_Nombre}>Nombre del País</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.pais_Nombre}
                      />
                    )}
                    name="pais_Nombre"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'right',
                }}
              >
                <Button
                  type="submit"
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px', marginRight: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E',
                    color: 'white',
                    '&:hover': { backgroundColor: '#6e52ae' },
                  }}
                  onClick={GuardarPais}
                >
                  {editar ? 'Editar' : 'Guardar'}
                </Button>

                <Button
                  startIcon={<Icon>close</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px' }}
                  sx={{
                    backgroundColor: '#DAD8D8',
                    color: 'black',
                    '&:hover': { backgroundColor: '#BFBABA' },
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
      {/* Fin del Formulario */}

      {/* Inicia del Dialog(Modal) Eliminar */}
      <Dialog
        open={Eliminar}
        fullWidth="md"
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmación de Eliminación</DialogTitle>
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
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'right',
            }}
          >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: '#634A9E',
                color: 'white',
                '&:hover': { backgroundColor: '#6e52ae' },
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
                backgroundColor: '#DAD8D8',
                color: 'black',
                '&:hover': { backgroundColor: '#BFBABA' },
              }}
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* Fin del Dialog(Modal) Eliminar */}

      {/* Inicia del collapse Detalles */}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-center',
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Divider style={{ marginBottom: '10px' }}>
                <Chip label="Detalles del País" />
              </Divider>
            </Grid>

            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              style={{ marginBottom: '40px' }}
            >
              <Grid item xs={6} textAlign="center">
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                    Id del País:
                  </Typography>
                  <Typography>{DatosDetalles.pais_Id}</Typography>
                </InputLabel>
              </Grid>
              <Grid item xs={6} textAlign="center">
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                    Codigo del País:
                  </Typography>
                  <Typography>{DatosDetalles.pais_Codigo}</Typography>
                </InputLabel>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              style={{ marginBottom: '40px' }}
            >
              <Grid item xs={6} textAlign="center">
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                    Nombre del País:
                  </Typography>
                  <Typography>{DatosDetalles.pais_Nombre}</Typography>
                </InputLabel>
              </Grid>
            </Grid>
            <Grid item xs={6} textAlign="center" />

            <Grid item xs={12}>
              <table id="detallesTabla" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                      <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>
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
                      {DatosDetalles.usuarioCreacionNombre}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles.pais_FechaCreacion
                        ? new Date(DatosDetalles.pais_FechaCreacion).toLocaleString()
                        : ''}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles.usuarioModificadorNombre}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles.pais_FechaModificacion
                        ? new Date(DatosDetalles.pais_FechaModificacion).toLocaleString()
                        : ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <br />
            <Grid item xs={12}>
              <div className="card-footer">
                <Button
                  variant="contained"
                  onClick={() => {
                    CollapseDetalles();
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
    </Card>
  );
}

export default PaisesIndex;
