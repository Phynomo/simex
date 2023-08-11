
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "src/styles/custom-pagination.css";
import { useEffect } from 'react';
import axios from 'axios';

function PaisesIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [message, setMessage] = useState();


  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const[DataTabla, setDataTabla] = useState([])



  //Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };
  const [codigo, setcodigo] = useState("");
  const [pais, setpais] = useState("");
  const [id, setId] = useState("");

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {/* Validaciones de la pantalla de crear*/ }
  const defaultPaisesValues = {
    codigo: "",
    pais: "",
  }

  const PaisesSchema = yup.object().shape({
    codigo: yup.string().required(),
    pais: yup.string().required(),
  })



  {/* Validaciones de la pantalla de crear*/ }

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
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo",
      sorter: (a, b) => a.codigo - b.codigo, //sorting para Numeros
    },
    {
      title: "País",
      dataIndex: "pais",
      key: "pais",
      sorter: (a, b) => a.pais.localeCompare(b.pais), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.codigo}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.codigo}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.codigo)}
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
              codigo={`menu-${params.codigo}`}
              anchorEl={anchorEl[params.codigo]}
              keepMounted
              open={Boolean(anchorEl[params.codigo])}
              onClose={() => handleClose(params.codigo)}
            >
              <MenuItem onClick={() => handleEdit(params.codigo, params.pais)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.codigo, params.pais)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.codigo)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  useEffect(() => {
    TablaPaises()
  }, []);  //Constante para cargar datos a las tablas      

  

  const TablaPaises = async () => {
    console.log('axel se la come');
    try {
    const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      const response = await axios.get(process.env.REACT_APP_API_URL+'api/Paises/Listar', {
        headers: customHeaders,
      }); 
      console.log(response)
      const rows = response.data.map((item,index) => {
        return {
          key:index,
          id: item.pais_Id,
          codigo: item.pais_Codigo,
          pais: item.pais_Nombre,
        }
      });
      setDataTabla(rows);
    } catch (error) {
        console.log(error);

    }
  };

  const camposToFilter = ["id", "codigo", "pais"];


  const filteredRows = DataTabla.filter((row) => {
    if (searchText === "") {
      return true;  // Mostrar todas las filas si el buscador está vacío
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
    return false;
  });

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (codigo) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [codigo]: null,
    }));
  };
  const DetallesTabla = (codigo, pais) => {
    setcodigo(codigo);
    setpais(pais);

  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (id, areas) => {
    DetallesTabla(id, areas);
    MostrarCollapseDetalles();
    handleClose(id);
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (codigo, pais) => {
    setcodigo(codigo);
    setpais(pais);
    MostrarCollapseEditar();
    handleClose(codigo);
  };

  //Constante para mostrar el collapse de agregar un registro
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultPaisesValues);
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultPaisesValues);
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
    reset(defaultPaisesValues);
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultPaisesValues);
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


  //Constante que nos ayuda para las validaciones con yup para los formularios 
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultPaisesValues,
    mode: "all",
    resolver: yupResolver(PaisesSchema),
  });

  const { isValid, dirtyFields, errors } = formState;
  //Constante para validar el envío del formulario y asegurarnos de que los campos estén llenos en el formulario de agregar

  const ValidacionAgregar = (data) => {
    if (data.codigo != null || data.pais != null) {
      if (data.codigo.trim() === "" || data.pais.trim() === "") {
        ToastError();
      } else {
        ToastSuccess();
        setTimeout(() => {
          MostrarCollapseAgregar();
        }, 100);
      }
    } else {
      ToastError();
    }
  };

  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
  const ValidacionesEditar = (data) => {
    console.log(data)
    if (data.codigo != null || data.pais != null) {
      if (data.codigo.trim() === "" || data.pais.trim() === "") {
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
    formData.codigo = codigo;
    formData.pais = pais;
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
        image="https://i.ibb.co/TMsGt9m/PAISES-1.png"
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
              className: "custom-pagination",
             }}
          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}


      {/* Formulario Agregar */}
      <Collapse in={mostrarAgregar}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div className="mt-48 mb-16">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Codigo"
                      variant="outlined"
                      error={!!errors.codigo}
                      placeholder='Ingrese el codigo del país'
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
              <div className="mt-48 mb-16">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="País"
                      variant="outlined"
                      error={!!errors.pais}
                      placeholder='Ingrese el nombre del país'
                      fullWidth
                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="pais"
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

      {/* Collapse para el formulario de editar un registro inicio*/}
      <Collapse in={mostrarEditar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3} >
            <Grid item xs={12} >
              <Typography variant="h5" gutterBottom></Typography>
            </Grid>

            <Grid item xs={6} className='mb-100'>
              <div className="mt-48 mb-16">
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Codigo"
                      variant="outlined"
                      error={!!errors.codigo}
                      placeholder='Ingrese el codigo del país'
                      fullWidth
                      value={codigo}

                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="codigo"
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
                      label="País"
                      variant="outlined"
                      value={pais}
                      error={!!errors.pais}
                      placeholder='Ingrese el nombre del país'
                      fullWidth

                      InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                    />
                  )}
                  name="pais"
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
            <Grid item xs={12}>
              <h2>Detalles de los paises</h2>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <InputLabel htmlFor="id">
                        <Typography style={{
                          fontWeight: 'bold',
                        }} sx={typographyStyle}>Código del País:</Typography>
                        <Typography sx={typographyStyle}>{codigo}</Typography>
                      </InputLabel>
                    </Grid>
                    <Grid item xs={5}>
                      <InputLabel htmlFor="descripcion">
                        <Typography style={{
                          fontWeight: 'bold',
                        }} sx={typographyStyle}>País descripción:</Typography>
                        <Typography sx={typographyStyle}>{pais}</Typography>
                      </InputLabel>
                    </Grid>
                  </Grid>

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

export default PaisesIndex;





