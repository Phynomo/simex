
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField, Box } from '@mui/material';

import React, { useEffect } from 'react'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Navigate, useNavigate } from 'react-router-dom';

import Zoom from '@mui/material/Zoom';
import Grow from '@mui/material/Grow';
import History from 'src/@history/@history';

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

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function BoletinDePagoIndex() {

  const Navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const [id, setId] = useState("");
  const [liqui, setLiqui] = useState("");
  const [nduca, setNduca] = useState("");
  
  const DetallesTabla = (rowId, liqui, nduca) => {
    setId(rowId);
    setLiqui(liqui);
    setNduca(nduca);

    //const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
    //tableRows[0].cells[1].textContent = localStorage.getItem('Masiso rey')
    //tableRows[0].cells[2].textContent = localStorage.getItem('Que crack que sos')
    //tableRows[1].cells[1].textContent = localStorage.getItem('Ombe trabaje')
    //tableRows[1].cells[2].textContent = localStorage.getItem('Muchachos escucharon el rempalago?')
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const Imprimir = () => {
    Navigate('/BoletindePago/ImpresionBoletinDePago')
  }

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

  const handleEdit = (id, liqui, nduca) => {
    setId(id)
    setLiqui(liqui);
    setNduca(nduca);
    MostrarCollapseEditar();
    handleClose(id);
  };

  const handleDetails = (id, liqui, nduca) => {
    DetallesTabla(id, liqui, nduca);
    MostrarCollapseDetalles();
    handleClose(id);
  };

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultBoletinValues);
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultBoletinValues);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

    {/* Validaciones de la pantalla de crear*/ }
    const defaultBoletinValues = {
      liqui: '',
      nduca: '',
    }
  
    const BoletinSchema = yup.object().shape({
      liqui: yup.string().required(''),
      nduca: yup.string().required(''),
    })
  
    const { handleSubmit, register, reset, control, watch, formState } = useForm({
      defaultBoletinValues,
      mode: "all",
      resolver: yupResolver(BoletinSchema),
    });
  
    const { isValid, dirtyFields, errors, touchedFields } = formState;
  
    const ValidacionAgregar = (data) => {
      if (data.liqui != null) {
        if (data.liqui.trim() === "") {
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
        if (data.liqui != null) {
          if (data.liqui.trim() === "") {
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
  
    const [filas, setFilas] = React.useState(10);
  
    const handleChange = (event) => {
      setFilas(event.target.value);
    };
  
    const AgregarRegistro = () => {
      const formData = watch();
      handleSubmit(ValidacionAgregar)();
      // ValidacionAgregar(formData);
      reset(defaultBoletinValues);
    };

    {/* Columnas de la tabla */ }
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Boletin',
        dataIndex: 'liqui',
        key: 'liqui',
        sorter: (a, b) => a.liqui.localeCompare(b.liqui),
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
                <MenuItem onClick={() => handleEdit(params.id, params.liqui, params.nduca)}>
                  <Icon>edit</Icon> Editar
                </MenuItem>
                <MenuItem onClick={() => handleDetails(params.id, params.liqui, params.nduca)}>
                  <Icon>visibility</Icon> Detalles
                </MenuItem>
                <MenuItem onClick={() => DialogEliminar(params.id)}>
                  <Icon>delete</Icon> Eliminar
                </MenuItem>
                <MenuItem onClick={() => Imprimir(params.id)}>
                <Icon>print</Icon> Imprimir Boletin
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
      formData.liqui = liqui;
      formData.nduca = nduca;
      ValidacionesEditar(formData);
      setTimeout(() => {
      reset(defaultBoletinValues);
      handleSubmit(ValidacionesEditar)();
      }, "250")
    };


    //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
    const CerrarEditar = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarEditar(!mostrarEditar);
      reset(defaultBoletinValues);
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
    FetchDataBoletinDePago();
  }, []);

  const FetchDataBoletinDePago = async () => {
    try {
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };

      const url = 'https://simexpro.azurewebsites.net/api/BoletinPago/Listar';
      const response = await axios.get(url, {
        headers: customHeaders,
      });
      console.log(response)
      const rows = response.data.map(item => {
        return {
          id: item.boen_Id,
          liqui: item.liqu_Id,
          nduca: item.duca_NO_Duca, 
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
  //     boletin: 'boletin ' + i,
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

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <ToastContainer />
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/0KkrNp4/IMPRESI-N-BOLET-N-DE-PAGO.png"
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
              onClick={()=>{
                History.push('BoletindePago/Crear')
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
            <Grid item xs={12}>
              <div className="mt-5 mb-16" style={{ borderRadius: '10px', width: '100%'}}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      defaultValue=" "
                      label="Boletín"
                      placeholder='Identificador de Boletín'
                      error={!!errors.liqui}
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="liqui"
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
                          label="Cargo"
                          variant="outlined"
                          error={!!errors.liqui}
                          value={liqui}
                          fullWidth
                          InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                        />
                      )}
                      name="liqui"
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
                    <h2>Detalles del Boletin</h2>   
                    </Grid>   
                      <Grid item xs={12}>   
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Box sx={{ flex: 1 }}>
                            <InputLabel htmlFor="id">
                              <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                                boletin Id:
                              </Typography>
                              <Typography>{id}</Typography>
                            </InputLabel>
                            <br></br> 
                            <InputLabel htmlFor="descripcion">
                              <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                                Boletin:
                              </Typography>
                              <Typography>{liqui}</Typography>
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
        fullWidth={'md'}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmación de Eliminación"}
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

export default BoletinDePagoIndex;
