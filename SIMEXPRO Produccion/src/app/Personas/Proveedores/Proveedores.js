
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

function ProveedoresIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigo, setCodigo] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fax, setFax] = useState("");
  const [correoelectronico, setCorreoElectronico] = useState("");

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

    //const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
    //tableRows[0].cells[1].textContent = localStorage.getItem('Masiso rey')
    //tableRows[0].cells[2].textContent = localStorage.getItem('Que crack que sos')
    //tableRows[1].cells[1].textContent = localStorage.getItem('Ombe trabaje')
    //tableRows[1].cells[2].textContent = localStorage.getItem('Muchachos escucharon el rempalago?')
  };

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

  const handleEdit = (id, nombre, contacto, telefono, codigo, ciudad, direccion, fax, correoelectronico) => {
    // Implementa la función para editar aquí
    setId(id);
    setNombre(nombre);
    setContacto(contacto);
    setTelefono(telefono);
    setCodigo(codigo);
    setCiudad(ciudad);
    setDireccion(direccion);
    setFax(fax);
    setCorreoElectronico(correoelectronico);
    MostrarCollapseEditar();
    handleClose();
  };

  const handleDetails = (id, nombre, contacto, telefono, codigo, ciudad, direccion, fax, correoelectronico) => {
    // Implementa la función para detalles aquí
    DetallesTabla(id, nombre, contacto, telefono, codigo, ciudad, direccion, fax, correoelectronico);
    MostrarCollapseDetalles();
    handleClose(id);
  };

  const handleDelete = () => {
    // Implementa la función para eliminar aquí
    handleClose();
  };

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultValues);
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultValues);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

   {/* Validaciones de la pantalla de crear*/ }
   const defaultValues = {
    nombre: '',
    contacto: '',
    telefono: '',
    codigo: '',
    ciudad: 0,
    direccion: '',
    fax: '',
    correoelectronico: '',
  }

  const accountSchema = yup.object().shape({
    nombre: yup.string().required(''),
    contacto: yup.string().required(''),
    telefono: yup.string().required(''),
    codigo: yup.string().required(''),
    ciudad: yup.string().required(''),
    direccion: yup.string().required(''),
    
  })
  
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(accountSchema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const ValidacionAgregar = (data) => {
    if (data.nombre != null) {
      if (data.nombre.trim() === "") {
        toast.error('Datos no ingresados correctamente.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      } else {
        toast.success('Datos ingresados correctamente.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
        setTimeout(() => {
          MostrarCollapseAgregar();
        }, 100); // Establece un pequeño retraso antes de llamar a MostrarCollapseAgregar
      }
    } else {
      toast.error('Datos no ingresados correctamente.', {
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
      if (data.nombre != null) {
        if (data.nombre.trim() === "") {
          toast.error('Datos no ingresados correctamente.', {
            theme: 'dark',
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        } else {
          toast.success('Datos ingresados correctamente.', {
            theme: 'dark',
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
          setTimeout(() => {
            MostrarCollapseAgregar();
          }, 100);
        }
      } else {
        toast.fire({
          icon: "error",
          title: "No se permiten campos vacios",
        });
      }
    };


      // {/*TOAST*/}
      // const Toast = Swal.mixin({
      //   toast: true,
      //   position: 'top-right',
      //   iconColor: 'red',
      //   width: 600,
      //   heigth: 300,
      //   customClass: {
      //     popup: 'colored-toast'
      //   },
      //   showConfirmButton: false,
      //   timer: 3000,
      //   timerProgressBar: true
      // })
    
      // const Toast2 = Swal.mixin({
      //   toast: true,
      //   position: 'top-right',
      //   iconColor: 'green',
      //   customClass: {
      //     popup: 'colored-toast'
      //   },
      //   showConfirmButton: false,
      //   timer: 3000,
      //   timerProgressBar: true
      // })
      
      {/* Validaciones de la pantalla de crear*/ }
      const [filas, setFilas] = React.useState(10);
    
      const handleChange = (event) => {
        setFilas(event.target.value);
      };
    
      const AgregarRegistro = () => {
        const formData = watch();
        ValidacionAgregar(formData); 
        handleSubmit(ValidacionAgregar)(); 
        reset(defaultValues);
      };
    
    {/* Columnas de la tabla */ }
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      },
      {
        title: 'Contacto',
        dataIndex: 'contacto',
        key: 'contacto',
        sorter: (a, b) => a.contacto.localeCompare(b.contacto),
      },
      {
        title: 'Telefono',
        dataIndex: 'telefono',
        key: 'telefono',
        sorter: (a, b) => a.telefono.localeCompare(b.telefono),
      },
      {
        title: 'Ciudad',
        dataIndex: 'ciudad',
        key: 'ciudad',
        sorter: (a, b) => a.ciudad.localeCompare(b.ciudad),
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
                <MenuItem onClick={() => handleEdit(params.id, params.nombre, params.contacto, params.telefono, params.codigo, params.ciudad, params.direccion, params.fax, params.correoelectronico)}>
                  <Icon>edit</Icon> Editar
                </MenuItem>
                <MenuItem onClick={() => handleDetails(params.id, params.nombre, params.contacto, params.telefono, params.codigo, params.ciudad, params.direccion, params.fax, params.correoelectronico)}>
                  <Icon>visibility</Icon> Detalles
                </MenuItem>
                <MenuItem onClick={() => DialogEliminar(params.id)}>
                  <Icon>delete</Icon> Eliminar
                </MenuItem>
              </Menu>
            </Stack>
          </div>
        ,
      },
    ];

    //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
    const EditarRegistro = () => {
    const formData = watch();
    formData.nombre = nombre;
    formData.contacto = contacto;
    formData.telefono = telefono;
    formData.codigo = codigo;
    formData.ciudad = ciudad;
    formData.direccion = direccion;
    formData.fax = fax;
    formData.correoelectronico = correoelectronico;
    ValidacionesEditar(formData);
    setTimeout(() => {
    reset(defaultValues);
    handleSubmit(ValidacionesEditar)();
    }, "250")
  };
  
    //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
    const CerrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultValues);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
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

  const[data, setData] = useState([])

  useEffect(() => {
    FetchDataProveedores();
  }, []);

  const FetchDataProveedores = async () => {
    try {
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };

      const url = 'https://simexpro.azurewebsites.net/api/Proveedores/Listar';
      const response = await axios.get(url, {
        headers: customHeaders,
      });
      console.log(response)
      const rows = response.data.map(item => {
        return {
          id: item.prov_Id,
          nombre: item.prov_NombreCompania,
          contacto: item.prov_NombreContacto,
          telefono: item.prov_Telefono,
          ciudad: item.prov_Ciudad,
        }
      });
      setData(rows);
    } catch (error) {
      console.log(error.message);
    }
  };

  //  {/* Datos de la tabla */ }
  //  const data = [];
  //  for (let i = 0; i < 50; ++i) {
  //    data.push({
  //      key: i.toString(),
  //      id: i.toString(),
  //      nombre: 'nombre ' + i,
  //      contacto: 'contacto ' + i,
  //      telefono: 'telefono ' + i,
  //      ciudad: 'ciudad' + i,
  //      // tabla: [
  //      //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
  //      //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
  //      //   // Add more rows to the nested table here...
  //      ],
  //    });
  //  }
  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
  };

  const VisibilidadTabla2 = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
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
            columns={columns}
            // expandable={{
            //   expandedRowRender: (record) => <Table columns={columns} dataSource={record.tabla} pagination={false} />,
            //   rowExpandable: (record) => record.name !== 'Not Expandable',
            // }}
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
      <Collapse in={mostrarAgregar}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
              </Typography>
            </Grid> 
            <Grid item xs={6} >
            <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Nombre de la compañia"
                      placeholder='Descripción de la compañia'
                      error={!!errors.nombre}
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="nombre"
                  control={control}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
             <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      defaultValue=" "
                      error={!!errors.contacto}
                        label="Nombre del contacto"
                        placeholder='Descripción del contacto'
                        InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="contacto"
                  control={control}
                />
              </div>
            </Grid> 
            <Grid item xs={6}>
              <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      defaultValue=" "
                      error={!!errors.telefono}
                        label="Telefono"
                        placeholder='Descripción del Telefono'
                        InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="telefono"
                  control={control}
                />
              </div>
            </Grid> 
            <Grid item xs={6}>
            <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      error={!!errors.codigo}
                      label="Codigo Postal"
                      placeholder='Descripción del codigo postal'
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="codigo"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth >
                  <InputLabel htmlFor="grouped-native-select">Ciudad</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                      {...field}
                        variant="outlined"
                        fullWidth
                        error={!!errors.ciudad}
                            style={{ borderRadius: '3px'}}
                            label="Ciudad"
                        >
                            <MenuItem value='1'>HONDURAS</MenuItem>
                            <MenuItem value='2'>ESTADOS UNIDOS</MenuItem>
                            <MenuItem value='3'>CHINA</MenuItem>                            
                        </Select>
                    )}
                    name="ciudad"
                    control={control}
                  />
              </FormControl>
          </Grid>

            <Grid item xs={6}>
            <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      error={!!errors.direccion}
                      label="Direccion Exacta"
                      placeholder='Descripcion de la direccion exacta'
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="direccion"
                  control={control}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
            <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Fax"
                      placeholder=''
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="fax"
                  control={control}
                />
              </div>
            </Grid>      
            <Grid item xs={6}>
            <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      label="Correo Electronico"
                      error={!!errors.correoelectronico}
                      placeholder=''
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="correoelectronico"
                  control={control}
                />
              </div>
            </Grid>  
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
              <Grid item xs={6} >
                <div className="mt-5 mb-16">
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Codigo"
                          variant="outlined"
                          error={!!errors.nombre}
                          fullWidth
                          InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                          value={nombre}
                        />
                      )}
                      name="nombre"
                      control={control}
                    />
                  </div>
                </Grid>
                <Grid item xs={6} >
                <div className="mt-5 mb-16">
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Contacto"
                          variant="outlined"
                          error={!!errors.contacto}
                          fullWidth
                          InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                          value={contacto}
                        />
                      )}
                      name="contacto"
                      control={control}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
              <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      defaultValue=" "
                      error={!!errors.telefono}
                      value={telefono}
                        label="Telefono"
                        placeholder='Descripción del Telefono'
                        InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="telefono"
                  control={control}
                />
              </div>
            </Grid> 
            <Grid item xs={6}>
            <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      error={!!errors.codigo}
                      value={codigo}
                      label="Codigo Postal"
                      placeholder='Descripción del codigo postal'
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="codigo"
                  control={control}
                />
              </div>
            </Grid> 
            <Grid item xs={6} style={{ marginTop: '10px' }}>
                <FormControl fullWidth >
                    <InputLabel htmlFor="grouped-native-select">Paises</InputLabel>
                    <Controller
                      render={({ field }) => (                                    
                        <Select
                        {...field}
                          variant="outlined"
                          fullWidth
                          error={!!errors.ciudad}
                          value={ciudad}
                              style={{ borderRadius: '3px'}}
                              label="País"
                          >
                              <MenuItem value='1'>Honduras</MenuItem>
                              <MenuItem value='2'>El Salvador</MenuItem>
                              <MenuItem value='3'>Estados Unidos</MenuItem>                                          
                          </Select>
                      )}
                      name="ciudad"
                      control={control}
                    />
                </FormControl>
            </Grid>
            
            <Grid item xs={6} style={{ marginTop: '30px' }}>
                <FormControl fullWidth >
                    <InputLabel htmlFor="grouped-native-select">Ciudad</InputLabel>
                    <Controller
                      render={({ field }) => (                        
                        <Select                        
                        {...field}
                          variant="outlined"
                          fullWidth
                          error={!!errors.ciudad}
                          value={ciudad}
                              style={{ borderRadius: '3px'}}
                              label="Ciudad"
                          >
                              <MenuItem value='1'>TEGUCIGALPA</MenuItem>
                              <MenuItem value='2'>PUERTO CORTÉS</MenuItem>
                              <MenuItem value='3'>LA CEIBA</MenuItem>                              
                          </Select>
                      )}
                      name="ciudad"
                      control={control}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={6}>
            <div className="mt-5 mb-16" style={{ marginTop: '20px', borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      error={!!errors.direccion}
                      value={direccion}
                      label="Dirección Exacta"
                      placeholder='Descripción de la dirección'
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="direccion"
                  control={control}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
            <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      error={!!errors.fax}
                      value={fax}
                      label="Fax"
                      placeholder='Descripción del fax'
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="fax"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
            <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      error={!!errors.correoelectronico}
                      value={correoelectronico}
                      label="Correo Electronico"
                      placeholder='Descripción del Email'
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="correoelectronico"
                  control={control}
                />
              </div>
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

    </Card>
  );
}

export default ProveedoresIndex;








