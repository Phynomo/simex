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

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy, set } from 'lodash';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MaterialesIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [categoria, setcategoria] = useState("");
  const [subcategoria, setsubcategoria] = useState("");
  const [material, setmaterial] = useState("");
  const [id, setid] = useState("");

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const [anchorEl, setAnchorEl] = useState({});

  //Constante para el detalle de las pantallas
  const DetallesTabla = (rowId, categoria, subcategoria, material) => {
    setid(rowId);
    setcategoria(categoria);
    setsubcategoria(subcategoria);
    setmaterial(material);

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

  const handleEdit = (id, categoria, subcategoria, material) => {
    setcategoria(categoria);
    setsubcategoria(subcategoria);
    setmaterial(material);
    setid(id);
    console.log(material);
    MostrarEditar();
    handleClose(id);
  };

  const handleDetails = (id, categoria, subcategoria, material) => {
    DetallesTabla(id, categoria, subcategoria, material);
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
      title: 'Material',
      dataIndex: 'material',
      key: 'material',
      sorter: (a, b) => a.material.localeCompare(b.material), //sorting para Letras
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      sorter: (a, b) => a.categoria.localeCompare(b.categoria), //sorting para Letras
    },
    {
      title: 'Subcategoria',
      dataIndex: 'subcategoria',
      key: 'subcategoria',
      sorter: (a, b) => a.subcategoria.localeCompare(b.subcategoria), //sorting para Letras
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
              <MenuItem onClick={() => handleEdit(params.id, params.categoria, params.subcategoria, params.material)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id, params.categoria, params.subcategoria, params.material)}>
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

const defaultMaterialesValues = {
  material: '',
  categoria: '',
  subcategoria: '',
}

const MaterialesSchema = yup.object().shape({
  material: yup.string().required(),
  categoria: yup.string().required(),
  subcategoria: yup.string().required(),
})

  {/*Datos de la tabla*/  }
  const data = [];
  for (let i = 1; i < 30; ++i) {
    data.push({
      key: i.toString(),
      id: i.toString(),
      material: 'material',
      categoria: 'categoria',
      subcategoria: 'subcategoria',
      // tabla: [
        // { key: '1',material: 'Tela coral',    categoria: 'Tela', subcategoria: 'Algodón' },
        // { key: '2',material: 'Botón negro',    categoria: 'Botón', subcategoria: 'Metal' },
        // { key: '3',material: 'Zipper 15 cm',    categoria: 'Zipper', subcategoria: 'Jean' },
      //   ],
    });
  }

  
  //Constante para mostrar el collapse de editar un registro
  const MostrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultMaterialesValues);
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
    reset(defaultMaterialesValues);

  };

  // Cerrar un Detalles
  const CerrarDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    reset(defaultMaterialesValues);

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
  reset(defaultMaterialesValues);
};

{/* Función para mostrar la tabla y mostrar agregar */ }
const VisibilidadTabla2 = () => {
  setmostrarIndex(!mostrarIndex);
  setmostrarAdd(!mostrarAdd);
  reset(defaultMaterialesValues);
};

const {handleSubmit, register, reset, control, watch, formState } = useForm({
  defaultMaterialesValues,
  mode: 'all',
  resolver: yupResolver(MaterialesSchema),
});

const { isValid, dirtyFields, errors } = formState;

const onSubmit = (data) => {
  if(data.material != null || data.categoria != null || data.subcategoria != null){
    if (data.material.trim() === '' || data.categoria.trim() === '' || data.subcategoria.trim() === '') {
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
    if(data.material != null || data.categoria != null || data.subcategoria != null){
      if (data.material.trim() === '' || data.categoria.trim() === '' || data.subcategoria.trim() === '') {
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
  reset(defaultMaterialesValues);
};

  //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
  const EditarRegistro = () => {
    const formData = watch();
    formData.categoria = categoria;
    formData.subcategoria = subcategoria;
    formData.material = material;
    ValidacionesEditar(formData);
    setTimeout(() => {
      reset(defaultMaterialesValues);
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
        image="https://i.ibb.co/cL2c1Zs/MATERIALES.png"
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

              {/* Filas */}
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

          <Grid item xs={6} style={{ marginTop: '30px' }}>
                <Controller
                    render={({ field }) => (
                       <FormControl fullWidth>
                      <InputLabel id="demo-select-small-label">Categoría</InputLabel>
                      <Select
                      {...field}
                      variant='outlined'
                      error={!!errors.categoria}
                      style={{ borderRadius: '3px' }}
                      label="Categoría"
                      defaultValue={" "}
                    >
                      <MenuItem value='1'>Tela</MenuItem>
                      <MenuItem value='2'>Botón</MenuItem>
                      <MenuItem value='3'>Aguja</MenuItem>
                    </Select>
                </FormControl>
                    )}
                    name="categoria"
                    control={control}
                  />
                  
            </Grid>

            <Grid item xs={6} style={{ marginTop: '30px' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Subcategoría</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.subcategoria}
                          style={{ borderRadius: '3px' }}
                          label="Subcategoría"
                          defaultValue={" "}
                        >
                          <MenuItem value='1'>Algodón</MenuItem>
                          <MenuItem value='2'>Metal</MenuItem>
                          <MenuItem value='3'>Jean</MenuItem>
                        </Select>
                    )}
                    name="subcategoria"
                    control={control}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={12} >
            <div className="mt-1 mb-16">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Material"
                      variant="outlined"
                      error={!!errors.material}
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="material"
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
          <Grid item xs={6} style={{ marginTop: '30px' }}>
                <Controller
                    render={({ field }) => (
                       <FormControl fullWidth>
                      <InputLabel id="demo-select-small-label">Categoría</InputLabel>
                      <Select
                      {...field}
                      variant='outlined'
                      error={!!errors.categoria}
                      style={{ borderRadius: '3px' }}
                      label="Categoría"
                      value={categoria}
                    >
                      <MenuItem value='1'>Tela</MenuItem>
                      <MenuItem value='2'>Botón</MenuItem>
                      <MenuItem value='3'>Aguja</MenuItem>
                    </Select>
                </FormControl>
                    )}
                    name="categoria"
                    control={control}
                  />
                  
            </Grid>

            <Grid item xs={6} style={{ marginTop: '30px' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Subcategoría</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.subcategoria}
                          style={{ borderRadius: '3px' }}
                          label="Subcategoría"
                          value={subcategoria}
                        >
                          <MenuItem value='1'>Algodón</MenuItem>
                          <MenuItem value='2'>Metal</MenuItem>
                          <MenuItem value='3'>Jean</MenuItem>
                        </Select>
                    )}
                    name="subcategoria"
                    control={control}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={12} >
            <div className="mt-1 mb-16">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Material"
                      variant="outlined"
                      error={!!errors.material}
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                      value={material}
                    />
                  )}
                  name="material"
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
              <h2>Detalles del Material</h2>   
              </Grid>   
              <Grid item xs={12}>   
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Material Id:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                    <br></br> 
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Material descripción:
                      </Typography>
                      <Typography>{material}</Typography>
                    </InputLabel>
                    <br></br> 
                    <InputLabel htmlFor="categoria">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Categoria descripción:
                      </Typography>
                      <Typography>{categoria}</Typography>
                    </InputLabel>
                    <br></br> 
                    <InputLabel htmlFor="subcategoria">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Subcategoria descripción:
                      </Typography>
                      <Typography>{subcategoria}</Typography>
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

export default MaterialesIndex;



