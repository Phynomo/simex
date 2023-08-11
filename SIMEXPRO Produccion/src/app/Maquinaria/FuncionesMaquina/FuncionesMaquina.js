/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField, Box,   FormLabel,
} from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

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


import MUIDataTable from 'mui-datatables' 
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FuncionesMaquinaIndex  () {

  const [users, setUsers] = useState([])
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  
  const [mostrarAgregar, setmostrarAgregar] = useState(false);
  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  const [Eliminar, setEliminar] = useState(false);
  const [filas, setFilas] = React.useState(10);
  const [id, setid] = useState('');
  const [funcion, setfuncion] = useState('');
  const [anchorEl, setAnchorEl] = useState({});




  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const defaultfuncionValues = {
    funcion: '',
  }

  const funcionSchema = yup.object().shape({
    funcion: yup.string().required(),
  })
  
  const {handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultfuncionValues,
    mode: 'all',
    resolver: yupResolver(funcionSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

 //Constante para cerrar el collapse de detalles
 const CerrarCollapseDetalles = () => {
  setmostrarIndex(!mostrarIndex);
  setmostrarDetalles(!mostrarDetalles);
};
  //Constante para mostrar el collapse de detalles un registro
const MostrarCollapseDetalles = () => {
setmostrarIndex(!mostrarIndex);
setmostrarDetalles(!mostrarDetalles);
};

const MostrarCollapseEditar = () => {
setmostrarIndex(!mostrarIndex);
setmostrarEditar(!mostrarEditar);
reset(defaultfuncionValues);
};    

//Constante para mostrar el collapse de agregar un registro
const MostrarCollapseAgregar = () => {
  setmostrarIndex(!mostrarIndex);
  setmostrarAgregar(!mostrarAgregar);
  reset(defaultfuncionValues);
};
//Constante para cerrar el collapse de agregar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
const CerrarCollapseAgregar = () => {
setmostrarIndex(!mostrarIndex);
setmostrarAgregar(!mostrarAgregar);
reset(defaultfuncionValues);

};

//Constante para cerrar el collapse de editar y limpiar el text field con el reset([Esquema por defecto que deben tener los campos])
const CerrarCollapseEditar = () => {
setmostrarIndex(!mostrarIndex);
setmostrarEditar(!mostrarEditar);
reset(defaultfuncionValues);

};
const handleClose = (id) => {
  setAnchorEl(prevState => ({
  ...prevState,
  [id]: null,
  }));      
};


const handleEdit = (id,funcion) =>
{
  setfuncion(funcion);
  setid(id);
  console.log(funcion);
  MostrarCollapseEditar();
  handleClose(id);
  };


//Constante abrir el collapse de los detalles de la pantalla
const handleDetails = (id, funcion) => {
  DetallesTabla(id, funcion);
  MostrarCollapseDetalles();
  handleClose(id);
};

const handleDelete = (id) => {
  DialogEliminar();
  handleClose(id);
};

//Constante para el detalle de las pantallas
const DetallesTabla = (rowId, funcion) => {
  setid(rowId);
  setfuncion(funcion);

};
  

 /*Columnas de la tabla*/
 const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id, //sorting para Numeros
  },
  {
    title: 'Descripcion',
    dataIndex: 'funcion',
    key: 'funcion',
    sorter: (a, b) => a.funcion.localeCompare(b.funcion), //sorting para Letras
  },
  {
    title: 'Acciones',
    key: 'operation',
    render: (params) =>
      <div key={params.id}>
        <Stack direction="row" spacing={1}>
          <Button
            aria-controls={`menu-${params.id}`}
            aria-haspopup="true"
            onClick={(e) => handleClick(e, params.id)}
            variant="contained"
            style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
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
            <MenuItem onClick={() => handleEdit(params.id, params.funcion)}>
              <Icon>edit</Icon>ㅤ Editar
            </MenuItem>
            <MenuItem onClick={() => handleDetails(params.id, params.funcion)}>
              <Icon>visibility</Icon> ㅤDetalles
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.id)}>
              <Icon>delete</Icon> ㅤEliminar
            </MenuItem>
          </Menu>
        </Stack>
      </div>
    ,
  },
];


  {/*Datos de la tabla generados */  }
  const data = [];
  for (let i = 0; i < 16; ++i) {
    data.push({
      key: i.toString(),
      id: i.toString(),
      funcion: 'Funcion' + i,
    });
  }

 
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleChange = (event) => {
    setFilas(event.target.value);
  };


  {/*Filtrado de datos*/  }
  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const ToastSuccess =() => {
    toast.success('Datos ingresados correctamente.', {
       //  position: toast.POSITION.BOTTOM_RIGHT
       style: {
        marginTop: '50px',
        backgroundColor: '#111827',
        color: 'white',
        fill: 'white'
        
      },
      autoClose: 5000,
      closeOnClick: true
    });
  }

    const ToastWarning = () => {
      toast.warning('No se permiten campos vacios.', {
        //  position: toast.POSITION.BOTTOM_RIGHT
        style: {
          marginTop: '50px',
          backgroundColor: '#111827',
          color: 'white',
          fill: 'white'
          
        },
        autoClose: 5000,
        closeOnClick: true
      });
    }
  

  const handleClick = (event, id) => {
    setAnchorEl(prevState => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const ValidacionAgregar = (data) => {
    console.log(data);
    if(data.funcion != null){
      if (data.funcion.trim() === '') {
        console.log("Salio");
        ToastWarning();
      } else {
        console.log("Entra");
        MostrarCollapseAgregar();
        ToastSuccess();        
      }
    }else{
      console.log("Salio2");
     ToastWarning(); 
    }
  };

  const ValidacionesEditar = (data) => {
    if(data.funcion != null){
      if (data.funcion.trim() === '') {
        ToastWarning();
      } else {
        MostrarCollapseEditar();
        ToastSuccess();      
      }
    }else{
      ToastWarning();
    }
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
    const formData2 = watch();
    formData2.funcion = funcion;
    ValidacionesEditar(formData2);
    setTimeout(() => {
      console.log("kha");
      reset(defaultfuncionValues);
      handleSubmit(ValidacionesEditar)();
    }, "250")
  };
    {/*Codigo para validaciones */}


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
    <Card sx={{ minWidth: 275, margin: '40px' }}>
        <ToastContainer/>
    <CardMedia
      component="img"
      height="200"
      image="https://i.ibb.co/LgwVbqs/FUNCIONES-DE-M-QUINA.png"
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
              onClick={MostrarCollapseAgregar}
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


      {/*Tabla*/}
      <Collapse in={mostrarIndex}>
        <div className='center' style={{ width: '95%', margin: 'auto' }}>

          <Table
            columns={columns}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas
              , className: 'decoration-white'
            }}

          />
        </div>
        </Collapse>

     {/* Collapse para el formulario de agregar un registro inicio*/}
     <Collapse in={mostrarAgregar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
          <Grid item xs={3} style={{ marginTop: '30px' }} ></Grid>
          <Grid item xs={6} style={{ marginTop: '30px' }} >

          <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.funcion} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Función de la Máquina
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.funcion}
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
                name="funcion"
                control={control}
              />
            </Grid>

            <Grid item xs={12}sx={{display: "flex",justifyContent: "right",alignItems: "right",}}>
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



      {/* Collapse para el formulario de agregar un registro inicio*/}
     <Collapse in={mostrarEditar}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
          <Grid item xs={3} style={{ marginTop: '30px' }} ></Grid>
          <Grid item xs={6} style={{ marginTop: '30px' }} >

          <Controller
                render={({ field }) => (
                  <FormControl error={!!errors.funcion} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Función de la Máquina
                    </FormLabel>
                    <TextField
                      {...field}
                      variant="outlined"
                      error={!!errors.funcion}
                      fullWidth={true}
                      value={funcion}
                      inputProps={{
                        startadornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                )}
                name="funcion"
                control={control}
              />
            </Grid>

            <Grid item xs={12}sx={{display: "flex",justifyContent: "right",alignItems: "right",}}>
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
              <h2>Detalles de las Funciones de las Máquinas</h2>   
              </Grid>   
              <Grid item xs={12} style={{marginBottom:"25px"}}>  
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="id">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Id de la Función:
                      </Typography>
                      <Typography>{id}</Typography>
                    </InputLabel>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <InputLabel htmlFor="descripcion">
                      <Typography sx={{ fontWeight: "bold", color:"#000000" }}>
                        Función der la Máquina:
                      </Typography>
                      <Typography>{funcion}</Typography>
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
                onClick={DialogEliminar}
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
      <ToastContainer/>
    </Card>
  );
}

export default FuncionesMaquinaIndex;