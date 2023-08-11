/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import axios from 'axios';
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

function OficinasIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [id, setId] = useState("");
  const [oficina, setOficina] = useState("");

  const DetallesTabla = (rowId, oficina) => {
    setId(rowId);
    setOficina(oficina);

    //const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
    // //tableRows[0].cells[1].textContent = localStorage.getItem('dkhadk')
    // tableRows[1].cells[1].textContent = localStorage.getItem('Registro de prueba');
    // tableRows[2].cells[2].textContent = localStorage.getItem('Registro de prueba 2');
    // tableRows[3].cells[3].textContent = localStorage.getItem('Registro de prueba 3');
    // tableRows[4].cells[4].textContent = localStorage.getItem('Registro de prueba 4');
    // tableRows[5].cells[5].textContent = localStorage.getItem('Registro de prueba 5');
    // tableRows[6].cells[6].textContent = localStorage.getItem('Registro de prueba 6');
    
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

  const handleEdit = (id, oficina) => {
    // Implementa la función para editar aquí
    setId(id);
    setOficina(oficina);
    MostrarCollapseEditar();
    handleClose(id);
  };

  const handleDetails = (id, oficina) => {
      // Implementa la función para detalles aquí
      DetallesTabla(id, oficina);
      MostrarCollapseDetalles();
      handleClose(id);
};

 //Constante para mostrar el collapse de agregar un registro
 const MostrarCollapseAgregar = () => {
  setmostrarIndex(!mostrarIndex);
  setmostrarAgregar(!mostrarAgregar);
  reset(defaultOficinasValues);
};
  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultOficinasValues);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

const handleDelete = (id) => {
  // Implementa la función para eliminar aquí
  handleClose(id);
};

  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Oficina',
      dataIndex: 'oficina',
      key: 'oficina',
      sorter: (a, b) => a.oficina.localeCompare(b.oficina),
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
              <MenuItem onClick={() => handleEdit(params.id, params.oficina)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id, params.oficina)}>
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
      formData.oficina = oficina;
      ValidacionesEditar(formData);
      setTimeout(() => {  
        reset(defaultOficinasValues);
        handleSubmit(ValidacionesEditar)();
      }, "250")
    };
  
    //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
    const CerrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultOficinasValues);
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

  const defaultOficinasValues = {
    oficinas: '',
  }

  const OficinasSchema = yup.object().shape({
    oficinas: yup.string().required(),
  })

  const[data, setData] = useState([])

  useEffect(() => {
    FetchDataOficinas();
  }, []);

  const FetchDataOficinas = async () => {
    try {
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };

      const url = 'https://simexpro.azurewebsites.net/api/Oficinas/Listado';
      const response = await axios.get(url, {
        headers: customHeaders,
      });
      console.log(response)
      const rows = response.data.map(item => {
        return {
          id: item.ofic_Id,
          oficina: item.ofic_Nombre,
        }
      });
      setData(rows);
    } catch (error) {
      console.log(error.message);
    }
  };
  
    // {/* Datos de la tabla */ }
    // const data = [];
    // for (let i = 0; i < 50; ++i) {
    //   data.push({
    //     key: i.toString(),
    //     id: i.toString(),
    //     oficina: 'oficina ' + i,
    //     // tabla: [
    //     //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
    //     //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
    //     //   // Add more rows to the nested table here...
    //     // ],
    //   });
    // }
  
    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
    };
  
    {/* Filtrado de datos */ }
    const filteredRows = data.filter((row) =>
      Object.values(row).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
  };

  const {handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultOficinasValues,
    mode: 'all',
    resolver: yupResolver(OficinasSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const ValidacionAgregar = (data) => {
    if (data.oficinas != null) {
      if (data.oficinas.trim() === "") {
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
        if (data.oficinas != null) {
          if (data.oficinas.trim() === "") {
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

  const AgregarRegistro = () => {
    const formData = watch();
    ValidacionAgregar(formData);
    handleSubmit(ValidacionAgregar)();
    reset(defaultOficinasValues);
  };

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <ToastContainer />
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/BqmXTJV/OFICINAS.png"
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
            <Grid item xs={12} >
            <div className="mt-5 mb-16" style={{ width: '100%'}}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="Oficinas"
                      error={!!errors.oficinas}
                      placeholder='Ingrese el nombre de la Oficina'
                      fullWidth
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="oficinas"
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
              <Grid item xs={12} >
                <div className="mt-1 mb-16">
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Oficina"
                          variant="outlined"
                          error={!!errors.oficinas}
                          fullWidth
                          InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                          value={oficina}
                        />
                      )}
                      name="oficinas"
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
                  <h2>Detalles de la Oficina</h2>   
                  </Grid>   
                  <Grid item xs={12}>   
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Box sx={{ flex: 1 }}>
                        <InputLabel htmlFor="id">
                          <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                            Oficina Id:
                          </Typography>
                          <Typography>{id}</Typography>
                        </InputLabel>
                        <br></br> 
                        <InputLabel htmlFor="descripcion">
                          <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                            Oficina Descripcion:
                          </Typography>
                          <Typography>{oficina}</Typography>
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

export default OficinasIndex;