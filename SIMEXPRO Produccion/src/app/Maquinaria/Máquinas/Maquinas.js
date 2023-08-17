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
  Autocomplete,
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
import MaquinasServices from './MaquinasService';
// Import ddls
import load_DDLs from 'src/app/loadDDLs/Load_DDL';
// import Toast
import 'react-toastify/dist/ReactToastify.css';
import { ToastSuccess, ToastWarning, ToastError } from 'src/styles/toastsFunctions';

/* Campos del formulario */
const defaultMaquinasValues = {
  id: '', // id necesario para el editar
  maqu_Id: '',
  maqu_NumeroSerie: '',
  mmaq_Id: null, // para los campos que son ddl poner null
  modu_Id: null, // para los campos que son ddl poner null
  usua_UsuarioCreacion: '',
  maqu_FechaCreacion: '',
  usua_UsuarioModificacion: '',
  maqu_FechaModificacion: '',
  usua_UsuarioEliminacion: '',
  maqu_FechaEliminacion: '',
  maqu_Estado: '',
};

/* Esquema del fomulario (validaciones) */
// En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
  id: yup.string(),
  maqu_NumeroSerie: yup.string().trim().required(''),
  mmaq_Id: yup.string().trim().required(''),
  modu_Id: yup.string().trim().required(''),
});

function MaquinasIndex() {
  // Variables DDL
  const [Modelos_DDL, setModelos_DDL] = useState([]);
  const [Modulos_DDL, setModulos_DDL] = useState([]);

  // Cargado de las variables DDL
  async function ddls() {
    setModelos_DDL(await load_DDLs.ModelosMaquinas());
    setModulos_DDL(await load_DDLs.Modulos());
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
  const [DataTable, setDataTable] = useState([]);


  // Peticion para cargar datos de la tabla
  const MaquinasGetData = async () => {
    try {
      setDataTable(await MaquinasServices.listar());
    } catch (error) {
      console.log(error.message);
    }
  };


  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultMaquinasValues);
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
    setValue('maqu_Id', datos.maqu_Id);
    setValue('maqu_NumeroSerie', datos.maqu_NumeroSerie);
    setValue(
      'mmaq_Id',
      Modelos_DDL.find((Modelos_DDL) => Modelos_DDL.value === datos.mmaq_Id) // importante para cargar bien los ddl al editar
    );
    setValue(
      'modu_Id',
      Modulos_DDL.find((Modulos_DDL) => Modulos_DDL.value === datos.modu_Id) // importante para cargar bien los ddl al editar
    );
    handleClose(datos.maqu_Id);
  };

  // Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); // se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.maqu_Id);
  };

  // Handle delete en este caso no necesario (si quere mas info ir a la pantalla "TiposIdentidad")
  const handleDelete = (datos) => {
    // en caso de ocupar eliminar
    handleClose(datos.maqu_Id);
  };

  // useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    MaquinasGetData();
  }, []);

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
      title: 'N° Serie',
      dataIndex: 'maqu_NumeroSerie',
      key: 'maqu_NumeroSerie',
      sorter: (a, b) => a.maqu_NumeroSerie.localeCompare(b.maqu_NumeroSerie), // sorting para Letras
    },
    {
      title: 'Módulo',
      dataIndex: 'modu_Id',
      key: 'modu_Id',
      sorter: (a, b) => a.modu_Id.localeCompare(b.modu_Id), // sorting para Letras
    },
    {
      title: 'Modelo',
      dataIndex: 'mmaq_Id',
      key: 'mmaq_Id',
      sorter: (a, b) => a.mmaq_Id.localeCompare(b.mmaq_Id), // sorting para Letras
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) => (
        <div key={params.maqu_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.maqu_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.maqu_Id)}
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
              id={`menu-${params.maqu_Id}`}
              anchorEl={anchorEl[params.maqu_Id]}
              keepMounted
              open={Boolean(anchorEl[params.maqu_Id])}
              onClose={() => handleClose(params.maqu_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem>
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
  const camposToFilter = ['key', 'maqu_NumeroSerie', 'mmaq_Id', 'modu_Id'];

  // Constante que ayuda a filtrar el datatable
  const filteredRows = DataTable.filter((row) => {
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
    defaultMaquinasValues, // Campos del formulario
    mode: 'all',
    resolver: yupResolver(accountSchema), // Esquema del formulario
  });

  // Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  // Datos del formulario
  const datosWatch = watch();

  // Peticion para crear un registro
  const MaquinasCreate = async () => {
    try {
      const response = await MaquinasServices.crear(datosWatch);
      console.log(datosWatch);
      if (response.data.data.messageStatus == '1') {
        ToastSuccess('El registro se ha insertado exitosamente');
        MaquinasGetData();
        VisibilidadTabla();
        reset(defaultMaquinasValues);
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarning('El registro ya existe');
      }
    } catch (error) {
      console.log(error.message);
      ToastError('Error inesperado');
    }
  };

  // Peticion para editar un registro
  const MaquinasEdit = async () => {
    try {
      const response = await MaquinasServices.editar(datosWatch);
      if (response.data.data.messageStatus === '1') {
        ToastSuccess('El registro se ha editado exitosamente');
        MaquinasGetData();
        VisibilidadTabla();
        reset(defaultMaquinasValues);
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarning('El registro ya existe');
      }
    } catch (error) {
      console.log(error.message);
      ToastError('Error inesperado');
    }
  };
  // Controlador del formulario
  const GuardarPais = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        MaquinasCreate();
      } else {
        MaquinasEdit();
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
        image="https://i.ibb.co/86vkzPQ/MAQUINAS.png"
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
      <form onSubmit={handleSubmit((_data) => { })}>
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
                  <Chip label={editar ? 'Editar Maquina' : 'Agregar Maquina'} />
                </Divider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.maqu_NumeroSerie}>Número Serie</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        disabled={editar}
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 2, // Limitar a 2 caracteres
                        }}
                        error={!!errors.maqu_NumeroSerie}
                      />
                    )}
                    name="maqu_NumeroSerie"
                    control={control}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.mmaq_Id}>Modelo de Maquina</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="pais"
                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                        options={Modelos_DDL}
                        value={datosWatch.mmaq_Id ?? null}
                        onChange={(event, value) => {
                          setValue('mmaq_Id', value);
                        }}
                        renderInput={(params) => <TextField {...params} error={!!errors.mmaq_Id} />}
                      />
                    )}
                    name="mmaq_Id"
                    error={!!errors.mmaq_Id}
                    control={control}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.modu_Id}>Modulo</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="pais"
                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                        options={Modulos_DDL}
                        value={datosWatch.modu_Id ?? null}
                        onChange={(event, value) => {
                          setValue('modu_Id', value);
                        }}
                        renderInput={(params) => <TextField {...params} error={!!errors.modu_Id} />}
                      />
                    )}
                    name="modu_Id"
                    error={!!errors.modu_Id}
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
                <Chip label="Detalles del Maquina" />
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
                    Id del Maquina:
                  </Typography>
                  <Typography>{DatosDetalles.maqu_Id}</Typography>
                </InputLabel>
              </Grid>
              <Grid item xs={6} textAlign="center">
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                    Codigo del Maquina:
                  </Typography>
                  <Typography>{DatosDetalles.maqu_NumeroSerie}</Typography>
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
                    Nombre del Maquina:
                  </Typography>
                  <Typography>{DatosDetalles.mmaq_Id}</Typography>
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

export default MaquinasIndex;
