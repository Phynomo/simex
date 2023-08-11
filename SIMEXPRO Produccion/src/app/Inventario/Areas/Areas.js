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
  Divider,
  Chip,
  Menu,
  Box,
  Collapse,
  Typography,
  Select,
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

function AreasIndex() {

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  //Constante de los valores de los textfield de la pantalla y los ddl
  const [id, setid] = useState("");
  const [areas, setareas] = useState("");
  const [proceso, setproceso] = useState("");
  const [procesoSeleccionado, setprocesoSeleccionado] = useState('')

  
  //Constante para asignar los valores a la tabla y mapear
  const[DataTabla, setDataTabla] = useState([])

  //Constante para guardar los datos de la tabla de detalles
  const[DataDetalles, setDataDetalles] = useState([])
  //Constante para guardar los datos del ddl de procesos
  const [ProcesosDdl, setProcesosDdl] = useState([])
  const [ProcesosDdlEdit, setProcesosDdlEdit] = useState([])
  const [idEliminar, setidEliminar] = useState(0);

  const camposToFilter = ["id", "areas","proceso"];

  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    CargarDatosTabla()
    CargasDatosDdl();
  }, []);

  //Constante para cargar los datos de los Dddl
  const CargasDatosDdl = async () => {
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    const responseDdl = await axios.get(process.env.REACT_APP_API_URL+'api/Procesos/Listar', {
      headers: customHeaders,
    });
      setProcesosDdl(
        responseDdl.data.data.map(item => ({
          proc_Id: item.proc_Id,
          proceso: item.proc_Descripcion,
        }))
      )
  }

  //Constante para cargar datos a las tablas
  const CargarDatosTabla = async () => {
    try {
    const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      const response = await axios.get(process.env.REACT_APP_API_URL+'api/Areas/Listar', {
        headers: customHeaders,
      }); 
      const rows = response.data.data.map((item,index) => {
        return {
          key:index,
          id: item.tipa_Id,
          areas: item.tipa_area,
          proceso: item.proc_Descripcion,
        }
      });
      setDataTabla(rows);
      setDataDetalles(response.data.data)
    } catch (error) {
    }
  };


  //Constantes para el dialog de eliminar
  const [Eliminar, setEliminar] = useState(false);
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const EliminarRegistro = async () => {
    let payload = {
      tipa_Id: idEliminar,
      usua_UsuarioEliminacion: 1,
      tipa_FechaEliminacion: new Date()
    };
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    const response = await axios.post(process.env.REACT_APP_API_URL+'api/Areas/Eliminar',payload, {
      headers: customHeaders,
    });
      if(response.data.data.messageStatus === "1" )
      {
        DialogEliminar();
        CargarDatosTabla();
        ToastSuccessEliminar();
      }else{
        ToastErrorApi();
      }
    }

  //Constante para el detalle de las pantallas
  const DetallesTabla = (rowId, areas) => {
    setid(rowId);
    setareas(areas);
    const detalles = DataDetalles.find(d => d.tipa_Id === rowId)
    const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
    tableRows[0].cells[1].textContent = detalles.usarioCreacion;
    tableRows[0].cells[2].textContent = detalles.tipa_FechaCreacion;
    tableRows[1].cells[1].textContent = detalles.usuarioModificacion;
    tableRows[1].cells[2].textContent = detalles.tipa_FechaModificacion;
  };        

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (id, areas,proceso) => {
    setValueEditar("areasEditar",areas)
    setareas(areas);
    setid(id);
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    axios
        .get(process.env.REACT_APP_API_URL+'api/Procesos/Listar', {headers: customHeaders}) 
        .then(response => response.data.data)
        .then(data => {
          setProcesosDdlEdit(data.map(item => ({ proc_Id: item.proc_Id, proceso: item.proc_Descripcion })))
          const procesoPreseleccionado = data.find(d => d.proc_Descripcion === proceso)
          setprocesoSeleccionado(procesoPreseleccionado.proc_Id)
        })
        .catch(error)
    
    MostrarCollapseEditar();
    handleClose(id);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (id, areas) => {
    DetallesTabla(id, areas);
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
      title: "Àrea",
      dataIndex: "areas",
      key: "areas",
      sorter: (a, b) => a.areas.localeCompare(b.areas), //sorting para Letras
    },
    {
      title: "Proceso",
      dataIndex: "proceso",
      key: "proceso",
      sorter: (a, b) => a.proceso.localeCompare(b.proceso), //sorting para Letras
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
              <MenuItem onClick={() => handleEdit(params.id, params.areas,params.proceso)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id, params.areas)}>
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
  const ToastSuccess =() => {
    toast.success('Datos ingresados correctamente.', {
      theme: 'dark',
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
  const ToastSuccessEditar =() => {
    toast.success('Datos editados correctamente.', {
      theme: 'dark',
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
  const ToastSuccessEliminar =() => {
    toast.success('Datos eliminado correctamente.', {
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

  //Constante de los datos por defecto que tendran los formulario de agregar
  const defaultAreasValues = {
    areas: "",
    proceso: ''
  };

    //Constante de los datos por defecto que tendran los formulario de editar
    const defaultAreasEditarValues = {
      areasEditar: "",
      procesoEditar: ''
    };

  //Constante de los datos que serán requeridos para el formulario
  const AreasSchema = yup.object().shape({
    areas: yup.string().required(),
    proceso: yup.string().required(),
  });

  //Constante de los datos que serán requeridos para el formulario
  const AreasEditarSchema = yup.object().shape({
    areasEditar: yup.string().required(),
    procesoEditar: yup.string().required(),
  });

  //Constante para mostrar el collapse de agregar un registro
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultAreasValues);
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
    reset(defaultAreasValues);
    CargarDatosTabla();  
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    resetEditar(defaultAreasEditarValues);
    CargarDatosTabla();
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante que nos ayuda para las validaciones con yup para los formularios de agregar
  const { handleSubmit, reset, control, watch, formState,setValue  } = useForm({
    defaultAreasValues,
    mode: "all",
    resolver: yupResolver(AreasSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  //Constante que nos ayuda para las validaciones con yup para los formularios de editar
  const { handleSubmit:handleSubmitEditar, reset:resetEditar, control:ControlEditar, watch:WatchEditar, formState:formStateEditar,setValue:setValueEditar  } = useForm({
    defaultAreasEditarValues,
    mode: "all",
    resolver: yupResolver(AreasEditarSchema),
  });

  const {errors:ErrorsEditar} = formStateEditar;

    //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de agregar
    const ValidacionAgregar = async(data) => {
      let isValid = true;

          if(data.proceso.length != 0){
            if (data.areas != null) {
                if (data.areas.trim() === "" || data.proceso[0] === "") {
                    ToastWarning();
                } else {
                    isValid = false;
                    let respuesta = await EjecutarEndPoint(data);
                    if(respuesta === 1){
                      ToastSuccess();
                      CerrarCollapseAgregar();                     
                    } if (respuesta === 2){
                      ToastInfoWarning();
                    } if(respuesta  === 3){
                      ToastErrorApi();
                    } if(respuesta === 4){
                      ToastErrorApi();
                    }
                    return isValid;
                }
            }else{
              return isValid;
            }
          }else{
            ToastWarning();
            return isValid;
          }
    }

    //Ejecutar end point de tipo async para esperar la respuesta
    const EjecutarEndPoint = async (data) => {
      let payload = {
        tipa_area: data.areas,
        proc_Id: data.proceso,
        usua_UsuarioCreacion: 1,
        tipa_FechaCreacion: new Date(),
      };
      const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL + 'api/Areas/Insertar',
          payload,
          {
            headers: customHeaders,
          }
        );
    
        if (response.data.data != null) {
          if (response.data.data.messageStatus === '1') {
            return 1;
          } else {
            if (response.data.data.messageStatus.includes('UNIQUE')) {
              return 2;
            } else {
              return 3;
            }
          }
        } else {
          return 4;
        }
      } catch (error) {
        return 4; 
      }
    };

    //Constante para ejecutar las validaciones y el envio del formulario en el boton de agregar en el collapse de agregar
    const AgregarRegistro = async () => {
      const validationResult = await ValidacionAgregar(watch());
      if (validationResult) {
        handleSubmit(ValidacionAgregar)();
      }
    };

   //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
   const ValidacionesEditar = async (data) => {
    let isValid = true;
      if (data.areasEditar != null) {
          if (data.areasEditar.trim() === '') {
              ToastWarning();
          } else {
              isValid = false;
              let respuesta = await EjecutarEndPointEditar(data);
              if(respuesta === 1){
                ToastSuccessEditar();
                CerrarCollapseEditar(); 
                isValid = false; 
              } if (respuesta === 2){
                isValid = false;
                ToastInfoWarning();
              } if(respuesta  === 3){
                isValid = false;
                ToastErrorApi();
              } if(respuesta === 4){
                isValid = false;
                ToastErrorApi();
              }
              return isValid;
          }
      }else{
        return isValid;
      }
  };


   //Ejecutar end point de tipo async para esperar la respuesta
   const EjecutarEndPointEditar = async (data) => {
    let payload = {
      tipa_Id:id,
      tipa_area: data.areasEditar,
      proc_Id: procesoSeleccionado,
      usua_UsuarioModificacion: 1,
      tipa_FechaModificacion: new Date()  
    }
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    try {
      const response =  await axios.post(process.env.REACT_APP_API_URL+'api/Areas/Editar',payload,{
        headers: customHeaders,
      })   
      if (response.data.data != null) {
        if (response.data.data.messageStatus === '1') {
          return 1;
        } else {
          if (response.data.data.messageStatus.includes('UNIQUE')) {
            return 2;
          } else {
            return 3;
          }
        }
      } else {
        return 4;
      }
    } catch (error) {
      return 4;
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
    const validationResult = await ValidacionesEditar( WatchEditar());
    if (validationResult) {
      handleSubmitEditar(ValidacionesEditar)();
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
        image="https://i.ibb.co/44NvHn3/REAS.png"
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
          <Grid item xs={6}>           
          <Controller
                defaultValue={["Selecciona una opción"]}
                render={({ field }) => (
                  <FormControl error={!!errors.proceso} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Proceso
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      error={!!errors.proceso}
                      inputProps={{
                        startadornment: <InputAdornment position="start" />,
                      }}
                    >
                      {ProcesosDdl.map(proceso => (
                          <MenuItem key={proceso.proc_Id} value={proceso.proc_Id}>
                            {proceso.proceso}
                          </MenuItem>
                        ))}                 
                    </Select>
                  </FormControl>
                )}
                name="proceso"
                control={control}
              />
            </Grid>
          <Grid item xs={6}>
                <Controller
                   render={({ field }) => (
                    <FormControl error={!!errors.areas} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Áreas
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.areas}
                      placeholder="Ingrese el nombre del area"
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  )}
                  name="areas"
                  control={control}
                />
            </Grid>

            <Grid item xs={12}sx={{display: "flex",justifyContent: "right",alignItems: "right",}}>
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
          <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Proceso
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      value={procesoSeleccionado}
                      onChange={e => {
                        setprocesoSeleccionado(e.target.value)
                      }}
                      inputProps={{
                        startadornment: <InputAdornment position="start" />,
                      }}
                    >                     
                      {ProcesosDdlEdit.map(proceso => (
                          <MenuItem key={proceso.proc_Id} value={proceso.proc_Id}>
                            {proceso.proceso}
                          </MenuItem>
                        ))}                 
                    </Select>
                  </FormControl>
                )}
                name="procesoEditar"
                control={ControlEditar}
              />
            </Grid>
          <Grid item xs={6} >
              <Controller
                   render={({ field }) => (
                    <FormControl error={!!ErrorsEditar.areasEditar} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Áreas
                    </FormLabel>
                    <TextField
                     {...field} 
                      variant="outlined"
                      error={!!ErrorsEditar.areasEditar}
                      placeholder="Ingrese el nombre del area a editar"
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                    </FormControl>
                  )}
                  name="areasEditar"
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
         <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip color='default' label="Detalle Áreas" />
                </Divider>
            </Grid>
              <Grid item xs={12}>   
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Área Id:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                    </Grid>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Área descripción:
                      </Typography>
                      <Typography>{areas}</Typography>
                    </InputLabel>
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
                            <td style={tableCellStyle}></td>
                            <td style={tableCellStyle}></td>
                          </tr>
                          <tr style={tableRowStyle}>
                            <td style={tableCellStyle}>
                              <strong>Modificación</strong>
                            </td>
                            <td style={tableCellStyle}></td>
                            <td style={tableCellStyle}></td>
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
      <ToastContainer/>
    </Card>
  );
}

export default AreasIndex;
