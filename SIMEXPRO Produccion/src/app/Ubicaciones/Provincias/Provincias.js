

/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
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
import * as React from 'react';
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2'
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';

import { Badge, Dropdown, Space, Table } from "antd";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProvinciasIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [message, setMessage] = useState();
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);



  {/* Validaciones de la pantalla de crear*/ }
  const defaultProvinciasValues = {
    pvin_Codigo: '',
    pais_Id: 0,
    pvin_Nombre: ''
  }

  const ProvinciasSchema = yup.object().shape({
    pvin_Codigo: yup.string().required(''),
    pais_Id: yup.string().required(''),
    pvin_Nombre: yup.string().required(''),

  })

  const handleChange = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };
  const [pvin_Codigo, setcodigo] = useState("");
  const [pais_Id, setpais] = useState(0);
  const [pvin_Nombre, setnombre] = useState("");



  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };


  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "Codigo",
      dataIndex: "pvin_Codigo",
      key: "pvin_Codigo",
      sorter: (a, b) => a.pvin_Codigo - b.pvin_Codigo, //sorting para Numeros
    },
    {
      title: "País",
      dataIndex: "pais_Id",
      key: "pais_Id",
      sorter: (a, b) => a.pais_Id.localeCompare(b.pais_Id), //sorting para Letras
    },
    {
      title: "País",
      dataIndex: "pvin_Nombre",
      key: "pvin_Nombre",
      sorter: (a, b) => a.pvin_Nombre.localeCompare(b.pvin_Nombre), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.pvin_Codigo}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.pvin_Codigo}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.pvin_Codigo)}
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
              pvin_Codigo={`menu-${params.pvin_Codigo}`}
              anchorEl={anchorEl[params.pvin_Codigo]}
              keepMounted
              open={Boolean(anchorEl[params.pvin_Codigo])}
              onClose={() => handleClose(params.pvin_Codigo)}
            >
              <MenuItem onClick={() => handleEdit(params.pvin_Codigo, params.pais_Id, params.pvin_Nombre)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.pvin_Codigo, params.pais_Id, params.pvin_Nombre)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.pvin_Codigo)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];


  {/* Datos de la tabla */ }
  const rows = [
    { id: '1', pvin_Codigo: 'HN-AT', pvin_Nombre: 'Atlántida', pais_Id: 'Honduras' },
    { id: '2', pvin_Codigo: 'HN-CH', pvin_Nombre: 'Choluteca', pais_Id: 'Honduras' },
    { id: '3', pvin_Codigo: 'HN-CL', pvin_Nombre: 'Colón', pais_Id: 'Honduras' },
    { id: '4', pvin_Codigo: 'HN-CM', pvin_Nombre: 'Comayagua', pais_Id: 'Honduras' },
    { id: '5', pvin_Codigo: 'HN-CP', pvin_Nombre: 'Copán', pais_Id: 'Honduras' },
    { id: '6', pvin_Codigo: 'HN-CR', pvin_Nombre: 'Cortés', pais_Id: 'Honduras' },
    { id: '7', pvin_Codigo: 'HN-EP', pvin_Nombre: 'El Paraíso', pais_Id: 'Honduras' },
    { id: '8', pvin_Codigo: 'HN-FM', pvin_Nombre: 'Francisco Morazán', pais_Id: 'Honduras' },
    { id: '9', pvin_Codigo: 'HN-GD', pvin_Nombre: 'Gracias a Dios', pais_Id: 'Honduras' },
    { id: '10', pvin_Codigo: 'HN-IN', pvin_Nombre: 'Intibucá', pais_Id: 'Honduras' },
    { id: '11', pvin_Codigo: 'HN-IB', pvin_Nombre: 'Islas de la Bahía', pais_Id: 'Honduras' },
    { id: '12', pvin_Codigo: 'HN-LP', pvin_Nombre: 'La Paz', pais_Id: 'Honduras' },
    { id: '13', pvin_Codigo: 'HN-LM', pvin_Nombre: 'Lempira', pais_Id: 'Honduras' },
    { id: '14', pvin_Codigo: 'HN-OC', pvin_Nombre: 'Ocotepeque', pais_Id: 'Honduras' },
    { id: '15', pvin_Codigo: 'HN-OL', pvin_Nombre: 'Olancho', pais_Id: 'Honduras' },
    { id: '16', pvin_Codigo: 'HN-SB', pvin_Nombre: 'Santa Bárbara', pais_Id: 'Honduras' },
    { id: '17', pvin_Codigo: 'HN-VL', pvin_Nombre: 'Valle', pais_Id: 'Honduras' },
    { id: '18', pvin_Codigo: 'HN-YO', pvin_Nombre: 'Yoro', pais_Id: 'Honduras' }
  ];


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };



  {/* Filtrado de datos */ }
  //Constante que ayuda a filtrar el datatable
  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (codigo) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [codigo]: null,
    }));
  };
  const DetallesTabla = (codigo, pais, nombre) => {
    setcodigo(codigo);
    setpais(pais);
    setnombre(nombre);

  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (codigo, pais, nombre) => {
    DetallesTabla(codigo, pais, nombre);
    MostrarCollapseDetalles();
    handleClose(codigo);
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (codigo, pais, nombre) => {
    setcodigo(codigo);
    setpais(pais);
    setnombre(nombre);
    MostrarCollapseEditar();
    handleClose(codigo);
  };

  //Constante para mostrar el collapse de agregar un registro
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultProvinciasValues);
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultProvinciasValues);
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
    reset(defaultProvinciasValues);
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultProvinciasValues);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };


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

  const ToastError = () => {
    toast.error('No se permiten campos vacios.', {

      //  position: toast.POSITION.BOTTOM_RIGHT
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


  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultProvinciasValues,
    mode: 'all',
    resolver: yupResolver(ProvinciasSchema),
  });

  const { isValid, dirtyFields, errors } = formState;


  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de agregar
  const ValidacionAgregar = (data) => {
    console.log(data);
    if (data.pais_Id.length != 0) {
      if (data.pvin_Nombre != null || data.pvin_Codigo != null) {
        if (
          data.pvin_Codigo.trim() === "" ||
          data.pvin_Nombre.trim() === "" ||
          data.pais_Id[0] === "Selecciona una opción...") {
          console.log("Validacion 1");
          ToastError()
        } else if (
          data.pvin_Codigo.trim() === "" ||
          data.pvin_Nombre.trim() === "" ||
          data.pais_Id === "") {
          console.log("Que onda");
          ToastError();
        } else {
          console.log("Validacion 2");
          MostrarCollapseAgregar();
          ToastSuccess();
        }
      }
      else {
        console.log("Validacion 3");
        ToastError();
      }
    } else {
      console.log("Validacion 4");
      if (
        data.pvin_Nombre.trim() === "" ||
        data.pvin_Codigo.trim() === "" ||
        data.pais_Id === "") {
        console.log("Que onda");
        ToastError();
      }
    }
  };
  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
  const ValidacionesEditar = (data) => {
    console.log(data)
    if (data.pvin_Codigo != null || data.pvin_Nombre != null) {
      if (data.pvin_Codigo.trim() === "" || data.pvin_Nombre.trim() === "") {
        ToastError();
      } else {
        MostrarCollapseEditar();
        ToastSuccess();
      }
    } else {
      ToastError();
    }
  };
  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };
  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const AgregarRegistro = () => {
    const formData = watch();
    ValidacionAgregar(formData);
    setTimeout(() => {
      handleSubmit(ValidacionAgregar)();
    }, "250")
  };

  const EditarRegistro = () => {
    const formData = watch();
    formData.pvin_Codigo = pvin_Codigo;
    formData.pais_Id = pais_Id;
    formData.pvin_Nombre = pvin_Nombre;
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
  const typographyStyle = {
    margin: '0', // Eliminamos el margen vertical
    textAlign: 'center', // Centra el contenido dentro del Grid item
    color: '#000000',
  };



  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>

      <ToastContainer />
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/wBVHDDW/PROVINCIAS.png"
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
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              className: "decoration-white",
            }}
          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}


      {/* Formulario Agregar */}
      <Collapse in={mostrarAgregar}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>


            <Grid item xs={6}>
              <div style={{marginTop: '33px'}}>

                <Controller
                  defaultValue={["Selecciona una opción..."]}
                  render={({ field }) => (
                    <FormControl error={!!errors.pais_Id} fullWidth>
                      <FormLabel
                        className="font-medium text-10"
                        component="legend"
                      >
                        País
                      </FormLabel>
                      <Select
                        {...field}
                        fullWidth
                        InputProps={{
                          startAdornment: <InputAdornment position="start" />,
                        }}
                      >
                        <MenuItem value="10">HN-Honduras</MenuItem>
                        <MenuItem value="20">CL-Colombia</MenuItem>
                        <MenuItem value="30">US-Estados Unidos</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                  name="pais_Id"
                  control={control}
                />
              </div>

            </Grid>



            <Grid item xs={6}>
              <div className="mt-48 mb-16">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Código de la provincia"
                      variant="outlined"
                      error={!!errors.pvin_Codigo}

                      placeholder='Ingrese el código de la provincia'
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="pvin_Codigo"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="mt-1 mb-16" >
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nombre de la provincia"
                      variant="outlined"
                      error={!!errors.pvin_Nombre}

                      placeholder='Ingrese el nombre de la provincia'
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="pvin_Nombre"
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

export default ProvinciasIndex;





