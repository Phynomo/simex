{
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import { Button, 
//   FormControl, 
//   Icon, IconButton, 
//   InputAdornment, 
//   InputLabel, 
//   TextField,
//   Box } from '@mui/material';
// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
// import { useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';

// import Zoom from '@mui/material/Zoom';
// import Grow from '@mui/material/Grow';

// import Collapse from '@mui/material/Collapse';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Select from '@mui/material/Select';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { DateTimePicker } from '@mui/x-date-pickers';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import * as yup from 'yup';
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup';
// import Alert from '@mui/material/Alert';
// import Swal from 'sweetalert2'
// import FormHelperText from '@mui/material/FormHelperText';
// import FormLabel from '@mui/material/FormLabel';

// import MUIDataTable from 'mui-datatables' 
// import { DownOutlined } from '@ant-design/icons';
// import { Badge, Dropdown, Space, Table } from 'antd';
// import { keyBy } from 'lodash';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// function MaquinaHistorialIndex() {
//   const [searchText, setSearchText] = useState('');
//   const [mostrarIndex, setmostrarIndex] = useState(true);
//   const [Eliminar, setEliminar] = useState(false);

//   const [users, setUsers] = useState([])
 
//   const [mostrarAgregar, setmostrarAgregar] = useState(false);
//   const [mostrarEditar, setmostrarEditar] = useState(false);
//   const [mostrarDetalles, setmostrarDetalles] = useState(false);

//   const [filas, setFilas] = React.useState(10);
//   const [anchorEl, setAnchorEl] = useState({});

//   const [maquina, setMaquina] = useState('');
//   const [observacion, setObservacion] = useState('');
//   const [fechaInicio, setFechaI] = useState('');
//   const[fechaFin, setFechaf] = useState('');

//   const [id, setid] = useState('');




//   const DialogEliminar = () => {
//     setEliminar(!Eliminar);
//   };
//   const handleClose = (id) => {
//     setAnchorEl(prevState => ({
//       ...prevState,
//       [id]: null,
//     }));
//   };


//       const handleEdit = (id,maquina, fechaInicio, fechaFin) =>
//       {
//         setMaquina(maquina);
//         setFechaI(fechaInicio);
//         setFechaf(fechaFin);
//         setid(id);
//         console.log(maquina);
//         MostrarCollapseEditar();
//         handleClose(id);
//       };


//       //Constante para cerrar el collapse de detalles
//       const CerrarCollapseDetalles = () => {
//         setmostrarIndex(!mostrarIndex);
//         setmostrarDetalles(!mostrarDetalles);
//       };
//         //Constante para mostrar el collapse de detalles un registro
//      const MostrarCollapseDetalles = () => {
//       setmostrarIndex(!mostrarIndex);
//       setmostrarDetalles(!mostrarDetalles);
//     };
//     //Constante para el detalle de las pantallas
//     const DetallesTabla = (rowId, maquina, fechaInicio, fechaFin) => {
//       setid(rowId);
//       setMaquina(maquina);
//       setFechaI(fechaInicio);
//       setFechaf(fechaFin);
//     };
  
//    //Constante abrir el collapse de los detalles de la pantalla
//    const handleDetails = (id, maquina, fechaInicio, fechaFin) => {
//     DetallesTabla(id, maquina,fechaInicio,fechaFin);
//     MostrarCollapseDetalles();
//     handleClose(id);
//   };

//   const handleDelete = (id) => {
//     DialogEliminar();
//     handleClose(id);
//   };


// /*Columnas de la tabla*/

// const columns = [
//   {
//     title: 'Id',
//     dataIndex: 'id',
//     key: 'id',
//     sorter: (a, b) => a.id - b.id, //sorting para Numeros
//   },
//   {
//     title: 'Máquina',
//     dataIndex: 'maquina',
//     key: 'maquina',
//     sorter: (a, b) => a.funcion.localeCompare(b.maquina), //sorting para Letras
//   },
//   {
//     title: 'Fecha de Inicio',
//     dataIndex: 'fechaInicio',
//     key: 'fechaInicio',
//     sorter: (a, b) => a.funcion.localeCompare(b.fechaInicio), //sorting para Letras
//   },
//   {
//     title: 'Fecha de Fin',
//     dataIndex: 'fechaFin',
//     key: 'fechaFin',
//     sorter: (a, b) => a.funcion.localeCompare(b.fechaFin), //sorting para Letras
//   },
//   {
//     title: 'Acciones',
//     key: 'operation',
//     render: (params) =>
//       <div key={params.id}>
//         <Stack direction="row" spacing={1}>
//           <Button
//             aria-controls={`menu-${params.id}`}
//             aria-haspopup="true"
//             onClick={(e) => handleClick(e, params.id)}
//             variant="contained"
//             style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
//             startIcon={<Icon>menu</Icon>}
//           >
//             Opciones
//           </Button>
         
//           <Menu
//             id={`menu-${params.id}`}
//             anchorEl={anchorEl[params.id]}
//             keepMounted
//             open={Boolean(anchorEl[params.id])}
//             onClose={() => handleClose(params.id)}
//           >
//             <MenuItem onClick={() => handleEdit(params.id, params.maquina, params.fechaInicio, params.fechaFin)}>
//               <Icon>edit</Icon>ㅤ Editar
//             </MenuItem>
//             <MenuItem onClick={() => handleDetails(params.id,params.maquina, params.fechaInicio, params.fechaFin)}>
//               <Icon>visibility</Icon> ㅤDetalles
//             </MenuItem>
//             <MenuItem onClick={() => handleDelete(params.id)}>
//               <Icon>delete</Icon> ㅤEliminar
//             </MenuItem>
//           </Menu>
//         </Stack>
//       </div>
//     ,
//   },
// ];


//   {/* Datos de la tabla */ }
//   const rows = [
//     { id: '1', maquina: 'Máquina de coser industrial',      fechaInicio: '10-12-2022', fechaFin: '11-12-2022'},
//     { id: '2', maquina: 'Máquina de corte automático',      fechaInicio: '13-12-2022', fechaFin: '14-12-2022' },
//     { id: '3', maquina: 'Máquina de estampado',             fechaInicio: '13-12-2022', fechaFin: '14-12-2022' },
//     { id: '4', maquina: 'Máquina de planchado y prensado',  fechaInicio: '15-12-2022', fechaFin: '16-12-2022' },
//     { id: '5', maquina: 'Máquina de etiquetado',            fechaInicio: '17-12-2022', fechaFin: '18-12-2022' },
//   ];

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };

//   const handleChange = (event) => {
//     setFilas(event.target.value);
//   };


//   {/*Filtrado de datos*/  }
//   const filteredRows = rows.filter((row) =>
//     Object.values(row).some((value) =>
//       typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
//     )
//   );

  
//   const defaultHistorialValues = {
//     maquina: '',
//     observacion: '',
//   }

//   const HistorialSchema = yup.object().shape({
//     maquina: yup.string().required(),
//     observacion : yup.string().required(),
//    /* fechaInicio : yup.string().required(),
//     fechaFin : yup.string().required(),*/

//   })
  
  
//   const MostrarCollapseEditar = () => {
//     setmostrarIndex(!mostrarIndex);
//     setmostrarEditar(!mostrarEditar);
//     reset(defaultHistorialValues);
//   };  

//     //Constante para mostrar el collapse de agregar un registro
//     const MostrarCollapseAgregar = () => {
//       setmostrarIndex(!mostrarIndex);
//       setmostrarAgregar(!mostrarAgregar);
//       reset(defaultHistorialValues);
//     };
//   //Constante para cerrar el collapse de agregar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
//     const CerrarCollapseAgregar = () => {
//     setmostrarIndex(!mostrarIndex);
//     setmostrarAgregar(!mostrarAgregar);
//     reset(defaultHistorialValues);

//    };

//   //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
//   const CerrarCollapseEditar = () => {
//     setmostrarIndex(!mostrarIndex);
//     setmostrarEditar(!mostrarEditar);
//     reset(defaultHistorialValues);
    
//   };


//   const {handleSubmit, register, reset, control, watch, formState } = useForm({
//     defaultHistorialValues,
//     mode: 'all',
//     resolver: yupResolver(HistorialSchema),
//   });

//   const { isValid, dirtyFields, errors } = formState;

//   const ToastSuccess =() => {
//     toast.success('Datos ingresados correctamente.', {
//       style: {
//         marginTop: '50px',
//         backgroundColor: '#111827',
//         color: 'white',
//         fill: 'white'
        
//       },
//       autoClose: 1500,
//       closeOnClick: true
//     });
//   }

//     const ToastWarning = () => {
//       toast.warning('No se permiten campos vacios.', {
//         style: {
//           marginTop: '50px',
//           backgroundColor: '#111827',
//           color: 'white',
//           fill: 'white'
          
//         },
//         autoClose: 1500,
//         closeOnClick: true
//       });
//     }


//  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de agregar
//    const ValidacionAgregar = (data) => {
//     console.log(data);
//     if (data.maquina.length != 0) {
//       if (data.observacion != null) {
//         if(data.observacion.trim() === "" || data.maquina[0] === "")
//         { 
//           console.log("Salio");
//           ToastWarning();
//         }else if (data.observacion.trim() === "" || data.maquina === ""){
//           console.log("Salio");
//           ToastWarning();
//         }else{
//           console.log("Entra");
//           MostrarCollapseAgregar();
//           ToastSuccess();
//         }
//       }else{
//         console.log("Salio");
//         ToastWarning();
//       }
//     }else{
//       if (data.maquina === "") {
//         console.log("Que onda");
//         ToastWarning();
//       }
//       console.log("Salio");
//     }
//   };


//    //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
//   const ValidacionesEditar = (data) => {
//     console.log(data, 'Esto es editar');
//     if (data.maquina.length != 0) {
//       if (data.observacion != null) {
//         if(data.observacion.trim() === "" || data.maquina[0] === "")
//         { 
//           console.log("Salio 1");
//           ToastWarning();
//         }else if (data.observacion.trim() === "" || data.maquina === ""){
//           console.log("Salio 2");
//           ToastWarning();
//         }else{
//           console.log("Entra");
//           MostrarCollapseAgregar();
//           ToastSuccess();
//         }
//       }else{
//         console.log("Salio");
//         ToastWarning();
//       }
//     }else{
//       if (data.maquina === "") {
//         console.log("Que onda");
//         ToastWarning();
//       }
//       console.log("Salio");
//     }
//   };

//   //Constante cuando se hace click para el boton de opciones
//   const handleClick = (event, id) => {
//     setAnchorEl((prevState) => ({
//       ...prevState,
//       [id]: event.currentTarget,
//     }));
//   };

//   //Constante para ejecutar las validaciones y el envio del formulario en el boton de agregar en el collapse de agregar
//   const AgregarRegistro = () => {
//     const formData = watch();
//     ValidacionAgregar(formData);
//     setTimeout(() => {
//       handleSubmit(ValidacionAgregar)();
//     }, "250")
//   };


//   //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
//   const EditarRegistro = () => {
//     const formData = watch();
//     formData.maquina = maquina;
//     formData.observacion = observacion;
//     ValidacionesEditar(formData);
//     setTimeout(() => {     
//       handleSubmit(ValidacionesEditar)();
//     }, "250")
//   };


//   //Constante para alinear los iconos de la tabla de detalles con los headers de la tabla y cambiar el color a los iconos
//   const iconStyle = {
//     marginRight: "5px",
//     verticalAlign: "middle",
//     color: "#634a9e",
//   };

//   //Constante para los estilos de los headers de la tabla de detalles
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


//   return (
//     <Card sx={{ minWidth: 275, margin: '40px' }}>
//       <ToastContainer/>
//       <CardMedia
//         component="img"
//         height="200"
//         image="https://i.ibb.co/x3Dpksj/HISTORIAL-DE-M-QUINA.png"
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

//           {/* Barra de Busqueda en la Tabla */}
//           <TextField
//             style={{ borderRadius: '10px' }}
//             placeholder='Buscar'
//             value={searchText}
//             onChange={handleSearchChange}
//             size="small"
//             variant="outlined"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <IconButton edge="start">
//                     <SearchIcon />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </CardContent>
//       </Collapse>

//       {/*Tabla*/}
//       <Collapse in={mostrarIndex}>
//         <div className='center' style={{ width: '95%', margin: 'auto' }}>

//           <Table
//             columns={columns}
//             dataSource={filteredRows}
//             size="small"
//             pagination={{
//               pageSize: filas
//               , className: 'decoration-white'
//             }}

//           />
//         </div>
//         </Collapse>


//       {/* Formulario Agregar */}
//       <Collapse in={mostrarAgregar}>
//         <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//           <Grid container spacing={3}>

//             <Grid item xs={6} style={{ marginTop: '30px' }} >
//             <Controller
//                 defaultValue={''}
//                 render={({ field }) => (
//                   <FormControl error={!!errors.maquina} fullWidth>
//                     <FormLabel
//                       className="font-medium text-10"
//                       component="legend"
//                     >
//                       Máquina
//                     </FormLabel>
//                     <Select
//                       {...field}
//                       fullWidth={true} 
//                       inputProps={{
//                         startadornment: <InputAdornment position="start" />,
//                       }}
//                     >
//                      <MenuItem value='Máquina de coser industrial'    >Máquina de coser industrial   </MenuItem>
//                      <MenuItem value='Máquina de corte automático'    >Máquina de corte automático   </MenuItem>
//                      <MenuItem value='Máquina de estampado'           >Máquina de estampado          </MenuItem>
//                      <MenuItem value='Máquina de planchado y prensado'>Máquina de planchado y prensado</MenuItem>
//                      <MenuItem value='Máquina de etiquetado'          >Máquina de etiquetado </MenuItem>

//                     </Select>
//                   </FormControl>
//                 )}
//                 name="maquina"
//                 control={control}
//               />      
             
//             </Grid>

//             <Grid item xs={6} style={{ marginTop: '30px' }} >
//             <Controller
//                 render={({ field }) => (
//                   <FormControl error={!!errors.observacion} fullWidth>
//                     <FormLabel
//                       className="font-medium text-10"
//                       component="legend"
//                     >
//                       Observación
//                     </FormLabel>
//                     <TextField
//                       {...field}
//                       variant="outlined"
//                       error={!!errors.observacion}
//                       placeholder=""
//                       fullWidth={true}
//                       inputProps={{
//                         startadornment: (
//                           <InputAdornment position="start"></InputAdornment>
//                         ),
//                       }}
//                     />
//                   </FormControl>
//                 )}
//                 name="observacion"
//                 control={control}
//               />
//             </Grid>

//             <Grid item xs={6}>     
//             <Controller             
//               render={({ field }) => (
//                 <FormControl  fullWidth>
//                   <FormLabel
//                     className="font-medium text-10"
//                     component="legend"
//                   >
//                     Fecha Inicio
//                   </FormLabel>
//                 <DateTimePicker
//                 {...field}
//                 variant="outlined"
//                 fullWidth={true} 
//                 dateFormat="dd/MM/yyyy"
             
//                 onChange={(date) => {
//                     console.log(date);
//                   }}
//                 renderInput={(_props) => (
//                   <TextField
//                     className="w-full"
//                     {..._props}
//                     fullWidth={true} 
//                   />
//                 )}
//                 className="w-full"           
//               />
//                 </FormControl>
//               )}
//               name="fechaInicio"
//               control={control}
//             />
//            </Grid>

//            <Grid item xs={6}>     
//             <Controller             
//               render={({ field }) => (
//                 <FormControl  fullWidth>
//                   <FormLabel
//                     className="font-medium text-10"
//                     component="legend"
//                   >
//                     Fecha Fin
//                   </FormLabel>
//                 <DateTimePicker
//                 {...field}
//                 variant="outlined"
//                 fullWidth={true} 
//                 dateFormat="dd/MM/yyyy"
             
//                 onChange={(date) => {
//                     console.log(date);
//                   }}
//                 renderInput={(_props) => (
//                   <TextField
//                     className="w-full"
//                     {..._props}
//                     fullWidth={true} 
//                   />
//                 )}
//                 className="w-full"           
//               />
//                 </FormControl>
//               )}
//               name="fechaFin"
//               control={control}
//             />
//            </Grid>

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
//                 onClick={AgregarRegistro}
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



//   {/* Formulario Editar */}
//   <Collapse in={mostrarEditar}>
//         <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//           <Grid container spacing={3}>

//             <Grid item xs={6} style={{ marginTop: '30px' }} >
//             <Controller
//                 render={({ field }) => (
//                   <FormControl error={!!errors.maquina} fullWidth>
//                     <FormLabel
//                       className="font-medium text-10"
//                       component="legend"
//                     >
//                       Máquina
//                     </FormLabel>
//                     <Select
//                       {...field}
//                       value={maquina}
//                       fullWidth={true} 
//                       inputProps={{
//                         startadornment: <InputAdornment position="start" />,
//                       }}
//                     >
//                     <MenuItem value='Máquina de coser industrial'    >Máquina de coser industrial   </MenuItem>
//                      <MenuItem value='Máquina de corte automático'    >Máquina de corte automático   </MenuItem>
//                      <MenuItem value='Máquina de estampado'           >Máquina de estampado          </MenuItem>
//                      <MenuItem value='Máquina de planchado y prensado'>Máquina de planchado y prensado</MenuItem>
//                      <MenuItem value='Máquina de etiquetado'          >Máquina de etiquetado </MenuItem>
//                     </Select>
//                   </FormControl>
//                 )}
//                 name="maquina"
//                 control={control}
//               />      
             
//             </Grid>

//             <Grid item xs={6} style={{ marginTop: '30px' }} >
//             <Controller
//                 render={({ field }) => (
//                   <FormControl error={!!errors.observacion} fullWidth>
//                     <FormLabel
//                       className="font-medium text-10"
//                       component="legend"
//                     >
//                       Observación
//                     </FormLabel>
//                     <TextField
//                       {...field}
//                       variant="outlined"
//                       error={!!errors.observacion}
//                       fullWidth={true}
//                       inputProps={{
//                         startadornment: (
//                           <InputAdornment position="start"></InputAdornment>
//                         ),
//                       }}
//                     />
//                   </FormControl>
//                 )}
//                 name="observacion"
//                 control={control}
//               />
//             </Grid>

//             <Grid item xs={6}>     
//             <Controller             
//               render={({ field }) => (
//                 <FormControl  fullWidth>
//                   <FormLabel
//                     className="font-medium text-10"
//                     component="legend"
//                   >
//                     Fecha Inicio
//                   </FormLabel>
//                 <DateTimePicker
//                 {...field}
//                 variant="outlined"
//                 fullWidth={true} 
//                 dateFormat="dd/MM/yyyy"
             
//                 onChange={(date) => {
//                     console.log(date);
//                   }}
//                 renderInput={(_props) => (
//                   <TextField
//                     className="w-full"
//                     {..._props}
//                     fullWidth={true} 
//                   />
//                 )}
//                 className="w-full"           
//               />
//                 </FormControl>
//               )}
//               name="fechaInicio"
//               control={control}
//             />
//            </Grid>

//            <Grid item xs={6}>     
//             <Controller             
//               render={({ field }) => (
//                 <FormControl  fullWidth>
//                   <FormLabel
//                     className="font-medium text-10"
//                     component="legend"
//                   >
//                     Fecha Fin
//                   </FormLabel>
//                 <DateTimePicker
//                 {...field}
//                 variant="outlined"
//                 fullWidth={true} 
//                 dateFormat="dd/MM/yyyy"
             
//                 onChange={(date) => {
//                     console.log(date);
//                   }}
//                 renderInput={(_props) => (
//                   <TextField
//                     className="w-full"
//                     {..._props}
//                     fullWidth={true} 
//                   />
//                 )}
//                 className="w-full"           
//               />
//                 </FormControl>
//               )}
//               name="fechaFin"
//               control={control}
//             />
//            </Grid>

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
//                 onClick={EditarRegistro}
//               >
//                 Editar
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
//                 onClick={CerrarCollapseEditar}
//               >
//                 Cancelar
//               </Button>
//             </Grid>

//           </Grid>
//         </CardContent>
//       </Collapse>


//       {/* Collapse para mostrar los detalles de un registro inicio*/}
//     <Collapse in={mostrarDetalles}>
//         <CardContent
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//           }}
//         >   
//          <Grid container spacing={3}> 
//          <Grid item xs={12}>
//               <h2>Detalles del Historial de la Máquina</h2>   
//               </Grid>   
//               <Grid item xs={12} style={{marginBottom:"25px", marginLeft:'25px'}}>  
//                 <Box sx={{ display: "flex", flexDirection: "row" }}>
//                   <Box sx={{ flex: 1 }}>
//                     <InputLabel htmlFor="id">
//                       <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
//                         Id Historial:
//                       </Typography>
//                       <Typography>{id}</Typography>
//                     </InputLabel>
//                   </Box>
//                   <Box sx={{ flex: 1 }}>
//                     <InputLabel htmlFor="descripcion">
//                       <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
//                         Máquina:
//                       </Typography>
//                       <Typography>{maquina}</Typography>
//                     </InputLabel>
//                 </Box>
//                 <Box sx={{ flex: 1 }}>
//                     <InputLabel htmlFor="descripcion">
//                       <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
//                         Observación:
//                       </Typography>
//                       <Typography>{observacion}</Typography>
//                     </InputLabel>
//                 </Box>     
//                 </Box>
//                 </Grid> 

//               <Grid item xs={12} style={{marginBottom:"25px",  marginLeft:'25px'}}>  
//                 <Box sx={{ display: "flex", flexDirection: "row" }}>
//                 <Box sx={{ flex: 1 }}>
//                     <InputLabel htmlFor="descripcion">
//                       <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
//                         Fecha Inicio:
//                       </Typography>
//                       <Typography>{fechaInicio}</Typography>
//                     </InputLabel>
//                 </Box>
//                 <Box sx={{ flex: 2}}>
//                     <InputLabel htmlFor="descripcion">
//                       <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
//                         Fecha Fin:
//                       </Typography>
//                       <Typography>{fechaFin}</Typography>
//                     </InputLabel>
//                 </Box>
//                 </Box>
//                 </Grid> 


//                 <Grid item xs={12}>            
//                       <table
//                         id="detallesTabla"
//                         style={{ width: "100%", borderCollapse: "collapse" }}
//                       >
//                         <thead>
//                           <tr>
//                             <th style={tableHeaderStyle}>
//                               <Icon style={iconStyle}>edit</Icon>Accion
//                             </th>
//                             <th style={tableHeaderStyle}>
//                               <Icon style={iconStyle}>person</Icon>Usuario
//                             </th>
//                             <th style={tableHeaderStyle}>
//                               <Icon style={iconStyle}>date_range</Icon>Fecha y
//                               hora
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr style={tableRowStyle}>
//                             <td style={tableCellStyle}>
//                               <strong>Creación</strong>
//                             </td>
//                             <td style={tableCellStyle}>Usuario Creación</td>
//                             <td style={tableCellStyle}>00/00/0000</td>
//                           </tr>
//                           <tr style={tableRowStyle}>
//                             <td style={tableCellStyle}>
//                               <strong>Modificación</strong>
//                             </td>
//                             <td style={tableCellStyle}>Usuario Modificación</td>
//                             <td style={tableCellStyle}>00/00/0000</td>
//                           </tr>
//                         </tbody>
//                       </table>
//                       </Grid> 
//               <br></br>
//               <Grid item xs={12}>    
//               <div className="card-footer">
//                 <Button
//                   variant="contained"
//                   onClick={CerrarCollapseDetalles}
//                   startIcon={<Icon>arrow_back</Icon>}
//                 >
//                   Regresar
//                 </Button>
//               </div>
//               </Grid>
//               </Grid>  
//         </CardContent>
//       </Collapse>
//       {/* Collapse para mostrar los detalles de un registro fin*/}

//       <Dialog
//         open={Eliminar}
//         fullWidth={true} 
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
//       <ToastContainer/>
//     </Card>
//   );
// }

// export default MaquinaHistorialIndex;
}
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Autocomplete,
  Divider,
  Chip,
} from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { addMinutes } from 'date-fns'; // Importa la función addMinutes
import dayjs from 'dayjs'; //import de validacion del tiempo DataTimePicker

import * as React from "react";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { height } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";

//Imports de validaciones
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//Imports tabla
import { Badge, Dropdown, Space, Table } from "antd";
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
//Import service
import MaquinasHistorialService from "./MaquinaHistorialService";
//Import ddls
import load_DDLs from "src/app/loadDDLs/Load_DDL";
//import Toast
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
  ToastDefault,
} from "src/styles/toastsFunctions";

//Probando ando
  // const { control, watch, setValue } = useForm();
  // const mahi_FechaInicio = watch('mahi_FechaInicio');
  // const [mahi_FechaFin, setMahi_FechaFin] = useState(null);

  // useEffect(() => {
  //   // Si la fecha de fin es menor que la fecha de inicio, actualiza la fecha de fin
  //   if (mahi_FechaInicio && mahi_FechaFin && mahi_FechaFin < mahi_FechaInicio) {
  //     setValue('mahi_FechaFin', mahi_FechaInicio);
  //     setMahi_FechaFin(mahi_FechaInicio);
  //   }
  // }, [mahi_FechaInicio, mahi_FechaFin, setValue]);



/* Campos del formulario*/
const defaultMaquiHistorialValues = {
  id: "", //id necesario para el editar
  maquina: null, //para los campos que son ddl poner null
  mahi_FechaInicio: "", 
  mahi_FechaFin: "",
  mahi_Observaciones: "",
};

/* Esquema del fomulario (validaciones) */
//En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
  id: yup.string(),
  maquina: yup.object().required(""),
  mahi_FechaInicio: yup.string().required(""),
  mahi_FechaFin: yup.string().required(""),
  mahi_Observaciones: yup.string().trim().required(""),
});

// const todayAtNoon = dayjs().set('hour', 12).startOf('hour');
// const todayAt3PM = dayjs().set('hour', 15).startOf('hour');

// const FechaInicio = new Date().toLocaleString();
// const FechaFin = new Date().toLocaleString();

function MaquinasHistorialIndex() {
  //Variables DDL
  const [maquinas_DDL, setMaquinas_DDL] = useState([]);

  //Cargado de las variables DDL
  async function ddls() {
    setMaquinas_DDL(await load_DDLs.Maquinas());
  }

  //variable para la barra de busqueda
  const [searchText, setSearchText] = useState("");

  //Variables para los collapse
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  //Variable donde se guardan los datos del detalle seleccionado
  const [DatosDetalles, setDatosDetalles] = useState({});

  //variable para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  //Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  //Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(10);

  //Variable que hace algo con el menu XD
  const [anchorEl, setAnchorEl] = useState({});

  /* Datos de la tabla */
  const [data, setData] = useState([]);

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultMaquiHistorialValues);
  };

  //Controlador del dialog(modal) eliminar
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Controlador del collapse detalles
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //controlador de las fillas a mostrar
  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };

  //abre el menu al cual se le dio click
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Cierra el menu abierto
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Handle que inicia la funcion de editar
  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    //insertar aca las variables necesarias en su formulario
    setValue("id", datos["mahi_Id"]);
    setValue(
      "maquina",
      maquinas_DDL.find((maquinas_DDL) => maquinas_DDL.value === datos["maqu_Id"]) //importante para cargar bien los ddl al editar
    );
    setValue("mahi_FechaInicio", datos["mahi_FechaInicio"]);
    setValue("mahi_FechaFin", datos["mahi_FechaFin"]);
    setValue("mahi_Observaciones", datos["mahi_Observaciones"]);
    handleClose(datos.mahi_Id);
  };

  //Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.mahi_Id);
  };

  //Handle delete en este caso no necesario (si quere mas info ir a la pantalla "TiposIdentidad")
  const handleDelete = (datos) => {
    // en caso de ocupar eliminar
    handleClose(datos.mahi_Id);
  };

  {
    /* Columnas de la tabla */
  }
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "No. Serie de Maquina",
      dataIndex: "maquinaNumeroSerie",
      key: "maquinaNumeroSerie",
      sorter: (a, b) => a.maquinaNumeroSerie.localeCompare(b.maquinaNumeroSerie), //sorting para Letras
    }, 
    {
      title: "Fecha Inicio",
      dataIndex: "mahi_FechaInicio",
      key: "mahi_FechaInicio",
      sorter: (a, b) => a.mahi_FechaInicio.localeCompare(b.mahi_FechaInicio), //sorting para Letras
    },
    {
      title: "Fecha Fin",
      dataIndex: "mahi_FechaFin",
      key: "mahi_FechaFin",
      sorter: (a, b) => a.mahi_FechaFin.localeCompare(b.mahi_FechaFin), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.mahi_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.mahi_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.mahi_Id)}
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
              id={`menu-${params.mahi_Id}`}
              anchorEl={anchorEl[params.mahi_Id]}
              keepMounted
              open={Boolean(anchorEl[params.mahi_Id])}
              onClose={() => handleClose(params.mahi_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  //Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ["key", "maquinaNumeroSerie", "mahi_FechaInicio", "mahi_FechaFin", "mahi_Observaciones"];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = data.filter((row) => {
    if (searchText === "") {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue =
          typeof value === "number"
            ? value.toString()
            : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === "number"
            ? searchText.toString()
            : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  });

  //Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultMaquiHistorialValues, //Campos del formulario
      mode: "all",
      resolver: yupResolver(accountSchema), //Esquema del formulario
    });

  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();

  //Peticion para cargar datos de la tabla
  const MaquinasHistorialGetData = async () => {
    try {
      setData(await MaquinasHistorialService.listar());
    } catch (error) {
      console.log(error.message);
    }
  };

  //Peticion para crear un registro
  const MaquinasHistorialCreate = async () => {
    try {
      const response = await MaquinasHistorialService.crear(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");
        MaquinasHistorialGetData();
        VisibilidadTabla();
        console.log(datosWatch);
        reset(defaultMaquiHistorialValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }
  };

  // Peticion para editar un registro
  const MaquinasHistorialEdit = async () => {
    try {
      const response = await MaquinasHistorialService.editar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha editado exitosamente");
        MaquinasHistorialGetData();
        VisibilidadTabla();
        reset(defaultMaquiHistorialValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }
  };

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    MaquinasHistorialGetData();
  }, []);

  //Controlador del formulario
  const GuardarMaquinaHistorial = () => {
    // if (datos[mahi_FechaInicio] < data.mahi_FechaFin){
      if (isValid) {
        // Validacion de campos completos
        if (!editar) {
          // Validacion de la funcion a realizar
          MaquinasHistorialCreate();
        } else {
          MaquinasHistorialEdit();
        }
      } else {
        ToastWarning("Completa todos los campos");
      }
    // } else {
    //   ToastWarning("La Fecha de Fin no puede ser menor a la inicial")
    // }
  };

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/x3Dpksj/HISTORIAL-DE-M-QUINA.png"
        alt="Encabezado de la carta"
      />
      {/* Inicio del Collapse incial (Tabla/Index) */}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Botón de Nuevo */}
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
              onClick={() => {
                VisibilidadTabla();
                setEditar(false);
              }}
            >
              Nuevo
            </Button>
          </Stack>

          {/* Filtros de la tabla (Filas/Buscar) */}
          <Stack direction="row" spacing={1}>
            <label className="mt-8">Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                onChange={handleChangeFilas}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            {/* Barra de Busqueda en la Tabla */}
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
          </Stack>
        </CardContent>

        {/* Declaracion de la tabla */}
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            size="small"
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon(),
            }}
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
            }}
          />
        </div>
      </Collapse>
      {/* Fin del Collapse incial (Tabla/Index) */}

      {/* Inicio del Formulario */}
      <form onSubmit={handleSubmit((_data) => { })}>
        <Collapse in={mostrarAdd}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip
                    label={editar ? "Editar Maquina Historial" : "Agregar Maquina Historial"}
                  />
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.maquina}>No. de Serie Maquina</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        id="maquina"
                        isOptionEqualToValue={(option, value) =>
                          option.value === value?.value
                        }
                        options={maquinas_DDL}
                        value={datosWatch.maquina ?? null}
                        onChange={(event, value) => {
                          setValue("maquina", value);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} error={!!errors.maquina} />
                        )}
                      />
                    )}
                    name="maquina"
                    error={!!errors.maquina}
                    control={control}
                  />
                </FormControl>
              </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="mahi_FechaInicio"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        error={!!errors.mahi_FechaInicio}
                        fullWidth={true}
                      >
                        <FormLabel >
                          Fecha de Inicio:
                        </FormLabel>
                        <DateTimePicker
                          onChange={(date) => field.onChange(date)}
                          value={field.value}
                          required
                          renderInput={(_props) => (
                            <TextField
                              className="w-full"
                              {..._props}
                              onBlur={field.onBlur}
                              error={!!errors.mahi_FechaInicio}
                            />
                          )}
                          className="w-full"
                        />
                      </FormControl>
                    )}
                  />
                </Grid>

              <Grid item xs={6}> 
              <Controller
                name="mahi_FechaFin"
                control={control}
                render={({ field }) => (
                  <FormControl
                    error={!!errors.mahi_FechaFin}
                    fullWidth={true}
                  >
                    <FormLabel >
                      Fecha Fin:
                    </FormLabel>
                    <DateTimePicker
                      // minDate={addMinutes(new Date(), 59)} // Permite seleccionar hasta 59 minutos en el futuro
                      onChange={(date) => field.onChange(date)}
                      value={field.value}
                      required
                      renderInput={(_props) => (
                        <TextField
                          className="w-full"
                          {..._props}
                          onBlur={field.onBlur}
                          error={!!errors.mahi_FechaFin}
                        />
                      )}
                      className="w-full"
                    />
                  </FormControl>
                )}
              />
              </Grid>

              <Grid item xs={12}>
              <FormControl fullWidth>
                  <FormLabel error={!!errors.mahi_Observaciones}>Oservaciones</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.mahi_Observaciones}
                      ></TextField>
                    )}
                    name="mahi_Observaciones"
                    control={control}
                  ></Controller>
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
                  type="submit"
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={GuardarMaquinaHistorial}
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
                  onClick={VisibilidadTabla}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </form>
      {/* Fin del Formulario */}

      {/* Inicia del Dialog(Modal) Eliminar */}
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
              onClick={handleDelete}
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
      {/* Fin del Dialog(Modal) Eliminar */}

      {/* Inicia del collapse Detalles */}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles de la Maquina Historial" />
              </Divider>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id del Historial de Maquina:
                  </Typography>
                  <Typography>{DatosDetalles["mahi_Id"]}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Numero de Serie de la Maquina:
                  </Typography>
                  <Typography>{DatosDetalles["maquina"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Fecha de Inicio:
                  </Typography>
                  <Typography>{DatosDetalles["mahi_FechaInicio"]}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Fecha Final:
                  </Typography>
                  <Typography>{DatosDetalles["mahi_FechaFin"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>


            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Observaciones:
                  </Typography>
                  <Typography>{DatosDetalles["mahi_Observaciones"]}</Typography>
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
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>
                      Accion
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>
                      Usuario
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>
                        date_range
                      </Icon>
                      Fecha y hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioCreacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["mahi_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["mahi_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioModificaNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["mahi_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["mahi_FechaModificacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <div className="card-footer">
                <Button
                  variant="contained"
                  onClick={() => {
                    CollapseDetalles();
                  }}
                  startIcon={<Icon>arrow_back</Icon>}
                >
                  Regresar
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Fin del Collapse Detalles */}

    </Card>
  );
}

export default MaquinasHistorialIndex;

