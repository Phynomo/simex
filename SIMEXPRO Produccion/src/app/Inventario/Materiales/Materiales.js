/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
  Box,
} from '@mui/material';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';

// Imports de validaciones
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// Imports tabla
import { Table } from 'antd';
import LoadingIcon from 'src/styles/iconoCargaTabla';
import 'src/styles/custom-pagination.css';
// import tabla detalles
import estilosTablaDetalles from 'src/styles/tablaDetalles';
// Import service
import materialesService from './MaterialesService';
// Import ddls
import load_DDLs from 'src/app/loadDDLs/Load_DDL';
// import Toast
import 'react-toastify/dist/ReactToastify.css';
import { ToastSuccess, ToastWarning, ToastError } from 'src/styles/toastsFunctions';


const defaultMaterialesValues = {
  id: '', // id necesario para el editar
  mate_Descripcion: '',
  mate_Precio: '',
  categorias: null,
  subcategoria: null,
};


const schema = yup.object().shape({
  id: yup.string(),
  categorias: yup.object().required(""),
  subcategoria: yup.object().required(""),
  mate_Descripcion: yup.string().trim().required(""),
  mate_Precio: yup.string().trim().required(""),
});

function MaterialesIndex() {
  // variable para la barra de busqueda
  const [searchText, setSearchText] = useState('');

  // Variables para los collapse
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);


  // variable para el dialog(modal) de eliminar
  const [Eliminar, setEliminar] = useState(false);

  // Variable que indica si el usuario a seleccionar crear o editar
  const [editar, setEditar] = useState(false);

  // Variable que guarda la cantidad de filas a mostrar
  const [filas, setFilas] = React.useState(10);

  // Variable que hace algo con el menu XD
  const [anchorEl, setAnchorEl] = useState({});

  /* Datos de la tabla */
  const [data, setData] = useState([]);

  //DDL de categorias
  const [categoriaDDL, setCategoriaDDL] = useState([]);

  //DDL de subcategorias
  const [subcategoriaDDL, setsubcategoriaDDL] = useState([]);

  const [DatosDetalles, setDatosDetalles] = useState({});

  //Controlador del collapse detalles
  const CollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  
  
  
  useEffect(() => {
    ddls();
    materialesGetData();
  }, []);
  
  
   // Peticion para cargar datos de la tabla
   const materialesGetData = async () => {
    try {
      setData(await materialesService.listar());
    } catch (error) {
      console.log(error.message);
    }
  };
  
  //Peticion para crear un registrar 
  const materialesCreate = async () => {
    try {
      const response = await materialesService.crear(datosWatch);
      if (response.data.data.messageStatus == "1") {
        ToastSuccess("El registro se ha insertado exitosamente");
        materialesGetData();
        VisibilidadTabla();
        reset(defaultMaterialesValues);
      } else if (response.data.data.messageStatus.includes("UNIQUE")) {
        ToastWarning("El registro ya existe");
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Error inesperado");
    }
  };


  const materialesEdit = async () => {
    try {
      const response = await materialesService.editar(datosWatch);
      if (response.data.data.messageStatus === '1') {
        ToastSuccess('El registro se ha editado exitosamente');
        materialesGetData();
        VisibilidadTabla();
        reset(defaultMaterialesValues);
      } else if (response.data.data.messageStatus.includes('UNIQUE')) {
        ToastWarning('El registro ya existe');
      }
    } catch (error) {
      console.log(error.message);
      ToastError('Error inesperado');
    }
  };

  

  /* Controlador del Index(Tabla) */
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultMaterialesValues);
  };

  // Controlador del dialog(modal) eliminar
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.mate_Id);
  };

  // controlador de las fillas a mostrar
  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };

  // abre el menu al cual se le dio click
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };


  // Cierra el menu abierto
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };



  //Controlador de la barra buscadora de la tabla
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };



  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.key - b.key, // sorting para Numeros
    },
    {
      title: 'Descripcion',
      dataIndex: 'mate_Descripcion',
      key: 'mate_Descripcion',
      sorter: (a, b) => a.mate_Descripcion.localeCompare(b.mate_Descripcion), // sorting para Letras
    },
    {
      title: 'Subcategoria',
      dataIndex: 'subc_Descripcion',
      key: 'subc_Descripcion',
      sorter: (a, b) => a.subc_Descripcion.localeCompare(b.subc_Descripcion), // sorting para Letras
    },

    {
      title: 'Precio',
      dataIndex: 'mate_Precio',
      key: 'mate_Precio',
      sorter: (a, b) => a.mate_Precio.localeCompare(b.mate_Precio), // sorting para Letras
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) => (
        <div key={params.mate_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.mate_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.mate_Id)}
              variant="contained"
              style={{
                borderRadius: '10px',
                backgroundColor: '#634A9E',
                color: 'white',
              }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.mate_Id}`}
              anchorEl={anchorEl[params.mate_Id]}
              keepMounted
              open={Boolean(anchorEl[params.mate_Id])}
              onClose={() => handleClose(params.mate_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              {/* <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem> */}
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

//Constante para mostrar el collapse de editar un registro
const MostrarCollapseEditar = () => {
  setmostrarIndex(!mostrarIndex);
  setmostrarEditar(!mostrarEditar);
  reset(defaultMaterialesValues);
};
const CerrarEditar = () => {
  setmostrarIndex(!mostrarIndex);
  setmostrarEditar(!mostrarEditar);
  reset(defaultMaterialesValues);
};


  //Cargado de las variables DDL
  async function ddls() {
    setCategoriaDDL(await load_DDLs.Categorias());
  }


  //Cargado de ddl de subcategoria
  async function ddlSubcategoria(id) {
    try {
      const subcategorias = await load_DDLs.SubCategoriasPorCategoria(id);
      console.log("Subcategorías cargadas:", subcategorias);
      setsubcategoriaDDL(subcategorias);
    } catch (error) {
      console.log("Error al cargar subcategorías:", error);
    }
  }
  const handleEdit = async (datos) => {
    handleClose(datos.mate_Id);
    MostrarCollapseEditar();
    setEditar(true);
  
    // Insertar aquí las variables necesarias en su formulario
    setValue('id', datos.mate_Id);
    setValue('mate_Descripcion', datos['mate_Descripcion']);
    setValue('mate_Precio', datos['mate_Precio']);
    setValue('categorias', { value: datos['cate_Id'], label: datos['cate_Descripcion'] });
    ddlSubcategoria(datos['cate_Id']); 
    setValue('subcategoria', { value: datos['subc_Id'], label: datos['subc_Descripcion'] });

    console.log(categorias);

  };
  



  // // Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
  const camposToFilter = ['key', 'mate_Descripcion', 'subc_Descripcion', 'mate_Precio'];

  // Constante que ayuda a filtrar el datatable
  const filteredRows = data.filter((row) => {
    if (searchText === '') {
      return true; // Mostrar todas las filas si el buscador está vacío
    }

    for (const [key, value] of Object.entries(row)) {
      if (camposToFilter.includes(key)) {
        const formattedValue =
          typeof value === 'number' ? value.toString() : value.toString().toLowerCase();
        const formattedSearchText =
          typeof searchText === 'number' ? searchText.toString() : searchText.toLowerCase();
        if (formattedValue.includes(formattedSearchText)) {
          return true;
        }
      }
    }
    return false;
  });


  // Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    defaultMaterialesValues, // Campos del formulario
    mode: 'all',
    resolver: yupResolver(schema), // Esquema del formulario
  });


  //Validacion de campos vacios y errores
  const { isValid, dirtyFields, errors } = formState;

  //Datos del formulario
  const datosWatch = watch();
// Controlador del formulario



const GuardarMateriales = () => {
  if (isValid) {
    // Validacion de campos completos
    if (!editar) {
      // Validacion de la funcion a realizar
      materialesCreate();
    } else {
      materialesEdit();
    }
  } else {
    ToastWarning('Completa todos los campos');
  }
};

  // useEffect para cargar datos al ingresar a la pantalla
 


  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/cL2c1Zs/MATERIALES.png"
        alt="Encabezado de la carta"
      />
      {/* Inicio del Collapse incial (Tabla/Index) */}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {/* Botón de Nuevo */}
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#634A9E',
                color: 'white',
                '&:hover': { backgroundColor: '#6e52ae' },
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
              style={{ borderRadius: '10px' }}
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
        <div className="center" style={{ width: '95%', margin: 'auto' }}>
          <Table
            columns={columns}
            dataSource={filteredRows}
            size="small"
            locale={{
              triggerDesc: 'Ordenar descendente',
              triggerAsc: 'Ordenar ascendente',
              cancelSort: 'Cancelar',
              emptyText: LoadingIcon(),
            }}
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: 'custom-pagination',
            }}
          />
        </div>
      </Collapse>
      {/* Fin del Collapse incial (Tabla/Index) */}
      {/* Inicio del Formulario */}
      <form onSubmit={handleSubmit((_data) => { })}>
        <Collapse in={mostrarAdd}>
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip label={editar ? 'Editar Materiales' : 'Agregar Materiales'} />
                </Divider>
              </Grid>
              
              <Grid item xs={6} >
                <FormControl fullWidth>
                  <FormLabel error={!!errors.categorias}>Categorias</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        id="categorias"
                        options={categoriaDDL}
                        value={datosWatch["categorias"] ?? null}
                        onChange={async (event, value) => {
                          setValue('categorias', value)
                          setValue('subcategoria', null)
                          ddlSubcategoria(value?.value)
                          if (!value) { setValue('subc_Id', []) }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.categorias}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      />
                    )}
                    name="categorias"
                    control={control}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={6} >
              <FormControl fullWidth>
                <FormLabel error={!!errors.subcategoria}>Subcategoria</FormLabel>
                <Controller
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="subcategoria"
                      isOptionEqualToValue={(option, value) =>
                        option.value === value?.value
                      }
                      options={subcategoriaDDL}
                      disabled={!datosWatch.categorias} // Deshabilitar si no hay categoría seleccionada
                      value={datosWatch.subcategoria ?? null}
                      onChange={(event, value) => {
                        setValue("subcategoria", value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} error={!!errors.subcategoria} InputLabelProps={{ shrink: true }} />
                      )}
                    />
                  )}
                  name="subcategorias"
                  control={control}
                />
              </FormControl>
              </Grid>

              <Grid item xs={6}>
              <FormLabel error={!!errors.mate_Descripcion}>Descripcion</FormLabel>
                <Controller render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.mate_Descripcion}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                  name='mate_Descripcion'
                  control={control} />
              </Grid>

              <Grid item xs={6}>
              <FormLabel error={!!errors.mate_Precio}>Precio material</FormLabel>
                <Controller render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.mate_Precio}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
                  name='mate_Precio'
                  control={control} />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'right',
                }}
              >
                <Button
                  type="submit"
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px', marginRight: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E',
                    color: 'white',
                    '&:hover': { backgroundColor: '#6e52ae' },
                  }}
                  onClick={GuardarMateriales}
                >
                  {editar ? 'Editar' : 'Guardar'}
                </Button>

                <Button
                  startIcon={<Icon>close</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '10px' }}
                  sx={{
                    backgroundColor: '#DAD8D8',
                    color: 'black',
                    '&:hover': { backgroundColor: '#BFBABA' },
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
            <Grid item xs={12}>
            <Divider style={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Chip
                    label={editar ? "Editar Material" : "Agregar ciudad"}
                  />
                </Divider>
            </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <FormLabel error={!!errors.categorias}>Categoria</FormLabel>
                <Controller
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                      }
                      id="categorias"
                      options={categoriaDDL}
                      value={datosWatch["categorias"] ?? null}
                      onChange={async (event, value) => {
                          setValue('categorias', value)
                          setValue('subcategoria', null)
                          ddlSubcategoria(value?.value)
                          if (!value) { setValue('subc_Id', []) }
                      }}
                      renderInput={(params) => (
                          <TextField
                              {...params}
                              error={!!errors.categorias}
                              InputLabelProps={{ shrink: true }}
                          />
                      )}
                  />
                  )}
                  name="categorias"
                  control={control}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} >
              <FormControl fullWidth>
                <FormLabel error={!!errors.subcategoria}>Sub Categorias</FormLabel>
                <Controller
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      id="subcategoria"
                      isOptionEqualToValue={(option, value) =>
                        option.value === value?.value
                      }
                      options={subcategoriaDDL}
                      disabled={datosWatch['categorias'] != null ? false : true}
                      value={datosWatch.subcategoria ?? null}
                      onChange={(event, value) => {
                        setValue("subcategoria", value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} error={!!errors.subcategoria} />
                      )}
                    />
                  )}
                  name="subcategorias"
                  control={control}
                />
              </FormControl>
            </Grid>


            <Grid item xs={6}>
            <FormLabel error={!!errors.mate_Descripcion}>Descripcion Material</FormLabel>
              <Controller render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.mate_Descripcion}
                  InputLabelProps={{ shrink: true }}
                />
              )}
                name='mate_Descripcion'
                control={control} />
            </Grid>
               
            
            <Grid item xs={6}>
            <FormLabel error={!!errors.mate_Precio}>Precio Material</FormLabel>
              <Controller render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  error={!!errors.mate_Precio}
                  InputLabelProps={{ shrink: true }}
                />
              )}
                name='mate_Precio'
                control={control} />
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
                onClick={GuardarMateriales}
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
                onClick={CerrarEditar}
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
            alignItems: "flex-center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: '30px' }}>
              <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                <Chip label="Detalles del Material" />
              </Divider>
            </Grid>

            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", marginBottom: '40px' }}>
              <Box sx={{ flex: 1, textAlign: "center", }} >
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id del Material:
                  </Typography>
                  <Typography>{DatosDetalles['mate_Id']}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre del Material:
                  </Typography>
                  <Typography>{DatosDetalles['mate_Descripcion']}</Typography>
                </InputLabel>
              </Box>
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
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Subcategoria:
                  </Typography>
                  <Typography>{DatosDetalles["subc_Descripcion"]}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Precio del Material:
                  </Typography>
                  <Typography>{DatosDetalles["mate_Precio"]}</Typography>
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
                      <Icon style={estilosTablaDetalles.iconStyle}>date_range</Icon>Fecha y hora
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
                      {DatosDetalles['mate_FechaCreacion']
                        ? new Date(DatosDetalles['mate_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>{DatosDetalles['usuarioModificacionNombre']}</td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles['mate_FechaModificacion']
                        ? new Date(DatosDetalles['mate_FechaModificacion']).toLocaleString()
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
  )
}
export default MaterialesIndex;