/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField, Box, Avatar } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';

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


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Visibility } from '@material-ui/icons';
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

import { DateTimePicker } from '@mui/x-date-pickers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultRevisionValues = {
  image: null,
  cantidad: '',
  fechaRevision: '',
  observaciones: '',
  codigoproceso: '',
  scrap: false,

};

const RevisionSchema = yup.object().shape({
  image: yup.string().required(''),
  cantidad: yup.string().required(''),
  fechaRevision: yup.string().nullable().required(''),
  observaciones: yup.string().required(''),
  codigoproceso: yup.string().required(''),
  scrap: yup.bool().required(''),

});

function Revision_de_Calidad_Index() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const [isObservacionesValid, setIsObservacionesValid] = useState(true);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [cate, setcate] = useState("");
  const [id, setid] = useState("");
  const [image, setImage] = useState(null);
  const [cantidad, setcantidad] = useState("");
  const [fechaRevision, setfechaRevision] = useState("");
  const [observaciones, setobservaciones] = useState("");
  const [codigoproceso, setcodigoproceso] = useState("");
  const [scrap, setscrap] = useState("");
  const fileInputRef = useRef(null);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const [anchorEl, setAnchorEl] = useState({});

  //Constante para el detalle de las pantallas
  const DetallesTabla = (rowId, codigoproceso, fechaRevision, cantidad, observaciones, scrap) => {
    setid(rowId);
    setcodigoproceso(codigoproceso);
    setfechaRevision(fechaRevision);
    setcantidad(cantidad);
    setobservaciones(observaciones);
    setscrap(scrap);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    } else {
      ToastWarningImagen();
    }
  };

  const ToastWarningImagen = () => {
    toast.warning("El archivo tiene que ser una imagen.",{
      theme: 'dark',
      //position: toast.POSITION.BOTTOM_RIGHT,
      style: {
        marginTop: '50px'
      },
      autoClose: 3000,
      closeOnClick: true
    });
  }

  const ToastWarningImagenSeleccionar = () => {
    toast.warning("La imagen es requerida.",{
      theme: 'dark',
      //position: toast.POSITION.BOTTOM_RIGHT,
      style: {
        marginTop: '50px'
      },
      autoClose: 3000,
      closeOnClick: true
    });
  }

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
  

    const handleEdit = (id, codigoproceso, fechaRevision, cantidad, observaciones, scrap) => {
      setcodigoproceso(codigoproceso);
      setfechaRevision(fechaRevision);
      setcantidad(cantidad);
      setobservaciones(observaciones);
      setscrap(scrap);
      setid(id);
      MostrarEditar();
      handleClose(id);
    };
  
    const handleDetails  = (id, codigoproceso, fechaRevision, cantidad, observaciones, scrap) => {
      DetallesTabla(id, codigoproceso, fechaRevision, cantidad, observaciones, scrap);
      MostrarDetalles();
      handleClose(id);
    };
  
    const handleDelete = (id) => {
      DialogEliminar();
      handleClose(id);
    };
  
    const [filas, setFilas] = React.useState(10);
  
    const handleChange = (event) => {
      setFilas(event.target.value);
    };
  
  
    /*Columnas de la tabla*/
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Código del proceso',
        dataIndex: 'codigoproceso',
        key: 'codigoproceso',
        sorter: (a, b) => a.codigoproceso.localeCompare(b.codigoproceso), //sorting para Letras
      },
      {
        title: 'Cantidad',
        dataIndex: 'cantidad',
        key: 'cantidad',
        sorter: (a, b) => a.cantidad.localeCompare(b.cantidad), //sorting para Letras
      },
      {
        title: 'Fecha de revisión',
        dataIndex: 'fechaRevision',
        key: 'fechaRevision',
        sorter: (a, b) => a.fechaRevision.localeCompare(b.fechaRevision), //sorting para Letras
      },
      {
        title: 'Acciones',
        key: 'operation',
        render: (params) =>
          <div key={params.id}>
            <Stack direction="row" spacing={1}>
              <Button
                aria-controls={`menu-${params.id}`}
                aria-haspopup="true"
                onClick={(e) => handleClick(e, params.id)}
                variant="contained"
                style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
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
                <MenuItem onClick={() => handleEdit(params.id, params.codigoproceso, params.cantidad, params.fechaRevision, params.observaciones, params.scrap, params.imagen)}>
                  <Icon>edit</Icon> Editar
                </MenuItem>
                <MenuItem onClick={() => handleDetails(params.id, params.codigoproceso, params.cantidad, params.fechaRevision, params.observaciones, params.scrap, params.imagen)}>
                  <Icon>visibility</Icon> Detalles
                </MenuItem>
                <MenuItem onClick={() => handleDelete(params.id)}>
                  <Icon>delete</Icon> Eliminar
                </MenuItem>
              </Menu>
            </Stack>
          </div>
        ,
      },
    ];
  
  
    {/* Validaciones de la pantalla de crear*/ }
   


  {/*Datos de la tabla*/  }
  const data = [];
  for (let i = 1; i < 30; ++i) {
    data.push({
      key: i.toString(),
      id: i.toString(),
      codigoproceso: 'BMW02832 ',
      cantidad: '80 ',
      fechaRevision: '10-10-2010',
    });
  }

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultRevisionValues);

  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultRevisionValues);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  // Cerrar un Editar
  const CerrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultRevisionValues);

  };

  // Cerrar un Detalles
  const CerrarDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    reset(defaultRevisionValues);

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


  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultRevisionValues,
    mode: 'all',
    resolver: yupResolver(RevisionSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (data) => {
    if (data.codigoproceso != null || data.cantidad != null || data.observaciones != null) {
      if (data.codigoproceso.trim() === '' || data.cantidad.trim() === '' || data.observaciones.trim() === '') {
        
        toast.error('Debe completar los campos requeridos.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      } else {

        VisibilidadTabla();
        toast.success('Datos ingresados correctamente.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });

      }
    } else {
       
      toast.error('Debe completar los campos requeridos.', {
        theme: 'dark',
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }
  };

   //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
   const ValidacionesEditar = (data) => {
    if (data.codigoproceso != null || data.cantidad != null || data.observaciones != null) {
      if (data.codigoproceso.trim() === '' || data.cantidad.trim() === '' || data.observaciones.trim() === '') {
        toast.error('Debe completar los campos requeridos.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      } else {
        MostrarEditar();
        toast.success('Datos ingresados correctamente.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      }
    } else {
      toast.error('Debe completar los campos requeridos.', {
        theme: 'dark',
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }
  };

  const GuardarRevision = () => {
    const formData = watch();
    onSubmit(formData);
    handleSubmit(onSubmit)();
    reset(defaultRevisionValues);
  };

  //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
  const EditarRegistro = () => {
    const formData = watch();
    formData.codigoproceso = codigoproceso;
    formData.cantidad = cantidad;
    formData.observaciones = observaciones;
    formData.fechaRevision = fechaRevision;
    formData.imagen = imagen;
    formData.scrap = scrap;
    ValidacionesEditar(formData);
    setTimeout(() => {
      reset(defaultRevisionValues);
      handleSubmit(ValidacionesEditar)();
    }, "250")
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
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <ToastContainer/>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/pwQbH4s/REVISI-N-DE-CALIDAD.png"
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
              onClick={VisibilidadTabla}
            >
              Nuevo
            </Button>
          </Stack>

          {/* Barra de Busqueda en la Tabla */}
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
            , className: 'decoration-white'
            }}
        />
        </div>
      </Collapse>


      {/* Formulario Agregar */}
      <Collapse in={mostrarAdd}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
          <Grid item xs={4}>
              <div className='little-profilePhynomo text-center'>
                <div className="pro-imgPhynomo" style={{ marginTop: "0", width: '300px', height: '300px', overflow: 'hidden' }}>
                  {image == null ? <img src={image} alt="user" /> : <img src={image} alt="uploaded image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />}
                </div>
                <button className="btn btn-pill btn-outline-light" type='button' onClick={() => fileInputRef.current.click()}>Seleccionar imagen</button>
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
              </div>
            </Grid>


            {/* Right column for all the TextFields */}
            <Grid item xs={8} style={{ marginTop: '30px' }}>
              <Grid container spacing={3}>
                {/* Left column for TextFields */}
                <Grid item xs={6}>
                <div className="mt-1 mb-16" style={{width: '305px'}}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      style={{ borderRadius: '10px'}}
                      {...field}
                      label="Código de proceso"
                      variant="outlined"
                      error={!!errors.codigoproceso}

                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="codigoproceso"
                  control={control}
                />
              </div>

              <div className="mt-1 mb-16" style={{width: '305px'}}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      style={{ borderRadius: '10px'}}
                      {...field}
                      label="Cantidad"
                      variant="outlined"
                      error={!!errors.cantidad}
                      type='number'
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="cantidad"
                  control={control}
                />
              </div>

              <div className="mt-1 mb-16" style={{width: '305px'}}>
            
                <Controller
                  name="fechaRevision"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <DateTimePicker
                    value={value}
                      onChange={onChange}
                      required
                      label='Fecha de revisión'
                      renderInput={(_props) => (
                        <TextField
                          className="w-full"
                          {..._props}
                          onBlur={onBlur}
                          error={!!errors.fechaRevision}
                        />
                      )}
                      className="w-full"
                    />
                  )}
                />
              </div>

                </Grid>

                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={<Switch sx={{ '&.Mui-checked': { color: '#634A9E' } }} />}
                      label="SCRAP"
                      labelPlacement="top"
                    />
                  </FormControl>
                </Grid>

              </Grid>

              <Grid item xs={12}>
                
              <div className="mt-1 mb-16" style={{width: '600px'}}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      style={{ borderRadius: '10px'}}
                      {...field}
                      label="Observaciones"
                      variant="outlined"
                      error={!!errors.observaciones}

                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="observaciones"
                  control={control}
                />
              </div>
              </Grid>


            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
              <Button
                startIcon={<Icon>check</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E', color: 'white',
                  "&:hover": { backgroundColor: '#6e52ae' },
                }}
                onClick={GuardarRevision}
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
           
          <Grid item xs={4}>
              <div className='little-profilePhynomo text-center'>
                <div className="pro-imgPhynomo" style={{ marginTop: "0", width: '300px', height: '300px', overflow: 'hidden' }}>
                  {image == null ? <img src={image} alt="user" /> : <img src={image} alt="uploaded image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />}
                </div>
                <button className="btn btn-pill btn-outline-light" type='button' onClick={() => fileInputRef.current.click()}>Seleccionar imagen</button>
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
              </div>
            </Grid>


            {/* Right column for all the TextFields */}
            <Grid item xs={8} style={{ marginTop: '30px' }}>
              <Grid container spacing={3}>
                {/* Left column for TextFields */}
                <Grid item xs={6}>
                <div className="mt-1 mb-16" style={{width: '305px'}}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      style={{ borderRadius: '10px'}}
                      {...field}
                      label="Código de proceso"
                      variant="outlined"
                      error={!!errors.codigoproceso}
                      value={codigoproceso}
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="codigoproceso"
                  control={control}
                />
              </div>

              <div className="mt-1 mb-16" style={{width: '305px'}}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      style={{ borderRadius: '10px'}}
                      {...field}
                      label="Cantidad"
                      variant="outlined"
                      error={!!errors.cantidad}
                      value={cantidad}
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="cantidad"
                  control={control}
                />
              </div>

              <div className="mt-1 mb-16" style={{width: '305px'}}>
            
                <Controller
                  name="fechaRevision"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <DateTimePicker
                    value={value}
                      onChange={onChange}
                      required
                      label='Fecha de revisión'
                      renderInput={(_props) => (
                        <TextField
                          className="w-full"
                          {..._props}
                          onBlur={onBlur}
                          error={!!errors.fechaRevision}
                        />
                      )}
                      className="w-full"
                    />
                  )}
                />
              </div>

                </Grid>

                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={<Switch sx={{ '&.Mui-checked': { color: '#634A9E' } }} />}
                      label="SCRAP"
                      labelPlacement="top"
                    />
                  </FormControl>
                </Grid>

              </Grid>

              <Grid item xs={12}>
                
              <div className="mt-1 mb-16" style={{width: '600px'}}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      style={{ borderRadius: '10px'}}
                      {...field}
                      label="Observaciones"
                      variant="outlined"
                      error={!!errors.observaciones}

                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="observaciones"
                  control={control}
                />
              </div>
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
                onClick={CerrarEditar}
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
              <h2>Detalles de la Categoría</h2>   
              </Grid>   
              <Grid item xs={12}>   
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Revisión Id:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                    <br></br> 
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Código de proceso revisado:
                      </Typography>
                      <Typography>{codigoproceso}</Typography>
                    </InputLabel>
                    <br></br> 
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Cantidad:
                      </Typography>
                      <Typography>{cantidad}</Typography>
                    </InputLabel>
                    <br></br> 
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Fecha de revisión:
                      </Typography>
                      <Typography>{fechaRevision}</Typography>
                    </InputLabel>
                    <br></br> 
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Observaciones:
                      </Typography>
                      <Typography>{observaciones}</Typography>
                    </InputLabel>
                  </Box>
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
                            <td style={tableCellStyle}>Usuario Creación</td>
                            <td style={tableCellStyle}>00/00/0000</td>
                          </tr>
                          <tr style={tableRowStyle}>
                            <td style={tableCellStyle}>
                              <strong>Modificación</strong>
                            </td>
                            <td style={tableCellStyle}>Usuario Modificación</td>
                            <td style={tableCellStyle}>00/00/0000</td>
                          </tr>
                        </tbody>
                      </table>
                      </Grid> 
              <br></br>
              <Grid item xs={12}>    
              <div className="card-footer">
                <Button
                  variant="contained"
                  onClick={CerrarDetalles}
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


      {/* Dialog eliminar */}
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
      {/* Dialog eliminar */}
      <ToastContainer/>
    </Card>
  );
}

export default Revision_de_Calidad_Index;



