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
  Box,
  FormLabel,
  Autocomplete
} from "@mui/material";
import React, { useEffect } from 'react'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
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

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ColoniasIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [id, setId] = useState("");
  const [CiudadDDL, setCiudadDDL] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [AldeaDDL, setAldeaDDL] = useState([]);
  const [aldea, setAldea] = useState("");
  const [colonia, setColonia] = useState("");
  //Constante para asignar los valores a la tabla y mapear
  const[DataTabla, setDataTabla] = useState([])

  const [usuariocrea, setusuariocrea] = useState("");
  const [fechacrea, setfechacrea] = useState("");
  const [usuariomodifica, setusuariomodifica] = useState("");
  const [fechamodifica, setfechamodifica] = useState("");
  const [ciudadid, setciudadid] = useState(0);
  const [aldeaid, setaldeaid] = useState(0);
  const [ciudadselec, setciudadselec] = useState("");
  const [aldeaselec, setaldeaselec] = useState("");
  const [ProvinciaDDL, setProvinciaDDL] = useState([]);
  const [provincia, setProvincia] = useState("");
  const [PaisDDL, setPaisDDL] = useState([]);
  const [pais, setPais] = useState("");

  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    CargarDatosTabla()
    CargarDatosDdl();
  }, []);

  //Constante para cargar los datos de los Dddl
  const CargarDatosDdl = async () => {
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    const responseDdl2 = await axios.get(process.env.REACT_APP_API_URL+'api/Paises/Listar', {
      headers: customHeaders,
    });
      setPaisDDL(
        responseDdl2.data.map(item => ({
          pais_Id: item.pais_Id,
          pais: item.pais_Codigo + ' - ' + item.pais_Nombre,
        }))
      )
  }

  const CargarProvinciaDDL = async (id) => {
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'api/Provincias/Listar', { headers: customHeaders });
  
      const filteredProvincias = response.data.data.filter(item => item.pais_Id === id);
      const provinciaOptions = filteredProvincias.map(item => ({ pvin_Id: item.pvin_Id, provincia: item.pvin_Nombre }));
  
      setProvinciaDDL(provinciaOptions);
      
    } catch (error) {
      console.error("Error cargando provincias:", error);
    }
        
  }

  const CargarCiudadDDL = async (id) => {
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'api/Ciudades/Listar', { headers: customHeaders });
  
      const filteredCiudades = response.data.data.filter(item => item.pvin_Id === id);
      const ciudadOptions = filteredCiudades.map(item => ({ ciud_Id: item.ciud_Id, ciudad: item.ciud_Nombre }));
  
      setCiudadDDL(ciudadOptions);
      
    } catch (error) {
      console.error("Error cargando ciudades:", error);
    }
        
  }

  const CargarAldeaDDL = async (id) => {
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'api/Aldea/Listar', { headers: customHeaders });
  
      const filteredAldeas = response.data.data.filter(item => item.ciud_Id === id);
      const aldeaOptions = filteredAldeas.map(item => ({ alde_Id: item.alde_Id, aldea: item.alde_Nombre }));
  
      setAldeaDDL(aldeaOptions);
      
    } catch (error) {
      console.error("Error cargando aldeas:", error);
    }
        
  }

  //Constante para cargar datos a las tablas
  const CargarDatosTabla = async () => {
    try {
    const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      const response = await axios.get(process.env.REACT_APP_API_URL+'api/Colonias/Listar', {
        headers: customHeaders,
      }); 
      console.log(response)
      const rows = response.data.data.map((item,index) => {
        return {
          key:index,
          id: item.colo_Id,
          colonia: item.colo_Nombre,
          aldea: item.alde_Nombre,
          aldeaid: item.alde_Id,
          ciudad: item.ciud_Nombre,
          ciudadid: item.ciud_Id,
          usuariocrea: item.usuarioCreacionNombre,
          usuariomodifica: item.usuarioModificacionNombre,
          fechacrea: item.colo_FechaCreacion,
          fechamodifica: item.colo_FechaModificacion,
        }
      });
      setDataTabla(rows);
    } catch (error) {
    }
  };

  const ToastError = () => {
    toast.error('Datos no ingresados correctamente.', {
      theme: 'dark',
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  const ToastExito = () => {
    toast.success('Datos ingresados correctamente.', {
      theme: 'dark',
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  const DetallesTabla = (id) => {
    const Detalles = DataTabla.find(registro => registro.id === id);
    setId(Detalles.id);
    setCiudad(Detalles.ciudad);
    setAldea(Detalles.aldea);
    setColonia(Detalles.colonia);
    setusuariocrea(Detalles.usuariocrea);
    setusuariomodifica(Detalles.usuariomodifica);
    setfechacrea(Detalles.fechacrea);
    setfechamodifica(Detalles.fechamodifica);
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const [anchorEl, setAnchorEl] = useState({});

  const handleClick   = (event, id) => {
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

  const handleEdit = (id) => {
    const Editar = DataTabla.find(registro => registro.id === id);
    setCiudad(Editar.ciudad);
    setciudadid(Editar.ciudadid);
    setAldea(Editar.aldea);
    setaldeaid(Editar.aldeaid);
    setColonia(Editar.colonia);
    setId(Editar.id);
    setValue("coloniaEditar", Editar.colonia); 
    setColonia(colonia);

    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    axios
        .get(process.env.REACT_APP_API_URL+'api/Ciudades/Listar', {headers: customHeaders}) 
        .then(response => response.data)
        .then(data => {
          setCiudadDDL(data.data.map(item => ({ ciud_Id: item.ciud_Id, ciudad: item.ciud_Nombre })))
          const ciudadPreseleccionada = data.data.find(d => d.ciud_Id === ciudadid)
          console.log(ciudadPreseleccionada);
          setciudadselec(ciudadPreseleccionada.ciud_Id)
        })
        .catch(error => console.error(error))
    axios
        .get(process.env.REACT_APP_API_URL+'api/Aldea/Listar', {headers: customHeaders}) 
        .then(response => response.data)
        .then(data => {
          setAldeaDDL(data.data.map(item => ({ alde_Id: item.alde_Id, aldea: item.alde_Nombre})))
          const aldeaPreseleccionada = data.data.find(d => d.alde_Id === aldeaid)
          console.log(aldeaPreseleccionada);
          setaldeaselec(aldeaPreseleccionada.alde_Id)
        })
        .catch(error => console.error(error))
    MostrarCollapseEditar();
    handleClose(id);
  };

  const handleDetails = (id) => {
    DetallesTabla(id);
    MostrarCollapseDetalles();
    handleClose(id);
  };

   //Constante para mostrar el collapse de agregar un registro
   const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultColoniasValues);
    CargarDatosDdl()
  };
    //Constante para mostrar el collapse de editar un registro
    const MostrarCollapseEditar = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarEditar(!mostrarEditar);
      reset(defaultColoniasValues);
      CargarDatosDdl()
    };
  
    //Constante para mostrar el collapse de detalles un registro
    const MostrarCollapseDetalles = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarDetalles(!mostrarDetalles);
    };

  const handleDelete = (id) => {
    // Lógica para manejar la eliminación de la fila con el ID proporcionado
    handleClose(id);
  };


  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ciudad',
      dataIndex: 'ciudad',
      key: 'ciudad',
      sorter: (a, b) => a.ciudad.localeCompare(b.ciudad),
    },
    {
      title: 'Aldea',
      dataIndex: 'aldea',
      key: 'aldea',
      sorter: (a, b) => a.aldea.localeCompare(b.aldea),
    },
    {
      title: 'Colonia',
      dataIndex: 'colonia',
      key: 'colonia',
      sorter: (a, b) => a.colonia.localeCompare(b.colonia),
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
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id)}>
                <Icon>visibility</Icon>ㅤDetalles
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
      formData.ciudad = ciudad;
      formData.aldea = aldea;
      formData.colonia = colonia;
      ValidacionesEditar(formData);
        reset(defaultColoniasValues);
        CargarDatosDdl()
        handleSubmit(ValidacionesEditar)();
    };
  
      //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultColoniasValues);
    CargarDatosDdl()
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

  const defaultColoniasValues = {
    ciudad: 0,
    aldea: 0,
    provincia: 0,
    pais: 0,
    colonia: '',

  }

  const ColoniasSchema = yup.object().shape({
    ciudad: yup.string().required(),
    aldea: yup.string().required(),
    colonia: yup.string().required(),
    provincia: yup.string().required(),
    pais: yup.string().required(),
  })

  const[data, setData] = useState([])

  
  const {handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    defaultColoniasValues,
    mode: 'all',
    resolver: yupResolver(ColoniasSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const ColoniasValidar = (nombreCuidad) => {
    if (!nombreCuidad) {
      return true;
    }
    else {
      return false;
    }
  };

  const ValidacionAgregar = (data) => {
    console.log(data);
    // Acá se llaman todos los campos a validar
    const ErroresArray = [
      ColoniasValidar(data.colonia)
    ]

    // Se define la variable donde guardaremos los errores
    let errors = 0;

    // Se recorre el arreglo y se buscan los errores
    for (let i = 0; i < ErroresArray.length; i++) {
      if (ErroresArray[i] === true) {
        errors++;
      }
    }

    // Se utiliza la varibale de errores y se evalua en base a ella.
    if (errors == 0) {

      let values = {
        colo_Nombre: data.colonia,
        alde_Id: data.aldea,
        ciud_Id: data.ciudad,
        usua_UsuarioCreacion: 1,
        colo_FechaCreacion: new Date()
      }
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      axios.post(process.env.REACT_APP_API_URL+'api/Colonias/Insertar',values,{
        headers: customHeaders,
      })
      .then(response =>{
        console.log(response, "respuesta")
        if(response.data.data != null){
          if (response.data.data.messageStatus === "1") {  
            console.log("siuuuuu");       
            ToastExito();
            CargarDatosTabla();
            VisibilidadTabla();     
        }else {
          if(response.data.data.messageStatus.includes("Violation of UNIQUE KEY constraint 'UQ_Gral_tbCargos__carg_Nombre'.")){
            ToastInfoWarning();
          }else{
            
          } 
        }  
        }else{
          ToastErrorApi();
        }
      }).catch = (error) => {

      }

    }
    else {
      console.log(errors);
      ToastError();
    }
  };

  const datosWatch = watch();

    //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
    const ValidacionesEditar = (data) => {
      if (data.colonia != null) {
        if (data.colonia.trim() === "") {
          Toast.fire({
            icon: "error",
            title: "No se permiten campos vacios",
          });
        } else {
          MostrarCollapseEditar();
          Toast2.fire({
            icon: "success",
            title: "Datos guardados exitosamente",
          });
        }
      } else {
        Toast.fire({
          icon: "error",
          title: "No se permiten campos vacios",
        });
      }
    };


  const GuardarColonia = () => {
    const formData = watch();
    ValidacionAgregar(formData); 
    handleSubmit(ValidacionAgregar)(); 
    reset(defaultColoniasValues);
    CargarDatosDdl()

  };

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = DataTabla.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <ToastContainer />
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/RBmR7C6/COLONIAS.png"
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
      <Collapse in={mostrarAgregar}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
              </Typography>
            </Grid> 

            <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="pais">País</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.ciudad}
                          style={{ borderRadius: '3px' }}
                          label="País"
                          defaultValue={" "}
                          onChange={e => {
                            const paisSeleccionado = e.target.value; 
                            field.onChange(e);
                            CargarProvinciaDDL(paisSeleccionado); 
                          }}
                        >
                        {PaisDDL.map(pais => (
                          <MenuItem key={pais.pais_Id} value={pais.pais_Id}>
                            {pais.pais}
                          </MenuItem>
                        ))} 
                        </Select>
                    )}
                    name="pais"
                    control={control}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="provincia">Provincia</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.ciudad}
                          style={{ borderRadius: '3px' }}
                          label="Provincia"
                          defaultValue={" "}
                          onChange={e => {
                            const provinciaSeleccionada = e.target.value; 
                            field.onChange(e);
                            CargarCiudadDDL(provinciaSeleccionada); 
                          }}
                        >
                        {ProvinciaDDL.map(provincia => (
                          <MenuItem key={provincia.pvin_Id} value={provincia.pvin_Id}>
                            {provincia.provincia}
                          </MenuItem>
                        ))} 
                        </Select>
                    )}
                    name="provincia"
                    control={control}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Ciudad</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.ciudad}
                          style={{ borderRadius: '3px' }}
                          label="Ciudades"
                          defaultValue={" "}
                          onChange={e => {
                            const ciudadSeleccionada = e.target.value; 
                            field.onChange(e);
                            CargarAldeaDDL(ciudadSeleccionada); 
                          }}
                        >
                        {CiudadDDL.map(ciudad => (
                          <MenuItem key={ciudad.ciud_Id} value={ciudad.ciud_Id}>
                            {ciudad.ciudad}
                          </MenuItem>
                        ))} 
                        </Select>
                    )}
                    name="ciudad"
                    control={control}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Aldea</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.aldea}
                          style={{ borderRadius: '3px' }}
                          label="Aldeas"
                          defaultValue={" "}
                        >
                          {AldeaDDL.map(aldea => (
                          <MenuItem key={aldea.alde_Id} value={aldea.alde_Id}>
                            {aldea.aldea}
                          </MenuItem>
                        ))} 
                        </Select>
                    )}
                    name="aldea"
                    control={control}
                  />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <div className="mt-5 mb-16" style={{ width: '100%'}}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Colonia"
                      variant="outlined"
                      error={!!errors.colonia}
                      placeholder='Ingrese el nombre de la Colonia'
                      fullWidth
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="colonia"
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
                onClick={GuardarColonia}
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
          <Grid item xs={12}> </Grid>

          <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="pais">País</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.ciudad}
                          style={{ borderRadius: '3px' }}
                          label="País"
                          defaultValue={" "}
                          onChange={e => {
                            const paisSeleccionado = e.target.value; 
                            field.onChange(e);
                            CargarProvinciaDDL(paisSeleccionado); 
                          }}
                        >
                        {PaisDDL.map(pais => (
                          <MenuItem key={pais.pais_Id} value={pais.pais_Id}>
                            {pais.pais}
                          </MenuItem>
                        ))} 
                        </Select>
                    )}
                    name="pais"
                    control={control}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="provincia">Provincia</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.ciudad}
                          style={{ borderRadius: '3px' }}
                          label="Provincia"
                          defaultValue={" "}
                          onChange={e => {
                            const provinciaSeleccionada = e.target.value; 
                            field.onChange(e);
                            CargarCiudadDDL(provinciaSeleccionada); 
                          }}
                        >
                        {ProvinciaDDL.map(provincia => (
                          <MenuItem key={provincia.pvin_Id} value={provincia.pvin_Id}>
                            {provincia.provincia}
                          </MenuItem>
                        ))} 
                        </Select>
                    )}
                    name="provincia"
                    control={control}
                  />
              </FormControl>
            </Grid>

          <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Ciudad</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.ciudad}
                          style={{ borderRadius: '3px' }}
                          label="Ciudades"
                          defaultValue={ciudadselec}
                          onChange={e => {
                            setciudadselec(e.target.value)
                          }}
                        >
                        {CiudadDDL.map(ciudad => (
                          <MenuItem key={ciudad.ciud_Id} value={ciudad.ciud_Id}>
                            {ciudad.ciudad}
                          </MenuItem>
                        ))} 
                        </Select>
                    )}
                    name="ciudad"
                    control={control}
                  />
              </FormControl>
            </Grid>
            <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Aldea</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.aldea}
                          style={{ borderRadius: '3px' }}
                          label="Aldeas"
                          defaultValue={aldeaselec}
                          onChange={e => {
                            setaldeaselec(e.target.value)
                          }}
                        >
                          {AldeaDDL.map(aldea => (
                          <MenuItem key={aldea.alde_Id} value={aldea.alde_Id}>
                            {aldea.aldea}
                          </MenuItem>
                        ))} 
                        </Select>
                    )}
                    name="aldea"
                    control={control}
                  />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <div className="mt-5 mb-16" style={{ width: '100%'}}>
                <Controller
                  render={({ field }) => (
                    <TextField
                    {...register("coloniaEditar")}
                      label="Colonia"
                      variant="outlined"
                      error={!!errors.colonia}
                      placeholder='Ingrese el nombre de la Colonia'
                      fullWidth
                      InputProps={{startAdornment: (<InputAdornment position="start"></InputAdornment>),}}
                    />
                  )}
                  name="colonia"
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
              <h2>Detalles de la Colonia</h2>   
              </Grid>   
              <Grid item xs={12}>   
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Colonia Id:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Colonia Descripcion:
                      </Typography>
                      <Typography>{colonia}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Aldea:
                      </Typography>
                      <Typography>{aldea}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Ciudad:
                      </Typography>
                      <Typography>{ciudad}</Typography>
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
                            <td style={tableCellStyle}>{usuariocrea}</td>
                            <td style={tableCellStyle}>{fechacrea}</td>
                          </tr>
                          <tr style={tableRowStyle}>
                            <td style={tableCellStyle}>
                              <strong>Modificación</strong>
                            </td>
                            <td style={tableCellStyle}>{usuariomodifica}</td>
                            <td style={tableCellStyle}>{fechamodifica}</td>
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

export default ColoniasIndex;



