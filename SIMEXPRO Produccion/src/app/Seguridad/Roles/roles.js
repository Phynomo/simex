import * as React from 'react';
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
} from "@mui/material";
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Navigate, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { Table } from "antd";
import { useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import History from 'src/@history/@history';
import RolesServices from './rolesservice';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import 'react-toastify/dist/ReactToastify.css';
import { ToastSuccess, ToastWarning, ToastError, ToastDefault, ToastInfo } from 'src/styles/toastsFunctions';

const defaultRolesValues = {
  id: '',
  role_Descripcion: '',
}

const RolesSchema = yup.object().shape({
  role_Id: yup.string(),
  role_Descripcion: yup.string().required(''),

})

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

function RolesIndex() {
  const [DataTabla, setDataTabla] = useState([])
  const [DatosDetalles, setDatosDetalles] = useState({});
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const Navigate = useNavigate();


  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (codigo) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [codigo]: null,
    }));
  };

  //Constante para el editar de los registros y que de un solo me lleve los datos que necesito
  const handleEdit = (id, descripcion, detalles) => {
    const datosEditar = {
      role: id,
      nombre: descripcion,
      pantallas: detalles
    };
    History.push("Roles/Editar", datosEditar);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    MostrarCollapseDetalles();
    handleClose(datos.role_Id);
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
  }


  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };


  //Constante para tomar los valores
  const { watch, setValue } = useForm({
    defaultRolesValues,
    mode: 'all',
    resolver: yupResolver(RolesSchema),
  });
  const datosWatch = watch();



  //Constante para cargar datos a las tablas      
  useEffect(() => {
    ListadoRoles()
  }, []);

  //Constante del listado de la tabla
  const ListadoRoles = async () => {
    try {
      setDataTabla(await RolesServices.ListadoRoles())
    } catch (error) {
      console.log(error.message);
    }
  };


  //Constante para tomar el id del menu
  const handleDelete = (data) => {
    setValue('id', data['role_Id'])
    DialogEliminar();
    handleClose(data['role_Id']);
  };

  //Constante para cerrar el modal de eliminar
  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  //Constante pata la eliminacion de los roles 
  const EliminarRoles = async () => {
    try {
      const response = (await RolesServices.EliminarRoles(datosWatch))
      if (response.data.data.messageStatus == '1') {
        ToastSuccess('El registro se ha eliminado exitosamente')
        ListadoRoles();
        DialogEliminar();
      }
      else if (response.data.data.messageStatus == '0') {
        DialogEliminar();
        ToastInfo('El registro que desea eliminar está en uso.')

      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.role_Id - b.role_Id, //sorting para Numeros
    },
    {
      title: "Rol",
      dataIndex: "role_Descripcion",
      key: "role_Descripcion",
      sorter: (a, b) => a.role_Descripcion.localeCompare(b.role_Descripcion), //sorting para Letras
    },

    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.role_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.role_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.role_Id)}
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
              role_Id={`menu-${params.role_Id}`}
              anchorEl={anchorEl[params.role_Id]}
              keepMounted
              open={Boolean(anchorEl[params.role_Id])}
              onClose={() => handleClose(params.role_Id)}
            >
              <MenuItem onClick={() => handleEdit(params.role_Id, params.role_Descripcion, params.detalles)}>
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


  //Constantes para los campos de la Tabla Maestra
  const columnsExpandable = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      sorter: (a, b) => a.pant_Id - b.pant_Id, //sorting para Numeros
    },
    {
      title: 'Pantalla',
      dataIndex: 'pant_Nombre',
      key: 'pant_Nombre',
      sorter: (a, b) => a.pant_Nombre.localeCompare(b.pant_Nombre), //sorting para Letras
    }
  ];

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["role_Id", "role_Descripcion", "pant_Nombre", "ropa_Id"];

  //Constantes que ayuda a filtrar el datatable
  const filteredRows = DataTabla.filter((row) => {
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
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };









  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/gMjB52g/ROLES.png"
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
              onClick={(e) => {
                Navigate("/Roles/Crear");
              }}>
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
            expandable={{
              expandedRowRender: (record) => <Table columns={columnsExpandable} dataSource={record.detalles} pagination={false} />,
              // rowExpandable: (record) => record.name !== 'Not Expandable',
            }}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas
              , className: 'custom-pagination'
            }}

          />
        </div>
      </Collapse>
      {/* Mostrar tabla index fin*/}

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
                <Chip label="DETALLES DE LOS ROLES" />
              </Divider>
            </Grid>


            <Grid item xs={12} style={{ marginBottom: "25px", marginLeft: "30px", display: "flex", justifyContent: "center", marginBottom: '40px' }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1, textAlign: "center", marginRight: "80px" }} >
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Id del Rol:
                    </Typography>
                    <Typography>{DatosDetalles['role_Id']}</Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1, textAlign: "center", marginLeft: "80px" }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Descripción del rol:
                    </Typography>
                    <Typography>{DatosDetalles['role_Descripcion']}</Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>

            <Grid container justifyContent="center" style={{ marginBottom: '25px', marginLeft: '30px', marginBottom: '40px' }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="pantallas">
                      <Divider style={{ marginTop: '0px', marginBottom: '10px', borderColor: '#aa8caf' }}>
                        <Chip color='default' variant='outlined' label="Pantallas asignadas" />
                      </Divider>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                        {DatosDetalles['detalles'] ? (
                          DatosDetalles['detalles'].map((pantalla, index) => (
                            <div key={index} style={{ textAlign: 'center', margin: '0 30px' }}>
                              ✔ {pantalla.pant_Nombre} 
                            </div>
                          ))
                        ) : (
                          <Grid
                            item
                            xs={12}
                            style={{
                              marginBottom: '30px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Typography variant="subtitle1" align="center">
                              No se han asignado pantallas hasta el momento.
                            </Typography>
                          </Grid>
                        )}
                      </div>

                    </InputLabel>
                  </Box>
                </Box>
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
                    <td style={tableCellStyle}>{DatosDetalles['usuarioCreacionNombre']}</td>
                    <td style={tableCellStyle}>
                      {DatosDetalles['role_FechaCreacion']
                        ? new Date(DatosDetalles['role_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{DatosDetalles['usuarioModificadorNombre']}</td>
                    <td style={tableCellStyle}>
                      {DatosDetalles['role_FechaModificacion']
                        ? new Date(DatosDetalles['role_FechaModificacion']).toLocaleString()
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


      <Dialog
        open={Eliminar}
        fullWidth={'md'}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmación de Eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: '#634A9E', color: 'white',
                "&:hover": { backgroundColor: '#6e52ae' },
              }}
              onClick={EliminarRoles}
            >
              Eliminar
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
              onClick={DialogEliminar}
            >
              Cancelar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

    </Card>
  );
}

export default RolesIndex;
