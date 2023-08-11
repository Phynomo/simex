
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
  FormLabel,
  Autocomplete,
  Divider,
  Chip
} from "@mui/material";
import React, { useEffect } from 'react'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
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
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CiudadesIndex from 'src/app/Ubicaciones/Ciudades/Ciudades';
import proveedoresService from './ProveedoresService';
import "src/styles/custom-pagination.css";

function ProveedoresIndex() {
  const [anchorEl, setAnchorEl] = useState({});
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(null);
  const [editing, setEditing] = useState(false);
  const [datosDetalles, setDatosDetalles] = useState([]);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [usuaC, setUsuaC] = useState('Usuario no encontrado')
  const [usuaM, setUsuaM] = useState('Usuario no encontrado')

  const DetallesTabla = (rowId, nombre, contacto, telefono, codigo, ciudad, direccion, fax, correoelectronico) => {
    setId(rowId);
    setNombre(nombre);
    setContacto(contacto);
    setTelefono(telefono);
    setCodigo(codigo);
    setCiudad(ciudad);
    setDireccion(direccion);
    setFax(fax);
    setCorreoElectronico(correoelectronico);
  };

  const DialogEliminar = (data) => {
    setEliminar(data);
  };

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

  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.prov_Id);
    try {
      setUsuaC(usuarios.find(usuarios => usuarios.value === datosDetalles['usua_UsuarioCreacion']).usua_Nombre)
      setUsuaM(usuarios.find(usuarios => usuarios.value === datosDetalles['usua_UsuarioModificacion']).usua_Nombre)
    } catch {

    }
  };

  const handleDelete = () => {
    proveedoresService.eliminar(Eliminar)
    handleClose(Eliminar.prov_Id);
    DialogEliminar()
    setTimeout(() => {
      proveedoresGet()
    }, 500);
  };

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const MostrarCollapseAgregar = () => {
    setEditing(false)
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultValues);
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'prov_Id',
      key: 'prov_Id',
      sorter: (a, b) => a.prov_Id - b.prov_Id
    },
    {
      title: 'Nombre',
      dataIndex: 'prov_NombreCompania',
      key: 'prov_NombreCompania',
      sorter: (a, b) => a.prov_NombreCompania.localeCompare(b.prov_NombreCompania),
    },
    {
      title: 'Contacto',
      dataIndex: 'prov_NombreContacto',
      key: 'prov_NombreContacto',
      sorter: (a, b) => a.prov_NombreContacto.localeCompare(b.prov_NombreContacto),
    },
    {
      title: 'Telefono',
      dataIndex: 'prov_Telefono',
      key: 'prov_Telefono',
      sorter: (a, b) => a.prov_Telefono.localeCompare(b.prov_Telefono),
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) =>
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.prov_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.prov_Id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.prov_Id}`}
              anchorEl={anchorEl[params.prov_Id]}
              keepMounted
              open={Boolean(anchorEl[params.prov_Id])}
              onClose={() => handleClose(params.prov_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon> Detalles
              </MenuItem>
              <MenuItem onClick={() => DialogEliminar(params)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ,
    },
  ];

  {/* Validaciones de la pantalla de crear*/ }
  const defaultValues = {
    id: '',
    nombre: '',
    contacto: '',
    telefono: '',
    codigo: '',
    ciudad: null,
    direccion: '',
    fax: '',
    correoelectronico: '',
  }

  const accountSchema = yup.object().shape({
    nombre: yup.string(),
    nombre: yup.string().required(''),
    contacto: yup.string().required(''),
    telefono: yup.string().required(''),
    codigo: yup.string().required(''),
    ciudad: yup.object().required(''),
    direccion: yup.string().required(''),
    correoelectronico: yup.string().required('')
  })

  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(accountSchema),
  });

  const modelo = watch()

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const handleEdit = (data) => {
    reset(defaultValues)
    setEditing(true)
    setValue('id', data.prov_Id)
    setValue('nombre', data.prov_NombreCompania)
    setValue('telefono', data.prov_Telefono)
    setValue('contacto', data.prov_NombreContacto)
    setValue('codigo', data.prov_CodigoPostal)
    setValue('ciudad', cuidades.find(cuidades => cuidades.value === data.prov_Ciudad))
    setValue('direccion', data.prov_DireccionExacta)
    setValue('correoelectronico', data.prov_CorreoElectronico)
    setValue('fax', data.prov_Fax)
    MostrarCollapseEditar();
    handleClose(data.prov_Id);
  };


  {/* Validaciones de la pantalla de crear*/ }
  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const AgregarRegistro = async () => {
    const formData = watch();

    if (!editing) {

      if (isValid) {
        const response = await proveedoresService.crear(formData)
        if (response.data.data.messageStatus == 1) {
          setTimeout(() => {
            proveedoresGet()
          }, 500)
          reset(defaultValues)
          MostrarCollapseAgregar(!mostrarAgregar)
          toast.success('Datos ingresados correctamente', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        } else if (response.data.data.messageStatus.includes("duplicate")) {
          toast.warning('Ese registro ya existe.', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        } else {
          toast.error('Ha ocurrido un error.', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        }
      } else {
        console.log('entra aqui?')
        toast.warning('Hay campos vacios.', {
          theme: 'dark',
          //  position: toast.POSITION.BOTTOM_RIGHT
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      }

    } else {

      if (isValid) {
        const response = await proveedoresService.editar(formData)
        if (response.data.data.messageStatus == 1) {
          setTimeout(() => {
            proveedoresGet()
          }, 500)
          reset(defaultValues)
          MostrarCollapseAgregar(!mostrarAgregar)
          toast.success('Datos ingresados correctamente', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        } else if (response.data.data.messageStatus.includes("duplicate")) {
          toast.warning('Ese registro ya existe.', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        } else {
          toast.error('Ha ocurrido un error.', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        }
      } else {
        console.log('entra aqui?')
        toast.warning('Hay campos vacios.', {
          theme: 'dark',
          //  position: toast.POSITION.BOTTOM_RIGHT
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      }

    }
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultValues);
  };

  const [data, setData] = useState([])
  const [cuidades, setCuidades] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [cuidad, setCuidad] = useState({ value: 0, label: '' },)

  const proveedoresGet = async () => {
    try {
      setData(await proveedoresService.listar())
    } catch (error) {
      console.log(error.message);
    }
  };

  const cuidaddlGet = async () => {
    try {
      setCuidades(await proveedoresService.cuidadddl())
    } catch (error) {
      console.log(error.message);
    }
  };

  const usuariosGet = async () => {
    try {
      setUsuarios(await proveedoresService.listarUsuarios())
      console.log(usuarios)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    proveedoresGet();
    cuidaddlGet();
    usuariosGet();
  }, []);


  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setEditing(false)
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultValues)
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

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <ToastContainer />
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/JxTYhwv/PROVEEDORES.png"
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
              onClick={MostrarCollapseAgregar}
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
            locale={{
              triggerDesc: 'Ordenar descendente',
              triggerAsc: 'Ordenar ascendente',
              cancelSort: 'Cancelar'
            }}
            columns={columns}
            // expandable={{
            //   expandedRowRender: (record) => <Table columns={columns} dataSource={record.tabla} pagination={false} />,
            //   rowExpandable: (record) => record.name !== 'Not Expandable',
            // }}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: 'custom-pagination'
            }}

          />
        </div>
      </Collapse>

      {/* Formulario Agregar */}
      <form onSubmit={handleSubmit((_data) => { })}>
        <Collapse in={mostrarAgregar}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <FormControl fullWidth>
                  <FormLabel id="group-label">Nombre</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        placeholder=''
                        error={!!errors.nombre}
                        InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                      />
                    )}
                    name="nombre"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Telefono</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        defaultValue=""
                        error={!!errors.telefono}
                        placeholder=''
                        InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                      />
                    )}
                    name="telefono"
                    control={control}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Nombre del contacto</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        defaultValue=""
                        error={!!errors.contacto}
                        placeholder=''
                        InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                      />
                    )}
                    name="contacto"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Codigo Postal</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        error={!!errors.codigo}
                        placeholder=''
                        InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                      />
                    )}
                    name="codigo"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth >
                  <FormLabel id="group-label">Ciudad</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="ciudad"
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        options={cuidades}
                        value={modelo['ciudad']}
                        onChange={(event, value) => { value ? setValue('ciudad', value) : setValue('ciudad', '') }}
                        renderInput={(params) => <TextField {...params} error={!!errors.ciudad} InputLabelProps={{ shrink: true }} />}
                      />
                    )}
                    name="ciudad"
                    error={!!errors.ciudad}
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Direccion Exacta</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        error={!!errors.direccion}
                        placeholder=''
                        InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                      />
                    )}
                    name="direccion"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id='group-label'>Correo Electronico</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        error={!!errors.correoelectronico}
                        placeholder=''
                        InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                      />
                    )}
                    name="correoelectronico"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id='group-label'>Fax</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant="outlined"
                        fullWidth
                        placeholder=''
                        InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                      />
                    )}
                    name="fax"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                <Button
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  type='submit'
                  style={{ borderRadius: '10px', marginRight: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E', color: 'white',
                    "&:hover": { backgroundColor: '#6e52ae' },
                  }}
                  onClick={AgregarRegistro}
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
                  onClick={MostrarCollapseAgregar}
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
              onClick={handleDelete}
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
                <Chip label="Detalles del Proveedor" />
              </Divider>
            </Grid>


            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", marginBottom: '40px' }}>

              <Grid item xs={4}>
                <Box sx={{ textAlign: "center", }} >
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Id del Proveedor:
                    </Typography>
                    <Typography>{datosDetalles['prov_Id']}</Typography>
                  </InputLabel>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ textAlign: "center", }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre del Proveedor:
                    </Typography>
                    <Typography>{datosDetalles['prov_NombreCompania']}</Typography>
                  </InputLabel>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ textAlign: "center", }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Contacto del Proveedor:
                    </Typography>
                    <Typography>{datosDetalles['prov_NombreContacto']}</Typography>
                  </InputLabel>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ textAlign: "center", }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Telefono del proveedor:
                    </Typography>
                    <Typography>{datosDetalles['prov_Telefono']}</Typography>
                  </InputLabel>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ textAlign: "center", }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Codigo Postal:
                    </Typography>
                    <Typography>{datosDetalles['prov_CodigoPostal']}</Typography>
                  </InputLabel>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ textAlign: "center", }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Direccion exacta del Proveedor:
                    </Typography>
                    <Typography>{datosDetalles['prov_DireccionExacta']}</Typography>
                  </InputLabel>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ textAlign: "center", }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Correo electronico del Proveedor:
                    </Typography>
                    <Typography>{datosDetalles['prov_CorreoElectronico']}</Typography>
                  </InputLabel>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ textAlign: "center", }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Fax del Proveedor:
                    </Typography>
                    <Typography>{datosDetalles['prov_Fax']}</Typography>
                  </InputLabel>
                </Box>
              </Grid>
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
                    <td style={tableCellStyle}>{usuaC}</td>
                    <td style={tableCellStyle}>
                      {datosDetalles['pais_FechaCreacion']
                        ? new Date(datosDetalles['pais_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{usuaM}</td>
                    <td style={tableCellStyle}>
                      {datosDetalles['pais_FechaModificacion']
                        ? new Date(datosDetalles['pais_FechaModificacion']).toLocaleString()
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

export default ProveedoresIndex;








