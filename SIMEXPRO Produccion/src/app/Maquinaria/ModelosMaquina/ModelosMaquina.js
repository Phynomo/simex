/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, ButtonBase, FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField, Avatar, } from "@mui/material";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState, useRef  } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

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

import FormLabel from "@mui/material/FormLabel";
import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';
import { setActive } from '@material-tailwind/react/components/Tabs/TabsContext';

function ModelosMaquinaIndex() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarEdit, setmostrarEdit] = useState(false);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [id, setid] = useState('');
  const [maquina, setmaquina] = useState('');
  const [mostrarDetails, setmostrarDetails] = useState(false);
  const [image, setImage] = useState(null);
  const [maquiImage, setmaquiImage] = useState('');
  const [message, setMessage] = useState();
  const [descripcion, setdescripcion] = useState('');
  const [marca, setmarca] = useState('');
  const [funcion, setfuncion] = useState('');
  const [anchorEl, setAnchorEl] = useState({});
  const fileInputRef = useRef(null);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante que filtra las imagenes por medio de un FileReader que
  // Basicamente proporciona una interfaz para leer de
  //forma asíncrona el contenido de un 
  //archivo desde una aplicación web
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

  //Constante para el detalle de las pantallas
  const DetallesTabla = (rowId, descripcion, marca, funcion, maquina) => {
    setid(rowId);
    setdescripcion(descripcion);
    setmarca(marca);
    setfuncion(funcion);
    setmaquina(maquina);
    //const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
    //tableRows[0].cells[1].textContent = localStorage.getItem('Masiso rey')
    //tableRows[0].cells[2].textContent = localStorage.getItem('Que crack que sos')
    //tableRows[1].cells[1].textContent = localStorage.getItem('Ombe trabaje')
    //tableRows[1].cells[2].textContent = localStorage.getItem('Muchachos escucharon el rempalago?')
  };


  const handleEdit = (id, descripcion, marca, funcion, maquina) => {
    setdescripcion(descripcion);
    setmarca(marca);
    setfuncion(funcion);
    setmaquina(maquina);
    setid(id);
    MostrarCollapseEditar();
    handleClose(id);
  };

  const handleDetails = (id, descripcion, marca, funcion, maquina) => {
    DetallesTabla(id, descripcion, marca, funcion, maquina);
    MostrarCollapseDetalles();
    handleClose(id);
  };

  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };

  const columns2 = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id, //sorting para Numeros
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      sorter: (a, b) => a.descripcion.localeCompare(b.rtn), //sorting para Letras
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      key: 'marca',
      sorter: (a, b) => a.marca.localeCompare(b.rtn), //sorting para Letras
    },
    {
      title: 'Función',
      dataIndex: 'funcion',
      key: 'funcion',
      sorter: (a, b) => a.funcion.localeCompare(b.rtn), //sorting para Letras
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
              <MenuItem onClick={() => handleEdit(params.id, params.marca, params.funcion, params.descripcion, params.maquina)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id, params.marca, params.funcion, params.descripcion, params.maquina)}>
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

  const data2 = [
    { id: '1', descripcion: 'Maquina de costura', marca: 'Sterling', funcion: 'Corte' },
    { id: '2', descripcion: 'Maquina de costura', marca: 'Sterling', funcion: 'Ensamblaje' },
    { id: '3', descripcion: 'Maquina de costura', marca: 'Sterling', funcion: 'Acabado' },
    { id: '4', descripcion: 'Maquina de costura', marca: 'Sterling', funcion: 'Bordado' },
  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  {/*Filtrado de datos*/ }
  const filteredRows = data2.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const defaultAccountValues = {
    descripcion: '',
    Select: '',
    funcion: '',
  }

  const accountSchema = yup.object().shape({
    descripcion: yup.string().required(),
    Select: yup.string().required(),
    funcion: yup.string().required()
  })

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultAccountValues);
  };

  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEdit(!mostrarEdit);
    reset(defaultAccountValues);
  };

  const CerrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultAccountValues);
  };

  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetails(!mostrarDetails);
  };

  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEdit(!mostrarEdit);
    reset(defaultAccountValues);
  };

  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultAccountValues,
    mode: 'all',
    resolver: yupResolver(accountSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const ToastSuccess = () => {
    toast.success('Datos ingresados correctamente.', {
      theme: 'dark',
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  const ToastSuccessEditar = () => {
    toast.success('Datos Editados correctamente.', {
      theme: 'dark',
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  const ToastWarning = () => {
    toast.warning('No se permiten campos vacios.', {
      theme: 'dark',
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

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
 
  //Validaciones para el Agregar de la Pantalla 
  const ValidacionAgregar = (data) => {
    if (image != null) {
      if (data.funcion.length != 0 && data.Select.length != 0) {
        if (data.descripcion != null) {
          if (data.descripcion.trim() === "" || data.Select[0] === "Selecciona una opción" || data.funcion[0] === "Selecciona una opción") {         
            ToastWarning();
          } else {
            MostrarCollapseAgregar();          
            ToastSuccess();
          }
        } else {
          ToastWarning();
        }
      } else {
        ToastWarning();
      }
    } else {
      ToastWarningImagenSeleccionar();
    }  
  };

  const ValidacionesEditar = (data) => {
    if (data.funcion.length != 0) {
      if (data.Select.length != 0) {
        if (data.descripcion != null) {
          if (data.descripcion.trim() === "" || data.Select[0] === "Selecciona una opción" || data.funcion[0] === "Selecciona una opción") {
            ToastWarning();
          } else if (data.descripcion.trim() === "" || data.Select === "" || data.funcion === "") {
            ToastWarning();
          } else {
            MostrarCollapseEditar();
            ToastSuccessEditar();
          }
        }
        else {
          ToastWarning();
        }
      } else {
        ToastWarning();
      }
    } else {
      if (data.descripcion.trim() === "" || data.Select === "" || data.funcion === "") {
        ToastWarning();
      }
    }
  };

  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetails(!mostrarDetails);
  };


  const AgregarRegistro = () => {
    const formData = watch();
    ValidacionAgregar(formData);
    setTimeout(() => {
      handleSubmit(ValidacionAgregar)();
    }, "250")
  };

  const EditarRegistro = () => {
    const formData = watch();
    ValidacionesEditar(formData);
    setTimeout(() => {
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
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/CbPV4Xy/MODELOS-DE-M-QUINA.png "
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
            columns={columns2}
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

            <Grid item xs={8} >
            <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Nombre de la Máquina
                    </FormLabel>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    error={!!errors.descripcion}
                    fullWidth
                    InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                  />
                )}
                name="descripcion"
                control={control}
              />

              <Controller
                defaultValue={["Selecciona una opción"]}
                render={({ field }) => (
                  <FormControl error={!!errors.Select} fullWidth style={{ marginTop: '10px' }}>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Marcas
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="10">Sterling</MenuItem>
                      <MenuItem value="20">Singer</MenuItem>
                      <MenuItem value="30">Alfa</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="Select"
                control={control}
              />
              <Controller
                defaultValue={["Selecciona una opción"]}
                render={({ field }) => (
                  <FormControl error={!!errors.funcion} fullWidth style={{ marginTop: '10px' }}>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Función
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="10">Coser</MenuItem>
                      <MenuItem value="20">Ensamblaje</MenuItem>
                      <MenuItem value="30">Acabado</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="funcion"
                control={control}
              />

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
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
                  onClick={CerrarCollapseAgregar}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      {/* Formulario Editar */}
      <Collapse in={mostrarEdit}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <div className='little-profilePhynomo text-center'>
                <div className="pro-imgPhynomo" style={{ marginTop: "0", width: '300px', height: '300px', overflow: 'hidden' }}>
                  {image == null ? <img src={maquiImage} alt="user" /> : <img src={image} alt="uploaded image" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />}
                </div>
                <button className="btn btn-pill btn-outline-light" type='button' onClick={() => fileInputRef.current.click()}>Seleccionar imagen</button>
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
              </div>
            </Grid>

            <Grid item xs={8} >
            <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Nombre de la Máquina
                    </FormLabel>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    error={!!errors.descripcion}
                    fullWidth
                    InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                  />
                )}
                name="descripcion"
                control={control}
              />

              <Controller
                defaultValue={["Selecciona una opción"]}
                render={({ field }) => (
                  <FormControl error={!!errors.Select} fullWidth style={{ marginTop: '10px' }}>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Marcas
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="10">Sterling</MenuItem>
                      <MenuItem value="20">Singer</MenuItem>
                      <MenuItem value="30">Alfa</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="Select"
                control={control}
              />
              <Controller
                defaultValue={["Selecciona una opción"]}
                render={({ field }) => (
                  <FormControl error={!!errors.funcion} fullWidth style={{ marginTop: '10px' }}>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Función
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="10">Coser</MenuItem>
                      <MenuItem value="20">Ensamblaje</MenuItem>
                      <MenuItem value="30">Acabado</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="funcion"
                control={control}
              />

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <Button
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px', marginRight: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E', color: 'white',
                    "&:hover": { backgroundColor: '#6e52ae' },
                  }}
                  onClick={EditarRegistro}
                >
                  Editar
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
                  onClick={CerrarCollapseEditar}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      {/* Collapse para mostrar los detalles de un registro inicio*/}
      <Collapse in={mostrarDetails}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Detalles de los Modelos de Maquina</h2>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Id:
                    </Typography>
                    <Typography>{id}</Typography>
                  </InputLabel>
                  <br></br>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre Maquina:
                    </Typography>
                    <Typography>{descripcion}</Typography>
                  </InputLabel>
                  <br></br>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Marca Maquina:
                    </Typography>
                    <Typography>{marca}</Typography>
                  </InputLabel>
                  <br></br>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Función Maquina:
                    </Typography>
                    <Typography>{funcion}</Typography>
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
      <ToastContainer />
    </Card>

  );
}

export default ModelosMaquinaIndex;



