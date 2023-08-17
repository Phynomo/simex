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
  Avatar,
  Autocomplete,
  Divider,
  Chip,
} from "@mui/material";

import * as React from "react";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormLabel from "@mui/material/FormLabel";
import LoadingIcon from "src/styles/iconoCargaTabla";
import { Badge, Dropdown, Space, Table } from "antd";
import "src/styles/custom-pagination.css";
import tipoIdentificacionService from "./TipoIdentificacionService";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import "react-toastify/dist/ReactToastify.css";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
} from "src/styles/toastsFunctions";

{
  /* Validaciones de la pantalla de crear*/
}
const defaultProvinciasValues = {
  id: "",
  tipoIdentificacion: "",
};

const accountSchema = yup.object().shape({
  id: yup.string(),
  tipoIdentificacion: yup.string().trim().required(""),
});

function TiposIdentificacionIndex() {

  const [searchText, setSearchText] = useState("");
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});
  const [Eliminar, setEliminar] = useState(false);
  const [editar, setEditar] = useState(false);

  {
    /* Datos de la tabla */
  }
  const [data, setData] = useState([]);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const [anchorEl, setAnchorEl] = useState({});

  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    setValue("id", datos["iden_Id"]);
    setValue("tipoIdentificacion", datos["iden_Descripcion"]);
    handleClose(datos.iden_Id);
  };

  const handleDetails = (datos) => {
    setDatosDetalles(datos);
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.iden_Id);
  };

  const handleDelete = (datos) => {
    setValue("id", datos["iden_Id"]);
    DialogEliminar()
    handleClose(datos.iden_Id);
  };

  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["key", "iden_Descripcion"];

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

  {
    /* Columnas de la tabla */
  }
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Tipo Identificacion",
      dataIndex: "iden_Descripcion",
      key: "iden_Descripcion",
      sorter: (a, b) => a.iden_Descripcion.localeCompare(b.iden_Descripcion), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.iden_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.iden_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.iden_Id)}
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
              id={`menu-${params.iden_Id}`}
              anchorEl={anchorEl[params.iden_Id]}
              keepMounted
              open={Boolean(anchorEl[params.iden_Id])}
              onClose={() => handleClose(params.iden_Id)}
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

  const provinciasGetData = async () => {
    try {
      setData(await tipoIdentificacionService.listar());
    } catch (error) {
      console.log(error.message);
    }
  };

  const tipoIdentificacionCreate = async () => {
    try {
      const response = await tipoIdentificacionService.crear(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");
        provinciasGetData();
        VisibilidadTabla();
        reset(defaultProvinciasValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }
  };

  const tipoIdentificacionEdit = async () => {
    try {
      const response = await tipoIdentificacionService.editar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha editado exitosamente");
        provinciasGetData();
        VisibilidadTabla();
        reset(defaultProvinciasValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }
  };

  const tipoIdentificacionDelete = async () => {
    try {
      const response = await tipoIdentificacionService.eliminar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha eliminado exitosamente");
        provinciasGetData();
        DialogEliminar();
      } else if (response.data.data.messageStatus.includes("0")) {
        ToastError("El registro está en uso");
        DialogEliminar();
      }
    } catch (error) {
      console.log(error.message);
      DialogEliminar();
      ToastError("Error inesperado");
    }
  };

  useEffect(() => {
    provinciasGetData();
  }, []);

  {
    /* Función para mostrar la tabla y mostrar agregar */
  }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultProvinciasValues);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultProvinciasValues,
      mode: "all",
      resolver: yupResolver(accountSchema),
    });

  const { isValid, dirtyFields, errors } = formState;

  const datosWatch = watch();

  const GuardarProvincia = () => {
    if (isValid) {
      if (!editar) {
        tipoIdentificacionCreate();
      } else {
        tipoIdentificacionEdit();
      }
    } else {
      ToastWarning("Completa todos los campos");
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/2tpMqFy/Tipo-Identificacion.jpg"
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
                VisibilidadTabla();
                setEditar(false);
              }}
            >
              Nuevo
            </Button>
          </Stack>

          <Stack direction="row" spacing={1}>
            <label className="mt-8">Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                // label="Filas"
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
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

      {/* Formulario Agregar */}

      <form onSubmit={handleSubmit((_data) => { })}>
        <Collapse in={mostrarAdd}>
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
                    label={editar ? "Editar tipo de identificación" : "Agregar tipo de identificación"}
                  />
                </Divider>
              </Grid>
              <Grid item xs={2}></Grid>

              <Grid item xs={8}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.tipoIdentificacion}>Nombre</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 75,
                        }}
                        error={!!errors.tipoIdentificacion}
                      ></TextField>
                    )}
                    name="tipoIdentificacion"
                    control={control}
                  ></Controller>
                </FormControl>
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
                  type="submit"
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={GuardarProvincia}
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
              onClick={tipoIdentificacionDelete}
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

      {/* Collapse para mostrar los detalles de un registro inicio*/}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                <Chip label="Detalles de la provincia" />
              </Divider>
            </Grid>

            <Grid
              container
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id del tipo de identificación:
                  </Typography>
                  <Typography>{DatosDetalles["iden_Id"]}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre del tipo de identificación:
                  </Typography>
                  <Typography>{DatosDetalles["iden_Descripcion"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>


            <Grid item xs={12}>
              <table
                id="detallesTabla"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>
                      Accion
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>
                      Usuario
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>
                        date_range
                      </Icon>
                      Fecha y hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioCreacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["iden_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["iden_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioModificacionNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["iden_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["iden_FechaModificacion"]
                        ).toLocaleString()
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
                  }}
                  startIcon={<Icon>arrow_back</Icon>}
                >
                  Regresar
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default TiposIdentificacionIndex;
