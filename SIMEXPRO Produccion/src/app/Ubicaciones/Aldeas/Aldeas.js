/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
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
  Card,
  CardContent,
  CardMedia,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  DataGrid,
  Menu,
  Box,
  Collapse,
  Typography,
  Select,
  Grid,
  GridToolbar,
  Stack,
  ListItemText,
  esES,
  FormLabel,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio,
  TableContainer,
  MenuItem,
  ListItem
} from "@mui/material";
import { Autocomplete } from '@mui/lab';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table } from "antd";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createFilterOptions } from '@mui/material/Autocomplete';



//Consultas a api y ddl
import { useProvinciasDDL } from "src/app/loadDDLs/ProvinciasDDL";
import apiRequests from "src/app/Ubicaciones/Aldeas/AldeasService";



function AldeaIndex() {
   //Constante para la busqueda del datatable
   const [searchText, setSearchText] = useState("");

   //Constante para mostrar el index de la pantalla
   const [mostrarIndex, setmostrarIndex] = useState(true);
 
  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);


  const [anchorEl, setAnchorEl] = useState({});

  const [id, setid] = useState("");
  const[alde_Nombre, setAlde_Nombre] = useState("");
  const [ciud_Id, setCiud_Id] = useState(0);


  const provinciasOptions = useProvinciasDDL();
  const [selectedProvincia, setSelectedProvincia] = useState(null);

  //Valores en string de ddls
  const [ciudadNombre, setciudadNombre] = useState("");
  const [usuarioCreacion, setUsuarioCreacion] = useState("");
  const [usuraioModificador, setUsuarioModificador] = useState("");
  const [FechaCreacion, setFechaCreacion] = useState();
  const [FechaModificacion, setModificacion] = useState();

  //Ciudad basicamente 
  const [DataTabla, setDataTabla] = useState([]);
  const [message, setMessage] = useState();
  const [filas, setFilas] = React.useState(10);




  const CiudadValidar = (ciud_Id) => {
    if (!ciud_Id || ciud_Id === 0) {
      return true;
    } else {
      return false;
    }
  };

  const AldeaValidar = (alde_Nombre ) => {
    if (!alde_Nombre|| alde_Nombre.trim() === '') {
      return true;
    } else {
      return false;
    }
  };

 // Función para Guardar Cambios
 const guardarAldeas = (data) => {
  
    console.log(data, "data");
    // Acá se llaman todos los campos a validar
    const ErroresArray = [
      AldeaValidar(data.alde_Nombre),
      CiudadValidar(data.ciud_Id),
      console.log(data.ciud_Id, "trae algo?")
    ];
  
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
      console.log("aqui va??")
  
      let values = {
        alde_Nombre: data.alde_Nombre,
        ciud_Id: data.ciud_Id,
        usua_UsuarioCreacion: 1,
        alde_FechaCreacion: new Date()  
      }
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      axios.post(process.env.REACT_APP_API_URL+'api/Aldea/Insertar',values,{
        headers: customHeaders,
      })
      .then(response =>{
        console.log(response, "respuesta")
        if(response.data.data != null){
          if (response.data.data.messageStatus === "1") {  
            console.log("Meow ya crea y valida");   
            console.log(response.data.data.messageStatus, "mensaje")    
            ToastSuccess();
            CerrarCollapseAgregar();     
        }else {
          if(response.data.data.messageStatus.includes("Violation of UNIQUE KEY constraint")){
            ToastInfoWarning();
            console.log("entra message");
          }else{
            ToastErrorApi();   
            console.log("entra api"); 
          } 
        }  
        }else{
          ToastErrorApi();
        }
      }).catch = (error) => {
        console.log("entra catch");

      }
  
    }
    else {
      console.log(errors);
      console.log("aqui entra vacio");
      ToastWarning();
    }
};

const EditarAldeas = async () => {
  try {
    const formData = watch(); 

    const ErroresArray = [
      AldeaValidar(formData.aldeasEditar),
      CiudadValidar(formData.ciudadEditar)
    ]
    let errors = 0;

    for (let i = 0; i < ErroresArray.length; i++) {
      if (ErroresArray[i] === true) {
        errors++;
      }
    }
    if (errors == 0) {

    console.log(formData.aldeasEditar,formData.ciudadEditar, "khaaa")// Obtengo los datos del formulario con react-hook-form
    const payload = {
      alde_Id: id,
      alde_Nombre: formData.aldeasEditar,
      ciud_Id: formData.ciudadEditar,
      usua_UsuarioModificacion: 1,
      alde_FechaModificacion: new Date()  
    };

    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    
    const response = await axios.post(
      process.env.REACT_APP_API_URL + `api/Aldea/Editar`, 
      payload,
      {
        headers: customHeaders,
      }
    );

    if (response.data.data != null && response.data.data.messageStatus === "1") {
      // aqui actualiza
      ToastSuccessEditar();
      CerrarCollapseEditar();
    } else {
      //repetidos
      if(response.data.data.messageStatus.includes("Violation of UNIQUE KEY constraint")){
        ToastInfoWarning();
      }else{
        ToastErrorApi();    
      } 
    }
  }
  else {
    console.log(errors);
    console.log("aqui entra vacio");
    ToastWarning();
  }
  } catch (error) {
    ToastErrorApi();
  }
};


  useEffect(() => {
    CargarDatosTabla();
    if (selectedProvincia) {
      const provincia = provinciasOptions.find(option => option.label === selectedProvincia);
      if (provincia) {
        setCiudadesList(provincia.options);
      }
    }
  }, [selectedProvincia, provinciasOptions]);



  //Constante para cargar datos a las tablas
  const CargarDatosTabla = async () => {
    try {
      const aldeas = await apiRequests.listarAldeas();
      const rows = aldeas.map((item, index) => {
        return {
          key: index,
          alde_Id: item.alde_Id,
          alde_Nombre: item.alde_Nombre,
          ciudadNombre: item.ciud_Nombre,
          ciud_Id: item.ciud_Id,
          usuarioCreacionNombre: item.usuarioCreacionNombre,
          usuCreaId: item.usua_UsuarioCreacion,
          alde_FechaCreacion: item.alde_FechaCreacion,
          usuarioModificadorNombre: item.usuarioModificadorNombre,
          usuModificacionId: item.usua_UsuarioModificacion,
          alde_FechaModificacion: item.alde_FechaModificacion,
          usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
          alde_FechaEliminacion: item.alde_FechaEliminacion,
        };
      });
      setDataTabla(rows);
    } catch (error) {
      console.log(error);
    }
  };
 

  const defaultAldeasValues = {
    alde_Nombre: "",
    ciud_Id: "",  
  };

  const AldeasSchema = yup.object().shape({
    alde_Nombre: yup.string().required(""),
    ciud_Id: yup.string().required(),
  });


   //Constante para el detalle de las pantallas
   const DetallesTabla = (id) => {
    const Detalles = DataTabla.find(registro => registro.id === id);
  
    setid(Detalles.alde_Id);
    setAlde_Nombre(Detalles.alde_Nombre);
    setciudadNombre(Detalles.ciudadNombre);
    setUsuarioCreacion(Detalles.usuarioCreacionNombre);
    setUsuarioModificador(Detalles.usuarioModificadorNombre);
    setFechaCreacion(Detalles.alde_FechaCreacion);
    setModificacion(Detalles.alde_FechaModificacion);
  };     


  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (id) => {

    const datos = DataTabla.find(registro => registro.id === id)

    setValue("aldeasEditar", datos.alde_Nombre); 
    setAlde_Nombre("aldeasEditar", datos.alde_Nombre);
    setValue("ciudadEditar", datos.ciud_Id);
    setCiud_Id("ciudadEditar", datos.ciud_Id)
    setid(datos.id);  
    console.log(datos.alde_Nombre,datos.ciud_Id), 
    MostrarCollapseEditar();
    handleClose(id);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (id) => {
    DetallesTabla(id);
    MostrarCollapseDetalles();
    handleClose(id);
  };

    //Constante que detecta el cambio de las filas que se mostraran en el index
    const handleChange = (event) => {
      setFilas(event.target.value);
      setMessage(event.target.value);
    };
  



    {/* Columnas de la tabla */ }
    const columns = [
      {
        title: 'ID',
        dataIndex: 'alde_Id',
        key: 'alde_Id',
        sorter: (a, b) => a.id - b.id
      },
      {
        title: 'Aldea',
        dataIndex: 'alde_Nombre',
        key: 'alde_Nombre',
        sorter: (a, b) => a.alde_Nombre.localeCompare(b.alde_Nombre),
      },
      {
        title: 'Cuidad',
        dataIndex: 'ciudadNombre',
        key: 'ciudadNombre',
        sorter: (a, b) => a.ciudadNombre.localeCompare(b.ciudadNombre),
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
                  <Icon>edit</Icon> Editar
                </MenuItem>
                <MenuItem onClick={() => handleDetails(params.id)}>
                  <Icon>visibility</Icon> Detalles
                </MenuItem>
               
              </Menu>
            </Stack>
          </div>
        ,
      },
    ];

    //Constante para el textfield de busqueda
    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
    };

    //Constantes de los campos que se utilizaran para filtrar datos
    const camposToFilter = ["alde_Id", "alde_Nombre", "ciudadNombre"];
  
    //Constante que ayuda a filtrar el datatable
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
      toast.warning('Error en el proceso de la peticion.', {
        theme: 'dark',
        //  position: toast.POSITION.BOTTOM_RIGHT
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }
    const ToastSuccessEditar = () => {
      toast.success('Datos editados correctamente.', {
        theme: 'dark',
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }

   //Constante para mostrar el collapse de agregar un registro
   const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultAldeasValues);
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultAldeasValues);
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
    reset(defaultAldeasValues);
    CargarDatosTabla();
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
   // reset(defaultAldeasValues);
    CargarDatosTabla();
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };



  //Constante que nos ayuda para las validaciones con yup para los formularios 
  const { handleSubmit, register, reset, control, watch, formState,setValue } = useForm({
    defaultAldeasValues,
    mode: "all",
    resolver: yupResolver(AldeasSchema),
  });
  
  const { isValid, dirtyFields, errors } = formState;

  const datosWatch = watch();

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
  guardarAldeas(formData);
  console.log(formData, "Formdata")
  setTimeout(() => {
    handleSubmit()();
  }, "250");
};

const EditarRegistro = () => {
 EditarAldeas();
  setTimeout(() => {
    handleSubmit()();
    reset(defaultAldeasValues);
   }, "1000");
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
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/PQVXCCM/ALDEAS.png"
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
      <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: "30px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
            <FormControl fullWidth>
            <FormLabel className="font-medium text-10" error={!!errors.ciud_Id}>Ciudad</FormLabel>
            <Controller  
              render={({ field }) => (
                <Autocomplete
                {...field}
                id="ciud_Id"
                 value={datosWatch['ciud_Id']}
                //value={ciud_Id}
                options={provinciasOptions.flatMap(provincia => provincia.options)}
                groupBy={(option) => option.provincia}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => { value ? setValue('ciud_Id', value.value) : setValue('ciud_Id', '') }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.ciud_Id}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />  
              )}
              name="ciud_Id"
              error={!!errors.ciud_Id}
              control={control}
            />
          </FormControl>


      </Grid>
          <Grid item xs={6}>  
            <Controller
             render={({ field }) => (
            <FormControl error={!!errors.alde_Nombre} fullWidth>
              <FormLabel className="font-medium text-10" component="legend">
                Nombre de la aldea
              </FormLabel>
              <TextField
                {...field}                
                variant="outlined"
                error={!!errors.alde_Nombre}
                placeholder=""
                fullWidth={true}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
              />
            </FormControl>
          )}
          name="alde_Nombre" 
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
                type='submit'
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
      <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: "30px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
            <FormControl fullWidth>
            <FormLabel className="font-medium text-10" error={!!errors.ciud_Id}>Ciudad</FormLabel>
            <Controller  
              render={({ field }) => (
                <Autocomplete
                {...field}
                id="ciud_Id"
               defaultValue={datosWatch['ciud_Id']}
               // value={ciud_Id}
                options={provinciasOptions.flatMap(provincia => provincia.options)}
                groupBy={(option) => option.provincia}
                getOptionLabel={(option) => option.label}
                onChange={(event, value) => { value ? setValue('ciud_Id', value.value) : setValue('ciud_Id', '') }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.ciud_Id}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />  
              )}
              name="ciud_Id"
             // error={!!errors.ciud_Id}
              control={control}
            />
          </FormControl>


      </Grid>
          <Grid item xs={6}>  
            <Controller
             render={({ field }) => (
            <FormControl error={!!errors.alde_Nombre} fullWidth>
              <FormLabel className="font-medium text-10" component="legend">
                Nombre de la aldea
              </FormLabel>
              <TextField
                {...field}  
                variant="outlined"
                error={!!errors.alde_Nombre}
                placeholder=""
                fullWidth={true}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
              />
            </FormControl>
          )}
          name="alde_Nombre" 
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
                type='submit'
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
              <h2>Detalles de Aldeas</h2>   
              </Grid>   
              <Grid item xs={12} style={{marginBottom:"25px", marginLeft:"30px"}}>  
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ flex: 1 }} >
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Id de la aldea:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Nombre de la aldea:
                      </Typography>
                      <Typography>{alde_Nombre}</Typography>
                    </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Nombre de la Ciudad:
                      </Typography>
                      <Typography>{ciudadNombre}</Typography>
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
                            <td style={tableCellStyle}>{usuarioCreacion}</td>
                            <td style={tableCellStyle}>{FechaCreacion  ? new Date(FechaCreacion).toLocaleString(): ""}</td>
                          </tr>
                          <tr style={tableRowStyle}>
                          <td style={tableCellStyle}>
                            <strong>Modificación</strong>
                          </td>
                          <td style={tableCellStyle}>{usuraioModificador}</td>
                          <td style={tableCellStyle}>{FechaModificacion ? new Date(FechaModificacion).toLocaleString() : ""}</td>
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

<TableContainer />
<ToastContainer/>
    </Card>
  );
}

export default AldeaIndex;



