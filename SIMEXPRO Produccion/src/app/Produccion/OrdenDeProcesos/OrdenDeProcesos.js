/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  FormLabel,
  Box,
  Autocomplete,
} from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import Zoom from "@mui/material/Zoom";
import Grow from "@mui/material/Grow";

import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Badge, Dropdown, Space, Table } from "antd";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrdenProcesosIndex() {
  const [searchText, setSearchText] = useState("");
  const [mostrarIndex, setmostrarIndex] = useState(true);

  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  const [mostrarDetails, setmostrarDetails] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [id, setid] = useState("");

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (id) => {
    setid(id);
    MostrarCollapseEditar();
    handleClose(id);
  };

  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (id, subcat, categoria) => {
    DetallesTabla(id, subcat, categoria);
    MostrarCollapseDetalles();
    handleClose(id);
  };

  //Constante para el detalle de las pantallas
  const DetallesTabla = (rowId) => {
    setid(rowId);
  };

  let renderCount = 0;
  {
    /relajo para los DatePicker parte 1/;
  }
  const defaultValues = {
    Detalle: "",
    Color: "",
    Estilo: "",
    Talla: "",
    Modulo: "",
    Proceso: "",
    Empleado: "",
    Cantidad: "",
    PedidoProd: "",
    DateTimePicker1: "",
    DateTimePicker2: "",
  };

  const schema = yup.object().shape({
    Detalle: yup.string().nullable().required(""),
    Color: yup.string().nullable().required(""),
    Estilo: yup.string().nullable().required(""),
    Talla: yup.string().nullable().required(""),
    Modulo: yup.string().nullable().required(""),
    Proceso: yup.string().nullable().required(""),
    Empleado: yup.string().nullable().required(""),
    Cantidad: yup.string().nullable().required(""),
    PedidoProd: yup.string().nullable().required(""),
    DateTimePicker1: yup.string().nullable().required(""),
    DateTimePicker2: yup.string().nullable().required(""),
  });

  const [anchorEl, setAnchorEl] = useState({});

  const columns2 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id, //sorting para Numeros
    },
    {
      title: "P.O",
      dataIndex: "po",
      key: "po",
      sorter: (a, b) => a.po.localeCompare(b.rtn), //sorting para Letras
    },
    {
      title: "Encargado Asignado",
      dataIndex: "empleado",
      key: "empleado",
      sorter: (a, b) => a.empleado.localeCompare(b.rtn), //sorting para Letras
    },
    {
      title: "Módulo o Línea asignada",
      dataIndex: "modulo",
      key: "modulo",
      sorter: (a, b) => a.modulo.localeCompare(b.rtn), //sorting para Letras
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
              <MenuItem onClick={() => handleEdit(params.id)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id)}>
                <Icon>visibility</Icon> Detalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.id)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  const data2 = [
    {
      id: "1",
      po: "CW22-103/72898",
      empleado: "Alberto Laínez",
      modulo: "Corte",
    },
    {
      id: "2",
      po: "CW22-103/72899",
      empleado: "Daniel Pineda",
      modulo: "Producción",
    },
    {
      id: "3",
      po: "CW22-89/723541",
      empleado: "Denia McCarthy",
      modulo: "Esamblando",
    },
    {
      id: "4",
      po: "CW22-105/72658",
      empleado: "Axel Rivera",
      modulo: "Producción",
    },
  ];

  {
    /Relajo para los DatePicker parte 2/;
  }
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  {
    /* Función para mostrar la tabla y mostrar agregar */
  }
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultValues);
  };

  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultValues);
  };

  const CerrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultValues);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultValues);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const filteredRows = data2.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
  const ToastSuccess = () => {
    toast.success("Datos ingresados correctamente.", {
      theme: "dark",
      style: {
        marginTop: "50px",
      },
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  const ToastWarning = () => {
    toast.warning("No se permiten campos vacios.", {
      theme: "dark",
      //  position: toast.POSITION.BOTTOM_RIGHT
      style: {
        marginTop: "50px",
      },
      autoClose: 1500,
      closeOnClick: true,
    });
  };

  const ValidacionAgregar = (data) => {
    console.log(data);
    if (data.Detalles != null ) {
      if (data.Detalles != "" ) {
        MostrarCollapseAgregar();
        ToastSuccess();
      } else {
        ToastWarning();
      }
    } else {
      ToastWarning();
    }
  };

  const AgregarRegistro = () => {
    const formData = watch();
    ValidacionAgregar(formData);
    setTimeout(() => {
      handleSubmit(ValidacionAgregar)();
    }, "250");
  };

  const EditarRegistro = handleSubmit((data) => {
    if (!isValid) {
      toast.warning("No se permiten campos vacios.", {
        theme: "dark",
        //  position: toast.POSITION.BOTTOM_RIGHT
        style: {
          marginTop: "50px",
        },
        autoClose: 1500,
        closeOnClick: true,
      });
    } else {
      MostrarCollapseEditar();
      toast.success("Datos ingresados correctamente.", {
        theme: "dark",
        //  position: toast.POSITION.BOTTOM_RIGHT
        style: {
          marginTop: "50px",
        },
        autoClose: 1500,
        closeOnClick: true,
      });
    }
  });

  const datosProcesos = ["Corte", "Producción", "Acabado"];

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
      <ToastContainer />
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/TtV62Xs/RDEN-DE-PROCESOS.png"
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
              onClick={MostrarCollapseAgregar}
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
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns2}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              className: "decoration-white",
            }}
          />
        </div>
      </Collapse>

      {/* Formulario Agregar */}
      <Collapse in={mostrarAgregar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Aqui se debe lograr que al ingresar el numero del P.O sea como una busqueda ebn la que le carguen los detalles de esa P.o que esran en los otros campos (color, estilo, talla)*/}
          <Grid container spacing={3}>
            <Grid item xs={4} style={{ marginTop: "30px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.Modulo} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      # Detalle de P.O
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Detalle}
                      placeholder=""
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="detalle"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "30px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Color
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Color}
                      placeholder=""
                      fullWidth={true}
                      disabled={true}
                      inputProps={{
                        style: { background: "#d8c9f4", opacity: 0.2 },
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="color"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "30px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Estilo
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Estilo}
                      placeholder=""
                      fullWidth={true}
                      disabled={true}
                      style={{ color: "gray" }}
                      inputProps={{
                        style: { background: "#d8c9f4", opacity: 0.2 },
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="estilo"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Talla
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Talla}
                      placeholder=""
                      fullWidth={true}
                      disabled={true}
                      inputProps={{
                        style: { background: "#d8c9f4", opacity: 0.2 },
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="talla"
                control={control}
              />
            </Grid>
            {/* options={DatosDDL.aduanas}*/}

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.Proceso} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Proceso
                    </FormLabel>
                    <Autocomplete
                      {...field}
                      id="combo-box-demo"
                      options={datosProcesos}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.Proceso}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    ></Autocomplete>
                  </FormControl>
                )}
                name="proceso"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.Modulo} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Módulo o línea de producción asignada
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Modulo}
                      placeholder=""
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="subcat"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.Empleado} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Encargado Asignado
                    </FormLabel>
                    <Autocomplete
                      {...field}
                      id="combo-box-demo"
                      options={datosProcesos}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.Empleado}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    ></Autocomplete>
                  </FormControl>
                )}
                name="empleado"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.Cantidad} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Cantidad
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Cantidad}
                      placeholder="0"
                      fullWidth={true}
                      inputProps={{
                        type: "number",
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="talla"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.PedidoProd} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Pedidos a Producción
                    </FormLabel>
                    <Autocomplete
                      {...field}
                      id="combo-box-demo"
                      options={datosProcesos}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.PedidoProd}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    ></Autocomplete>
                  </FormControl>
                )}
                name="empleado"
                control={control}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.DateTimePicker1} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Fecha Inicio
                    </FormLabel>
                    <DateTimePicker
                      {...field}
                      variant="outlined"
                      fullWidth
                      dateFormat="dd/MM/yyyy"
                      renderInput={(_props) => (
                        <TextField
                          className="w-full"
                          {..._props}
                          fullWidth
                          error={!!errors.DateTimePicker1}
                        />
                      )}
                      className="w-full"
                    />
                  </FormControl>
                )}
                name="fechaInicio"
                control={control}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.DateTimePicker2} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Fecha Límite
                    </FormLabel>
                    <DateTimePicker
                      {...field}
                      required
                      renderInput={(_props) => (
                        <TextField
                          className="w-full"
                          {..._props}
                          error={!!errors.DateTimePicker2}
                        />
                      )}
                      className="w-full"
                    />
                  </FormControl>
                )}
                name="fechaFin"
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

      {/* Formulario Editar*/}
      <Collapse in={mostrarEditar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Aqui se debe lograr que al ingresar el numero del P.O sea como una busqueda ebn la que le carguen los detalles de esa P.o que esran en los otros campos (color, estilo, talla)*/}
          <Grid container spacing={3}>
            <Grid item xs={4} style={{ marginTop: "30px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.Modulo} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      # Detalle de P.O
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Detalle}
                      placeholder=""
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="detalle"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "30px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Color
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Color}
                      placeholder=""
                      fullWidth={true}
                      disabled={true}
                      inputProps={{
                        style: { background: "#d8c9f4", opacity: 0.2 },
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="color"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "30px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Estilo
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Estilo}
                      placeholder=""
                      fullWidth={true}
                      disabled={true}
                      style={{ color: "gray" }}
                      inputProps={{
                        style: { background: "#d8c9f4", opacity: 0.2 },
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="estilo"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Talla
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Talla}
                      placeholder=""
                      fullWidth={true}
                      disabled={true}
                      inputProps={{
                        style: { background: "#d8c9f4", opacity: 0.2 },
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="talla"
                control={control}
              />
            </Grid>
            {/* options={DatosDDL.aduanas}*/}

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.Proceso} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Proceso
                    </FormLabel>
                    <Autocomplete
                      {...field}
                      id="combo-box-demo"
                      options={datosProcesos}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.Proceso}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    ></Autocomplete>
                  </FormControl>
                )}
                name="proceso"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.Modulo} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Módulo o línea de producción asignada
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Modulo}
                      placeholder=""
                      fullWidth={true}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="subcat"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.Empleado} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Encargado Asignado
                    </FormLabel>
                    <Autocomplete
                      {...field}
                      id="combo-box-demo"
                      options={datosProcesos}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.Empleado}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    ></Autocomplete>
                  </FormControl>
                )}
                name="empleado"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.Cantidad} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Cantidad
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.Cantidad}
                      placeholder="0"
                      fullWidth={true}
                      inputProps={{
                        type: "number",
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="talla"
                control={control}
              />
            </Grid>

            <Grid item xs={4} style={{ marginTop: "21px" }}>
              <Controller
                defaultValue=""
                render={({ field }) => (
                  <FormControl error={!!errors.PedidoProd} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Pedidos a Producción
                    </FormLabel>
                    <Autocomplete
                      {...field}
                      id="combo-box-demo"
                      options={datosProcesos}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.PedidoProd}
                          InputLabelProps={{ shrink: true }}
                        />
                      )}
                    ></Autocomplete>
                  </FormControl>
                )}
                name="empleado"
                control={control}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.DateTimePicker1} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Fecha Inicio
                    </FormLabel>
                    <DateTimePicker
                      {...field}
                      variant="outlined"
                      fullWidth
                      dateFormat="dd/MM/yyyy"
                      renderInput={(_props) => (
                        <TextField
                          className="w-full"
                          {..._props}
                          fullWidth
                          error={!!errors.DateTimePicker1}
                        />
                      )}
                      className="w-full"
                    />
                  </FormControl>
                )}
                name="fechaInicio"
                control={control}
              />
            </Grid>

            <Grid item xs={4}>
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.DateTimePicker2} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Fecha Límite
                    </FormLabel>
                    <DateTimePicker
                      {...field}
                      required
                      renderInput={(_props) => (
                        <TextField
                          className="w-full"
                          {..._props}
                          error={!!errors.DateTimePicker2}
                        />
                      )}
                      className="w-full"
                    />
                  </FormControl>
                )}
                name="fechaFin"
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
              <h2>Detalles de la órden de Proceso</h2>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: "25px" }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Id de la órden de Proceso:
                    </Typography>
                    <Typography>{id}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Número Detalle P.O:
                    </Typography>
                    <Typography>{}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Proceso:
                    </Typography>
                    <Typography>{}</Typography>
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
      <ToastContainer />
    </Card>
  );
}

export default OrdenProcesosIndex;
