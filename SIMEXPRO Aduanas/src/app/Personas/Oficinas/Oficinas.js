// /* eslint-disable no-lone-blocks */
// /* eslint-disable prettier/prettier */
{
  // import React, { useEffect } from 'react'
  // import axios from 'axios';
  // import Card from '@mui/material/Card';
  // import CardContent from '@mui/material/CardContent';
  // import CardMedia from '@mui/material/CardMedia';
  // import {
  //   Button,
  //   ButtonBase,
  //   FormControl,
  //   FormLabel,
  //   Icon,
  //   IconButton,
  //   InputAdornment,
  //   InputLabel,
  //   TextField,
  //   Avatar,
  // } from "@mui/material";
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

  // import * as yup from 'yup';
  // import { useForm, Controller } from 'react-hook-form'
  // import { yupResolver } from '@hookform/resolvers/yup'
  // import Swal from 'sweetalert2';

  // import Menu from '@mui/material/Menu';
  // import MenuItem from '@mui/material/MenuItem';

  // import { DownOutlined } from '@ant-design/icons';
  // import { Badge, Dropdown, Space, Table } from 'antd';
  // import { keyBy } from 'lodash';

  // import { toast, ToastContainer } from 'react-toastify';
  // import 'react-toastify/dist/ReactToastify.css';

  // function OficinasIndex() {
  //   const [searchText, setSearchText] = useState('');
  //   const [mostrarIndex, setmostrarIndex] = useState(true);
  //   const [mostrarAgregar, setmostrarAgregar] = useState(false);
  //   const [mostrarEditar, setmostrarEditar] = useState(false);
  //   const [mostrarDetalles, setmostrarDetalles] = useState(false);

  //   const [id, setId] = useState("");
  //   const [oficina, setOficina] = useState("");

  //   const DetallesTabla = (rowId, oficina) => {
  //     setId(rowId);
  //     setOficina(oficina);

  //   };
  //   const [Eliminar, setEliminar] = useState(false);
  //   const DialogEliminar = () => {
  //     setEliminar(!Eliminar);
  //   };

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

  //   //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  //   useEffect(() => {
  //     FetchDataOficinas();
  //   }, []);

  //   const handleEdit = (id, oficina) => {
  //     // Implementa la función para editar aquí
  //     setId(id);
  //     setOficina(oficina);
  //     MostrarCollapseEditar();
  //     handleClose(id);
  //   };

  //   const handleDetails = (id, oficina) => {
  //       // Implementa la función para detalles aquí
  //       DetallesTabla(id, oficina);
  //       MostrarCollapseDetalles();
  //       handleClose(id);
  // };

  //  //Constante para mostrar el collapse de agregar un registro
  //  const MostrarCollapseAgregar = () => {
  //   setmostrarIndex(!mostrarIndex);
  //   setmostrarAgregar(!mostrarAgregar);
  //   reset(defaultOficinasValues);
  // };
  //   //Constante para mostrar el collapse de editar un registro
  //   const MostrarCollapseEditar = () => {
  //     setmostrarIndex(!mostrarIndex);
  //     setmostrarEditar(!mostrarEditar);
  //     reset(defaultOficinasValues);
  //   };

  //   //Constante para mostrar el collapse de detalles un registro
  //   const MostrarCollapseDetalles = () => {
  //     setmostrarIndex(!mostrarIndex);
  //     setmostrarDetalles(!mostrarDetalles);
  //   };

  // const handleDelete = (id) => {
  //   // Implementa la función para eliminar aquí
  //   handleClose(id);
  // };

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
  //       title: 'Oficina',
  //       dataIndex: 'oficina',
  //       key: 'oficina',
  //       sorter: (a, b) => a.oficina.localeCompare(b.oficina),
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
  //               <MenuItem onClick={() => handleEdit(params.id, params.oficina)}>
  //                 <Icon>edit</Icon> Editar
  //               </MenuItem>
  //               <MenuItem onClick={() => handleDetails(params.id, params.oficina)}>
  //                 <Icon>visibility</Icon> Detalles
  //               </MenuItem>
  //               <MenuItem onClick={() => DialogEliminar(params.id)}>
  //                 <Icon>delete</Icon> Eliminar
  //               </MenuItem>
  //             </Menu>
  //           </Stack>
  //         </div>
  //       ,
  //     },
  //   ];

  //     //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
  //     const EditarRegistro = () => {
  //       const formData = watch();
  //       formData.oficina = oficina;
  //       ValidacionesEditar(formData);
  //       setTimeout(() => {  
  //         reset(defaultOficinasValues);
  //         handleSubmit(ValidacionesEditar)();
  //       }, "250")
  //     };

  //       //Constante para cerrar el collapse de agregar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  //   const CerrarCollapseAgregar = () => {
  //     setmostrarIndex(!mostrarIndex);
  //     setmostrarAgregar(!mostrarAgregar);
  //     reset(defaultOficinasValues);
  //     FetchDataOficinas();

  //   };

  //     //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  //     const CerrarEditar = () => {
  //     setmostrarIndex(!mostrarIndex);
  //     setmostrarEditar(!mostrarEditar);
  //     reset(defaultOficinasValues);
  //   };

  //   //Constante para cerrar el collapse de detalles
  //   const CerrarDetalles = () => {
  //     setmostrarIndex(!mostrarIndex);
  //     setmostrarDetalles(!mostrarDetalles);
  //   };

  //     //Constante para alinear los iconos de la tabla de detalles con los headers de la tabla y cambiar el color a los iconos
  //     const iconStyle = {
  //       marginRight: "5px",
  //       verticalAlign: "middle",
  //       color: "#634a9e",
  //     };

  //      //Constante para los estilos de los headers de la tabla de detalles
  //   const tableHeaderStyle = {
  //     verticalAlign: "middle",
  //     padding: "15px",
  //     textAlign: "left",
  //     borderBottom: "1px solid #ddd",
  //     backgroundColor: "#f2f2f2",
  //   };

  //   //Constante para los estilos de los filas de la tabla de detalles
  //   const tableRowStyle = {
  //     "&:hover": {
  //       backgroundColor: "coral",
  //     },
  //   };

  //   //Constante para los estilos de los celdas de la tabla de detalles
  //   const tableCellStyle = {
  //     verticalAlign: "middle",
  //     padding: "15px",
  //     textAlign: "left",
  //     borderBottom: "1px solid #ddd",
  //   };

  //   const defaultOficinasValues = {
  //     oficinas: "",
  //   }

  //   const OficinasSchema = yup.object().shape({
  //     oficinas: yup.string().required(),
  //   })

  //   // const AgregarRegistro = () => {
  //   //   const formData = watch();
  //   //   ValidacionAgregar(formData);
  //   //   handleSubmit(ValidacionAgregar)();
  //   //   reset(defaultOficinasValues);
  //   // };

  //   const Masiso = async () => {
  //     const formData = watch();
  //     console.log(formData)
  //     const validationResult = await ValidacionAgregar(formData);

  //     console.log("0.5");
  //     console.log(validationResult);

  //     if (validationResult) {
  //       console.log(validationResult);
  //       handleSubmit(ValidacionAgregar)();
  //       console.log("10");
  //     }

  //     // ValidacionAgregar(formData); 
  //     // handleSubmit(ValidacionAgregar)();
  //     // reset(defaultOficinasValues);
  //   };

  // const[data, setData] = useState([])

  // useEffect(() => {
  //   FetchDataOficinas();
  // }, []);

  // const FetchDataOficinas = async () => {
  //   try {
  //     const customHeaders = {
  //       'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
  //     };

  //     const url = 'https://simexpro.azurewebsites.net/api/Oficinas/Listar';
  //     const response = await axios.get(url, {
  //       headers: customHeaders,
  //     });
  //     console.log(response)
  //     const rows = response.data.map(item => {
  //       return {
  //         id: item.ofic_Id,
  //         oficina: item.ofic_Nombre,
  //       }
  //     });
  //     setData(rows);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  //     // {/* Datos de la tabla */ }
  //     // const data = [];
  //     // for (let i = 0; i < 50; ++i) {
  //     //   data.push({
  //     //     key: i.toString(),
  //     //     id: i.toString(),
  //     //     oficina: 'oficina ' + i,
  //     //     // tabla: [
  //     //     //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
  //     //     //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
  //     //     //   // Add more rows to the nested table here...
  //     //     // ],
  //     //   });
  //     // }

  //     const handleSearchChange = (event) => {
  //       setSearchText(event.target.value);
  //     };

  //     {/* Filtrado de datos */ }
  //     const filteredRows = data.filter((row) =>
  //       Object.values(row).some((value) =>
  //         typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
  //       )
  //     );

  //   const VisibilidadTabla = () => {
  //     setmostrarIndex(!mostrarIndex);
  //     setmostrarAgregar(!mostrarAgregar);
  //   };

  //   const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
  //     defaultOficinasValues,
  //     mode: "all",
  //     resolver: yupResolver(OficinasSchema),
  //   });


  //     //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
  //     const ToastSuccess =() => {
  //       toast.success('Datos ingresados correctamente.', {
  //         theme: 'dark',
  //         style: {
  //           marginTop: '50px'
  //         },
  //         autoClose: 1500,
  //         closeOnClick: true
  //       });
  //     }

  //       const ToastWarning = () => {
  //         toast.warning('No se permiten campos vacios.', {
  //           theme: 'dark',
  //           //  position: toast.POSITION.BOTTOM_RIGHT
  //           style: {
  //             marginTop: '50px'
  //           },
  //           autoClose: 1500,
  //           closeOnClick: true
  //         });
  //       }

  //       const ToastInfoWarning = () => {
  //         toast.warning('El dato que desea ingresar ya existe.', {
  //           theme: 'dark',
  //           //  position: toast.POSITION.BOTTOM_RIGHT
  //           style: {
  //             marginTop: '50px'
  //           },
  //           autoClose: 1500,
  //           closeOnClick: true
  //         });
  //       }

  //       const ToastErrorApi = () => {
  //         toast.warning('Error en el proceso del envio de los datos.', {
  //           theme: 'dark',
  //           //  position: toast.POSITION.BOTTOM_RIGHT
  //           style: {
  //             marginTop: '50px'
  //           },
  //           autoClose: 1500,
  //           closeOnClick: true
  //         });
  //       }

  //   const { isValid, dirtyFields, errors, touchedFields } = formState;

  //   const [valida, setValida] = useState(true);

  //   const ValidacionAgregar = async (data) => {

  //     if (data.oficina != null) {
  //       console.log("2")
  //       if (data.oficina.trim() === "" || data.oficina[0] === "") {
  //           ToastWarning();
  //           console.log("3")
  //       } else {
  //           console.log("4")
  //           isValid = false;
  //           let respuesta = await EjecutarEndPoint(data);
  //           console.log(respuesta)
  //           if(respuesta === 1){
  //             ToastSuccess();
  //             CerrarCollapseAgregar(); 
  //             isValid = false; 
  //           } if (respuesta === 2){
  //             isValid = false;
  //             ToastInfoWarning();
  //           } if(respuesta  === 3){
  //             isValid = false;;
  //             ToastErrorApi();
  //           } if(respuesta === 4){
  //             isValid = false;
  //             ToastErrorApi();
  //           }
  //           return isValid;
  //       }
  //   }else{
  //     setValida(true);
  //     return isValid;
  //   }

  //     // if (data.oficinas != null) {
  //     //   if (data.oficinas.trim() === "" ) {
  //     //     toast.error('Datos no ingresados correctamente.', {
  //     //       theme: 'dark',
  //     //       style: {
  //     //         marginTop: '50px'
  //     //       },
  //     //       autoClose: 1500,
  //     //       closeOnClick: true
  //     //     });
  //     //   } else {
  //     //     toast.success('Datos ingresados correctamente.', {
  //     //       theme: 'dark',
  //     //       style: {
  //     //         marginTop: '50px'
  //     //       },
  //     //       autoClose: 1500,
  //     //       closeOnClick: true
  //     //     });
  //     //     setTimeout(() => {
  //     //       MostrarCollapseAgregar();
  //     //     }, 100); // Establece un pequeño retraso antes de llamar a MostrarCollapseAgregar
  //     //   }
  //     // } else {
  //     //   toast.error('Datos no ingresados correctamente.', {
  //     //     theme: 'dark',
  //     //     style: {
  //     //       marginTop: '50px'
  //     //     },
  //     //     autoClose: 1500,
  //     //     closeOnClick: true
  //     //   });
  //     // }
  //   };

  //    //Ejecutar end point de tipo async para esperar la respuesta
  //    const EjecutarEndPoint = async (data) => {
  //     console.log(data);
  //     let payload = {
  //       ofic_Nombre: data.oficina,
  //       usua_UsuarioCreacion: 1,
  //       ofic_FechaCreacion: new Date(),
  //     };
  //     const customHeaders = {
  //       'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
  //     };
  //     try {
  //       const response = await axios.post(
  //         process.env.REACT_APP_API_URL + 'api/Oficinas/Insertar',
  //         payload,
  //         {
  //           headers: customHeaders,
  //         }
  //       );

  //       if (response.data.data != null) {
  //         if (response.data.data.messageStatus === '1') {
  //           return 1;
  //         } else {
  //           if (response.data.data.messageStatus.includes('UNIQUE')) {
  //             return 2;
  //           } else {
  //             return 3;
  //           }
  //         }
  //       } else {
  //         return 4;
  //       }
  //     } catch (error) {
  //       // Manejar el error aquí si es necesario
  //       console.error(error);
  //       return 4; // o algún otro valor que indique un error
  //     }
  //   };

  //       //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
  //       const ValidacionesEditar = (data) => {
  //         if (data.oficinas != null) {
  //           if (data.oficinas.trim() === "") {
  //             toast.error('Datos no ingresados correctamente.', {
  //               theme: 'dark',
  //               style: {
  //                 marginTop: '50px'
  //               },
  //               autoClose: 1500,
  //               closeOnClick: true
  //             });
  //           } else {
  //             toast.success('Datos ingresados correctamente.', {
  //               theme: 'dark',
  //               style: {
  //                 marginTop: '50px'
  //               },
  //               autoClose: 1500,
  //               closeOnClick: true
  //             });
  //             setTimeout(() => {
  //               MostrarCollapseAgregar();
  //             }, 100);
  //           }
  //         } else {
  //           toast.fire({
  //             icon: "error",
  //             title: "No se permiten campos vacios",
  //           });
  //         }
  //       };


  //   return (
  //     <Card sx={{ minWidth: 275, margin: '40px' }}>
  //       <ToastContainer />
  //       <CardMedia
  //         component="img"
  //         height="200"
  //         image="https://i.ibb.co/BqmXTJV/OFICINAS.png"
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
  //               onClick={MostrarCollapseAgregar}
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
  //       <Collapse in={mostrarAgregar}>
  //         <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
  //           <Grid container spacing={3}>
  //             <Grid item xs={12}>
  //               <Typography variant="h5" gutterBottom>
  //               </Typography>
  //             </Grid>
  //             <Grid item xs={12} >
  //             <div className="mt-5 mb-16" style={{ width: '100%'}}>
  //                 <Controller
  //                   render={({ field }) => (
  //                     <FormControl error={!!errors.oficinas} fullWidth>
  //                     <FormLabel
  //                       className="font-medium text-10"
  //                       component="legend"
  //                     >
  //                       Oficina
  //                     </FormLabel>
  //                     <TextField
  //                       {...field}
  //                       variant="outlined"
  //                       error={!!errors.oficinas}
  //                       placeholder='Ingrese el nombre de la Oficina'
  //                       fullWidth={true}
  //                       InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
  //                     />
  //                   </FormControl>
  //                   )}
  //                   name="oficinas"
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
  //                 onClick={Masiso}
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
  //                 onClick={CerrarCollapseAgregar}
  //               >
  //                 Cancelar
  //               </Button>
  //             </Grid>

  //           </Grid>
  //         </CardContent>
  //       </Collapse>

  //         {/* Collapse para el formulario de editar un registro inicio*/}
  //         <Collapse in={mostrarEditar}>
  //             <CardContent
  //               sx={{
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //                 alignItems: "flex-start",
  //               }}
  //             >
  //               <Grid container spacing={3}>
  //               <Grid item xs={12} >
  //                 <div className="mt-1 mb-16">
  //                     <Controller
  //                       render={({ field }) => (
  //                         <TextField
  //                           {...field}
  //                           label="Oficina"
  //                           variant="outlined"
  //                           error={!!errors.oficinas}
  //                           fullWidth
  //                           InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
  //                           value={oficina}
  //                         />
  //                       )}
  //                       name="oficinas"
  //                       control={control}
  //                     />
  //                   </div>
  //                 </Grid>

  //                 <Grid
  //                   item
  //                   xs={12}
  //                   sx={{
  //                     display: "flex",
  //                     justifyContent: "right",
  //                     alignItems: "right",
  //                   }}
  //                 >
  //                   <Button
  //                     startIcon={<Icon>checked</Icon>}
  //                     variant="contained"
  //                     color="primary"
  //                     style={{ borderRadius: "10px", marginRight: "10px" }}
  //                     sx={{
  //                       backgroundColor: "#634A9E",
  //                       color: "white",
  //                       "&:hover": { backgroundColor: "#6e52ae" },
  //                     }}
  //                     onClick={EditarRegistro}
  //                   >
  //                     Editar
  //                   </Button>

  //                   <Button
  //                     startIcon={<Icon>close</Icon>}
  //                     variant="contained"
  //                     color="primary"
  //                     style={{ borderRadius: "10px" }}
  //                     sx={{
  //                       backgroundColor: "#DAD8D8",
  //                       color: "black",
  //                       "&:hover": { backgroundColor: "#BFBABA" },
  //                     }}
  //                     onClick={CerrarEditar}
  //                   >
  //                     Cancelar
  //                   </Button>
  //                 </Grid>
  //               </Grid>
  //             </CardContent>
  //           </Collapse>

  //         {/* Collapse para mostrar los detalles de un registro inicio*/}
  //           <Collapse in={mostrarDetalles}>
  //             <CardContent
  //               sx={{
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //                 alignItems: "flex-start",
  //               }}
  //             >   
  //             <Grid container spacing={3}> 
  //             <Grid item xs={12}>
  //                   <h2>Detalles de la Oficina</h2>   
  //                   </Grid>   
  //                   <Grid item xs={12}>   
  //                     <Box sx={{ display: "flex", flexDirection: "row" }}>
  //                       <Box sx={{ flex: 1 }}>
  //                         <InputLabel htmlFor="id">
  //                           <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
  //                             Oficina Id:
  //                           </Typography>
  //                           <Typography>{id}</Typography>
  //                         </InputLabel>
  //                         <br></br> 
  //                         <InputLabel htmlFor="descripcion">
  //                           <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
  //                             Oficina Descripcion:
  //                           </Typography>
  //                           <Typography>{oficina}</Typography>
  //                         </InputLabel>
  //                       </Box>
  //                     </Box>
  //                     </Grid> 
  //                     <br></br>   
  //                     <Grid item xs={12}>            
  //                           <table
  //                             id="detallesTabla"
  //                             style={{ width: "100%", borderCollapse: "collapse" }}
  //                           >
  //                             <thead>
  //                               <tr>
  //                                 <th style={tableHeaderStyle}>
  //                                   <Icon style={iconStyle}>edit</Icon>Accion
  //                                 </th>
  //                                 <th style={tableHeaderStyle}>
  //                                   <Icon style={iconStyle}>person</Icon>Usuario
  //                                 </th>
  //                                 <th style={tableHeaderStyle}>
  //                                   <Icon style={iconStyle}>date_range</Icon>Fecha y
  //                                   hora
  //                                 </th>
  //                               </tr>
  //                             </thead>
  //                             <tbody>
  //                               <tr style={tableRowStyle}>
  //                                 <td style={tableCellStyle}>
  //                                   <strong>Creación</strong>
  //                                 </td>
  //                                 <td style={tableCellStyle}>Usuario Creación</td>
  //                                 <td style={tableCellStyle}>00/00/0000</td>
  //                               </tr>
  //                               <tr style={tableRowStyle}>
  //                                 <td style={tableCellStyle}>
  //                                   <strong>Modificación</strong>
  //                                 </td>
  //                                 <td style={tableCellStyle}>Usuario Modificación</td>
  //                                 <td style={tableCellStyle}>00/00/0000</td>
  //                               </tr>
  //                             </tbody>
  //                           </table>
  //                           </Grid> 
  //                   <br></br>
  //                   <Grid item xs={12}>    
  //                   <div className="card-footer">
  //                     <Button
  //                       variant="contained"
  //                       onClick={CerrarDetalles}
  //                       startIcon={<Icon>arrow_back</Icon>}
  //                     >
  //                       Regresar
  //                     </Button>
  //                   </div>
  //                   </Grid>
  //                   </Grid>  
  //             </CardContent>
  //           </Collapse>
  //           {/* Collapse para mostrar los detalles de un registro fin*/}


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
  //           ¿Está seguro(a) que desea eliminar este registro?
  //           </DialogContentText>
  //         </DialogContent>
  //         <DialogActions>
  //         <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
  //               <Button
  //                 startIcon={<Icon>checked</Icon>}
  //                 variant="contained"
  //                 color="primary"
  //                 style={{ borderRadius: '10px', marginRight: '10px' }}
  //                 sx={{
  //                   backgroundColor: '#634A9E', color: 'white',
  //                   "&:hover": { backgroundColor: '#6e52ae' },
  //                 }}
  //                 onClick={DialogEliminar}
  //               >
  //                 Eliminar
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
  //                 onClick={DialogEliminar}
  //               >
  //                 Cancelar
  //               </Button>
  //             </Grid>
  //         </DialogActions>
  //       </Dialog>

  //     </Card>
  //   );
  // }

  // export default OficinasIndex;
}
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
  CircularProgress,
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

function OficinasIndex() {

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
  const [oficinas, setOficinas] = useState("");
  //Constante solo para que quitar el error de los textfield no controlados
  const [message, setMessage] = useState();


  //Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([])
  const [DataDetalles, setDataDetalles] = useState([])
  const [data, setData] = useState([])
  const camposToFilter = ["id", "oficinas"];

  //Campos de Auditoria
  const [usuarioCreacion, setUsuarioCreacion] = useState("");
  const [usuarioModificador, setUsuarioModificador] = useState("");
  const [FechaCreacion, setFechaCreacion] = useState();
  const [FechaModificacion, setFechaModificacion] = useState();
  const FechaCreacionForm = new Date(FechaCreacion).toLocaleString();


  useEffect(() => {
    CargarDatosTabla();
  }, []);

  const CargarDatosTabla = async () => {
    try {
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };

      const url = 'https://simexpro.azurewebsites.net/api/Oficinas/Listar';
      const response = await axios.get(url, {
        headers: customHeaders,
      });
      const rows = response.data.map(item => {
        return {
          id: item.ofic_Id,
          oficinas: item.ofic_Nombre,
          usuarioCreacion: item.usuarioCreacionNombre,
          FechaCreacion: item.ofic_FechaCreacion,
          NombreUsuarioCreacion: item.usuarioCreacionNombre,
          NombreUsuarioModificador: item.usuarioModificadorNombre,
          usuarioModificador: item.UsuarioModificadorNombre,
          FechaModificacion: item.ofic_FechaModificacion
        }
      });
      setDataTabla(rows);
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
      ofic_Id: idEliminar,
      usua_UsuarioEliminacion: 1,
      ofic_FechaEliminacion: new Date()
    };

    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };

    const response = await axios.post(process.env.REACT_APP_API_URL + 'api/Oficinas/Eliminar',
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
  const DetallesTabla = (rowId) => {
    const Detalles = DataTabla.find((registro) => registro.id === rowId)
    setDataDetalles(Detalles)
  };

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (id, oficinas) => {
    setValueEditar("oficinasEditar", oficinas)
    setOficinas(oficinas);
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
  const handleDetails = (id, oficinas, params) => {
    DetallesTabla(id);
    MostrarCollapseDetalles();
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
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id, //sorting para Numeros
    },
    {
      title: "Oficina",
      dataIndex: "oficinas",
      key: "oficinas",
      sorter: (a, b) => a.oficinas.localeCompare(b.oficinas), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.id)}
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
              id={`menu-${params.id}`}
              anchorEl={anchorEl[params.id]}
              keepMounted
              open={Boolean(anchorEl[params.id])}
              onClose={() => handleClose(params.id)}
            >
              <MenuItem onClick={() => handleEdit(params.id, params.oficinas)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id, params.oficinas, params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.id)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>
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
  const defaultOficinasValues = {
    oficinas: "",
  };

  //Constante de los datos por defecto que tendran los formulario editar
  const defaultOficinasEditarValues = {
    oficinasEditar: "",
  };

  //Constante de los datos que serán requeridos para el formulario agregar
  const OficinasSchema = yup.object().shape({
    oficinas: yup.string().required()
  });

  //Constante de los datos que serán requeridos para el formulario editar
  const OficinasEditarSchema = yup.object().shape({
    oficinasEditar: yup.string().required()
  });

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
    reset(defaultOficinasValues);
    CargarDatosTabla();
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultOficinasEditarValues);
    CargarDatosTabla();
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante que nos ayuda para las validaciones con yup para los formularios 
  const { handleSubmit, reset, control, watch, formState, setValue } = useForm({
    defaultOficinasValues,
    mode: "all",
    resolver: yupResolver(OficinasSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  //Constante que nos ayuda para las validaciones con yup para los formularios de editar
  const { handleSubmit: handleSubmitEditar, reset: resetEditar, control: ControlEditar, watch: watchEditar, formState: formStateEditar, setValue: setValueEditar } = useForm({
    defaultOficinasEditarValues,
    mode: "all",
    resolver: yupResolver(OficinasEditarSchema),
  });

  const { errors: ErrorsEditar } = formStateEditar;


  const [valida, setValida] = useState(true);

  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de agregar
  const ValidacionAgregar = async (data) => {
    let isValid = true;

    if (data.oficinas != null) {
      console.log("1")
      if (data.oficinas.trim() === "") {
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
      ofic_Nombre: data.oficinas,
      usua_UsuarioCreacion: 1,
      ofic_FechaCreacion: new Date(),
    };
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    try {
      const response = await axios.post('https://simexpro.azurewebsites.net/api/Oficinas/Insertar',
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

    if (data.oficinasEditar != null) {
      console.log("1")
      if (data.oficinasEditar.trim() === '') {
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
      ofic_Id: id,
      ofic_Nombre: data.oficinasEditar,
      usua_UsuarioModificacion: 1,
      ofic_FechaModificacion: new Date()
    }
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    try {
      const response = await axios.post('https://simexpro.azurewebsites.net/api/Oficinas/Editar',
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
        image="https://i.ibb.co/BqmXTJV/OFICINAS.png"
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
                  <FormControl error={!!errors.oficinas} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Oficinas
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.oficinas}
                      placeholder="Ingrese el nombre de la oficina"
                      fullWidth={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="oficinas"
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
                  <FormControl error={!!ErrorsEditar.oficinasEditar} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Oficina
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!ErrorsEditar.oficinasEditar}
                      placeholder="Ingrese el nombre de la oficina a editar"
                      fullWidth={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="oficinasEditar"
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
                    Oficina Id:
                  </Typography>
                  <Typography>{DataDetalles['id']}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Ocupacón descripción:
                  </Typography>
                  <Typography>{DataDetalles['oficinas']}</Typography>
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
                    <td style={tableCellStyle}>{DataDetalles['NombreUsuarioCreacion']}</td>
                    <td style={tableCellStyle}>
                      {DataDetalles['FechaCreacion']
                        ? new Date(DataDetalles['FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{DataDetalles['NombreUsuarioModificador']}</td>
                    <td style={tableCellStyle}>
                      {DataDetalles['FechaModificacion']
                        ? new Date(DataDetalles['FechaModificacion']).toLocaleString()
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

export default OficinasIndex;
