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
  Autocomplete,
  Box
} from "@mui/material";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
import { height } from '@mui/system';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy, values } from 'lodash';
import { id } from 'date-fns/locale';
import "src/styles/custom-pagination.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function CiudadesIndex() {
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});
  const [PaisDDL, setPaisDDL] = useState([]);
  const [pais, setPais] = useState('');
  const [ProvinciaDDL, setProvinciaDDL] = useState([]);
  const [provincia, setProvincia] = useState('');
  const [nombreCuidad, setNombreCuidad] = useState("");
  //Constantes para editar
  const [paisEditar, setPaisEditar] = useState("");
  const [provinciaEditar, setProvinciaEditar] = useState("");
  const [nombreCuidadEditar, setNombreCuidadEditar] = useState("");
  //Constante para asignar los valores a la tabla y mapear
  const[DataTabla, setDataTabla] = useState([])
  //Constante solo para que quitar el error de los textfield no controlados
  const [message, setMessage] = useState();
  const [id, setId] = useState("");
  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [usuariocrea, setusuariocrea] = useState("");
  const [fechacrea, setfechacrea] = useState("");
  const [usuariomodifica, setusuariomodifica] = useState("");
  const [fechamodifica, setfechamodifica] = useState("");
  const [provcodigo, setprovcodigo] = useState('');
  const [paiscodigo, setpaiscodigo] = useState('');
  
  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    CargarDatosTabla();
    CargarDatosDdl();
  }, []);

  //Constante para cargar los datos de los Dddl
  const CargarDatosDdl = async () => {
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    const responseDdl = await axios.get(process.env.REACT_APP_API_URL+'api/Paises/Listar', {
      headers: customHeaders,
    });
      setPaisDDL(
        responseDdl.data.map(item => ({
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

  const CargarProvinciaDDLEditar = async (id) => {
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

  //Constante para cargar datos a las tablas
  const CargarDatosTabla = async () => {
    try {
    const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      const response = await axios.get(process.env.REACT_APP_API_URL+'api/Ciudades/Listar', {
        headers: customHeaders,
      }); 
      console.log(response)
      const rows = response.data.data.map((item,index) => {
        return {
          key:index,
          id: item.ciud_Id,
          nombreCuidad: item.ciud_Nombre,
          provincia: item.pvin_Nombre,
          provcodigo: item.pvin_Id,
          pais: item.pais_Codigo + ' - ' + item.pais_Nombre,
          usuariocrea: item.usuarioCreacionNombre,
          usuariomodifica: item.usuarioModificadorNombre,
          fechacrea: item.ciud_FechaCreacion,
          fechamodifica: item.ciud_FechaModificacion,
        }
      });
      setDataTabla(rows);
    } catch (error) {
    }
  };

  const ToastErrorApi = () => {
    toast.warning('Algo salió mal. Inténtelo más tarde', {
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
    toast.error('Debe completar todos los campos.', {
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

  const ToastEditar = () => {
    toast.success('Datos editados correctamente.', {
      theme: 'dark',
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

  const campos = {
    pais: '',
    provincia: '',
    nombreCuidad: "",
    usuariocrea: "",
    fechacrea: "",
    usuariomodifica: "",
    fechamodifica: "",
    provcodigo: '',
    paisEditar: '',
    provinciaEditar: '',
    nombreCuidadEditar: "",
  };

  const schema = yup.object().shape({
    pais: yup.string().required(''),
    provincia: yup.string().required(''),
    nombreCuidad: yup.string().required(''),
    paisEditar: yup.string().required(''),
    provinciaEditar: yup.string().required(''),
    nombreCuidadEditar: yup.string().required(''),
  });

  const DetallesTabla = (id) => {
    const Detalles = DataTabla.find(registro => registro.id === id);
    setId(Detalles.id);
    setNombreCuidad(Detalles.nombreCuidad);
    setPais(Detalles.pais);
    setProvincia(Detalles.provincia);
    setusuariocrea(Detalles.usuariocrea);
    setusuariomodifica(Detalles.usuariomodifica);
    setfechacrea(Detalles.fechacrea);
    setfechamodifica(Detalles.fechamodifica);
  };
  
  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    campos,
    mode: 'all', 
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

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


  const handleEdit = async (id) => {
    const Editar = DataTabla.find((registro) => registro.id === id);
    setNombreCuidadEditar(Editar.nombreCuidad);
    setId(Editar.id);
    setValue("ciudadEditar", Editar.nombreCuidad);
    setNombreCuidad(nombreCuidad);
    setprovcodigo(Editar.provcodigo);
  
    try {
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
  
      const responseProvincias = await axios.get(process.env.REACT_APP_API_URL + 'api/Provincias/Listar', { headers: customHeaders });
   
      const provinciaPreseleccionada = responseProvincias.data.data.find(d => d.pvin_Id === Editar.provcodigo);
      setpaiscodigo(provinciaPreseleccionada.pais_Id);
   
      const filteredProvincias = responseProvincias.data.data.filter(item => item.pais_Id === provinciaPreseleccionada.pais_Id);
      const provinciaOptions = filteredProvincias.map(item => ({ pvin_Id: item.pvin_Id, provincia: item.pvin_Nombre }));
      setProvinciaDDL(provinciaOptions);
  
      MostrarCollapseEditar();
      handleClose(id);
    } catch (error) {
      console.error("Error en handleEdit:", error);
    }
  };
  

  const handleDetails = (id) => {
    DetallesTabla(id);
    MostrarCollapseDetalles();
    handleClose(id);
  };

   //Constante para mostrar el collapse de agregar un registro
   const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(campos);
  };
    //Constante para mostrar el collapse de editar un registro
    const MostrarCollapseEditar = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarEditar(!mostrarEditar);
      reset(campos);
    };
  
    //Constante para mostrar el collapse de detalles un registro
    const MostrarCollapseDetalles = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarDetalles(!mostrarDetalles);
    };

  const handleDelete = (id) => {
    DialogEliminar(id)
    handleClose(id);
  };


  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };


  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Cuidad',
      dataIndex: 'nombreCuidad',
      key: 'nombreCuidad',
      sorter: (a, b) => a.nombreCuidad.localeCompare(b.nombreCuidad),
    },
    {
      title: 'Provincia',
      dataIndex: 'provincia',
      key: 'provincia',
      sorter: (a, b) => a.provincia.localeCompare(b.provincia),
    },
    {
      title: 'Pais',
      dataIndex: 'pais',
      key: 'pais',
      sorter: (a, b) => a.pais.localeCompare(b.pais),
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
              <MenuItem onClick={() => handleEdit(params.id)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

     //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
     const CerrarEditar = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarEditar(!mostrarEditar);
      reset(campos);
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


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = DataTabla.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    reset(campos);
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    //setmostrarEditar(!mostrarEditar);
    
    
  };
  

  const AgregarCiudad = () => {
    const formData = watch();
    ValidacionAgregar(formData); 
    handleSubmit(ValidacionAgregar)(); 
  };

  const CiudadesValidar = (nombreCuidad) => {
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
      CiudadesValidar(data.nombreCuidad)
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
    try {
      let values = {
        ciud_Nombre: data.nombreCuidad,
        pvin_Id: data.provincia,
        usua_UsuarioCreacion: 1,
        ciud_FechaCreacion: new Date() 
      }
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      axios.post(process.env.REACT_APP_API_URL+'api/Ciudades/Insertar',values,{
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
            ToastError();
          } 
        }  
        }else{
          ToastErrorApi();
        }
      }).catch = (error) => {
        ToastError();
      }
    } catch (error) {
      ToastError();
    }
      

    }
    else {
      console.log(errors);
      ToastError();
    }
  };

  const EditarCiudad = () => {
    const formData = watch();
    ValidacionEditar(formData); 
    handleSubmit(ValidacionEditar)(); 
  };

  const CiudadesEditar = (nombreCuidadEditar) => {
    if (!nombreCuidadEditar) {
      return true;
    }
    else {
      return false;
    }
  };

  const ValidacionEditar = (data) => {
    console.log(data);
    // Acá se llaman todos los campos a validar
    const ErroresArray = [
      CiudadesEditar(data.nombreCuidadEditar)
    ]

    // Se define la variable donde guardaremos los errores
    let errors = 0;

    // Se recorre el arreglo y se buscan los errores
    for (let i = 0; i < ErroresArray.length; i++) {
      if (ErroresArray[i] === true) {
        errors++;
      }
    }


    if (data.nombreCuidadEditar != null || data.paisEditar != null || data.provinciaEditar != null) {
      if (data.nombreCuidadEditar.trim() === "") {
        let values = {
          ciud_Id:					data.id,
          ciud_Nombre:			data.nombreCuidadEditar, 
          pvin_Id:					provcodigo, 
          usua_UsuarioModificacion:	1,
          ciud_FechaModificacion: new Date()	
        }
        const customHeaders = {
          'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
        };
        axios.post(process.env.REACT_APP_API_URL+'api/Ciudades/Editar',values,{
          headers: customHeaders,
        })
        .then(response =>{
          console.log(response, "respuesta")
          if(response.data.data != null){
            if (response.data.data.messageStatus === "1") {  
              console.log("siuuuuu");       
              ToastEditar();
              CargarDatosTabla();
              VisibilidadTabla();     
          }else {
            if(response.data.data.messageStatus.includes("Violation of UNIQUE KEY constraint 'UQ_Gral_tbCargos__carg_Nombre'.")){
              ToastInfoWarning();
            }else{
              ToastError();
            } 
          }  
          }else{
            ToastErrorApi();
          }
        }).catch = (error) => {
  
        }
      }
      else{
        ToastError();
      }
    }
    else{
      ToastError();
    }

    // Se utiliza la varibale de errores y se evalua en base a ella.
    // if (errors == 0) {
      
    //   let values = {
    //     ciud_Id:					data.id,
    //     ciud_Nombre:			data.nombreCuidadEditar, 
    //     pvin_Id:					provcodigo, 
    //     usua_UsuarioModificacion:	1,
    //     ciud_FechaModificacion: new Date()	
    //   }
    //   const customHeaders = {
    //     'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    //   };
    //   axios.post(process.env.REACT_APP_API_URL+'api/Ciudades/Editar',values,{
    //     headers: customHeaders,
    //   })
    //   .then(response =>{
    //     console.log(response, "respuesta")
    //     if(response.data.data != null){
    //       if (response.data.data.messageStatus === "1") {  
    //         console.log("siuuuuu");       
    //         ToastExito();
    //         CargarDatosTabla();
    //         VisibilidadTabla();     
    //     }else {
    //       if(response.data.data.messageStatus.includes("Violation of UNIQUE KEY constraint 'UQ_Gral_tbCargos__carg_Nombre'.")){
    //         ToastInfoWarning();
    //       }else{
    //         ToastError();
    //       } 
    //     }  
    //     }else{
    //       ToastErrorApi();
    //     }
    //   }).catch = (error) => {

    //   }

    // }
    // else {
    //   console.log(errors);
    //   ToastError();
    // }
  };

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/VqQ04b8/CIUDADES.png"
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
            columns={columns}
            
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas
              ,     className: "custom-pagination",
            }}

          />
        </div>
      </Collapse>
    {/* Tabla */}




      {/* Formulario Agregar */}
    <form onSubmit={handleSubmit((_data) => console.log(_data))}>
    <Collapse in={mostrarAdd}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}> </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">País</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.pais}
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
                <InputLabel id="demo-select-small-label">Provincia</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.provincia}
                          style={{ borderRadius: '3px' }}
                          label="Provincia"
                          defaultValue={" "}
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


            <Grid item xs={12}>
              <Controller render={({field}) =>(
                <TextField
                {...field}
                fullWidth
                  label="Nombre de Cuidad"
                  error={!!errors.nombreCuidad}
                  InputLabelProps={{ shrink: true }}
                />
              )}
              name='nombreCuidad'
              control={control}/>
            </Grid>


            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                onClick={AgregarCiudad}
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E', color: 'white',
                  "&:hover": { backgroundColor: '#6e52ae' },
                }}
                type='submit'
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
                onClick={VisibilidadTabla}
              >
                Cancelar
              </Button>
            </Grid>

          </Grid>
        </CardContent>
      </Collapse>
  </form>
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
          <Grid item xs={12}> </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">País</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.paisEditar}
                          style={{ borderRadius: '3px' }}
                          label="País"
                          value={paiscodigo}
                          onChange={(event) => {
                            setpaiscodigo(event.target.value)
                            CargarProvinciaDDLEditar(event.target.value)
                          }}
                        >
                        {PaisDDL.map(pais => (
                          <MenuItem key={pais.pais_Id} value={pais.pais_Id}>
                            {pais.pais}
                          </MenuItem>
                        ))} 
                        </Select>
                    )}
                    name="paisEditar"
                    control={control}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label">Provincia</InputLabel>
                  <Controller
                    render={({ field }) => (
                        <Select
                        {...field}
                        variant='outlined'
                        fullWidth
                          error={!!errors.provincia}
                          style={{ borderRadius: '3px' }}
                          label="Provincia"
                          value={provcodigo}
                          onChange={(event) => setprovcodigo(event.target.value)}
                        >
                        {ProvinciaDDL.map(provincia => (
                          <MenuItem key={provincia.pvin_Id} value={provincia.pvin_Id}>
                            {provincia.provincia}
                          </MenuItem>
                        ))} 
                        </Select>
                    )}
                    name="provinciaEditar"
                    control={control}
                  />
              </FormControl>
            </Grid>


            <Grid item xs={12}>
              <Controller render={({field}) =>(
                <TextField
                {...register("ciudadEditar")}
                fullWidth
                  label="Nombre de Cuidad"
                  error={!!errors.nombreCuidadEditar}
                  InputLabelProps={{ shrink: true }}
                />
              )}
              name='nombreCuidadEditar'
              control={control}/>
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
                onClick={CerrarEditar}
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
              <h2>Detalles de la Ciudad</h2>   
              </Grid>   
              <Grid item xs={12}>   
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Ciudad Id:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                   </Box>
                   <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Ciudad descripción:
                      </Typography>
                      <Typography>{nombreCuidad}</Typography>
                    </InputLabel>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Provincia:
                      </Typography>
                      <Typography>{pais}</Typography>
                    </InputLabel>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        País:
                      </Typography>
                      <Typography>{provincia}</Typography>
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


     {/* Modal de eliminar */}
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
      {/* Modal de eliminar */}
      <ToastContainer />
    </Card>
  );
}

export default CiudadesIndex;