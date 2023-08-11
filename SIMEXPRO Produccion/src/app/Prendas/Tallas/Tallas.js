/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, Box,IconButton, InputAdornment, InputLabel, TextField, FormLabel } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useState, useEffect} from 'react';
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
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from 'antd';
import axios from 'axios';

function TallasIndex() {

  const [searchText, setSearchText] = useState('');
  const [mostrarDetails, setmostrarDetails] = useState(false);
  const [mostrarEdit, setmostrarEdit] = useState(false);
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [id, setid] = useState('');
  const [talla, settalla] = useState('');
  const [codigo, setcodigo] = useState('');
  const [DataTabla, setDataTabla] = useState([])

  useEffect(() => {
    CargarDatosTabla()
  }, []);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };

  const DetallesTabla = (rowId, codigo, talla) => {
    setid(rowId);
    setcodigo(codigo);
    settalla(talla);
    //const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
    //tableRows[0].cells[1].textContent = localStorage.getItem('Masiso rey')
    //tableRows[0].cells[2].textContent = localStorage.getItem('Que crack que sos')
    //tableRows[1].cells[1].textContent = localStorage.getItem('Ombe trabaje')
    //tableRows[1].cells[2].textContent = localStorage.getItem('Muchachos escucharon el rempalago?')
  };

  const handleEdit = (id, codigo, talla) => {
    setcodigo(codigo);
    settalla(talla);
    setid(id);
    console.log(talla);
    MostrarCollapseEditar();
    handleClose(id);
  };

  const handleDetails = (id, codigo, talla) => {
    DetallesTabla(id, codigo, talla);
    MostrarCollapseDetalles();
    handleClose(id);
  };

  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };

  //Constante para cargar datos a las tablas
  const CargarDatosTabla = async () => {
    try {
    const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      const response = await axios.get(process.env.REACT_APP_API_URL+'api/Tallas/Listar', {
        headers: customHeaders,
      }); 
      console.log(response)
      const rows = response.data.data.map((item,index) => {
        return {
          key:index,
          id: item.tall_Id,
          codigo: item.tall_Codigo,
          talla: item.tall_Nombre,
        }
      });
      setDataTabla(rows);
    } catch (error) {
    }
  };

  const [anchorEl, setAnchorEl] = useState({});

  const columns2 = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id, //sorting para Numeros
    },
    {
      title: 'Codigo',
      dataIndex: 'codigo',
      key: 'codigo',
      sorter: (a, b) => a.codigo.localeCompare(b.codigo), //sorting para Letras
    },
    {
      title: 'Talla',
      dataIndex: 'talla',
      key: 'talla',
      sorter: (a, b) => a.talla.localeCompare(b.talla), //sorting para Letras
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
              <MenuItem onClick={() => handleEdit(params.id)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id)}>
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

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChange = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };

  const filteredRows = DataTabla.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );
  {/*Codigo para validaciones */ }

  const defaultAccountValues = {
    codigo: '',
    talla: '',
  }
  

  const accountSchema = yup.object().shape({
    codigo: yup.string().required(),
    talla: yup.string().required(),
  })

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

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetails(!mostrarDetails);
    reset(defaultAccountValues);
  };

  const CerrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultAccountValues);
  };

  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEdit(!mostrarEdit);
    reset(defaultAccountValues);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetails(!mostrarDetails);
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

  const ToastInfoWarning = () => {
    toast.warning('El dato que desea ingresar ya existe.', {
      theme: 'dark',
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  const ToastErrorApi = () => {
    toast.warning('Error en el proceso de los.', {
      theme: 'dark',
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  const ValidacionAgregar = (data) => {
    if(data.codigo != null){
      if (data.talla != null) {
        if (data.codigo.trim() === "" || data.talla.trim() === "") {
          ToastWarning();
        } else {
          console.log(data)
          let payload = {
            tall_Codigo: data.codigo,
            tall_Nombre: data.talla,
            usua_UsuarioCreacion: 1,
            tall_FechaCreacion: new Date()  
          }
          const customHeaders = {
            'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
          };
          axios.post(process.env.REACT_APP_API_URL+'api/Tallas/Insertar',payload,{
            headers: customHeaders,
          })  
          .then(response =>{
            console.log(response)
            if(response.data.data != null){
              if (response.data.data.codeStatus === 1) {         
                ToastSuccess();
                CerrarCollapseAgregar();     
            }else {
              if(response.data.data.codeStatus === 3){
                ToastInfoWarning();
              }else{
                ToastErrorApi();    
              } 
            }  
            }else{
              ToastErrorApi();
            }
          }).catch = (error) => {
  
          }
    }

  }}else{
    ToastWarning();
  }
  };

  const ValidacionesEditar = (data) => {
    if (data.codigo != null && data.talla != null) {
      if (data.codigo.trim() === '' && data.talla.trim() === '') {
        ToastWarning();
      } else {
        MostrarCollapseEditar();
        ToastSuccessEditar();
      }
    } else {
      ToastWarning();
    }
  };

  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const AgregarRegistro = () => {
    const formData = watch();
    ValidacionAgregar(formData);
    setTimeout(()=>{
      handleSubmit(ValidacionAgregar)();
    },"250")
   
  };

  const EditarRegistro = () => {
    const formData = watch();
    ValidacionesEditar(formData);
    setTimeout(()=>{
      handleSubmit(ValidacionesEditar)();
    },"250")
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
        image="https://i.ibb.co/XbLb2tr/TALLAS.png"
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

      <Collapse in={mostrarAdd}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div className="mt-48 mb-16" style={{ marginTop: "15px" }}>
              <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Codigo de la Talla
                    </FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder='Ingrese Código de la Talla'
                      error={!!errors.codigo}
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="codigo"
                  control={control}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="mt-48 mb-16" style={{ marginTop: "15px" }}>
              <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Codigo de la Talla
                    </FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder='Ingrese la talla'
                      error={!!errors.talla}
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="talla"
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
                onClick={CerrarCollapseAgregar}
              >
                Cancelar
              </Button>
            </Grid>

          </Grid>
        </CardContent>
      </Collapse>

      {/* Formulario Editar */}
      <Collapse in={mostrarEdit}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>

          <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div className="mt-48 mb-16" style={{ marginTop: "15px" }}>
              <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Codigo de la Talla
                    </FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder='Ingrese Código de la Talla'
                      error={!!errors.codigo}
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="codigo"
                  control={control}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="mt-48 mb-16" style={{ marginTop: "15px" }}>
              <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Codigo de la Talla
                    </FormLabel>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      placeholder='Ingrese la talla'
                      error={!!errors.talla}
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="talla"
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
              <h2>Detalles de Tallas</h2>   
              </Grid>   
              <Grid item xs={12}>   
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Id:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                    <br></br> 
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Codigo:
                      </Typography>
                      <Typography>{codigo}</Typography>
                    </InputLabel>
                    <br></br> 
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Talla:
                      </Typography>
                      <Typography>{talla}</Typography>
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

export default TallasIndex;



