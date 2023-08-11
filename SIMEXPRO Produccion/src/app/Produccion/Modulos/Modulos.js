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
  DataGrid,
  MenuItem,
  Menu,
  Box,
  Collapse,
  Typography,
  Select,
  Grid,
  GridToolbar,
  Stack,
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  ListItemText,
  esES,
  FormLabel,
  Autocomplete,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table } from "antd";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModuloIndex() {
  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarEdit, setmostrarEdit] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  //Constante de los valores de los textfield de la pantalla
  const [id, setid] = useState("");
  const [modulos, setmodulos] = useState("");
  const [procesos, setprocesos] = useState("");
  const [empleados, setempleados] = useState("");

  //Constante solo para que quitar el error de los textfield no controlados
  const [message, setMessage] = useState();

  //Constantes para el dialog de eliminar
  const [Eliminar, setEliminar] = useState(false);
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Constante para el detalle de las pantallas
  const DetallesTabla = (rowId, modulos, procesos, empleados) => {
    setid(rowId);
    setmodulos(modulos);
    setprocesos(procesos);
    setempleados(empleados);
  };

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (id, modulos, procesos, empleados) => {
    setmodulos(modulos);
    setid(id);
    setprocesos(procesos);
    setempleados(empleados);
    MostrarCollapseEditar();
    handleClose(id);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (id, modulos, proceso, empleado) => {
    DetallesTabla(id, modulos, proceso, empleado);
    MostrarCollapseDetalles();
    handleClose(id);
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (id) => {
    DialogEliminar();
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
      title: "Modulo",
      dataIndex: "modulos",
      key: "modulos",
      sorter: (a, b) => a.modulos.localeCompare(b.modulos), //sorting para Letras
    },
    {
      title: "Proceso",
      dataIndex: "procesos",
      key: "procesos",
      sorter: (a, b) => a.procesos.localeCompare(b.procesos), //sorting para Letras
    },
    {
      title: "Empleado",
      dataIndex: "empleados",
      key: "empleados",
      sorter: (a, b) => a.empleados.localeCompare(b.empleados), //sorting para Letras
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
              <MenuItem
                onClick={() =>
                  handleEdit(
                    params.id,
                    params.modulos,
                    params.procesos,
                    params.empleados
                  )
                }
              >
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleDetails(
                    params.id,
                    params.modulos,
                    params.procesos,
                    params.empleados
                  )
                }
              >
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

  //Constante para que se carguen los datos en la tabla del index
  const rows = [
    {
      key: 1,
      id: "1",
      modulos: "M9862ON",
      procesos: "Corte",
      empleados: "Juan Sagastume",
    },
    {
      key: 2,
      id: "2",
      modulos: "M9562ON",
      procesos: "Ensamblaje",
      empleados: "Junior Mario Loaiza",
    },
    {
      key: 3,
      id: "3",
      modulos: "M9362ON",
      procesos: "Serigrafía",
      empleados: "Junior Mario Loaiza",
    },
    {
      key: 4,
      id: "4",
      modulos: "M2862ON",
      procesos: "Estampado",
      empleados: "Junior Mario Loaiza",
    },
    {
      key: 5,
      id: "5",
      modulos: "M2862OP",
      procesos: "Serigrafia",
      empleados: "Junior Mario Loaiza",
    },
    {
      key: 6,
      id: "6",
      modulos: "M2812OX",
      procesos: "Aacabado",
      empleados: "Francisco Antunez",
    },
    {
      key: 7,
      id: "7",
      modulos: "M3866OW",
      procesos: "Estampado",
      empleados: "Junior Mario Loaiza",
    },
    {
      key: 8,
      id: "8",
      modulos: "M2800OX",
      procesos: "Estampado",
      empleados: "Axel Rivera",
    },
    {
      key: 9,
      id: "9",
      modulos: "M2562OZ",
      procesos: "Estampado",
      empleados: "Junior Mario Loaiza",
    },
    {
      key: 10,
      id: "10",
      modulos: "M0862OA",
      procesos: "Estampado",
      empleados: "Junior Mario Loaiza",
    },
    {
      key: 11,
      id: "11",
      modulos: "M6862PO",
      procesos: "Estampado",
      empleados: "Junior Mario Loaiza",
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
  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  
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

  //Constante de los datos por defecto que tendran los formulario
  const defaultModulosValues = {
    modulos: "",
    procesos: "",
    empleados: "",
  };

  //Constante de los datos que serán requeridos para el formulario
  const ModulosSchema = yup.object().shape({
    modulos: yup.string().required(),
    procesos: yup.string().required(),
    empleados: yup.string().required(),
  });

  //Constante para mostrar el collapse de agregar un registro
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultModulosValues);
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEdit(!mostrarEdit);
    reset(defaultModulosValues);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante para cerrar el collapse de agregar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultModulosValues);
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEdit(!mostrarEdit);
    reset(defaultModulosValues);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante que nos ayuda para las validaciones con yup para los formularios
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultModulosValues,
    mode: "all",
    resolver: yupResolver(ModulosSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de agregar
  const ValidacionAgregar = (data) => {
    console.log(data);
    if (data.procesos != "0" || data.empleados != "0") {
      if (data.modulos != null) {
        if (data.modulos.trim() === "" || data.procesos[0] === "Selecciona una opción" || data.empleados[0] === "Selecciona una opción"
        ) {
          ToastWarning();
        } else if (data.modulos.trim() === "" || data.procesos === "" || data.empleados === ""
        ) {
          ToastWarning();
        } else {
          MostrarCollapseAgregar();
          ToastSuccess();
        }
      } else {
        ToastWarning();
      }
    } else {
      if (
        data.modulos.trim() === "" ||
        data.procesos === "" ||
        data.empleados === ""
      ) {
        ToastWarning();
      }
    }
  };

  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
  const ValidacionesEditar = (data) => {
    console.log(data)
    if (data.modulos != null) {
      if (data.modulos.trim() === "") {
        ToastWarning();
      } else {
        MostrarCollapseEditar();
        ToastSuccess();
      }
    } else {
      ToastWarning();
    }
  };

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
    ValidacionAgregar(formData);
    setTimeout(() => {
      handleSubmit(ValidacionAgregar)();
    }, "250");
  };

  //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
  const EditarRegistro = () => {
    const formData = watch();
    formData.modulos = modulos;
    formData.procesos = procesos;
    formData.empleados = empleados;
    ValidacionesEditar(formData);
    setTimeout(() => {
      reset(defaultModulosValues);
      handleSubmit(ValidacionesEditar)();
    }, "250");
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
      <ToastContainer/>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/SJQHYkr/M-DULOS.png"
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

      {/* Collapse para el formulario de agregar un registro inicio*/}
      <Collapse in={mostrarAdd}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
          <Grid item xs={12}></Grid>
            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.modulos} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Nombre Modulo
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.modulos}
                      fullWidth
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="modulos"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.procesos} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Procesos
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      inputProps={{
                        startadornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="Corte">Corte</MenuItem>
                      <MenuItem value="Ensamblaje">Ensamblaje</MenuItem>
                      <MenuItem value="Empaquetado">Empaquetado</MenuItem>
                      <MenuItem value="Serigrafía">Serigrafía</MenuItem>
                      <MenuItem value="Estampado">Estampado</MenuItem>
                      <MenuItem value="Aacabado">Aacabado</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="procesos"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
              defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.empleados} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Empleado Encargado
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      inputProps={{
                        startadornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="Juan Sagastume">Juan Sagastume</MenuItem>
                      <MenuItem value="Axel Rivera">Axel Rivera</MenuItem>
                      <MenuItem value="Francisco Antunez">
                        Francisco Antunez
                      </MenuItem>
                      <MenuItem value="Junior Mario Loaiza">
                        Junior Mario Loaiza
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="empleados"
                control={control}
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
      <Collapse in={mostrarEdit}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.modulos} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Nombre Modulo
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.modulos}
                      placeholder="Ingrese el nombre"
                      fullWidth
                      value={modulos}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="modulos"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.procesos} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Procesos
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      value={procesos}
                      inputProps={{
                        startadornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="Corte">Corte</MenuItem>
                      <MenuItem value="Ensamblaje">Ensamblaje</MenuItem>
                      <MenuItem value="Empaquetado">Empaquetado</MenuItem>
                      <MenuItem value="Serigrafía">Serigrafía</MenuItem>
                      <MenuItem value="Estampado">Estampado</MenuItem>
                      <MenuItem value="Aacabado">Aacabado</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="procesos"
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.empleados} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Empleado Encargado
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      value={empleados}
                      inputProps={{
                        startadornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="Juan Sagastume">Juan Sagastume</MenuItem>
                      <MenuItem value="Axel Rivera">Axel Rivera</MenuItem>
                      <MenuItem value="Francisco Antunez">
                        Francisco Antunez
                      </MenuItem>
                      <MenuItem value="Junior Mario Loaiza">
                        Junior Mario Loaiza
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="empleados"
                control={control}
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
              <h2>Detalles de Modulos</h2>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: "25px" }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Id:
                    </Typography>
                    <Typography>{id}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Código del Módulo:
                    </Typography>
                    <Typography>{modulos}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Proceso:
                    </Typography>
                    <Typography>{procesos}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Empleado Encargado:
                    </Typography>
                    <Typography>{empleados}</Typography>
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
                      <Icon style={iconStyle}>date_range</Icon>Fecha y hora
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
              onClick={DialogEliminar}
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
      <ToastContainer/>
    </Card>
  );
}

export default ModuloIndex;
