/* eslint-disable camelcase */
/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, IconButton, InputAdornment, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';


import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

function PersonaNatural_Index() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [mostratEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles,  setmostrarDetalles] = useState(false);
  const [Eliminar, setEliminar] = useState(false);

  const [id, setId] = useState("");
  const [rtn, setRtn] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");


  const DialogEliminar = () => {setEliminar(!Eliminar);};

  {/* Validaciones de la pantalla de crear*/ }
  const [filas, setFilas] = React.useState(10);
    
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  
  const [anchorEl, setAnchorEl] = useState({});

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

{/* Columnas de la tabla */ }
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'RTN Solicitante',
    dataIndex: 'rtn',
    key: 'rtn',
    sorter: (a, b) => a.rnt.localeCompare(b.rtn),
  },
  {
    title: 'Telefono',
    dataIndex: 'telefono',
    key: 'telefono',
    sorter: (a, b) => a.telefono.localeCompare(b.telefono),
  },
  {
    title: 'Correo Electronico',
    dataIndex: 'correo',
    key: 'correo',
    sorter: (a, b) => a.email.localeCompare(b.email),
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
            <MenuItem onClick={() => handleEdit(params.id)}>
              <Icon>edit</Icon> Editar
            </MenuItem>
            <MenuItem onClick={() => handleDetails(params.id)}>
              <Icon>visibility</Icon> Detalles
            </MenuItem>
            <MenuItem onClick={() => DialogEliminar(params.id)}>
              <Icon>delete</Icon> Eliminar
            </MenuItem>
          </Menu>
        </Stack>
      </div>
    ,
  },
];

const[data, setData] = useState([])

useEffect(() => {
  FetchDataPersonaNatural();
}, []);
const FetchDataPersonaNatural = async () => {
  try {
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };

    const url = 'https://simexpro.azurewebsites.net/api/PersonaNatural/Listado';
    const response = await axios.get(url, {
      headers: customHeaders,
    });
    console.log(response)
    const rows = response.data.map(item => {
      return {
        id: item.pena_Id,
        rtn: item.pena_RTN,
        telefono: item.pena_TelefonoCelular,
        correo: item.pena_CorreoElectronico,
      }
    });
    setData(rows);
  } catch (error) {
    console.log(error.message);
  }
};

  //  {/* Datos de la tabla */ }
  //  const data = [];
  //  for (let i = 0; i < 50; ++i) {
  //    data.push({
  //      key: i.toString(),
  //      id: i.toString(),
  //      rtn: 'rtn ' + i,
  //      telefono: 'telefono ' + i,
  //      email: 'email ' + i,
  //      // tabla: [
  //      //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
  //      //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
  //      //   // Add more rows to the nested table here...
  //      // ],
  //    });
  //  }

  // {/* Columnas de la tabla */ }
  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 10 },
  //   { field: 'rtn_solicitante', headerName: 'RTN Solicitante', flex: 1},
  //   { field: 'telefono', headerName: 'Teléfono', flex: 1, },
  //   { field: 'email', headerName: 'Email', flex: 1 },
  //   {
  //     field: 'acciones',
  //     headerName: 'Acciones',
  //     flex:1,
  //     renderCell: (params) => {
  //       const [anchorEl, setAnchorEl] = React.useState(null);
  
  //       const handleClick = (event) => {
  //         setAnchorEl(event.currentTarget);
  //       };
  
  //       const handleClose = () => {
  //         setAnchorEl(null);
  //       };
  
      const handleEdit = () => {
        // Implementa la función para editar aquí
        handleClose();
      };

      const handleDetails = () => {
        // Implementa la función para detalles aquí
        handleClose();
      };

      const handleDelete = () => {
        DialogEliminar();
        // Implementa la función para eliminar aquí
        handleClose();
      };
  
  //       const handlePrint = () => {
  //         // Implementa la función para imprimir aquí

  //         handleClose();
  //       };

  //       const handleBoletin = () => {
  //         // Implementa la función para imprimir aquí
  //         handleClose();
  //       };
  
  //       return (
  //         <Stack direction="row" spacing={1}>
  //           <Button
  //             aria-controls={`menu-${params.id}`}
  //             aria-haspopup="true"
  //             onClick={handleClick}
  //             variant="contained"
  //             style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
  //             startIcon={<Icon>menu</Icon>}
  //           >
  //             Opciones
  //           </Button>
  //           <Menu
  //             id={`menu-${params.id}`}
  //             anchorEl={anchorEl}
  //             keepMounted
  //             open={Boolean(anchorEl)}
  //             onClose={handleClose}
  //           >
  //             <MenuItem onClick={handleEdit}>
  //               <Icon>edit</Icon> Editar
  //             </MenuItem>
  //             <MenuItem onClick={handleDetails}>
  //               <Icon>visibility</Icon> Detalles
  //             </MenuItem>
  //             <MenuItem onClick={handleDelete}>
  //               <Icon>delete</Icon> Eliminar
  //             </MenuItem>
  //           </Menu>
  //         </Stack>
  //       );
  //     },
  //   },
  // ];

  // {/* Datos de la tabla */ }
  // const rows = [
  //   { id: '1', rtn_solicitante: '01052003124739', telefono: '88045547', email: 'zepedadaniel2003@gmail.com'},    
  //   { id: '2', rtn_solicitante: '05031999344349', telefono: '90969567', email: 'dasfInvert1999@gmail.com'},    
  //   { id: '3', rtn_solicitante: '04042001233436', telefono: '88095574', email: 'gotyProMaster@hotmail.com'},    
  // ];

  {/* Función para mostrar la tabla y mostrar agregar */ }
  const VisibilidadTabla = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
  };

  const VisibilidadTabla2 = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarAdd(!mostrarAdd);
    reset(defaultValues);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {/* Filtrado de datos */ }
  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/zrcrcFK/CONTRATO-DE-ADHESI-N-PERSONA-NATURAL.png"
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
              onClick={() => {
                navigate('/PersonaNatural/Crear')
              }}              
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
            columns={columns}
            // expandable={{
            //   expandedRowRender: (record) => <Table columns={columns} dataSource={record.tabla} pagination={false} />,
            //   rowExpandable: (record) => record.name !== 'Not Expandable',
            // }}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas
              , className: 'decoration-white'
            }}
          />
        </div>
      </Collapse>

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

    </Card>
  );
}

export default PersonaNatural_Index;



