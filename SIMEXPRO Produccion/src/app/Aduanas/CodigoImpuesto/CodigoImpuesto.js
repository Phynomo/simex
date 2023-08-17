import {
  Card,
  CardContent,
  CardMedia,
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Divider,
  Chip,
  Stack,
  Collapse,
  Grid,
  Typography,
  Select,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  FormLabel,
} from "@mui/material";

import * as React from "react";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

//Imports de validaciones
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//Imports tabla
import { Table } from "antd";
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
//Import service
import CodigoImpuestoServices from "./CodigoImpuestoService";
//import Toast
import "react-toastify/dist/ReactToastify.css";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
} from "src/styles/toastsFunctions";


const defaultCodigoImpuestoValues= {
  coim_Id: "",
  coim_Descripcion: "",
}

const accountSchema = yup.object().shape({
  coim_Id: yup.string(),
  coim_Descripcion: yup.string().trim().required(""),
});


function CodigoImpuestoIndex(){
  //variable para la barra de busqueda
  const [searchText, setSearchText] = useState("");

  //Variables para los collapse
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  //Variable donde se guardan los datos del detalle seleccionado
  const [DatosDetalles, setDatosDetalles] = useState({});

  //variable para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  //Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  //Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(10);

  //Variable que hace algo con el menu XD
  const [anchorEl, setAnchorEl] = useState({});

  /* Datos de la tabla */
  const [data, setData] = useState([]);

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultCodigoImpuestoValues);
  }; 

  //Controlador del dialog(modal) eliminar
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Controlador del collapse detalles
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //controlador de las fillas a mostrar
  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };

  //abre el menu al cual se le dio click
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Cierra el menu abierto
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    //insertar aca las variables necesarias en su formulario
    setValue("coim_Id", datos["coim_Id"]);
    setValue("coim_Descripcion", datos["coim_Descripcion"]);
    handleClose(datos.coim_Id);
  };

  //Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.coim_Id);
  };

  const handleDelete = (datos) => {
    setValue("coim_Id", datos["coim_Id"]);
    DialogEliminar()
    handleClose(datos.coim_Id);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Descripcion",
      dataIndex: "coim_Descripcion",
      key: "coim_Descripcion",
      sorter: (a, b) => a.coim_Descripcion.localeCompare(b.coim_Descripcion), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.coim_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.coim_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.coim_Id)}
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
              id={`menu-${params.coim_Id}`}
              anchorEl={anchorEl[params.coim_Id]}
              keepMounted
              open={Boolean(anchorEl[params.coim_Id])}
              onClose={() => handleClose(params.coim_Id)}
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

  //Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ["key", "coim_Descripcion"];

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
  const { handleSubmit, register, reset, control, watch, formState, setValue } =
    useForm({
      defaultCodigoImpuestoValues, //Campos del formulario
      mode: "all",
      resolver: yupResolver(accountSchema), //Esquema del formulario
    });

  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();

  //Peticion para cargar datos de la tabla
  const CodigoImpuestoGetData = async () => {
    try {
      setData(await CodigoImpuestoServices.listar());
    } catch (error) {
    }
  };

  //Peticion para crear un registro
  const CodigoImpuestoCreate = async () => {
    try {
      const response = await CodigoImpuestoServices.crear(datosWatch);
      console.log(response);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");
        CodigoImpuestoGetData();
        VisibilidadTabla();
        reset(defaultCodigoImpuestoValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

  // Peticion para editar un registro
  const CodigoImpuestoEdit = async () => {
    try {
      const response = await CodigoImpuestoServices.editar(datosWatch);
      console.log(response);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha editado exitosamente");
        CodigoImpuestoGetData();
        VisibilidadTabla();
        reset(defaultCodigoImpuestoValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      ToastError("Error inesperado");
    }
  };

  const CodigoImpuestoDelete = async () => {
    try{
      const response = await CodigoImpuestoServices.eliminar(datosWatch);
      console.log(response);
      if(response.data.data.messageStatus == "1"){
        DialogEliminar();
        ToastSuccess("El registro ha sido eliminado exitosamente");
        CodigoImpuestoGetData();
        //VisibilidadTabla();
        reset(defaultCodigoImpuestoValues);
      }else if(response.data.data.messageStatus.includes("0")){
        DialogEliminar();
        ToastError("El registro está en uso");
      }
    }catch (error) {
      DialogEliminar();
      ToastError("Error inesperado");
    }
  }

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    CodigoImpuestoGetData();
  }, []);

  //Controlador del formulario
  const GuardarCodigoImpuesto = () => {
    if (isValid) {
      // Validacion de campos completos
      if (!editar) {
        // Validacion de la funcion a realizar
        CodigoImpuestoCreate();
      } else {
        CodigoImpuestoEdit();
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
        image="https://i.ibb.co/n0WYjRV/C-DIGO-IMPUESTO.png"
        alt="Encabezado de la carta"
      />
      {/* Inicio del Collapse incial (Tabla/Index) */}
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

          {/* Filtros de la tabla (Filas/Buscar) */}
          <Stack direction="row" spacing={1}>
            <label className="mt-8">Filas por página:</label>
            <FormControl sx={{ minWidth: 50 }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={filas}
                onChange={handleChangeFilas}
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

        {/* Declaracion de la tabla */}
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
      {/* Fin del Collapse incial (Tabla/Index) */}

      {/* Inicio del Formulario */}
      <form onSubmit={handleSubmit((_data) => {})}>
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
                    label={editar ? "Editar Código de Impuesto" : "Agregar Código de Impuesto"}
                  />
                </Divider>
              </Grid>
              <Grid item xs={2}>
              </Grid>

              <Grid item xs={8}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.coim_Descripcion}>Descripción</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        inputProps={{
                          maxLength: 150,
                        }}
                        error={!!errors.coim_Descripcion}
                      ></TextField>
                    )}
                    name="coim_Descripcion"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
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
                  onClick={GuardarCodigoImpuesto}
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
       {/* Fin del Formulario */}

       {/* Inicia del Dialog(Modal) Eliminar */}
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
              onClick={CodigoImpuestoDelete}
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
       {/* Fin del Dialog(Modal) Eliminar */}

       {/* Inicia del collapse Detalles */}
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
                <Chip label="Detalles del Código de Impuesto" />
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
                    Id:
                  </Typography>
                  <Typography>{DatosDetalles["coim_Id"]}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Descripción:
                  </Typography>
                  <Typography>{DatosDetalles["coim_Descripcion"]}</Typography>
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
                      {DatosDetalles["coim_FechaCreacion"]
                        ? new Date(
                            DatosDetalles["coim_FechaCreacion"]
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
                      {DatosDetalles["coim_FechaModificacion"]
                        ? new Date(
                            DatosDetalles["coim_FechaModificacion"]
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
                    CollapseDetalles();
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
       {/* Fin del Collapse Detalles */}

    </Card>
  );
}

export default CodigoImpuestoIndex;