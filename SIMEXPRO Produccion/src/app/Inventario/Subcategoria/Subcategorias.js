/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField, Box,   FormLabel,
} from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

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


import MUIDataTable from 'mui-datatables' 
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SubcategoriaIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [Eliminar, setEliminar] = useState(false);
  const [users, setUsers] = useState([])

  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

 const [filas, setFilas] = React.useState(10);
  const [id, setid] = useState('');
  const [subcat, setsubcat] = useState('');
  const [categoria, setcategoria] = useState('');

  const [anchorEl, setAnchorEl] = useState({});



  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };
  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (id,subcat,categoria) =>
  {
    setsubcat(subcat);
    setcategoria(categoria);
    setid(id);
    console.log(subcat);
    console.log(categoria);
    MostrarCollapseEditar();
    handleClose(id);
  };


   //Constante abrir el collapse de los detalles de la pantalla
   const handleDetails = (id, subcat, categoria) => {
    DetallesTabla(id, subcat, categoria);
    MostrarCollapseDetalles();
    handleClose(id);
  };

  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };

  //Constante para el detalle de las pantallas
  const DetallesTabla = (rowId, subcat, categoria) => {
    setid(rowId);
    setsubcat(subcat);
    setcategoria(categoria);
  };


    //Constante para cerrar el collapse de detalles
    const CerrarCollapseDetalles = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarDetalles(!mostrarDetalles);
    };
      //Constante para mostrar el collapse de detalles un registro
   const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };


  /*Columnas de la tabla*/

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id, //sorting para Numeros
  },
  {
    title: 'SubCategoría',
    dataIndex: 'subcat',
    key: 'subcat',
    sorter: (a, b) => a.subcat.localeCompare(b.subcat), //sorting para Letras
  },
  {
    title: 'categoría',
    dataIndex: 'categoria',
    key: 'categoria',
    sorter: (a, b) => a.categoria.localeCompare(b.categoria), //sorting para Letras
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
            <MenuItem onClick={() => handleEdit(params.id, params.subcat, params.categoria)}>
              <Icon>edit</Icon>ㅤ Editar
            </MenuItem>
            <MenuItem onClick={() => handleDetails(params.id, params.subcat, params.categoria)}>
              <Icon>visibility</Icon> ㅤDetalles
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.id)}>
              <Icon>delete</Icon> ㅤEliminar
            </MenuItem>
          </Menu>
        </Stack>
      </div>
    ,
  },
];

 

  {/* Datos de la tabla */ }
  const rows = [
    {key:1, id: '1', subcat: 'Algodón', categoria:    'Tela'   },
    {key:2, id: '2', subcat: 'Metal',   categoria:    'Boton'  },
    {key:3, id: '3', subcat: 'Jean',    categoria:    'Aguja'  },
    {key:4, id: '4', subcat: 'Jean',    categoria:    'Hilo'   },
    {key:5, id: '5', subcat: '15 cm',   categoria:    'Zipper' },
  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChange = (event) => {
    setFilas(event.target.value);
  };


  {/*Filtrado de datos*/  }
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultSubcatValues);
  };  

    //Constante para mostrar el collapse de agregar un registro
    const MostrarCollapseAgregar = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarAgregar(!mostrarAgregar);
      reset(defaultSubcatValues);
    };
  //Constante para cerrar el collapse de agregar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
    const CerrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultSubcatValues);

   };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultSubcatValues);
    
  };

    //Constante de los datos por defecto que tendran los formulario
    const defaultSubcatValues = {
      subcat: "",
      categoria: "",
    }

    const SubcatSchema = yup.object().shape({
      subcat: yup.string().required(),
      categoria: yup.string().required()
    })
    

  const {handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultSubcatValues,
    mode: 'all',
    resolver: yupResolver(SubcatSchema),
  }); 

  const { isValid, dirtyFields, errors } = formState;

  const ToastSuccess =() => {
    toast.success('Datos ingresados correctamente.', {
      style: {
        marginTop: '50px',
        backgroundColor: '#111827',
        color: 'white',
        fill: 'white'
        
      },
      autoClose: 5000,
      closeOnClick: true
    });
  }

    const ToastWarning = () => {
      toast.warning('No se permiten campos vacios.', {
        style: {
          marginTop: '50px',
          backgroundColor: '#111827',
          color: 'white',
          fill: 'white'
          
        },
        autoClose: 5000,
        closeOnClick: true
      });
    }

  
   //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de agregar
   const ValidacionAgregar = (data) => {
    console.log(data);
    if (data.categoria.length != 0) {
      if (data.subcat != null) {
        if(data.subcat.trim() === "" || data.categoria[0] === "")
        { 
          console.log("Salio");
          ToastWarning();
        }else if (data.subcat.trim() === "" || data.categoria === ""){
          console.log("Salio");
          ToastWarning();
        }else{
          console.log("Entra");
          MostrarCollapseAgregar();
          ToastSuccess();
        }
      }else{
        console.log("Salio");
        ToastWarning();
      }
    }else{
      if (data.categoria === "") {
        console.log("Que onda");
        ToastWarning();
      }
      console.log("Salio");
    }
  };


   //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
  const ValidacionesEditar = (data) => {
    if (data.subcat != null) {
      if (data.subcat.trim() === "") {
        toast.error('Debe completar los campos.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      } else {
        MostrarCollapseEditar();
        ToastSuccess();
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
  

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };


  //Constante para ejecutar las validaciones y el envio del formulario en el boton de agregar en el collapse de agregar
  const AgregarRegistro = () => {
    const formData = watch();
    ValidacionAgregar(formData);
    setTimeout(() => {
      handleSubmit(ValidacionAgregar)();
    }, "250")
  };


  //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
  const EditarRegistro = () => {
    const formData = watch();
    formData.subcat = subcat;
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
      <ToastContainer/>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/MNznc9n/SUB-CATEGORIAS.png"
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

          {/* Barra de Busqueda en la Tabla */}
          <TextField
            style={{ borderRadius: '10px' }}
            placeholder='Buscar'
            value={searchText}
            onChange={handleSearchChange}
            size="small"
            variant="outlined"
            inputProps={{
              startadornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Collapse>

      {/*Tabla*/}
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

            <Grid item xs={6} style={{ marginTop: '30px' }} >
            <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.subcat} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Subcategoría
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.subcat}
                      placeholder=""
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="subcat"
                control={control}
              />
            </Grid>

            <Grid item xs={6} style={{ marginTop: '30px' }}>

            <Controller
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.categoria} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Categoría
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth={true} 
                      inputProps={{
                        startadornment: <InputAdornment position="start" />,
                      }}
                    >
                     <MenuItem value='Tela'>Tela</MenuItem>
                     <MenuItem value='Boton'>Boton</MenuItem>
                     <MenuItem value='Aguja'>Aguja</MenuItem>
                     <MenuItem value='Hilo'>Hilo</MenuItem>
                     <MenuItem value='Zipper'>Zipper</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="categoria"
                control={control}
              />       
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
      <Collapse in={mostrarEditar}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>

            <Grid item xs={6} style={{ marginTop: '30px' }} >
            <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.subcat} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Subcategoría
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.subcat}
                      value={subcat}
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="subcat"
                control={control}
              />
            </Grid>

            <Grid item xs={6} style={{ marginTop: '30px' }}>

            <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.categoria} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Categoría
                    </FormLabel>
                    <Select
                      {...field}
                      value={categoria}
                      fullWidth={true} 
                      inputProps={{
                        startadornment: <InputAdornment position="start" />,
                      }}
                    >
                     <MenuItem value='Tela'>Tela</MenuItem>
                     <MenuItem value='Boton'>Boton</MenuItem>
                     <MenuItem value='Aguja'>Aguja</MenuItem>
                     <MenuItem value='Hilo'>Hilo</MenuItem>
                     <MenuItem value='Zipper'>Zipper</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="categoria"
                control={control}
              />       
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
              <h2>Detalles de la Subcategoría</h2>   
              </Grid>   
              <Grid item xs={12} style={{marginBottom:"25px"}}>  
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Id de la Subcategoría:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Subcategoría:
                      </Typography>
                      <Typography>{subcat}</Typography>
                    </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Categoría:
                      </Typography>
                      <Typography>{categoria}</Typography>
                    </InputLabel>
                </Box>
                </Box>
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
        fullWidth={true} 
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
      <ToastContainer/>
    </Card>
  );
}

export default SubcategoriaIndex;



