import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FormHelperText from '@mui/material/FormHelperText'
import {
  Button,
  ButtonBase,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  TextField,
  Avatar,
  FormLabel,
  Divider,
  Chip,
  Box,
  Select
} from "@mui/material";
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { height } from '@mui/system';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import "src/styles/custom-pagination.css";
import { InputAdornment } from "@material-ui/core";
import { Badge, Dropdown, Space, Table } from 'antd';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import paisesService from './PaisesService';

function PaisesIndex() {
  const [anchorEl, setAnchorEl] = useState({});
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [id, setId] = useState(null)
  const [usuarios, setUsuarios] = useState([])
  const [data, setData] = useState([])
  const [editing, setEditing] = useState(false)
  const [datosDetalles, setDatosDetalles] = useState([])
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [usuaC, setUsuaC] = useState('Usuario no encontrado')
  const [usuaM, setUsuaM] = useState('Usuario no encontrado')

  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: null,
    }));
  };

  const DialogEliminar = (data) => {
    setEliminar(!Eliminar)
    setId(data)
  };

  const defaultValues = {
    id: '',
    codigo: '',
    Nombre: '',
  }

  const Schema = yup.object().shape({
    id: yup.string(),
    codigo: yup.string().required(''),
    Nombre: yup.string().required(''),
  })


  const { handleSubmit, register, reset, control, watch, formState, setValue } = useForm({
    defaultValues,
    mode: 'all',
    resolver: yupResolver(Schema),
  });

  const modelo = watch()

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const paisesGet = async () => {
    try {
      setData(await paisesService.listar())
    } catch (error) {
      console.log(error.message);
    }
  };

  const usuariosGet = async () => {
    try {
      setUsuarios(await paisesService.listarUsuarios())
      console.log(usuarios)
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    paisesGet();
    usuariosGet();
  }, []);

  const validacion = async () => {
    const formData = watch()
    if (editing == false) {

      if (isValid) {
        const response = await paisesService.crear(formData)
        if (response.data.data.messageStatus == 1) {
          setTimeout(() => {
            paisesGet()
          }, 500)
          reset(defaultValues)
          VisibilidadTabla()
          toast.success('Datos ingresados correctamente', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        } else if (response.data.data.messageStatus.includes("duplicate")) {
          toast.warning('Ese registro ya existe.', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        } else {
          toast.error('Ha ocurrido un error.', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        }
      } else {
        console.log('entra aqui?')
        toast.warning('Hay campos vacios.', {
          theme: 'dark',
          //  position: toast.POSITION.BOTTOM_RIGHT
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      }

    } else {

      if (isValid) {
        const response = await paisesService.editar(formData)
        if (response.data.data.messageStatus == 1) {
          setTimeout(() => {
            paisesGet()
          }, 500)
          reset(defaultValues)
          VisibilidadTabla()
          toast.success('Datos ingresados correctamente', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        } else if (response.data.data.messageStatus.includes("duplicate")) {
          toast.warning('Ese registro ya existe.', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        } else {
          toast.error('Ha ocurrido un error.', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
              marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
          });
        }
      } else {
        console.log('entra aqui?')
        toast.warning('Hay campos vacios.', {
          theme: 'dark',
          //  position: toast.POSITION.BOTTOM_RIGHT
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      }

    }
  }

  const handleEdit = (data) => {
    reset(defaultValues)
    setEditing(true)
    setValue('id', data.pais_Id)
    setValue('codigo', data.pais_Codigo)
    setValue('Nombre', data.pais_Nombre)
    VisibilidadTablaEditing();
    handleClose(data.pais_Id);
  };

  const handleDelete = () => {
    paisesService.eliminar(id.pais_Id)
    handleClose(Eliminar.pais_Id);
    setTimeout(() => {
      paisesGet()
    }, 500);
  };

  const handleDetails = (datos) => {
    setDatosDetalles(datos)
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.unme_Id);

    try {
      setUsuaC(usuarios.find(usuarios => usuarios.value === datosDetalles['usua_UsuarioCreacion']).usua_Nombre)
      setUsuaM(usuarios.find(usuarios => usuarios.value === datosDetalles['usua_UsuarioModificacion']).usua_Nombre)
    } catch {

    }
  };

  {/* Validaciones de la pantalla de crear*/ }
  const [filas, setFilas] = React.useState(10);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'pais_Id',
      key: 'pais_Id',
      sorter: (a, b) => a.pais_Id - b.pais_Id,
    },
    {
      title: 'Codigo',
      dataIndex: 'pais_Codigo',
      key: 'pais_Codigo',
      sorter: (a, b) => a.pais_Codigo.localeCompare(b.pais_Codigo),
    },
    {
      title: 'Pais',
      dataIndex: 'pais_Nombre',
      key: 'pais_Nombre',
      sorter: (a, b) => a.pais_Nombre.localeCompare(b.pais_Nombre),
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (params) =>
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.pais_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.pais_Id)}
              variant="contained"
              style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
              startIcon={<Icon>menu</Icon>}
            >
              Opciones
            </Button>
            <Menu
              id={`menu-${params.pais_Id}`}
              anchorEl={anchorEl[params.pais_Id]}
              keepMounted
              open={Boolean(anchorEl[params.pais_Id])}
              onClose={() => handleClose(params.pais_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon> Detalles
              </MenuItem>
              {/* <MenuItem onClick={() => DialogEliminar(params)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem> */}
            </Menu>
          </Stack>
        </div>
      ,
    },
  ];

  {/* Filtrado de datos */ }
  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setEditing(false)
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultValues)
  };

  const VisibilidadTablaEditing = () => {
    setEditing(true)
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChange = (event) => {
    setFilas(event.target.value);
  };


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

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/TMsGt9m/PAISES-1.png"
        alt="Encabezado de la carta"
      />
      <Collapse in={mostrarIndex}>
        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

          {/* Botón de Nuevo */}
          <Stack direction="row" spacing={1}>
            <Button
              startIcon={<Icon>add</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#634A9E', color: 'white',
                "&:hover": { backgroundColor: '#6e52ae' },
              }}
              onClick={VisibilidadTabla}
            >
              Nuevo
            </Button>
          </Stack>

          <Stack direction="row" spacing={1}>
            <label className='mt-8'>Filas por página:</label>
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
              style={{ borderRadius: '10px' }}
              placeholder='Buscar'
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
        <div className='center' style={{ width: '95%', margin: 'auto' }}>

          <Table
            locale={{
              triggerDesc: 'Ordenar descendente',
              triggerAsc: 'Ordenar ascendente',
              cancelSort: 'Cancelar'
            }}
            columns={columns}
            // expandable={{
            //   expandedRowRender: (record) => <Table columns={columns} dataSource={record.tabla} pagination={false} />,
            //   rowExpandable: (record) => record.name !== 'Not Expandable',
            // }}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              hideOnSinglePage: true,
              showSizeChanger: false,
              className: 'custom-pagination'
            }}

          />
        </div>
      </Collapse>

      {/* Formulario Agregar */}
      <form onSubmit={handleSubmit((_data) => {})}>
      <Collapse in={mostrarAdd}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Codigo</FormLabel>
                  <Controller
                    name='codigo'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                        error={!!errors.codigo}
                        aria-describedby='stepper-linear-account-username'
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">País</FormLabel>
                  <Controller
                    name='Nombre'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                        error={!!errors.Nombre}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} >
                <Button
                  // type='submit'
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  type='submit'
                  onClick={validacion}
                  style={{ borderRadius: '10px', marginRight: '10px' }}
                  sx={{
                    backgroundColor: '#634A9E', color: 'white',
                    "&:hover": { backgroundColor: '#6e52ae' },
                  }}
                >
                  Guardar
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
        onClose={Eliminar}
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
              onClick={handleDelete}
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
                <Chip label="Detalles del pais" />
              </Divider>
            </Grid>


            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", marginBottom: '40px' }}>
              <Box sx={{ flex: 1, textAlign: "center", }} >
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id del pais:
                  </Typography>
                  <Typography>{datosDetalles['pais_Id']}</Typography>
                </InputLabel>
              </Box>

              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Codigo del Pais:
                  </Typography>
                  <Typography>{datosDetalles['pais_Codigo']}</Typography>
                </InputLabel>
              </Box>

              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre del País:
                  </Typography>
                  <Typography>{datosDetalles['pais_Nomre']}</Typography>
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
                    <td style={tableCellStyle}>{usuaC}</td>
                    <td style={tableCellStyle}>
                      {datosDetalles['pais_FechaCreacion']
                        ? new Date(datosDetalles['pais_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>{usuaM}</td>
                    <td style={tableCellStyle}>
                      {datosDetalles['pais_FechaModificacion']
                        ? new Date(datosDetalles['pais_FechaModificacion']).toLocaleString()
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
      <ToastContainer />
    </Card>
  );
}

export default PaisesIndex;

