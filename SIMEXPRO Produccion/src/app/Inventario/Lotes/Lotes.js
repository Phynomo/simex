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
  CircularProgress, 
  GridToolbar,
  Stack,
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  esES,
  FormLabel,
  Autocomplete,
  Divider,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table } from "antd";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LotesService from "./LotesService";

//toasts
//Exitoso
const toastSuccess = (message) => {
  toast.success(message, {
    theme: 'dark',
    style: {
      //Color gris oscuro
      // backgroundColor: '#282c34' 
      //Color del menu
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}
//Advertencia
const toastWarning = (message) => {
  toast.warning(message, {
    theme: 'dark',
    style: {
      //Color gris oscuro
      // backgroundColor: '#282c34' 
      //Color del menu
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}
//Error
const toastError = (message) => {
  toast.error(message, {
    theme: 'dark',
    style: {
      //Color gris oscuro
      // backgroundColor: '#282c34' 
      //Color del menu
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}
//default
const toastDefault = (message) => {
  toast(message, {
    theme: 'dark',
    style: {
      //Color gris oscuro
      // backgroundColor: '#282c34' 
      //Color del menu
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}


const defaultAccountValues = {
  id: "",
  material: '',
  unidadmedida: '',
  pedidoordendetalle: '',
  stock: 0,
  cantidadIngresada: 0,
  observaciones: "",
  tipoarea: '',
};

const accountSchema = yup.object().shape({
  id: yup.string(),
  material: yup.string().required(''),
  unidadmedida: yup.string().required(''),
  producto: yup.string().required(''),
  stock: yup.string().required(""),
  cantidadIngresada: yup.string().required(""),
  observaciones: yup.string().required(""),
  tipoarea: yup.string().required('')
});

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

const loadingIcon = (
  <>
    <Grid
      container
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Grid item xs={12}>
        <CircularProgress style={{ color: "#634a9e" }} />
      </Grid>
      <Grid item xs={12}>
        Cargando...
      </Grid>
    </Grid>
  </>
);

function LotesIndex() {
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
  const [material, setmaterial] = useState("");
  const [stock, setstock] = useState("");
  const [cantidad, setcantidad] = useState("");
  const [areas, setareas] = useState("");

  //Constante solo para que quitar el error de los textfield no controlados
  const [message, setMessage] = useState();
  const [DataDdlAreas, setDataDdlAreas] = useState([])

  //Constantes para el dialog de eliminar
  const [Eliminar, setEliminar] = useState(false);
  const DialogEliminar = () => {   
    setEliminar(!Eliminar);
  };

  useEffect(() => {
    CargarDatosDdl();
  }, []);

  const CargarDatosDdl = async () => {
    try {

      const url = 'https://localhost:44380/api/Areas/Listar';
      const response = await axios.get(url);
      console.log(response)
      const rows = response.data.map(item => {
        return {
          id: item.tipa_Id,
          areas: item.tipa_area,
        }
      });
      setDataDdlAreas(rows);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Constante para el detalle de las pantallas
  const DetallesTabla = (rowId, material, stock, cantidad, area) => {
    setid(rowId);
    setmaterial(material);
    setstock(stock);
    setcantidad(cantidad);
    setareas(area);
    //const tableRows = document.querySelectorAll('#detallesTabla tbody tr')
    //tableRows[0].cells[1].textContent = localStorage.getItem('Masiso rey')
    //tableRows[0].cells[2].textContent = localStorage.getItem('Que crack que sos')
    //tableRows[1].cells[1].textContent = localStorage.getItem('Ombe trabaje')
    //tableRows[1].cells[2].textContent = localStorage.getItem('Muchachos escucharon el rempalago?')
  };

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (rowId, material, stock, cantidad, area) => {
    setid(rowId);
    setmaterial(material);
    setstock(stock);
    setcantidad(cantidad);
    setareas(area);
    MostrarCollapseEditar();
    handleClose(rowId);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (id, material, stock, cantidad, area) => {
    DetallesTabla(id, material, stock, cantidad, area);
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
      title: "Material",
      dataIndex: "material",
      key: "material",
      sorter: (a, b) => a.material.localeCompare(b.material), //sorting para Letras
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock.localeCompare(b.stock), //sorting para Letras
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      sorter: (a, b) => a.cantidad.localeCompare(b.cantidad), //sorting para Letras
    },
    {
      title: "Área",
      dataIndex: "area",
      key: "area",
      sorter: (a, b) => a.area.localeCompare(b.area), //sorting para Letras
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
              <MenuItem onClick={() => handleEdit(params.id,params.material, params.stock, params.cantidad, params.area)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id,params.material, params.stock, params.cantidad, params.area)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.id)}>
                <Icon>delete</Icon>ㅤ Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  //Constante para que se carguen los datos en la tabla del index
  const data = [];
  for (let i = 1; i < 51; ++i) {
    data.push({
      key: i.toString(),
      id: i.toString(),
      material: "Material " + i,
      stock:    "Stock " + i,
      cantidad:  i,
      area:     "Área" + i,
      // tabla: [
      //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
      //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
      //   // Add more rows to the nested table here...
      // ],
    });
  }

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
  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
  const ToastSuccess  = () => {
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
    const defaultLotesValues = {
      stock: "",
      cantidad: "",
      material: "",
      area: "",
    };


  //Constante de los datos que serán requeridos para el formulario
  const LotesSchema = yup.object().shape({
    stock: yup.string().required(),
    cantidad: yup.string().required(),
    material: yup.string().required(),
    area: yup.string().required(),
  });


  //Constante para mostrar el collapse de agregar un registro
  const MostrarCollapseAgregar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAgregar(!mostrarAgregar);
    reset(defaultLotesValues);
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultLotesValues);
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
    reset(defaultLotesValues);
  };

  //Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
  const CerrarCollapseEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultLotesValues);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante que nos ayuda para las validaciones con yup para los formularios 
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultLotesValues,
    mode: "all",
    resolver: yupResolver(LotesSchema),
  });

 

  const { isValid, dirtyFields, errors } = formState;

  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de agregar
  const ValidacionAgregar = (data) => {
    console.log(data);
    if (data.material.length != 0 || data.area.length != 0) {
      if (data.stock != null || data.cantidad != null) {
        if (
          data.stock.trim() === "" ||
          data.cantidad.trim() === "" ||
          data.material[0] === "Selecciona una opción" ||
          data.area[0] === "Selecciona una opción"
        ) {
          ToastWarning();
        } else if (
          data.stock.trim() === "" ||
          data.cantidad.trim() === "" ||
          data.material === "" ||
          data.area === ""
        ) {
          ToastWarning();
        } else {
          MostrarCollapseAgregar();
          ToastSuccess();
        }
      } 
      else {
        ToastWarning();
      }
    } else {
      if (
        data.stock.trim() === "" ||
        data.cantidad.trim() === "" ||
        data.material === "" ||
        data.area === ""
      ) {
        ToastWarning();
      }
    }
  };

  //Constante para validar el envio del formulario y asegurarnos de que los campos esten llenos en el formulario de editar
  {/*const ValidacionesEditar = (data) => {
    if (data.estilos != null) {
      if (data.estilos.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "No se permiten campos vacios",
        });
      } else {
        Toast2.fire({
          icon: "success",
          title: "Datos guardados exitosamente",
        });
        MostrarCollapseEditar();
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "No se permiten campos vacios",
      });
    }
  };*/}

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
    }, "250")
  };

  //Constante para ejecutar las validaciones y el envio del formulario en el boton de editar en el collapse de editar
  const EditarRegistro = () => {
    const formData = watch();
    formData.estilos = estilo;
    ValidacionesEditar(formData);
    setTimeout(() => {
      reset(defaultLotesValues);
      handleSubmit(ValidacionesEditar)();
    }, "50")
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

  const defaultValueSelect = ["Seleccione una opción"];
  const [isSearchable, setIsSearchable] = useState(true);

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/w4zKLJs/LOTES.png"
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
            // expandable={{
            //   expandedRowRender: (record) => <Table columns={columns} dataSource={record.tabla} pagination={false} />,
            //   rowExpandable: (record) => record.name !== 'Not Expandable',
            // }}
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
              <Controller
                defaultValue={["Selecciona una opción"]}
                render={({ field }) => (
                  <FormControl error={!!errors.material} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Materiales
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      defaultValue="0"
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="0">Selecciona una opción</MenuItem>
                      <MenuItem value="10">Ten (10)</MenuItem>
                      <MenuItem value="20">Twenty (20)</MenuItem>
                      <MenuItem value="30">Thirty (30)</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="material"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
                <Controller
                  render={({ field }) => (
                    <FormControl error={!!errors.material} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Stock
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.stock}
                      placeholder="Ingrese el stock"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                    </FormControl>
                  )}
                  name="stock"
                  control={control}
                />
            </Grid>

            <Grid item xs={6}>
              <div className="mt-48 mb-16" style={{ marginTop: "13px" }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Cantidad"
                      variant="outlined"
                      error={!!errors.cantidad}
                      placeholder="Ingrese la cantidad"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  )}
                  name="cantidad"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <Controller
                defaultValue={defaultValueSelect[0]}
                render={({ field }) => (
                  <FormControl error={!!errors.area} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Áreas
                    </FormLabel>
                    <Select
                      {...field}
                      fullWidth
                      defaultValue="0"
                      isSearchable
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="0">Selecciona una opción</MenuItem>
                      <MenuItem value="10">Ten (10)</MenuItem>
                      <MenuItem value="20">Twenty (20)</MenuItem>
                      <MenuItem value="30">Thirty (30)</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="area"
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
              <Controller
                defaultValue={["Selecciona una opción"]}
                render={({ field }) => (
                  <FormControl error={!!errors.material} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Materiales
                    </FormLabel>
                    <Select
                      {...field}
                      value={material}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="10">Ten (10)</MenuItem>
                      <MenuItem value="20">Twenty (20)</MenuItem>
                      <MenuItem value="30">Thirty (30)</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="material"
                control={control}
              />
            </Grid>

            <Grid item xs={6}>
              <div className="mt-48 mb-16" style={{ marginTop: "15px" }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Stock"
                      variant="outlined"
                      error={!!errors.stock}
                      placeholder="Ingrese el stock"
                      value={stock}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  )}
                  name="stock"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <div className="mt-48 mb-16" style={{ marginTop: "13px" }}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Cantidad"
                      variant="outlined"
                      error={!!errors.cantidad}
                      placeholder="Ingrese la cantidad"
                      fullWidth
                      value={cantidad}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  )}
                  name="cantidad"
                  control={control}
                />
              </div>
            </Grid>

            <Grid item xs={6}>
              <Controller
                defaultValue={["Selecciona una opción"]}
                render={({ field }) => (
                  <FormControl error={!!errors.area} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Áreas
                    </FormLabel>
                    <Select
                    defaultValue={0}
                      value={areas}
                      {...field}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                      }}
                    >
                      <MenuItem value="0">Seleccione una opción</MenuItem>
                      <MenuItem value="10">Ten (10)</MenuItem>
                      <MenuItem value="20">Twenty (20)</MenuItem>
                      <MenuItem value="30">Thirty (30)</MenuItem>
                    </Select>
                  </FormControl>
                )}
                name="area"
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
                onClick={CerrarCollapseEditar}
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
      </Collapse>*
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
              <h2>Detalles del Lote</h2>   
              </Grid>   
              <Grid item xs={12}>   
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Lote Id:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Material:
                      </Typography>
                      <Typography>{material}</Typography>
                    </InputLabel>
                    </Box>
                </Box>
                </Grid> 
                <Grid item xs={12}> 
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor="id">
                        <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                          Stock:
                        </Typography>
                        <Typography>{stock}</Typography>
                      </InputLabel>
                      </Box>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor="descripcion">
                        <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                          cantidad:
                        </Typography>
                        <Typography>{cantidad}</Typography>
                      </InputLabel>
                    </Box>
                  </Box>
                </Grid> 

                <Grid item xs={12}> 
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ flex: 1 }}>
                      <InputLabel htmlFor="id">
                        <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                          Área:
                        </Typography>
                        <Typography>{areas}</Typography>
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
      {/* Dialog para eliminar un registro fin*/}
      <ToastContainer />
    </Card>
  );
}

export default LotesIndex;
