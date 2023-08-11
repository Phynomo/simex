

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
  Divider,
  Chip,
  CircularProgress,
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
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { height } from '@mui/system';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

import "src/styles/custom-pagination.css";

import provinciasService from './ProvinciasService';

import PaisDDl from 'src/app/CargarDDLs/PaisDDL';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const loadingIcon =
  <>
    <Grid container spacing={2} display={"flex"} justifyContent={"center"} alignContent={"center"}>
      <Grid item xs={12}>
        <CircularProgress style={{color: '#634a9e'}}/>
      </Grid>
      <Grid item xs={12}>
        Cargando...
      </Grid>
    </Grid>
  </>;

//toasts
//Exitoso
const toastSuccess = (message) => {
  toast.success(message, {
    theme: 'dark',
    style: {
      //Color gris oscuro
      // backgroundColor: '#282c34' 
      //Color del menu
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}
//Advertencia
const toastWarning = (message) => {
  toast.warning(message, {
    theme: 'dark',
    style: {
      //Color gris oscuro
      // backgroundColor: '#282c34' 
      //Color del menu
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}
//Error
const toastError = (message) => {
  toast.error(message, {
    theme: 'dark',
    style: {
      //Color gris oscuro
      // backgroundColor: '#282c34' 
      //Color del menu
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}
//default
const toastDefault = (message) => {
  toast(message, {
    theme: 'dark',
    style: {
      //Color gris oscuro
      // backgroundColor: '#282c34' 
      //Color del menu
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}


{/* Validaciones de la pantalla de crear*/ }
const defaultAccountValues = {
  id: '',
  prov_Codigo: '',
  pais: null,
  prov_Nombre: ''
}

const accountSchema = yup.object().shape({
  id: yup.string(),
  prov_Codigo: yup.string().required(''),
  pais: yup.object().required(''),
  prov_Nombre: yup.string().required(''),

})

const iconStyle = {
  marginRight: "5px",
  verticalAlign: "middle",
  color: "#634a9e",
};

const tableRowStyle = {
  "&:hover": {
    backgroundColor: "coral",
  },
};

const tableCellStyle = {
  verticalAlign: "middle",
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tableHeaderStyle = {
  verticalAlign: "middle",
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  backgroundColor: "#f2f2f2",
};

function ProvinciasIndex() {
  const paisDdl = PaisDDl();

  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});
  const [Eliminar, setEliminar] = useState(false);
  const [editar, setEditar] = useState(false);


  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const [anchorEl, setAnchorEl] = useState({});

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

  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    setValue('id', datos['pvin_Id']);
    setValue('prov_Nombre', datos['pvin_Nombre']);
    setValue('pais', paisDdl.find(paisDdl => paisDdl.value === datos['pais_Id']))
    setValue('prov_Codigo', datos['pvin_Codigo']);
    handleClose(datos.pvin_Id);
  };


  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.pvin_Id);
  };

  const handleDelete = (datos) => {
    // Lógica para manejar la eliminación de la fila con el ID proporcionado
    handleClose(datos.pvin_Id);
  };

  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'pvin_Id',
      key: 'pvin_Id',
      sorter: (a, b) => a.pvin_Id - b.pvin_Id, //sorting para Numeros
    },
    {
      title: 'Codigo',
      dataIndex: 'pvin_Codigo',
      key: 'pvin_Codigo',
      sorter: (a, b) => a.pvin_Codigo.localeCompare(b.pvin_Codigo), //sorting para Letras
    },
    {
      title: 'Nombre',
      dataIndex: 'pvin_Nombre',
      key: 'pvin_Nombre',
      sorter: (a, b) => a.pvin_Nombre.localeCompare(b.pvin_Nombre), //sorting para Letras
    },
    {
      title: 'País',
      dataIndex: 'pais_Nombre',
      key: 'pais_Nombre',
      sorter: (a, b) => a.pais_Nombre.localeCompare(b.pais_Nombre), //sorting para Letras
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) =>
        <div key={params.pvin_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.pvin_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.pvin_Id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.pvin_Id}`}
              anchorEl={anchorEl[params.pvin_Id]}
              keepMounted
              open={Boolean(anchorEl[params.pvin_Id])}
              onClose={() => handleClose(params.pvin_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon> Detalles
              </MenuItem>
              {/* <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem> */}
            </Menu>
          </Stack>
        </div>
      ,
    },
  ];


  {/* Datos de la tabla */ }
  const [data, setData] = useState([]);

  const provinciasGetData = async () => {
    try {
      setData(await provinciasService.listar())
    } catch (error) {
      console.log(error.message);
    }
  };

  const provinciasCreate = async () => {
    try {
      const response = (await provinciasService.crear(datosWatch))
      if (response.data.data.messageStatus == '1') {
        toastSuccess('El registro se ha insertado exitosamente')
        provinciasGetData();
        VisibilidadTabla()
        reset(defaultAccountValues)
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        toastWarning('El registro ya existe')
      }
    } catch (error) {
      console.log(error.message);
      toastError('Error inesperado')
    }
  };

  const provinciasEdit = async () => {
    try {
      const response = (await provinciasService.editar(datosWatch))
      if (response.data.data.messageStatus == '1') {
        toastSuccess('El registro se ha editado exitosamente')
        provinciasGetData();
        VisibilidadTabla()
        reset(defaultAccountValues)
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        toastWarning('El registro ya existe')
      }
    } catch (error) {
      console.log(error.message);
      toastError('Error inesperado')
    }
  };

  useEffect(() => {
    provinciasGetData();
  }, [])

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultAccountValues);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );




  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    defaultAccountValues,
    mode: 'all',
    resolver: yupResolver(accountSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const datosWatch = watch();

  const GuardarProvincia = () => {
    if (isValid) {
      if (!editar) {
        provinciasCreate()
      } else {
        provinciasEdit()
      }
    } else {
      toastWarning('Completa todos los campos')
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/wBVHDDW/PROVINCIAS.png"
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
      </Collapse>

      {/* Tabla */}
      <Collapse in={mostrarIndex}>
        <div className='center' style={{ width: '95%', margin: 'auto' }}>

          <Table
            columns={columns}
            dataSource={filteredRows}
            size="small"
            locale={{ emptyText: loadingIcon }}
            pagination={{
              pageSize: filas,
              hideOnSinglePage: true,
              showSizeChanger: false,
              className: 'custom-pagination'
            }}
          />

        </div>
      </Collapse>


      {/* Formulario Agregar */}

      <form onSubmit={handleSubmit((_data) => { })}>
        <Collapse in={mostrarAdd}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip label={editar ? "Editar provincia" : "Agregar provincia"} />
                </Divider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.pais}>País</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="pais"
                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                        options={paisDdl}
                        value={datosWatch.pais ?? null}
                        onChange={(event, value) => {
                          setValue('pais', value);
                        }}
                        renderInput={(params) => <TextField {...params} error={!!errors.pais} />}
                      />
                    )}
                    name="pais"
                    error={!!errors.pais}
                    control={control}
                  />
                </FormControl>
              </Grid>


              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.prov_Codigo}>Codigo</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errors.prov_Codigo}
                      ></TextField>
                    )}
                    name="prov_Codigo"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.prov_Nombre}>Nombre</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errors.prov_Nombre}
                      ></TextField>
                    )}
                    name="prov_Nombre"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>


              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                <Button
                  type='submit'
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px', marginRight: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E', color: 'white',
                    "&:hover": { backgroundColor: '#6e52ae' },
                  }}
                  onClick={GuardarProvincia}
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
                // onClick={() => {console.log(datosWatch)}}
                >
                  Cancelar
                </Button>
              </Grid>

            </Grid>
          </CardContent>
        </Collapse>
      </form>


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

      {/* Collapse para mostrar los detalles de un registro inicio*/}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: '30px' }}>
              <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                <Chip label="Detalles de la provincia" />
              </Divider>
            </Grid>


            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", marginBottom: '40px' }}>
              <Box sx={{ flex: 1, textAlign: "center", }} >
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id de la provincia:
                  </Typography>
                  <Typography>{DatosDetalles['pvin_Id']}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre de la provincia:
                  </Typography>
                  <Typography>{DatosDetalles['pvin_Nombre']}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", marginBottom: '40px' }}>
              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Codigo de la provincia:
                  </Typography>
                  <Typography>{DatosDetalles['pvin_Codigo']}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    País de la provincia:
                  </Typography>
                  <Typography>{DatosDetalles['pais_Nombre']}</Typography>
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
                    <td style={tableCellStyle}>{DatosDetalles['usuarioCreacionNombre']}</td>
                    <td style={tableCellStyle}>
                      {DatosDetalles['pvin_FechaCreacion']
                        ? new Date(DatosDetalles['pvin_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{DatosDetalles['usuarioModificadorNombre']}</td>
                    <td style={tableCellStyle}>
                      {DatosDetalles['pvin_FechaModificacion']
                        ? new Date(DatosDetalles['pvin_FechaModificacion']).toLocaleString()
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


    </Card>
  );
}

export default ProvinciasIndex;





