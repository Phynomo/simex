{
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import {
//   Button,
//   FormControl,
//   Icon,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   TextField,
// } from "@mui/material";
// import * as React from "react";
// import Stack from "@mui/material/Stack";
// import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
// import { useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";

// import Collapse from "@mui/material/Collapse";
// import Grid from "@mui/material/Grid";

// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// import { Badge, Dropdown, Space, Table } from 'antd';

// import { useNavigate } from "react-router-dom";

// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

// function Comerciante_Individual_Index() {
//   const [searchText, setSearchText] = useState("");
//   const [Eliminar, setEliminar] = useState(false);
//   const Navigate = useNavigate();

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


//   {
//     /*Columnas de la tabla*/
//   }
//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//       sorter: (a, b) => a.id - b.id, //sorting para Numeros
//     },
//     {
//       title: 'RTN',
//       dataIndex: 'rtn',
//       key: 'rtn',
//       sorter: (a, b) => a.rtn.localeCompare(b.rtn), //sorting para Letras
//     },
//     {
//       title: 'Fecha',
//       dataIndex: 'fecha',
//       key: 'fecha',
//       sorter: (a, b) => new Date(a.fecha) - new Date(b.fecha) //sorting para Fechas
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


//   {
//     /*Datos de la tabla*/
//   }
//   const data = [];
//   for (let i = 0; i < 50; ++i) {
//     data.push({
//       key: i.toString(),
//       id: i.toString(),
//       nombre: 'nombre ' + i,
//       fecha: '06/05/' + i,
//       rtn: '0501-2000-0921' + i,
//       // tabla: [
//       //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
//       //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
//       //   // Add more rows to the nested table here...
//       // ],
//     });
//   }

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };

//   {
//     /*Filtrado de datos*/
//   }
//   const filteredRows = data.filter((row) =>
//     Object.values(row).some((value) =>
//       typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
//     )
//   );


//   return (
//     <Card sx={{ minWidth: 275, margin: "40px" }}>
//       <CardMedia
//         component="img"
//         height="200"
//         image="https://i.ibb.co/FBTmyr7/CONTRATO-DE-ADHESI-N-COMERCIANTE-INDIVIDUAL.png"
//         alt="Encabezado de la carta"
//       />
//       <CardContent
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "flex-start",
//         }}
//       >
//         {/*Botón de Nuevo*/}
//         <Stack direction="row" spacing={1}>
//           <Button
//             startIcon={<Icon>add</Icon>}
//             variant="contained"
//             color="primary"
//             style={{ borderRadius: "10px" }}
//             sx={{
//               backgroundColor: "#634A9E",
//               color: "white",
//               "&:hover": { backgroundColor: "#6e52ae" },
//             }}
//             onClick={(e) => {
//               Navigate("/Contrato-de-Adhesion-Comerciante-Individual/Agregar");
//             }}
//           >
//             Nuevo
//           </Button>
//         </Stack>

//         {/*Barra de Busqueda en la Tabla*/}
//         <TextField
//           style={{ borderRadius: "10px" }}
//           placeholder="Buscar"
//           value={searchText}
//           onChange={handleSearchChange}
//           size="small"
//           variant="outlined"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <IconButton edge="start">
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </CardContent>

//       {/*Tabla*/}

//       <div className='center' style={{ width: '95%', margin: 'auto' }}>

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

//       <Dialog
//         open={Eliminar}
//         fullWidth={"md"}
//         onClose={DialogEliminar}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">
//           {"Confirmación de Eliminación"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             ¿Está seguro(a) que desea eliminar este registro?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Grid
//             item
//             xs={12}
//             sx={{
//               display: "flex",
//               justifyContent: "right",
//               alignItems: "right",
//             }}
//           >
//             <Button
//               startIcon={<Icon>checked</Icon>}
//               variant="contained"
//               color="primary"
//               style={{ borderRadius: "10px", marginRight: "10px" }}
//               sx={{
//                 backgroundColor: "#634A9E",
//                 color: "white",
//                 "&:hover": { backgroundColor: "#6e52ae" },
//               }}
//               onClick={DialogEliminar}
//             >
//               Eliminar
//             </Button>

//             <Button
//               startIcon={<Icon>close</Icon>}
//               variant="contained"
//               color="primary"
//               style={{ borderRadius: "10px" }}
//               sx={{
//                 backgroundColor: "#DAD8D8",
//                 color: "black",
//                 "&:hover": { backgroundColor: "#BFBABA" },
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

// export default Comerciante_Individual_Index;
}
import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
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
  Grid,
  Stack,
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Table, Tag } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "src/@history/@history";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import comerciante_IndividualService from "src/app/Aduanas/Contratos_de_Adhesión/Comerciante_Individual/Comerciante_IndividualService";

import estilosTablaDetalles from "src/styles/tablaDetalles";
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";

import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

function Comerciante_Individual_Index() {
  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles
  // const [mostrarEditar, setmostrarEditar] = useState(false); //Para editar
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  // const [mostrarAgregar, setmostrarAgregar] = useState(false); //Para agregar

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = useState(10);

  //Campos para guardar el registro de una fila
  const [datosFila, setDatosFila] = useState({});

  //Constante para asignar los valores a la tabla y mapear
  const [DataTabla, setDataTabla] = useState([]);

  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    ComercianteGetData();
  }, []);

  //Constante para cargar datos a las tablas
  const ComercianteGetData = async () => {
    try {
      setDataTabla(await comerciante_IndividualService.listar());
    } catch (error) {
      console.log(error.message);
    }
  };

  //Constantes para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Necesario para el boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleComercianteEdit = (params) => {
    handleClose(params.coin_Id);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (params) => {
    setDatosFila(params);
    CollapseDetalles();
    handleClose(params.coin_Id);
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  // const handleDelete = (params) => {
  //   handleClose(params.coin_Id);
  // };

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Nombre",
      dataIndex: "pers_Id",
      key: "pers_Id",
      // render: (text, record) => `${record.empl_Nombres} ${record.empl_Apellidos}`, // sirve para unir textos 
      sorter: (a, b) => a.pers_Id.localeCompare(b.pers_Id),
    },
    {
      title: "Referencia",
      dataIndex: "coin_PuntoReferencia",
      key: "coin_PuntoReferencia",
      sorter: (a, b) => a.coin_PuntoReferencia.localeCompare(b.coin_PuntoReferencia),
    },
    {
      title: "Contacto",
      dataIndex: "coin_CorreoElectronico",
      key: "coin_CorreoElectronico",
      sorter: (a, b) => a.coin_CorreoElectronico.localeCompare(b.coin_CorreoElectronico),
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.coin_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.coin_Id)}
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
              id={`menu-${params.coin_Id}`}
              anchorEl={anchorEl[params.coin_Id]}
              keepMounted
              open={Boolean(anchorEl[params.coin_Id])}
              onClose={() => handleClose(params.coin_Id)}
            >
              <MenuItem onClick={() => handleComercianteEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
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
  };

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = [
    "key",
    "coin_Id",
    "pers_Id",
    "pers_FormaRepresentacion", 
    "colo_Id", 
    "coin_PuntoReferecnia",
    "coin_ColoniaRepresentante",
    "coin_NumeroLocalRepresentante",
    "coin_TelefonoCelular",
    "coin_TelefonoFijo",
    "coin_CorreoElectronico",
    "coin_CorreoElectronicoAlternativo",
    ""
  ];

  //Constante que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
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

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario

  //Constante para mostrar el collapse de detalles un registro
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };


  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/FBTmyr7/CONTRATO-DE-ADHESI-N-COMERCIANTE-INDIVIDUAL.png"
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
                History.push("/Comerciante_Individual/Crear");
              }}
            >
              Nuevo
            </Button>
          </Stack>
          {/* Botón de Nuevo Fin */}

          {/* Select para las filas de la tabla inicio*/}
          <Stack direction="row" spacing={1}>
            <label className='mt-8'>Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
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

      {/* Mostrar tabla index inicio*/}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            locale={{
              triggerDesc: "Ordenar descendente",
              triggerAsc: "Ordenar ascendente",
              cancelSort: "Cancelar",
              emptyText: LoadingIcon()
            }}
            columns={columns}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
            }}
          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}

      {/* Collapse de los Detalles */}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px" }}>
                <Chip label="Detalles del Comerciante Individual" />
              </Divider>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="coin_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Comerciante:
                    </Typography>
                    <Typography>{datosFila['coin_Id']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="pers_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Persona:
                    </Typography>
                    <Typography>{datosFila['pers_Id']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>

                  {/* <InputLabel htmlFor="pers_FormaRepresentacion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Forma de Presentación?:
                    </Typography>
                    <Typography>{datosFila['pers_FormaRepresentacion']}</Typography>
                  </InputLabel> */}

                  <InputLabel htmlFor="colo_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Colonia:
                    </Typography>
                    <Typography>{datosFila['colo_Id']}</Typography>
                  </InputLabel>

                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>

                  {/* <InputLabel htmlFor="colo_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Colonia:
                    </Typography>
                    <Typography>{datosFila['colo_Id']}</Typography>
                  </InputLabel> */}

                  <InputLabel htmlFor="coin_PuntoReferencia">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Punto de Referencia:
                    </Typography>
                    <Typography>{datosFila['coin_PuntoReferencia']}</Typography>
                  </InputLabel>

                </Box>
                <Box sx={{ flex: 1 }}>
                  {/* <InputLabel htmlFor="coin_PuntoReferencia">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Punto de Referencia:
                    </Typography>
                    <Typography>{datosFila['coin_PuntoReferencia']}</Typography>
                  </InputLabel> */}

                  <InputLabel htmlFor="coin_NumeroLocalReprentante">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Numero de Local Representante:
                    </Typography>
                    <Typography>{datosFila['coin_NumeroLocalReprentante']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>

                  {/* <InputLabel htmlFor="coin_NumeroLocalReprentante">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Numero de Local Representante:
                    </Typography>
                    <Typography>{datosFila['coin_NumeroLocalReprentante']}</Typography>
                  </InputLabel> */}

                  <InputLabel htmlFor="coin_TelefonoCelular">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Teléfono Celular:
                    </Typography>
                    <Typography>{datosFila['coin_TelefonoCelular']}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>

                  {/* <InputLabel htmlFor="coin_TelefonoCelular">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Teléfono Celular:
                    </Typography>
                    <Typography>{datosFila['coin_TelefonoCelular']}</Typography>
                  </InputLabel> */}

                  <InputLabel htmlFor="coin_TelefonoFijo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Teléfono Fijo:
                    </Typography>
                    <Typography>{datosFila['coin_TelefonoFijo']}</Typography>
                  </InputLabel>
                  
                </Box>
                <Box sx={{ flex: 1 }}>
                  {/* <InputLabel htmlFor="coin_TelefonoFijo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Teléfono Fijo:
                    </Typography>
                    <Typography>{datosFila['coin_TelefonoFijo']}</Typography>
                  </InputLabel> */}

                  <InputLabel htmlFor="coin_CorreoElectronico">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Correo Electrónico:
                    </Typography>
                    <Typography>{datosFila['coin_CorreoElectronico']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>

                  {/* <InputLabel htmlFor="coin_CorreoElectronico">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Correo Electrónico:
                    </Typography>
                    <Typography>{datosFila['coin_CorreoElectronico']}</Typography>
                  </InputLabel> */}

                  <InputLabel htmlFor="coin_CorreoElectronicoAlternativo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Correo Electrónico Alternativo:
                    </Typography>
                    <Typography>{datosFila['coin_CorreoElectronicoAlternativo']}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  {/* <InputLabel htmlFor="coin_CorreoElectronicoAlternativo">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Correo Electrónico Alternativo:
                    </Typography>
                    <Typography>{datosFila['coin_CorreoElectronicoAlternativo']}</Typography>
                  </InputLabel> */}
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
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>Accion
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>Usuario
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>Fecha y hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{datosFila['usua_UsuarioCreacion']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{new Date(datosFila['coin_FechaCreacion']).toLocaleString()}</td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{datosFila['usua_UsuarioModificacion']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                       {datosFila['coin_FechaModificacion']
                        ? new Date(datosFila['coin_FechaModificacion']).toLocaleString()
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
                  onClick={CollapseDetalles}
                  startIcon={<Icon>arrow_back</Icon>}
                >
                  Regresar
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      {/* Collapse para mostrar los detalles de un registro fin */}

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
              onClick={() => {}}
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
      <ToastContainer />
    </Card>
  );
}

export default Comerciante_Individual_Index;
