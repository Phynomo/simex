/* eslint-disable no-lone-blocks */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import * as React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';

function DucaIndex() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
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

  const handleEdit = (id) => {
    console.log(id);
    // Lógica para manejar la edición de la fila con el ID proporcionado
    handleClose(id);
  };

  const handleDetails = (id) => {
    // Lógica para manejar la visualización de detalles de la fila con el ID proporcionado
    handleClose(id);
  };
  
  const handleDelete = (id) => {
    // Lógica para manejar la eliminación de la fila con el ID proporcionado
    handleClose(id);
  };

  const [filas, setFilas] = React.useState(10);

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

    {/* Columnas de la tabla */ }
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id
      },
      {
        title: 'Aduana de Ingreso',
        dataIndex: 'AduanaIngreso',
        key: 'AduanaIngreso',
        sorter: (a, b) => a.AduanaIngreso.localeCompare(b.AduanaIngreso),
      },
      {
        title: 'Aduana de Destino',
        dataIndex: 'AduanaDestino',
        key: 'FormaEnvio',
        sorter: (a, b) => a.AduanaDestino.localeCompare(b.AduanaDestino),
      },
      {
        title: 'Declarante',
        dataIndex: 'Declarante',
        key: 'Declarante',
        sorter: (a, b) => a.Declarante.localeCompare(b.Declarante),
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
                <MenuItem onClick={() => handleDelete(params.id)}>
                  <Icon>delete</Icon> Eliminar
                </MenuItem>
              </Menu>
            </Stack>
          </div>
        ,
      },
    ];

      {/* Datos de la tabla */ }
  const data = [
    {key: 1, id: 1, AduanaIngreso: 'Aduana de Puerto Cortes', AduanaDestino: 'Exportadora y Importadora Zepeda', Declarante: 'Phynomo'},

  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

    {/* Filtrado de datos */ }
    const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/6FZrCcv/DUCAS.png"
        alt="Encabezado de la carta"
      />
      <CardContent
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
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
              navigate('/Duca/Crear');
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
    pageSize: filas
    , className: 'decoration-white'
  }}
/>
</div>

      <Dialog
        open={Eliminar}
        fullWidth="md"
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmación de Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro(a) que desea eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: '#634A9E',
                color: 'white',
                '&:hover': { backgroundColor: '#6e52ae' },
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
                backgroundColor: '#DAD8D8',
                color: 'black',
                '&:hover': { backgroundColor: '#BFBABA' },
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

export default DucaIndex;
