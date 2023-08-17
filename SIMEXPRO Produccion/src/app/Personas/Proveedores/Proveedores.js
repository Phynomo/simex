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
import { height } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";

//Imports de Redireciones
import History from "src/@history/@history";
//Imports de validaciones
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//Imports tabla
import { Badge, Dropdown, Space, Table } from "antd";
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
//Import service
import proveedoresService from "./ProveedoresService";
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

/* Campos del formulario*/
const defaultProveedoresValues = {
  id: "", //id necesario para el editar
  prov_NombreCompania: "",
  prov_NombreContacto: "",
  prov_Telefono: "",
  prov_CodigoPostal: "",
  Ciudad: null, //para los campos que son ddl poner null
  prov_DireccionExacta: "",
  prov_CorreoElectronico: "",
  prov_Fax: "",
};


/* Esquema del fomulario (validaciones) */
//En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
  id: yup.string(),
  prov_NombreCompania: yup.string().trim().required(""),
  prov_NombreContacto: yup.string().trim().required(""),
  prov_Telefono: yup.string().trim().required(""),
  prov_CodigoPostal: yup.string().trim().required(""),

  Ciudad: yup.object().required(""),
  prov_DireccionExacta: yup.string().trim().required(""),
  prov_CorreoElectronico: yup.string().trim().required(""),
  prov_Fax: yup.string().trim(),
});


function ProveedoresIndex() {

  //Variables DDL
  const [Ciudad_DDL, setCiudad_DDL] = useState([]);

  //Cargado de las variables DDL
  async function ddls() {
    setCiudad_DDL(await load_DDLs.Ciudades());
  }

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

  //Handle para mostrar los detalles del registro
  const handleDetails = (datos) => {
    setDatosDetalles(datos); //se guardan los datos en la variable escrita antes
    CollapseDetalles();
    handleClose(datos.prov_Id);

  };

  const handleDelete = (datos) => {
    setValue("id", datos["prov_Id"]);
    DialogEliminar()
    handleClose(datos.prov_Id);
  };

  {/* Columnas de la tabla */ }
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Nombre Compañía",
      dataIndex: "prov_NombreCompania",
      key: "prov_NombreCompania",
      sorter: (a, b) => a.prov_NombreCompania.localeCompare(b.prov_NombreCompania), //sorting para Letras
    },
    {
      title: "Nombre Contacto",
      dataIndex: "prov_NombreContacto",
      key: "prov_NombreContacto",
      sorter: (a, b) => a.prov_NombreContacto.localeCompare(b.prov_NombreContacto), //sorting para Letras
    },
    {
      title: "Teléfono",
      dataIndex: "prov_Telefono",
      key: "prov_Telefono",
      sorter: (a, b) => a.prov_Telefono.localeCompare(b.prov_Telefono), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.prov_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.prov_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.prov_Id)}
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
              id={`menu-${params.prov_Id}`}
              anchorEl={anchorEl[params.prov_Id]}
              keepMounted
              open={Boolean(anchorEl[params.prov_Id])}
              onClose={() => handleClose(params.prov_Id)}
            >
              <MenuItem
                onClick={() => {
                  History.push("/Proveedores/editar", params);
                }}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              {<MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon>ㅤEliminar
              </MenuItem>}
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
  const camposToFilter = ["key", "prov_NombreCompania", "prov_NombreContacto", "prov_Telefono"];

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
      defaultProveedoresValues, //Campos del formulario
      mode: "all",
      resolver: yupResolver(accountSchema), //Esquema del formulario
    });

  //Datos del formulario
  const datosWatch = watch();

  //Peticion para cargar datos de la tabla
  const proveedoresGetData = async () => {
    try {
      setData(await proveedoresService.listar());
    } catch (error) {
      console.log(error.message);
    }
  };


  // Peticion para Eliminar un registro
  const proveedoresDelete = async () => {
    try {
      const response = await proveedoresService.eliminar(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha eliminado exitosamente");
        proveedoresGetData();
        DialogEliminar();
        reset(defaultProveedoresValues);
      }
       else if (response.data.data.messageStatus == "0") {
        DialogEliminar();
        ToastWarning("El registro está en uso");
      }

      
    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }
  }

  //useEffect para cargar datos al ingresar a la pantalla
  useEffect(() => {
    proveedoresGetData();
  }, []);


  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/JxTYhwv/PROVEEDORES.png"
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
                History.push("/Proveedores/crear");
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


      {/* Inicia del Dialog(Modal) Eliminar */}
      <Dialog
        open={Eliminar}
        fullWidth
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
              onClick={proveedoresDelete}
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
            alignItems: "flex-star",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: "30px" }}>
              <Divider style={{ marginTop: "0px"}}>
                <Chip label="Detalles del Proveedor" />
              </Divider>
            </Grid>

            <Grid
             item
             xs={12}
             style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="prov_Id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      ID Proveedor:
                    </Typography>
                    <Typography>{DatosDetalles['prov_Id']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="prov_NombreCompania">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre de la Compañía:
                    </Typography>
                    <Typography>{DatosDetalles['prov_NombreCompania']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="prov_NombreContacto">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Nombre del Contacto:
                    </Typography>
                    <Typography>{DatosDetalles['prov_NombreContacto']}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>

            <Grid
             item
             xs={12}
             style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="prov_Telefono">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Teléfono:
                    </Typography>
                    <Typography>{DatosDetalles['prov_Telefono']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="prov_CodigoPostal">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Código Postal:
                    </Typography>
                    <Typography>{DatosDetalles['prov_CodigoPostal']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="prov_CorreoElectronico">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Correo Electrónico:
                    </Typography>
                    <Typography>{DatosDetalles['prov_CorreoElectronico']}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>

            <Grid
             item
             xs={12}
             style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="prov_Fax">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Fax:
                    </Typography>
                    <Typography>{DatosDetalles['prov_Fax']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="ciud_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Ciudad:
                    </Typography>
                    <Typography>{DatosDetalles['ciud_Nombre']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="pvin_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Provincia:
                    </Typography>
                    <Typography>{DatosDetalles['pvin_Nombre']}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>
           

            <Grid
             item
             xs={12}
             style={{ marginBottom: "25px", marginLeft: "30px" }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="pais_Nombre">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      País:
                    </Typography>
                    <Typography>{DatosDetalles['pais_Codigo'] + " - " + DatosDetalles['pais_Nombre']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="prov_DireccionExacta">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Dirección Exacta:
                    </Typography>
                    <Typography>{DatosDetalles['prov_DireccionExacta']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel >
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                     
                    </Typography>
                    <Typography></Typography>
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
                      {DatosDetalles["prov_FechaCreacion"]
                        ? new Date(
                          DatosDetalles["prov_FechaCreacion"]
                        ).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usuarioModificadorNombre"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["prov_FechaModificacion"]
                        ? new Date(
                          DatosDetalles["prov_FechaModificacion"]
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
  )

}

export default ProveedoresIndex;








