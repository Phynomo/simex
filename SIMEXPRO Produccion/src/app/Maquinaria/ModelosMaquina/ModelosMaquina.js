/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from "react";
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
  FormControlLabel,
  Switch,
  Autocomplete,
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
//Imports de validaciones
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table, Tag, Image } from "antd";
import axios from 'axios';

//Imports tabla
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";
import { useHistory } from "react-router-dom";
import { ConsoleSqlOutlined } from "@ant-design/icons";

//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";

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
import { MotorcycleOutlined } from "@material-ui/icons";
import ModelosMaquinaServices from "./ModelosMaquinaService";


{/*Constantes para validaciones Agregar inicio */ }
const defaultModelosMaquinaValues = {
  mmaq_Nombre: "",
  marq_Id: null,
  func_Id: null
}

const ModelosMaquinasSchema = yup.object().shape({
  mmaq_Nombre: yup.string().trim().required(),
  marq_Id: yup.object().required(""),
  func_Id: yup.object().required(""),
});

{/*Constantes para validaciones Agregar fin */ }

{/*Constantes para validaciones Editar inicio */ }
const camposModelosMaquinasEditar = {
  mmaq_NombreEditar: "",
  marq_IdEditar: null,
  func_IdEditar: null,
};

const schemaModelosMaquinasEditar = yup.object().shape({
  mmaq_NombreEditar: yup.string().trim().required(),
  marq_IdEditar: yup.object().required(""),
  func_IdEditar: yup.object().required(""),
});
{/*Constantes para validaciones Editar fin */ }


const iconStyle = {
  marginRight: "5px",
  verticalAlign: "middle",
  color: "#634a9e",
};

const tableRowStyle = {
  "&:hover": {
    backgroundColor: "coral",
  },
};

const tableCellStyle = {
  verticalAlign: "middle",
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tableHeaderStyle = {
  verticalAlign: "middle",
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  backgroundColor: "#f2f2f2",
};
function ModelosMaquinas() {


  const fileInputRef = useRef(null);

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [Id, setId] = useState(0);
  const [DetallesTabla, setDetallesTabla] = useState([])
  const [image, setimage] = useState('https://i.ibb.co/rwp91Z1/maq.webp');

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  const camposToFilter = ["key", "mmaq_Nombre", "marcaMaquina", "funcionMaquina"];

  /* Datos de la tabla */
  const [data, setData] = useState([]);


  //Variables DDL
  const [MarcasDDL, setMarcasDDL] = useState([]);
  const [FuncionesDDL, setFuncionesDDL] = useState([]);

  //Variables oara setear la cantidad de registro que se mostraran en la tabla
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  //Cargado de las variables DDL
  async function ddls() {
    setMarcasDDL(await load_DDLs.MarcasMaquinas());
    setFuncionesDDL(await load_DDLs.FuncionesMaquinas());
  }

  //Peticion para cargar datos de la tabla
  const ListarModelosMaquina = async () => {
    try {
      setData(await ModelosMaquinaServices.ListarModelosMaquina());
    } catch (error) {
      console.log(error.message);
    }
  };

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = async () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    setTimeout(() => {
      reset(defaultModelosMaquinaValues);
      setimage('https://i.ibb.co/rwp91Z1/maq.webp');
    }, "1000");
    setMarcasDDL(await load_DDLs.MarcasMaquinas());
    setFuncionesDDL(await load_DDLs.FuncionesMaquinas());
  };

  /* Controlador del Index(Tabla) */
  const VisibilidadTablaEditar = async () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    setTimeout(() => {
      resetEditar(camposModelosMaquinasEditar);
      setimage('https://i.ibb.co/rwp91Z1/maq.webp');
    }, "1000");
    setMarcasDDL(await load_DDLs.MarcasMaquinas());
    setFuncionesDDL(await load_DDLs.FuncionesMaquinas());
  };



  //Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante para el cerrrar las opciones del boton de opciones  
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };


  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (datos) => {
    setValue('mmaq_Id', datos['mmaq_Id']);
    DialogEliminar();
    handleClose(datos.mmaq_Id);
  };


  const handleDetails = (datos) => {
    setDetallesTabla(datos);
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.mmaq_Id);
  };

  //Handle que inicia la funcion de editar
  const handleEdit = (datos) => {

    setimage(datos.mmaq_Imagen)

    setValueEditar('mmaq_NombreEditar', datos.mmaq_Nombre)




    setValueEditar(
      "marq_IdEditar",
      MarcasDDL.find((MarcasDDL) => MarcasDDL.value === datos.marq_Id) //importante para cargar bien los ddl al editar
    );

    setValueEditar(
      "func_IdEditar",
      FuncionesDDL.find((FuncionesDDL) => FuncionesDDL.value === datos.func_Id) //importante para cargar bien los ddl al editar
    );

    setId(datos.mmaq_Id);
    setTimeout(() => {
      setmostrarIndex(!mostrarIndex);
      setmostrarEditar(!mostrarEditar);
    }, "250");
    handleClose(datos.mmaq_Id);
  };


  //Constante que filtra las imagenes por medio de un FileReader
  //que basicamente proporciona una interfaz para leer de
  //forma asíncrona el contenido de un
  //archivo desde una aplicación web
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setimage(reader.result);
      };
    } else {
      ToastWarning("Archivo incorrecto");
    }
  };

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    ddls();
    ListarModelosMaquina();
  }, []);


  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Nombre",
      dataIndex: "mmaq_Nombre",
      key: "mmaq_Nombre",
      sorter: (a, b) => a.mmaq_Nombre.localeCompare(b.mmaq_Nombre), //sorting para Letras
    },
    {
      title: "Marca",
      dataIndex: "marcaMaquina",
      key: "marcaMaquina",
      sorter: (a, b) => a.marcaMaquina.localeCompare(b.marcaMaquina), //sorting para Letras
    },
    {
      title: "Función",
      dataIndex: "funcionMaquina",
      key: "funcionMaquina",
      sorter: (a, b) => a.funcionMaquina.localeCompare(b.funcionMaquina), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.mmaq_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.mmaq_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.mmaq_Id)}
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
              id={`menu-${params.mmaq_Id}`}
              anchorEl={anchorEl[params.mmaq_Id]}
              keepMounted
              open={Boolean(anchorEl[params.mmaq_Id])}
              onClose={() => handleClose(params.mmaq_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
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
  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    defaultModelosMaquinaValues, //Campos del formulario
    mode: "all",
    resolver: yupResolver(ModelosMaquinasSchema), //Esquema del formulario
  });

  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();


  //Declaracion del formulario de editar
  const { handleSubmit: handleSubmitEditar, reset: resetEditar, control: controlEditar, watch: watchEditar, formState: formStateEditar, setValue: setValueEditar } = useForm({
    camposModelosMaquinasEditar, //Campos del formulario
    mode: "all",
    resolver: yupResolver(schemaModelosMaquinasEditar), //Esquema del formulario
  });

  //Validacion de campos vacios y errores
  const { isValid: isValidEditar, dirtyFields: dirtyFieldsEditar, errors: errorsEditar } = formStateEditar;

  //Datos del formulario
  const datosWatchEditar = watchEditar();

  //Controlador del formulario
  const GuardarModeloMaquina = () => {
    if (datosWatch.mmaq_Id === null || datosWatch.func_Id === null) {
      ToastWarning("Completa todos los campos");
    } else {
      if (!isValid) {
        ToastWarning("Completa todos los campo2222s");
      } else {
        CrearModeloMaquina();
      }
    }
  };

  //Controlador del formulario
  const EditarModeloMaquina = () => {
    if ((datosWatchEditar.marq_IdEditar === undefined || datosWatchEditar.func_IdEditar === null)) {
      ToastWarning("Completa todos los campos");
    } else {
      if (datosWatchEditar.mmaq_NombreEditar !== "" && datosWatchEditar.marq_IdEditar !== null && datosWatchEditar.func_IdEditar !== null) {
        EditarModeloMaquinassssssssssss();
      } else {
        ToastWarning("Completa todos los campos");
      }
    }
  };

  //Peticion para crear un registro
  const CrearModeloMaquina = async () => {
    try {
      const response = await ModelosMaquinaServices.CrearModeloMaquina(datosWatch, image);
      if (response.data.data.messageStatus === "1") {
        ToastSuccess("El registro se ha insertado exitosamente");
        ListarModelosMaquina();
        VisibilidadTabla();
        reset(defaultModelosMaquinaValues);
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }
  };

  // Peticion para editar un registro
  const EditarModeloMaquinassssssssssss = async () => {
    try {
      const response = await ModelosMaquinaServices.EditarModeloMaquina(datosWatchEditar, Id, image);

      if (response.data.data.messageStatus == 1) {
        ToastSuccess("El registro se ha editado exitosamente");
        setTimeout(() => {
          resetEditar(camposModelosMaquinasEditar);
        }, "500");
        ListarModelosMaquina();
        VisibilidadTablaEditar();
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }
  };

  // Peticion para eliminar un registro

  const EliminarModelosMaquina = async () => {
    try {
      const response = await ModelosMaquinaServices.EliminarModeloMaquina(datosWatch);
      if (response.data.data.messageStatus == "1") {
        DialogEliminar();
        ToastSuccess("El registro ha sido eliminado exitosamente");
        ListarModelosMaquina();
        VisibilidadTabla();
        reset(defaultModelosMaquinaValues);
      } else if (response.data.data.messageStatus.includes("0")) {
        DialogEliminar();
        ToastError("El registro está en uso");
      }
    } catch (error) {
      DialogEliminar();
      ToastError("Error inesperado");
    }
  }



  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/CbPV4Xy/MODELOS-DE-M-QUINA.png"
        alt="Encabezado de la carta"
      />
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
                VisibilidadTabla()
                setEditar(false)
              }}
            >
              Nuevo
            </Button>
          </Stack>

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

            {/* Barra de Busqueda en la Tabla */}
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
          </Stack>
        </CardContent>

        {/* Tabla */}
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

      {/* Collapse para el formulario de agregar un registro incio*/}
      <form onSubmit={handleSubmit((_data) => { })}>
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
                <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip
                    label={"Agregar Modelo de Máquina"}
                  />
                </Divider>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="little-profilePhynomo text-center">
                  <div
                    className="pro-img"
                    style={{
                      marginTop: "0",
                      width: "300px",
                      height: "300px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                      borderRadius: '50%'
                    }}
                  >{image == null ? (
                    <img
                      src="https://i.ibb.co/RTnx082/kisspng-computer-icons-user-clip-art-user-5abf13db298934-2968784715224718991702.jpg"
                      alt="maqui"
                    />
                  ) : (
                    <Image
                      width={300}
                      style={{
                        marginTop: "0",
                        width: "400px",
                        height: "300px",
                        overflow: "hidden",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                        borderRadius: '50%'
                      }}
                      src={image}
                    />
                  )}
                  </div>
                  <br />
                  <Button
                    startIcon={<Icon>image</Icon>}
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: "10px",
                      marginRight: "10px",
                    }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    Seleccionar imagen
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </Grid>

              <Grid item xs={8} style={{ marginTop: "80px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <FormLabel error={!!errors.mmaq_Nombre} id="group-label">
                        Modelo:
                      </FormLabel>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="outlined"
                            placeholder="Ingrese el nombre del modelo"
                            inputProps={{
                              maxLength: 150,
                            }}
                            error={!!errors.mmaq_Nombre}
                          />
                        )}
                        name="mmaq_Nombre"
                        control={control}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <FormLabel error={!!errors.marq_Id}>Marca</FormLabel>
                          <Controller
                            render={({ field }) => (
                              <Autocomplete
                                {...field}
                                id="marq_Id"
                                isOptionEqualToValue={(option, value) =>
                                  option.value === value?.value
                                }
                                options={MarcasDDL}
                                value={datosWatch.marq_Id ?? null}
                                onChange={(event, value) => {
                                  setValue("marq_Id", value);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} error={!!errors.marq_Id} />
                                )}
                              />
                            )}
                            name="marq_Id"
                            error={!!errors.marq_Id}
                            control={control}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel error={!!errors.func_Id}>Función</FormLabel>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            id="func_Id"
                            isOptionEqualToValue={(option, value) =>
                              option.value === value?.value
                            }
                            options={FuncionesDDL}
                            value={datosWatch.func_Id ?? null}
                            onChange={(event, value) => {
                              setValue("func_Id", value);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} error={!!errors.func_Id} />
                            )}
                          />
                        )}
                        name="func_Id"
                        error={!!errors.func_Id}
                        control={control}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
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
                  startIcon={<Icon>check</Icon>}
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "10px",
                    marginRight: "10px",
                  }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={GuardarModeloMaquina}
                  type="submit"
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
      {/* Collapse para el formulario de agregar un registro Fin*/}

      {/* Collapse para mostrar los detalles de un registro inicio*/}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center", // Centra horizontalmente
            alignItems: "center", // Centra verticalmente
            minHeight: "100%", // Asegura que ocupe al menos todo el alto disponible
          }}
        >
          <Grid container spacing={3} >
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="DETALLES DE LOS MODELOS DE LAS MAQUINAS" />
              </Divider>
            </Grid>
            
            <Grid item xs={4} style={{marginLeft: '230px'}}>
              <Image
                width={300}
                style={{
                  marginTop: "-30px", // Ajusta el margen superior aquí
                  width: "300px",
                  height: "300px",
                  overflow: "hidden",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  borderRadius: "50%",
                }}
                src={DetallesTabla["mmaq_Imagen"]}
              />
            </Grid>
            <Grid item xs={5} style={{marginTop: '-15px'}}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Id del modelo:
                    </Typography>
                    <Typography>{DetallesTabla["mmaq_Id"]}</Typography>
                  </InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Descripción del modelo:
                    </Typography>
                    <Typography>{DetallesTabla["mmaq_Nombre"]}</Typography>
                  </InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="marca">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Marca:
                    </Typography>
                    <Typography>{DetallesTabla["marcaMaquina"]}</Typography>
                  </InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="funcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Funciones:
                    </Typography>
                    <Typography>{DetallesTabla["funcionMaquina"]}</Typography>
                  </InputLabel>
                </Grid>
              </Grid>
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
                      <Icon style={iconStyle}>date_range</Icon>Fecha y hora
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={tableCellStyle}>{DetallesTabla['usuarioCreacionNombre']}</td>
                    <td style={tableCellStyle}>
                      {DetallesTabla['mmaq_FechaCreacion']
                        ? new Date(DetallesTabla['mmaq_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{DetallesTabla['usuarioModificacionNombre']}</td>
                    <td style={tableCellStyle}>
                      {DetallesTabla['mmaq_FechaModificacion']
                        ? new Date(DetallesTabla['mmaq_FechaModificacion']).toLocaleString()
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
                    setmostrarIndex(!mostrarIndex);
                    setmostrarDetalles(!mostrarDetalles);
                  }}                >
                  Regresar
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>

      {/* Collapse para el formulario de editar un registro incio*/}
      <form onSubmit={handleSubmitEditar((_dataEditar) => { })}>
        <Collapse in={mostrarEditar}>
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
                    label={"Editar Modelo de Máquina"}
                  />
                </Divider>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="little-profilePhynomo text-center">
                  <div
                    className="pro-img"
                    style={{
                      marginTop: "0",
                      width: "300px",
                      height: "300px",
                      overflow: "hidden",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                      borderRadius: '50%'
                    }}
                  >{image == null ? (
                    <img
                      src="https://i.ibb.co/RTnx082/kisspng-computer-icons-user-clip-art-user-5abf13db298934-2968784715224718991702.jpg"
                      alt="maqui"
                    />
                  ) : (
                    <Image
                      width={300}
                      style={{
                        marginTop: "0",
                        width: "400px",
                        height: "300px",
                        overflow: "hidden",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                        borderRadius: '50%'
                      }}
                      src={image}
                    />
                  )}
                  </div>
                  <br />
                  <Button
                    startIcon={<Icon>image</Icon>}
                    variant="contained"
                    color="primary"
                    style={{
                      borderRadius: "10px",
                      marginRight: "10px",
                    }}
                    sx={{
                      backgroundColor: "#634A9E",
                      color: "white",
                      "&:hover": { backgroundColor: "#6e52ae" },
                    }}
                    onClick={() => fileInputRef.current.click()}
                  >
                    Seleccionar imagen
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </Grid>

              <Grid item xs={8} style={{ marginTop: "60px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {/* Etiqueta "Nuevo Usuario" */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* Contenido de la etiqueta, si es necesario */}
                    </div>
                  </Grid>

                  {/* Left column for TextFields */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel error={!!errorsEditar.mmaq_NombreEditar} id="group-label">
                        Nombre del modelo:
                      </FormLabel>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="outlined"
                            placeholder="Ingrese el nombre del modelo"
                            inputProps={{
                              maxLength: 150,
                            }}
                            error={!!errorsEditar.mmaq_NombreEditar}
                          />
                        )}
                        name="mmaq_NombreEditar"
                        control={controlEditar}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <FormLabel error={!!errorsEditar.marq_IdEditar}>Marca</FormLabel>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            id="marq_IdEditar"
                            isOptionEqualToValue={(option, value) =>
                              option.value === value?.value
                            }
                            options={MarcasDDL}
                            value={datosWatchEditar.marq_IdEditar ?? null}
                            onChange={(event, value) => {
                              setValueEditar("marq_IdEditar", value);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} error={!!errorsEditar.marq_IdEditar} />
                            )}
                          />
                        )}
                        name="marq_IdEditar"
                        error={!!errorsEditar.marq_IdEditar}
                        control={controlEditar}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <FormLabel error={!!errorsEditar.func_IdEditar}>Función:</FormLabel>
                      <Controller
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            id="func_IdEditar"
                            isOptionEqualToValue={(option, value) =>
                              option.value === value?.value
                            }
                            options={FuncionesDDL}
                            value={datosWatchEditar.func_IdEditar ?? null}
                            onChange={(event, value) => {
                              setValueEditar("func_IdEditar", value);
                            }}
                            renderInput={(params) => (
                              <TextField {...params} error={!!errorsEditar.func_IdEditar} />
                            )}
                          />
                        )}
                        name="func_IdEditar"
                        error={!!errorsEditar.func_IdEditar}
                        control={controlEditar}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
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
                  startIcon={<Icon>check</Icon>}
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "10px",
                    marginRight: "10px",
                  }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={EditarModeloMaquina}
                  type="submit"

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
                  onClick={VisibilidadTablaEditar}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </form>
      {/* Collapse para el formulario de editar un registro Fin*/}


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
              onClick={EliminarModelosMaquina}
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
              onClick={VisibilidadTabla}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>



    </Card>
  );
}

export default ModelosMaquinas;
