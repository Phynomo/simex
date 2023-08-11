/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField, Box } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MaquinasIndex() {
    const [searchText, setSearchText] = useState('');
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);
    const [Eliminar, setEliminar] = useState(false);
    const [mostrarEditar, setmostrarEditar] = useState(false);
    const [mostrarDetalles, setmostrarDetalles] = useState(false);
    const [numserie, setnumserie] = useState("");
    const [modelo, setmodelo] = useState("");
    const [id, setid] = useState("");

    const DialogEliminar = () => {
        setEliminar(!Eliminar);
    };

    const [anchorEl, setAnchorEl] = useState({});

    //Constante para el detalle de las pantallas
    const DetallesTabla = (rowId, numserie, modelo) => {
      setid(rowId);
      setnumserie(numserie);
      setmodelo(modelo);

      //const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
      //tableRows[0].cells[1].textContent = localStorage.getItem('Masiso rey')
      //tableRows[0].cells[2].textContent = localStorage.getItem('Que crack que sos')
      //tableRows[1].cells[1].textContent = localStorage.getItem('Ombe trabaje')
      //tableRows[1].cells[2].textContent = localStorage.getItem('Muchachos escucharon el rempalago?')
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
  
    const handleEdit = (id, numserie, modelo) => {
      setnumserie(numserie);
      setmodelo(modelo);
      setid(id);
      console.log(numserie);
      MostrarEditar();
      handleClose(id);
    };
  
    const handleDetails = (id, numserie, modelo) => {
      DetallesTabla(id, numserie, modelo);
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
        title: 'Número de serie',
        dataIndex: 'numserie',
        key: 'numserie',
        sorter: (a, b) => a.numserie.localeCompare(b.numserie), //sorting para Letras
      },
      {
        title: 'Modelo',
        dataIndex: 'modelo',
        key: 'modelo',
        sorter: (a, b) => a.modelo.localeCompare(b.modelo), //sorting para Letras
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
                <MenuItem onClick={() => handleEdit(params.id, params.numserie, params.modelo)}>
                  <Icon>edit</Icon> Editar
                </MenuItem>
                <MenuItem onClick={() => handleDetails(params.id, params.numserie, params.modelo)}>
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

  const defaultMaquinasValues = {
    numserie: '',
    modelo: 0,
  }

  const MaquinasSchema = yup.object().shape({
    numserie: yup.string().required(),
    modelo: yup.string().required(),
  })

    {/*Datos de la tabla*/  }
    const data = [];
    for (let i = 1; i < 30; ++i) {
      data.push({
        key: i.toString(),
        id: i.toString(),
        numserie: '01010',
        modelo: 'modelo',
        // tabla: [
          // { key: '1',maquina: '23123',    modelo: 'Singer Heavy Duty 4423' },
          // { key: '2',maquina: '12323', modelo: 'Brother CS6000i' },
          // { key: '3',maquina: '34534',  modelo: 'Janome Magnolia 7318' },
          // { key: '4',maquina: '54565',   modelo: 'Juki HZL-F600' },

        //   ],
      });
    }
  
  
      
  //Constante para mostrar el collapse de editar un registro
  const MostrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultMaquinasValues);
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
    reset(defaultMaquinasValues);

  };

  // Cerrar un Detalles
  const CerrarDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    reset(defaultMaquinasValues);

  };

    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
    };
  
    {/*Filtrado de datos*/  }
    const filteredRows = data.filter((row) =>
      Object.values(row).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    
  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultMaquinasValues);
  };

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla2 = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultMaquinasValues);
  };

  const {handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultMaquinasValues,
    mode: 'all',
    resolver: yupResolver(MaquinasSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = (data) => {
    if(data.numserie != null || data.modelo != null){
      if (data.numserie.trim() === '') {
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
    if(data.numserie != null || data.modelo != null){
      if (data.numserie.trim() === '') {
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
    reset(defaultMaquinasValues);
  };

   //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
   const EditarRegistro = () => {
    const formData = watch();
    formData.numserie = numserie;
    formData.modelo = modelo;
    ValidacionesEditar(formData);
    setTimeout(() => {
      reset(defaultMaquinasValues);
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
                image="https://i.ibb.co/86vkzPQ/MAQUINAS.png"
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
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '30px' }}>
                    <Grid container spacing={3}>
   

                        <Grid item xs={6}>
                        <div className="mt-1 mb-16" >
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                    {...field}
                                    label="Número de serie"
                                    variant="outlined"
                                    error={!!errors.numserie}
                                    placeholder='Ingrese el número de serie'
                                    style={{ borderRadius: '10px', marginLeft: '10px' }}
                                    fullWidth
                                    InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                                    />
                                )}
                                name="numserie"  
                                control={control}
                            />
                        </div>
                        </Grid>         
                        
                    
                        <Grid item xs={6}>
                            <FormControl fullWidth >
                                <InputLabel htmlFor="grouped-native-select">Modelo</InputLabel>
                                <Controller
                                  render={({ field }) => (
                                    
                                    <Select
                                    
                                    {...field}
                                      variant="outlined"
                                      fullWidth
                                      error={!!errors.modelo}
                                      defaultValue={" "}
                                          style={{ borderRadius: '3px'}}
                                          label="Modelo"
                                      >
                                          <MenuItem value='1'>KJS728</MenuItem>
                                          <MenuItem value='2'>MNE923</MenuItem>
                                          <MenuItem value='3'>EMM536</MenuItem>
                                          
                                      </Select>
                                  )}
                                  name="modelo"
                                  control={control}
                                />
                            </FormControl>
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
              <Grid item xs={6} style={{ marginTop: '30px' }}>
                        <div className="mt-1 mb-16" >
                            <Controller
                                render={({ field }) => (
                                    <TextField
                                    {...field}
                                    label="Número de serie"
                                    value={numserie}
                                    variant="outlined"
                                    error={!!errors.numserie}
                                    placeholder='Ingrese el número de serie'
                                    style={{ borderRadius: '10px', marginLeft: '10px' }}
                                    fullWidth
                                    InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                                    />
                                )}
                                name="numserie"  
                                control={control}
                            />
                        </div>
                        </Grid>         
                        
                    
                        <Grid item xs={6} style={{ marginTop: '30px' }}>
                            <FormControl fullWidth >
                                <InputLabel htmlFor="grouped-native-select">Modelo</InputLabel>
                                <Controller
                                  render={({ field }) => (
                                    
                                    <Select
                                    
                                    {...field}
                                      variant="outlined"
                                      fullWidth
                                      error={!!errors.modelo}
                                      value={modelo}
                                          style={{ borderRadius: '3px'}}
                                          label="Modelo"
                                      >
                                          <MenuItem value='1'>KJS728</MenuItem>
                                          <MenuItem value='2'>MNE923</MenuItem>
                                          <MenuItem value='3'>EMM536</MenuItem>
                                          
                                      </Select>
                                  )}
                                  name="modelo"
                                  control={control}
                                />
                            </FormControl>
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
                  <h2>Detalles de la Máquina</h2>   
                  </Grid>   
                  <Grid item xs={12}>   
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Box sx={{ flex: 1 }}>
                        <InputLabel htmlFor="id">
                          <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                            Máquina Id:
                          </Typography>
                          <Typography>{id}</Typography>
                        </InputLabel>
                        <br></br> 
                        <InputLabel htmlFor="descripcion">
                          <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                            Número de serie:
                          </Typography>
                          <Typography>{numserie}</Typography>
                        </InputLabel>
                        <br></br> 
                        <InputLabel htmlFor="categoria">
                          <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                            Modelo:
                          </Typography>
                          <Typography>{modelo}</Typography>
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

export default MaquinasIndex;



