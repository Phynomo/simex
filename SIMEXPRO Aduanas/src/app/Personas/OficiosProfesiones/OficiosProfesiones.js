// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import {
//   Button,
//   ButtonBase,
//   FormControl,
//   Icon,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   TextField,
//   Avatar,
// } from "@mui/material";
// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
// import { useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import Collapse from '@mui/material/Collapse';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Select from '@mui/material/Select';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Box from '@mui/material/Box'
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { height } from '@mui/system';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import * as yup from 'yup';
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import Alert from '@mui/material/Alert';
// import Swal from 'sweetalert2'

// import { DownOutlined } from '@ant-design/icons';
// import { Badge, Dropdown, Space, Table } from 'antd';
// import { keyBy } from 'lodash';


// function OficionesProfesionesIndex() {
//   const [searchText, setSearchText] = useState('');
//   const [mostrarIndex, setmostrarIndex] = useState(true);
//   const [mostrarAdd, setmostrarAdd] = useState(false);
//   const [Eliminar, setEliminar] = useState(false);

//   const DialogEliminar = () => {
//     setEliminar(!Eliminar);
//   };

//   const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-right',
//     iconColor: 'red',
//     width: 400,
//     customClass: {
//       popup: 'colored-toast'
//     },
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true
//   })

//   const Toast2 = Swal.mixin({
//     toast: true,
//     position: 'top-right',
//     iconColor: 'green',
//     width: 400,
//     customClass: {
//       popup: 'colored-toast'
//     },
//     showConfirmButton: false,
//     timer: 3000,
//     timerProgressBar: true
//   })


//   {/* Validaciones de la pantalla de crear*/ }
//   const defaultAccountValues = {
//     prof_Descripcion: '',
//   }

//   const accountSchema = yup.object().shape({
//     prof_Descripcion: yup.string().required(''),
//   })

//   const [anchorEl, setAnchorEl] = useState({});

//   const handleClick = (event, id) => {
//     setAnchorEl(prevState => ({
//       ...prevState,
//       [id]: event.currentTarget,
//     }));
//   };

//   const handleClose = (id) => {
//     setAnchorEl(prevState => ({
//       ...prevState,
//       [id]: null,
//     }));
//   };

//   const handleEdit = (id) => {
//     console.log(id);
//     // Lógica para manejar la edición de la fila con el ID proporcionado
//     handleClose(id);
//   };

//   const handleDetails = (id) => {
//     // Lógica para manejar la visualización de detalles de la fila con el ID proporcionado
//     handleClose(id);
//   };

//   const handleDelete = (id) => {
//     // Lógica para manejar la eliminación de la fila con el ID proporcionado
//     handleClose(id);
//   };

//   const [filas, setFilas] = React.useState(10);

//   const handleChange = (event) => {
//     setFilas(event.target.value);
//   };


//   {/* Columnas de la tabla */ }
//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     },
//     {
//       title: 'Nombre',
//       dataIndex: 'nombre',
//       key: 'nombre',
//     },
//     {
//       title: 'Acciones',
//       key: 'operation',
//       render: (params) =>
//         <div key={params.id}>
//           <Stack direction="row" spacing={1}>
//             <Button
//               aria-controls={`menu-${params.id}`}
//               aria-haspopup="true"
//               onClick={(e) => handleClick(e, params.id)}
//               variant="contained"
//               style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
//               startIcon={<Icon>menu</Icon>}
//             >
//               Opciones
//             </Button>
//             <Menu
//               id={`menu-${params.id}`}
//               anchorEl={anchorEl[params.id]}
//               keepMounted
//               open={Boolean(anchorEl[params.id])}
//               onClose={() => handleClose(params.id)}
//             >
//               <MenuItem onClick={() => handleEdit(params.id)}>
//                 <Icon>edit</Icon> Editar
//               </MenuItem>
//               <MenuItem onClick={() => handleDetails(params.id)}>
//                 <Icon>visibility</Icon> Detalles
//               </MenuItem>
//               <MenuItem onClick={() => handleDelete(params.id)}>
//                 <Icon>delete</Icon> Eliminar
//               </MenuItem>
//             </Menu>
//           </Stack>
//         </div>
//       ,
//     },
//   ];


//   {/* Datos de la tabla */ }
//   const data = [];
//   for (let i = 0; i < 50; ++i) {
//     data.push({
//       key: i.toString(),
//       id: i.toString(),
//       nombre: 'Profesion ' + i,
//       // tabla: [
//       //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
//       //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
//       //   // Add more rows to the nested table here...
//       // ],
//     });
//   }

//   {/* Función para mostrar la tabla y mostrar agregar */ }
//   const VisibilidadTabla = () => {
//     setmostrarIndex(!mostrarIndex);
//     setmostrarAdd(!mostrarAdd);
//     reset(defaultAccountValues);

//   };

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };

//   {/* Filtrado de datos */ }
//   const filteredRows = data.filter((row) =>
//     Object.values(row).some((value) =>
//       typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
//     )
//   );


//   const { handleSubmit, register, reset, control, watch, formState } = useForm({
//     defaultAccountValues,
//     mode: 'all',
//     resolver: yupResolver(accountSchema),
//   });

//   const { isValid, dirtyFields, errors } = formState;

//   const onSubmit = (data) => {
//     if (data.prof_Descripcion != null) {
//       if (data.prof_Descripcion.trim() === '') {
//         Toast.fire({
//           icon: 'error',
//           title: 'No se permiten campos vacios',
//         });
//       } else {

//         VisibilidadTabla();
//         Toast2.fire({
//           icon: 'success',
//           title: 'Datos guardados exitosamente',
//         });

//       }
//     } else {
//       Toast.fire({
//         icon: 'error',
//         title: 'No se permiten campos vacios',
//       });
//     }
//   };

//   const GuardarOcupacion = () => {
//     const formData = watch();
//     onSubmit(formData);
//     handleSubmit(onSubmit)();
//     reset(defaultAccountValues);
//   };



//   return (
//     <Card sx={{ minWidth: 275, margin: '40px' }}>
//       <CardMedia
//         component="img"
//         height="200"
//         image="https://i.ibb.co/K0h73Hw/OFICIO-PROFESIONES-1.png"
//         alt="Encabezado de la carta"
//       />
//       <Collapse in={mostrarIndex}>
//         <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

//           {/* Botón de Nuevo */}
//           <Stack direction="row" spacing={1}>
//             <Button
//               startIcon={<Icon>add</Icon>}
//               variant="contained"
//               color="primary"
//               style={{ borderRadius: '10px' }}
//               sx={{
//                 backgroundColor: '#634A9E', color: 'white',
//                 "&:hover": { backgroundColor: '#6e52ae' },
//               }}
//               onClick={VisibilidadTabla}
//             >
//               Nuevo
//             </Button>
//           </Stack>

//           <Stack direction="row" spacing={1}>
//             <label className='mt-8'>Filas por página:</label>
//             <FormControl sx={{ minWidth: 50 }} size="small">
//               {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
//               <Select
//                 labelId="demo-select-small-label"
//                 id="demo-select-small"
//                 value={filas}
//                 // label="Filas"  
//                 onChange={handleChange}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={20}>20</MenuItem>
//                 <MenuItem value={30}>30</MenuItem>
//               </Select>
//             </FormControl>

//             {/* Barra de Busqueda en la Tabla */}
//             <TextField
//               style={{ borderRadius: '10px' }}
//               placeholder='Buscar'
//               value={searchText}
//               onChange={handleSearchChange}
//               size="small"
//               variant="outlined"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <IconButton edge="start">
//                       <SearchIcon />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//           </Stack>
//         </CardContent>
//       </Collapse>






//       {/* Tabla */}
//       <Collapse in={mostrarIndex}>
//         <div className='center' style={{ width: '95%', margin: 'auto' }}>

//           <Table
//             columns={columns}
//             // expandable={{
//             //   expandedRowRender: (record) => <Table columns={columns} dataSource={record.tabla} pagination={false} />,
//             //   rowExpandable: (record) => record.name !== 'Not Expandable',
//             // }}
//             dataSource={filteredRows}
//             size="small"
//             pagination={{
//               pageSize: filas
//               , className: 'decoration-white'
//             }}

//           />
//         </div>
//       </Collapse>






//       {/* Formulario Agregar */}
//       <Collapse in={mostrarAdd}>
//         <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//           <Grid container spacing={3}>


//             <Grid item xs={6}>
//               <div className="mt-48 mb-16" style={{width: '500px', marginLeft: '230px'}}>
//                 <Controller
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label="Ocupación"
//                       variant="outlined"
//                       error={!!errors.prof_Descripcion}

//                       placeholder='Ingrese una ocupación'
//                       fullWidth
//                       InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
//                     />
//                   )}
//                   name="prof_Descripcion"
//                   control={control}
//                 />
//               </div>
//             </Grid>

//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
//               <Button
//                 startIcon={<Icon>checked</Icon>}
//                 variant="contained"
//                 color="primary"
//                 style={{ borderRadius: '10px', marginRight: '10px' }}
//                 sx={{
//                   backgroundColor: '#634A9E', color: 'white',
//                   "&:hover": { backgroundColor: '#6e52ae' },
//                 }}
//                 onClick={GuardarOcupacion}
//               >
//                 Guardar
//               </Button>

//               <Button
//                 startIcon={<Icon>close</Icon>}
//                 variant="contained"
//                 color="primary"
//                 style={{ borderRadius: '10px' }}
//                 sx={{
//                   backgroundColor: '#DAD8D8', color: 'black',
//                   "&:hover": { backgroundColor: '#BFBABA' },
//                 }}
//                 onClick={VisibilidadTabla}
//               >
//                 Cancelar
//               </Button>
//             </Grid>

//           </Grid>
//         </CardContent>
//       </Collapse>


//       <Dialog
//         open={Eliminar}
//         fullWidth="md"
//         onClose={DialogEliminar}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           Confirmación de Eliminación
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             ¿Está seguro(a) que desea eliminar este registro?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
//             <Button
//               startIcon={<Icon>checked</Icon>}
//               variant="contained"
//               color="primary"
//               style={{ borderRadius: '10px', marginRight: '10px' }}
//               sx={{
//                 backgroundColor: '#634A9E', color: 'white',
//                 "&:hover": { backgroundColor: '#6e52ae' },
//               }}
//               onClick={DialogEliminar}
//             >
//               Eliminar
//             </Button>

//             <Button
//               startIcon={<Icon>close</Icon>}
//               variant="contained"
//               color="primary"
//               style={{ borderRadius: '10px' }}
//               sx={{
//                 backgroundColor: '#DAD8D8', color: 'black',
//                 "&:hover": { backgroundColor: '#BFBABA' },
//               }}
//               onClick={DialogEliminar}
//             >
//               Cancelar
//             </Button>
//           </Grid>
//         </DialogActions>
//       </Dialog>

//     </Card>
//   );
// }

// export default OficionesProfesionesIndex;


/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  MenuItem,
  Menu,
  Box,
  Collapse,
  Typography,
  Select,
  Autocomplete,
  Grid,
  Stack,
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  FormLabel,
  Divider,
  Chip,
  CircularProgress
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table } from "antd";
import axios from 'axios';

import "src/styles/custom-pagination.css";

const loadingIcon = (
  <>
    <Grid
      container
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Grid item xs={12}>
        <CircularProgress style={{ color: "#634a9e" }} />
      </Grid>
      <Grid item xs={12}>
        Cargando...
      </Grid>
    </Grid>
  </>
);

function OficionesProfesionesIndex() {

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [idEliminar, setidEliminar] = useState(0);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  //Constante de los valores de los textfield de la pantalla
  const [id, setId] = useState("");
  const [oficios, setOficios] = useState("");
  //Constante solo para que quitar el error de los textfield no controlados
  const [message, setMessage] = useState();


  //Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([])
  const [DataDetalles, setDataDetalles] = useState([])
  const [data, setData] = useState([])
  const camposToFilter = ["id", "oficios"];

  useEffect(() => {
    CargarDatosTabla();
  }, []);

  const CargarDatosTabla = async () => {
    try {
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };

      const url = 'https://simexpro.azurewebsites.net/api/Oficio_Profesiones/Listar';
      const response = await axios.get(url, {
        headers: customHeaders,
      });
      const rows = response.data.map(item => {
        return {
          id: item.ofpr_Id,
          oficios: item.ofpr_Nombre,
        }
      });
      setDataTabla(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };


  //Constantes para el dialog de eliminar
  const [Eliminar, setEliminar] = useState(false);
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const EliminarRegistro = async () => {
    let payload = {
      ofpr_Id: idEliminar,
      usua_UsuarioEliminacion: 1,
      ofpr_FechaEliminacion: new Date()
    };

    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };

    const response = await axios.post(process.env.REACT_APP_API_URL + 'api/Oficio_Profesiones/Eliminar',
      payload, {
      headers: customHeaders,
    });

    console.log(response)
    if (response.data.data.codeStatus === 1) {
      DialogEliminar();
      CargarDatosTabla();
      ToastSuccessEliminar();
    } else {
      ToastErrorApi();
    }
  }

  //Constante para el detalle de las pantallas
  const DetallesTabla = (rowId, oficios) => {
    setId(rowId);
    setOficios(oficios);

    const detalles = DataDetalles.find(d => d.ofic_Id === rowId)

    const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
    // tableRows[0].cells[1].textContent = detalles.usua_UsuarioCreacion;
    // tableRows[0].cells[2].textContent = detalles.ofpr_FechaCreacion;
    // tableRows[1].cells[3].textContent = detalles.usua_UsuarioModificacion;
    // tableRows[1].cells[4].textContent = detalles.ofpr_FechaModificacion;
  };

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (id, oficios) => {
    setValueEditar("oficiosEditar", oficios)
    setOficios(oficios);
    setId(id);
    MostrarCollapseEditar();
    handleClose(id);
  };

  // const handleEdit = (id, oficinas) => {
  //   const formData2 = watch();
  //   console.log(formData2)
  //   formData2.oficinasEditar = oficinas;
  //   console.log(formData2)
  //   setOficinas(oficinas);
  //   setId(id);   
  //   MostrarCollapseEditar();
  //   handleClose(id);
  // };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (id, oficios, params) => {
    DetallesTabla(id, oficios);
    MostrarCollapseDetalles();
    setDataDetalles(params)
    handleClose(id);
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (id) => {
    DialogEliminar();
    setidEliminar(id);
    handleClose(id);
  };

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "ID",
      dataIndex: "ofpr_Id",
      key: "ofpr_Id",
      sorter: (a, b) => a.ofpr_Id - b.ofpr_Id, //sorting para Numeros
    },
    {
      title: "Ocupacion",
      dataIndex: "ofpr_Nombre",
      key: "ofpr_Nombre",
      sorter: (a, b) => a.ofpr_Nombre.localeCompare(b.ofpr_Nombre), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.ofpr_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.ofpr_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.ofpr_Id)}
              variant="contained"
              style={{
                borderRadius: "10px",
                backgroundColor: "#634A9E",
                color: "white",
              }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.ofpr_Id}`}
              anchorEl={anchorEl[params.ofpr_Id]}
              keepMounted
              open={Boolean(anchorEl[params.ofpr_Id])}
              onClose={() => handleClose(params.ofpr_Id)}
            >
              <MenuItem onClick={() => handleEdit(params.ofpr_Id, params.ofpr_Nombre)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.ofpr_Id, params.ofpr_Nombre,params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              {/* <MenuItem onClick={() => handleDelete(params.id)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem> */}
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  //Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };

  //Constante que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
    if (searchText === "") {
      return true; //Mostrar todas las filas si el buscador está vacio
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue = typeof value === 'number' ? value.toString() : value.toString().toLowerCase();
        const formattedSearchText = typeof searchText === 'number' ? searchText.toString() : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
  });

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
  const ToastSuccess = () => {
    toast.success('Datos ingresados correctamente.', {
      theme: 'dark',
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  const ToastSuccessEditar = () => {
    toast.success('Dato editados correctamente.', {
      theme: 'dark',
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  const ToastSuccessEliminar = () => {
    toast.success('Dato eliminados correctamente.', {
      theme: 'dark',
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
    toast.warning('Error en el proceso del envio de los datos.', {
      theme: 'dark',
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  //Constante de los datos por defecto que tendran los formulario agregar
  const defaultOficiosValues = {
    oficios: "",
  };

  //Constante de los datos por defecto que tendran los formulario editar
  const defaultOficiosEditarValues = {
    oficiosEditar: "",
  };

  //Constante de los datos que serán requeridos para el formulario agregar
  const OficiosSchema = yup.object().shape({
    oficios: yup.string().required()
  });

  //Constante de los datos que serán requeridos para el formulario editar
  const OficiosEditarSchema = yup.object().shape({
    oficiosEditar: yup.string().required()
  });

  //Constante para mostrar el collapse de agregar un registro
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultOficiosValues);
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante para cerrar el collapse de agregar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultOficiosValues);
    CargarDatosTabla();
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultOficiosEditarValues);
    CargarDatosTabla();
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante que nos ayuda para las validaciones con yup para los formularios 
  const { handleSubmit, reset, control, watch, formState, setValue } = useForm({
    defaultOficiosValues,
    mode: "all",
    resolver: yupResolver(OficiosSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  //Constante que nos ayuda para las validaciones con yup para los formularios de editar
  const { handleSubmit: handleSubmitEditar, reset: resetEditar, control: ControlEditar, watch: watchEditar, formState: formStateEditar, setValue: setValueEditar } = useForm({
    defaultOficiosEditarValues,
    mode: "all",
    resolver: yupResolver(OficiosEditarSchema),
  });

  const { errors: ErrorsEditar } = formStateEditar;


  const [valida, setValida] = useState(true);

  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de agregar
  const ValidacionAgregar = async (data) => {
    let isValid = true;

    if (data.oficios != null) {
      console.log("1")
      if (data.oficios.trim() === "") {
        ToastWarning();
        console.log("2")
      } else {
        console.log("3")
        isValid = false;
        let respuesta = await EjecutarEndPoint(data);
        console.log(respuesta)
        if (respuesta === 1) {
          ToastSuccess();
          CerrarCollapseAgregar();
          isValid = false;
        } if (respuesta === 2) {
          isValid = false;
          ToastInfoWarning();
        } if (respuesta === 3) {
          isValid = false;;
          ToastErrorApi();
        } if (respuesta === 4) {
          isValid = false;
          ToastErrorApi();
        }
        return isValid;
      }
    } else {
      setValida(true);
      return isValid;
    }
    return isValid;
  }

  //Ejecutar end point de tipo async para esperar la respuest

  const EjecutarEndPoint = async (data) => {
    console.log(data);
    let payload = {
      ofpr_Nombre: data.oficios,
      usua_UsuarioCreacion: 1,
      ofpr_FechaCreacion: new Date(),
    };
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    try {
      const response = await axios.post('https://simexpro.azurewebsites.net/api/Oficio_Profesiones/Insertar',
        payload,
        {
          headers: customHeaders,
        }
      );
      console.log(response)
      if (response.data.data != null) {
        console.log("Data distinta de null")
        if (response.data.data.codeStatus === 1) {
          console.log("Datos ingresados conrrectamente")
          return 1;
        } else {
          console.log("Error en otras cosas")
          return 3;
        }
      } else {
        console.log("Datos duplicados")
        return 2;
      }
    } catch (error) {
      // Manejar el error aquí si es necesario
      console.error(error);
      return 4; // o algún otro valor que indique un error
    }
  };


  //Constante para ejecutar las validaciones y el envio del formulario en el boton de agregar en el collapse de agregar
  const AgregarRegistro = async () => {
    const formData = watch();
    console.log(formData);
    const validationResult = await ValidacionAgregar(formData);

    console.log("0.5");
    console.log(validationResult);

    if (validationResult) {
      console.log(validationResult);
      handleSubmit(ValidacionAgregar)();
      console.log("10");
    }
  };

  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
  const ValidacionesEditar = async (data) => {
    let isValid = true;

    if (data.oficiosEditar != null) {
      console.log("1")
      if (data.oficiosEditar.trim() === '') {
        ToastWarning();
        console.log("2")
      } else {
        console.log("3")
        isValid = false;
        let respuesta = await EjecutarEndPointEditar(data);
        console.log(respuesta)
        if (respuesta === 1) {
          ToastSuccessEditar();
          CerrarCollapseEditar();
          isValid = false;
        } if (respuesta === 2) {
          isValid = false;
          ToastInfoWarning();
        } if (respuesta === 3) {
          isValid = false;;
          ToastErrorApi();
        } if (respuesta === 4) {
          isValid = false;
          ToastErrorApi();
        }
        return isValid;
      }
    } else {
      setValida(true);
      return isValid;
    }
    return isValid;
  };


  //Ejecutar end point de tipo async para esperar la respuesta
  const EjecutarEndPointEditar = async (data) => {
    console.log(data);
    let payload = {
      ofpr_Id: id,
      ofpr_Nombre: data.oficiosEditar,
      usua_UsuarioModificacion: 1,
      ofpr_FechaModificacion: new Date()
    }
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    try {
      const response = await axios.post('https://simexpro.azurewebsites.net/api/Oficio_Profesiones/Editar',
        payload,
        {
          headers: customHeaders,
        }
      );
      console.log(response);
      if (response.data.data != null) {
        console.log("Data distinta de null")
        if (response.data.data.codeStatus === 1) {
          console.log("Datos ingresados conrrectamente")
          return 1;
        } else {
          console.log("Error en otras cosas")
          return 3;
        }
      } else {
        console.log("Datos duplicados")
        return 2;
      }
    } catch (error) {
      // Manejar el error aquí si es necesario
      console.error(error);
      return 4; // o algún otro valor que indique un error
    }
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
  const EditarRegistro = async () => {
    const formData = watchEditar();
    console.log(formData);
    // formData.oficinasEditar = oficinas;
    const validationResult = await ValidacionesEditar(formData);

    console.log("0.5");
    console.log(validationResult);

    if (validationResult) {
      console.log(validationResult);
      handleSubmit(ValidacionesEditar)();
      console.log("10");
    }
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
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/K0h73Hw/OFICIO-PROFESIONES-1.png"
        alt="Encabezado de la carta"
      />
      {/*Collapse del index*/}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Botón de Nuevo Inicio*/}
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={MostrarCollapseAgregar}
            >
              Nuevo
            </Button>
          </Stack>
          {/* Botón de Nuevo Fin */}

          {/* Select para las filas de la tabla inicio*/}
          <Stack direction="row" spacing={1}>
            <label className="mt-8">Filas por página:</label>
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
            {/* Select para las filas de la tabla fin*/}

            {/* Barra de Busqueda en la Tabla inicio */}
            <TextField
              style={{ borderRadius: "10px" }}
              placeholder="Buscar"
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
            {/* Barra de Busqueda en la Tabla fin */}
          </Stack>
        </CardContent>
      </Collapse>

      {/* Mostrar tabla index inicio*/}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            // expandable={{
            //   expandedRowRender: (record) => <Table columns={columns} dataSource={record.tabla} pagination={false} />,
            //   rowExpandable: (record) => record.name !== 'Not Expandable',
            // }}
            dataSource={filteredRows}
            size="small"
            locale={{ emptyText: loadingIcon }}
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
            }}
          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}

      {/* Collapse para el formulario de agregar un registro inicio*/}
      <Collapse in={mostrarAgregar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.oficios} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Ocupación
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.oficios}
                      placeholder="Ingrese el nombre del oficio u profesión"
                      fullWidth={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="oficios"
                control={control}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right", }}>
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
                onClick={AgregarRegistro}
              >
                Guardar
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
                onClick={CerrarCollapseAgregar}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para el formulario de agregar un registro fin*/}

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
              <Controller
                render={({ field }) => (
                  <FormControl error={!!ErrorsEditar.oficiosEditar} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Ocupación
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!ErrorsEditar.oficiosEditar}
                      placeholder="Ingrese el nombre del oficio u profesión a editar"
                      fullWidth={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="oficiosEditar"
                control={ControlEditar}
              />
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
                onClick={CerrarCollapseEditar}
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
            <Grid item xs={12} style={{ marginBottom: '30px' }}>
              <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                <Chip label="Detalles de la Ocupacion" />
              </Divider>
            </Grid>

            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", marginBottom: '40px' }}>
              <Box sx={{ flex: 1, textAlign: "center", }} >
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Ocupación Id:
                  </Typography>
                  <Typography>{DataDetalles['ofpr_Id']}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Ocupacón descripción:
                  </Typography>
                  <Typography>{DataDetalles['ofpr_Nombre']}</Typography>
                </InputLabel>
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
                    <td style={tableCellStyle}>{DataDetalles['usuarioCreacionNombre']}</td>
                    <td style={tableCellStyle}>
                      {DataDetalles['ofpr_FechaCreacion']
                        ? new Date(DataDetalles['ofpr_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{DataDetalles['usuarioModificadorNombre']}</td>
                    <td style={tableCellStyle}>
                      {DataDetalles['ofpr_FechaModificacion']
                        ? new Date(DataDetalles['ofpr_FechaModificacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            
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

      {/* Dialog para eliminar un registro inicio*/}
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
              onClick={EliminarRegistro}
            >
              Eliminar
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
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      {/* Dialog para eliminar un registro fin*/}
      <ToastContainer />
    </Card>
  );
}

export default OficionesProfesionesIndex;