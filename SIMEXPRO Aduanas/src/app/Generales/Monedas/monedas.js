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
  Divider,
  Chip,
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


function MonedasIndex() {
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

//Constante de los valores de los textfield de la pantalla
const [id, setid] = useState("");
const [Moneda, setMoneda] = useState("");
const [codigo, setcodigo] = useState("");

//Constante para asignar los valores a la tabla y mapear
const[DataTabla, setDataTabla] = useState([])

//Constante para guardar los datos de la tabla de detalles
const[DataDetalles, setDataDetalles] = useState([])

const camposToFilter = ["id", "codigo","moneda"];
const [anchorEl, setAnchorEl] = useState({});

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

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    CargarDatosTabla();
  }, []);

   //Constante para cargar datos a las tablas
   const CargarDatosTabla = async () => {
    try {
    const customHeaders = {
        'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      const response = await axios.get(process.env.REACT_APP_API_URL+'api/Moneda/Listar', {
        headers: customHeaders,
      }); 
      const rows = response.data.data.map((item,index) => {
        return {
          key:index,
          id: item.mone_Id,
          codigo:item.mone_Codigo,
          moneda: item.mone_Descripcion,
        }
      });
      setDataTabla(rows);
      setDataDetalles(response.data.data)
    } catch (error) {
    }
  };

    {/*Yup para formulario de agregar Inicio */}
      //Constante de valores por defecto que tomara el yup
      const defaultMonedaValues = {
        mone_Descripcion: '',
        mone_Codigo: '',
      }

      const MonedaSchema = yup.object().shape({
        mone_Descripcion: yup.string().required(''),
        mone_Codigo: yup.string().required(''),
      })

      //Constante useForm para el formulario de Agregar que nos proporciona todas las opciones para validar con yup
      const { handleSubmit, register, reset, control, watch, formState } = useForm({
        defaultMonedaValues,
        mode: 'all',
        resolver: yupResolver(MonedaSchema),
      });

      const { isValid, dirtyFields, errors, touchedFields } = formState;
      //Yup para formulario de agregar Fin

      //Yup para formulario de Editar Inicio
      //Constante de valores por defecto que tomara el yup
       {/* Validaciones de la pantalla de editar*/ }
        const defaultMonedaValuesEditar = {
          mone_DescripcionEditar: '',
          mone_CodigoEditar: '',
        }

        const MonedaSchemaEditar = yup.object().shape({
          mone_DescripcionEditar: yup.string().required(''),
          mone_CodigoEditar: yup.string().required(''),
        })

      //Constante useForm para el formulario de Agregar que nos proporciona todas las opciones para validar con yup
      const { handleSubmit:handleSubtmitEditar, reset:resetEditar, control:controlEditar, watch:WatchEditar, formState:formStateEditar, setValue:setValueEditar } = useForm({
        defaultMonedaValuesEditar,
        mode: 'all',
        resolver: yupResolver(MonedaSchemaEditar),
      });

      const {errors:ErrorsEditar } = formStateEditar;
     {/*Yup para formulario de agregar Fin */}


        
    //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
    const handleEdit = (id, codigo, moneda) => {
      setValueEditar("mone_CodigoEditar",codigo)
      setValueEditar("mone_DescripcionEditar",moneda)
      setcodigo(codigo);
      setMoneda(moneda);
      setid(id);
      MostrarCollapseEditar();
      handleClose(id);
    };

  //Constante que recibe de la tabla el id y la descripcion para poder colocarlos en el apartado de 
  //detalles y que ejecuta la funciona Detalles para llenar la tabla de detalles
  const handleDetails = (id, codigo, moneda) => {
    DetallesTabla(id, codigo,moneda);
    MostrarCollapseDetalles();
    handleClose(id);
  };

  //Constante para el detalle de las pantallas y  que llena la tabla de detalles
  const DetallesTabla = (id, codigo,moneda) => {
    setid(id);
    setcodigo(codigo);
    setMoneda(moneda);
    const detalles = DataDetalles.find(d => d.mone_Id === id)
    const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
    tableRows[0].cells[1].textContent = detalles.usua_UsuarioCreacion;
    tableRows[0].cells[2].textContent = detalles.mone_FechaCreacion;
    tableRows[1].cells[1].textContent = detalles.usua_UsuarioModificacion;
    tableRows[1].cells[2].textContent = detalles.mone_FechaModificacion;
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
        title: 'Codigo',
        dataIndex: 'codigo',
        key: 'codigo',
        sorter: (a, b) => a.codigo.localeCompare(b.codigo),
      },
      {
        title: 'Moneda',
        dataIndex: 'moneda',
        key: 'moneda',
        sorter: (a, b) => a.moneda.localeCompare(b.moneda)
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
                <MenuItem onClick={() => handleEdit(params.id,params.codigo,params.moneda)}>
                  <Icon>edit</Icon>ㅤEditar
                </MenuItem>
                <MenuItem onClick={() => handleDetails(params.id,params.codigo,params.moneda)}>
                  <Icon>visibility</Icon>ㅤDetalles
                </MenuItem>           
              </Menu>
            </Stack>
          </div>
        ,
      },
    ];

    {/*Toast para validaciones Inicio*/}

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario de Agregar
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

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario de editar
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

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario de eliminar
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

    //Toast cuando los campos estan vacios
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

    //Toast cuando los valores enviados a la API ya existen en la Base de datos
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

    //Toast cuando los valores enviados a la API no funcionan y lanzan error en esta
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

    {/*Toast para validaciones Fin*/}


  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

       {/* Filtrado de datos */ }
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


    {/* Funciones para abrir y cerrar los collapse de las distintas acciones que hacemos con los datos Inicio */ }
    const VisibilidadTabla = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarAdd(!mostrarAdd);
      reset(defaultMonedaValues)
    };  
    
    //Constante para mostrar el collapse de agregar un registro
    const MostrarCollapseAgregar = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarAgregar(!mostrarAgregar);
      reset(defaultMonedaValues);
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
      reset(defaultMonedaValues);
      CargarDatosTabla();  
    };

    //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
    const CerrarCollapseEditar = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarEditar(!mostrarEditar);
      resetEditar(defaultMonedaValuesEditar);
      CargarDatosTabla();
    };

    //Constante para cerrar el collapse de detalles
    const CerrarCollapseDetalles = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarDetalles(!mostrarDetalles);
    };


  {/* Funciones para abrir y cerrar los collapse de las distintas acciones que hacemos con los datos Fin */ }



  {/* Estilos para la tabla de detalles Inicio */}
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
  {/* Estilos para la tabla de detalles Fin */}


      {/* Funcionas para ejecutar las validaciones Inicio */}

      { /* Funciones para formulario de agregar */}

      //Constante para ejecutar las validaciones y el envio del formulario en el boton de agregar en el collapse de agregar
      const AgregarRegistro = async () => {
        const validationResult = await ValidacionAgregar(watch());
        if (validationResult) {
          handleSubmit(ValidacionAgregar)();
        }
      };

      //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de agregar
        const ValidacionAgregar = async(data) => {
          console.log(data)
          let isValid = true;
            if (data.mone_Codigo != null || data.mone_Descripcion != null) {
                if (data.mone_Codigo.trim() === '' || data.mone_Descripcion.trim() === '') {
                  ToastWarning();
                    return isValid;
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
              ToastWarning();
              return isValid;
            }
        }

      //Ejecutar end point de tipo async para esperar la respuesta
      const EjecutarEndPoint = async (data) => {
        let payload = {
          mone_Codigo:data.mone_Codigo,
          mone_Descripcion: data.mone_Descripcion,
          usua_UsuarioCreacion: 1,
          mone_FechaCreacion: new Date(),
        };
        const customHeaders = {
          'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
        };
        try {
          const response = await axios.post(
            process.env.REACT_APP_API_URL + 'api/Moneda/Insertar',
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

    { /* Funciones para formulario de agregar */}

    { /* Funciones para formulario de Editar */}
        //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
          const EditarRegistro = async () => {
            const validationResult = await ValidacionesEditar(WatchEditar());
            if (validationResult) {
              handleSubtmitEditar(ValidacionesEditar)();
            }
          };

          //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
          const ValidacionesEditar = async (data) => {
            let isValid = true;
              if (data.mone_CodigoEditar != null || data.mone_DescripcionEditar != null) {
                  if (data.mone_CodigoEditar.trim() === "" || data.mone_DescripcionEditar.trim() === "") {
                      ToastWarning();
                      return isValid;
                  } else {
                      isValid = false;
                      let respuesta = await EjecutarEndPointEditar(data);
                      if(respuesta === 1){
                        ToastSuccessEditar();
                        CerrarCollapseEditar();  
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
                ToastWarning();
                return isValid;
              }
          };

          //Ejecutar end point de tipo async para esperar la respuesta
            const EjecutarEndPointEditar = async (data) => {
              let payload = {
                mone_Id:id,
                mone_Codigo:data.mone_CodigoEditar,
                mone_Descripcion: data.mone_DescripcionEditar,
                usua_UsuarioModificacion: 1,
                mone_FechaModificacion: new Date(), 
              }
              const customHeaders = {
                'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
              };
              try {
                const response =  await axios.post(process.env.REACT_APP_API_URL+'api/Moneda/Editar',payload,{
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

    { /* Funciones para formulario de agregar */}
    {/* Funcionas para ejecutar las validaciones Fin */}


  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/yXhrPpL/MONEDAS.png"
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
    
      {/* Collapse para el formulario de agregar un registro inicio*/}
      <Collapse in={mostrarAgregar}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
          <Grid item xs={6}>
                <Controller
                   render={({ field }) => (
                    <FormControl error={!!errors.mone_Codigo} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Codigo de la Moneda
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.mone_Codigo}
                      placeholder="Ingrese el codigo de la moneda"
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  )}
                  name="mone_Codigo"
                  control={control}
                />
            </Grid>
            <Grid item xs={6}>
                <Controller
                   render={({ field }) => (
                    <FormControl error={!!errors.mone_Descripcion} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Moneda
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.mone_Descripcion}
                      placeholder="Ingrese la descripción de la moneda"
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  )}
                  name="mone_Descripcion"
                  control={control}
                />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
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
      {/* Collapse para el formulario de agregar un registro Fin*/}

         {/* Collapse para el formulario de editar un registro inicio*/}
        <Collapse in={mostrarEditar}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Grid container spacing={3}>
          <Grid item xs={6}>
                <Controller
                   render={({ field }) => (
                    <FormControl error={!!ErrorsEditar.mone_CodigoEditar} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Codigo de la Moneda
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!ErrorsEditar.mone_CodigoEditar}
                      placeholder="Ingrese el codigo de la moneda"
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  )}
                  name="mone_CodigoEditar"
                  control={controlEditar}
                />
            </Grid>
            <Grid item xs={6}>
                <Controller
                   render={({ field }) => (
                    <FormControl error={!!ErrorsEditar.mone_DescripcionEditar} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Moneda
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!ErrorsEditar.mone_DescripcionEditar}
                      placeholder="Ingrese la descripción de la moneda"
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                  )}
                  name="mone_DescripcionEditar"
                  control={controlEditar}
                />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
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
      {/* Collapse para el formulario de agregar un registro Fin*/}

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
                  <Chip color='default' label="Detalle Monedas" />
                </Divider>
            </Grid>
            <br></br>  
              <Grid item xs={12}>   
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={1}></Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Moneda Id:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                    </Grid>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Moneda Codigo:
                      </Typography>
                      <Typography>{codigo}</Typography>
                    </InputLabel>                  
                </Box>
                </Grid> 
                <br></br>
                <Grid item xs={1}></Grid>
                <Grid item xs={6}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Moneda descripción:
                      </Typography>
                      <Typography>{Moneda}</Typography>
                    </InputLabel>
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
      <ToastContainer />
    </Card>
  );
}

export default MonedasIndex;