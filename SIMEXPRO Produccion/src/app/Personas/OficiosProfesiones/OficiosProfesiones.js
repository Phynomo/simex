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
  CircularProgress,
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
  Divider,
  Chip,
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
import oficiosProfesionesService from "./OficiosProfesionesService";
import LoadingIcon from "src/styles/iconoCargaTabla";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
  ToastDefault,
} from "src/styles/toastsFunctions";

 {/*Yup para formulario de agregar Inicio */}


  //Constante de los datos por defecto que tendran los formulario agregar
  const defaultOficiosValues = {
    oficios: "",
  };

   //Constante para indicar que el valor es requerido
   const OficiosSchema  = yup.object().shape({
    oficios: yup.string().required(),
  });


   {/*Yup para formulario de agregar Fin */}
function OficionesProfesionesIndex() {

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constantes para los Collapse de agregar, editar y detalles 
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [editar, setEditar] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);
  const [idEditar, setidEditar] = useState(0);


  const camposToFilter = ["key", "ofpr_Nombre"];
  const [anchorEl, setAnchorEl] = useState({});

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.ofpr_Id);
  };

  //Handle que inicia la funcion de editar
  const handleEdit = (datos) => {
    VisibilidadTabla();
    setEditar(true);
    setidEditar(datos['ofpr_Id'])
    //insertar aca las variables necesarias en su formulario
    setValue("oficios", datos["ofpr_Nombre"]);
    handleClose(datos.ofpr_Id);
  };

  const handleDelete = (datos) => {
    setValue('id', datos['id']);
    setEliminar(true);
    handleClose(datos.id);
  };


    //Constante de las columnas del index
    const columns = [
      {
        title: "#",
        dataIndex: "key",
        key: "key",
        sorter: (a, b) => a.key - b.key, //sorting para Numeros
      },
      {
        title: "Ocupacion",
        dataIndex: "ofpr_Nombre",
        key: "ofpr_Nombre",
        sorter: (a, b) => a.ofpr_Nombre.localeCompare(b.ofpr_Nombre), //sorting para Letras
      },
      {
        title: "Acciones",
        key: "operation",
        render: (params) => (
          <div key={params.ofpr_Id}>
            <Stack direction="row" spacing={1}>
              <Button
                aria-controls={`menu-${params.ofpr_Id}`}
                aria-haspopup="true"
                onClick={(e) => handleClick(e, params.ofpr_Id)}
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
                id={`menu-${params.ofpr_Id}`}
                anchorEl={anchorEl[params.ofpr_Id]}
                keepMounted
                open={Boolean(anchorEl[params.ofpr_Id])}
                onClose={() => handleClose(params.ofpr_Id)}
              >
                <MenuItem onClick={() => handleEdit(params)}>
                  <Icon>edit</Icon>ㅤEditar
                </MenuItem>
                <MenuItem onClick={() => handleDetails(params)}>
                  <Icon>visibility</Icon>ㅤDetalles
                </MenuItem>
              </Menu>
            </Stack>
          </div>
        ),
      },
    ];

    const [data, setData] = useState([]);

    const OficiosProfesionesGetData = async () => {
      try {
        setData(await oficiosProfesionesService.listar());
      } catch (error) {
        console.log(error.message);
      }
    };

    const OficiosProfesionesCreate = async () => {
      try {
        const response = (await oficiosProfesionesService.crear(datosWatch))
        if (response.data.data.messageStatus == '1') {
          ToastSuccess('El registro se ha insertado exitosamente')
          OficiosProfesionesGetData();
          VisibilidadTabla()
          reset(defaultOficiosValues)
        } else if (response.data.data.messageStatus.includes('UNIQUE')) {
          ToastWarning('El registro ya existe')
        }
      } catch (error) {
        console.log(error.message);
        ToastError('Error inesperado')
      }
    };

    const OficiosProfesionesEdit = async () => {
      try {
        const response = (await oficiosProfesionesService.editar(datosWatch,idEditar))
        if (response.data.data.messageStatus == '1') {
          ToastSuccess('El registro se ha editado exitosamente')
          OficiosProfesionesGetData();
          VisibilidadTabla()
          reset(defaultOficiosValues)
        } else if (response.data.data.messageStatus.includes('UNIQUE')) {
          ToastWarning('El registro ya existe')
        }
      } catch (error) {
        console.log(error.message);
        ToastError('Error inesperado')
      }
    };

    useEffect(() => {
      OficiosProfesionesGetData();
    }, []);

    {
      /* Función para mostrar la tabla y mostrar agregar */
    }
    const VisibilidadTabla = () => {
      setmostrarIndex(!mostrarIndex);
      setmostrarAgregar(!mostrarAgregar);
      reset(defaultOficiosValues)
    };

    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
    };

    {
      /* Filtrado de datos */
    }
     //Constante que ayuda a filtrar el datatable
    const filteredRows = data.filter((row) => {
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
  
    
  //Constante que nos ayuda para las validaciones con yup para los formularios 
  const { handleSubmit, reset, control, watch, formState, setValue } = useForm({
    defaultOficiosValues,
    mode: "all",
    resolver: yupResolver(OficiosSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const datosWatch = watch();

  const GuardarOficiosProfesiones = () => {
    if (isValid) {
      if (!editar) {
        OficiosProfesionesCreate()
      } else {
        OficiosProfesionesEdit()
      }
    } else {
      ToastWarning('Completa todos los campos')
    }
  };
  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/K0h73Hw/OFICIO-PROFESIONES-1.png"
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
              onClick={()=>{
                VisibilidadTabla()
                setEditar(false)
              }}
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

      {/* Mostrar tabla index inicio*/}
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
      {/* Mostrar tabla index fin*/}

      {/* Collapse para el formulario de agregar un registro inicio*/}
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
                    label={editar ? "Editar Oficina" : "Agregar Oficina"}
                  />
                </Divider>
              </Grid>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={8}>
              <div className=" mb-16">
              <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.oficios} fullWidth>
                    <FormLabel
                    >
                      Oficio u Ocupación
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.oficios}  
                      fullWidth={true}
                      inputProps={{
                        maxLength: 150,
                      }}
                    />
                  </FormControl>
                )}
                name="oficios"
                control={control}
              />
              </div>
            </Grid>
               <Grid item xs={2}>
              </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "right", alignItems: "right", }}>
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
                onClick={GuardarOficiosProfesiones}
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
      {/* Collapse para el formulario de agregar un registro fin*/}

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
            <Grid item xs={12} style={{ marginBottom: '30px' }}>
              <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                <Chip label="Detalles de la Ocupacion" />
              </Divider>
            </Grid>

            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", marginBottom: '40px' }}>
              <Box sx={{ flex: 1, textAlign: "center", }} >
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Ocupación Id:
                  </Typography>
                  <Typography>{DatosDetalles['ofpr_Id']}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Ocupacón descripción:
                  </Typography>
                  <Typography>{DatosDetalles['ofpr_Nombre']}</Typography>
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
                      <Icon style={estilosTablaDetalles.iconStyle}>edit</Icon>Accion
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>person</Icon>Usuario
                    </th>
                    <th style={estilosTablaDetalles.tableHeaderStyle}>
                      <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>Fecha y
                      hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Creación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['usuarioCreacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles['ofpr_FechaCreacion']
                        ? new Date(DatosDetalles['ofpr_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['usuarioModificacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles['ofpr_FechaModificacion']
                        ? new Date(DatosDetalles['ofpr_FechaModificacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            
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
      {/* Collapse para mostrar los detalles de un registro fin*/}
      <ToastContainer />
    </Card>
  );

}

export default OficionesProfesionesIndex;