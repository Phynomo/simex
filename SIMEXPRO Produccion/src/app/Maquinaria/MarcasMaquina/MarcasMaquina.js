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
  Box
} from "@mui/material";
import * as React from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { height } from '@mui/system';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MarcasIndex() {
    const [searchText, setSearchText] = useState('');
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);
    const [Eliminar, setEliminar] = useState(false);

    const [marca, setmarca] = useState('');
    const [id, setid] = useState("");
    const [mostrarEditar, setmostrarEditar] = useState(false);
    const [mostrarDetalles, setmostrarDetalles] = useState(false);

    //Constante para el detalle de las pantallas
    const DetallesTabla = (rowId, marca) => {
      setid(rowId);
      setmarca(marca);
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
  
    const handleEdit = (id, marca) => {
      setmarca(marca);
      setid(id);
      MostrarEditar();
      handleClose(id);
    };
  
    const handleDetails  = (id, marca) => {
      DetallesTabla(id, marca);
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
        title: 'Marca',
        dataIndex: 'marca',
        key: 'marca',
        sorter: (a, b) => a.marca.localeCompare(b.marca), //sorting para Letras
      },
      {
        title: 'Acciones',
        key: 'operation',
        render: (params) => (
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
                <MenuItem onClick={() => handleEdit(params.id, params.marca)}>
                  <Icon>edit</Icon> Editar
                </MenuItem>
                <MenuItem onClick={() => handleDetails(params.id, params.marca)}>
                  <Icon>visibility</Icon> Detalles
                </MenuItem>
                <MenuItem onClick={() => handleDelete(params.id)}>
                  <Icon>delete</Icon> Eliminar
                </MenuItem>
              </Menu>
            </Stack>
          </div>
        ),
      },
    ];
  

    {/*Codigo para validaciones */}

  const defaultMarcasValues = {
    marca: '',
  }

  const MarcasSchema = yup.object().shape({
    marca: yup.string().required(),
  })

    {/*Datos de la tabla*/  }
    const data = [];
    for (let i = 1; i < 30; ++i) {
      data.push({
        key: i.toString(),
        id: i.toString(),
        marca: 'marca',
        // tabla: [
        //     { key: '1', marca: 'Juki'},
        //     { key: '2', marca: 'Pegasus'},
        //     { key: '3', marca: 'Singer'},
        //     { key: '4', marca: 'Rimoldi'},
        //     // Add more rows to the nested table here...
        //   ],
      });
    }
  
  
    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
    };
  
    {/*Filtrado de datos*/  }
    const filteredRows = data.filter((row) =>
      Object.values(row).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
      )
    );

     //Constante para mostrar el collapse de editar un registro
  const MostrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultMarcasValues);
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
    reset(defaultMarcasValues);

  };

  // Cerrar un Detalles
  const CerrarDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    reset(defaultMarcasValues);

  };
    
  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultMarcasValues);
  };

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla2 = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultMarcasValues);
  };

  const {handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultMarcasValues,
    mode: 'all',
    resolver: yupResolver(MarcasSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (data) => {
    if(data.marca != null){
      if (data.marca.trim() === '') {
        toast.error('Debe completar los campos.', {
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
    }else{
      toast.error('Debe completar los campos.', {
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
    if(data.marca != null){
      if (data.marca.trim() === '') {
        toast.error('Debe completar los campos.', {
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
      toast.error('Debe completar los campos.', {
        theme: 'dark',
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }
  };

  const Masiso = () => {
    const formData = watch();
    onSubmit(formData); 
    handleSubmit(onSubmit)(); 
    reset(defaultMarcasValues);
  };

  {/*Codigo para validaciones */}

  //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
  const EditarRegistro = () => {
    const formData = watch();
    formData.marca = marca;
    ValidacionesEditar(formData);
    setTimeout(() => {
      reset(defaultMarcasValues);
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
                image="https://i.ibb.co/Mk4C5mv/MARCAS-DE-M-QUINA.png"
                alt="Encabezado de la carta"
            />
            <Collapse in={mostrarIndex}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

                    {/* Botón de Nuevo */}
                    <Stack direction="row" spacing={5}>
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
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <Grid container spacing={3}>


                    <Grid item xs={6} >
                        <div className="mt-40 mb-16" style={{ width: '500px', marginLeft: '210px' }}>
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                    {...field}
                                    label="Marca"
                                    variant="outlined"
                                    error={!!errors.marca}
                                    placeholder='Ingrese el nombre de la marca'
                                    fullWidth
                                    InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                                    />
                                )}
                                name="marca"  
                                control={control}
                            />
                        </div>
                    </Grid>



                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
                            <Button
                                startIcon={<Icon>checked</Icon>}
                                variant="contained"
                                color="primary"
                                style={{ borderRadius: '10px', marginRight: '10px' }}
                                sx={{
                                    backgroundColor: '#634A9E', color: 'white',
                                    "&:hover": { backgroundColor: '#6e52ae' },
                                }}
                                onClick={Masiso}
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
                                onClick={VisibilidadTabla2}
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
                    <Grid item xs={12}>
                      <Typography variant="h5" gutterBottom></Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <div className="mt-40 mb-16" style={{ width: '500px', marginLeft: '210px' }}>
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                    {...field}
                                    label="Marca"
                                    variant="outlined"
                                    value={marca}
                                    error={!!errors.marca}
                                    placeholder='Ingrese el nombre de la marca'
                                    fullWidth
                                    InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                                    />
                                )}
                                name="marca"  
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
                      <h2>Detalles de la Marca</h2>   
                      </Grid>   
                      <Grid item xs={12}>   
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Box sx={{ flex: 1 }}>
                            <InputLabel htmlFor="id">
                              <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                                Marca Id:
                              </Typography>
                              <Typography>{id}</Typography>
                            </InputLabel>
                            <br></br> 
                            <InputLabel htmlFor="descripcion">
                              <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                                Marca descripción:
                              </Typography>
                              <Typography>{marca}</Typography>
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
             {/* Dialog eliminar */}
            <ToastContainer/>
        </Card>
    );
}

export default MarcasIndex;



