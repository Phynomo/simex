/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
    Button,
    ButtonBase,
    FormControl,
    Icon,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    Avatar,
} from "@mui/material";
import { useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { height } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
import MUIDataTable from 'mui-datatables'
import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table } from 'antd';
import { keyBy } from 'lodash';
import "src/styles/custom-pagination.css";

function PedidosProduccion_Tabla() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    const [searchText, setSearchText] = useState('');
    const [mostrarIndex, setmostrarIndex] = useState(true);
    const [mostrarAdd, setmostrarAdd] = useState(false);
    const [mostrarEdit, setmostrarEdit] = useState(false);
    const [Eliminar, setEliminar] = useState(false);
    const [filas, setFilas] = React.useState(10);
    const [id, setid] = useState('');
    const [DataTabla, setDataTabla] = useState([])
    const [repoorte, setreporte] = useState('');

    const DialogEliminar = () => {
        setEliminar(!Eliminar);
    };

    const handleClose = (id) => {
        setAnchorEl(prevState => ({
            ...prevState,
            [id]: null,
        }));
    };

    const handleEdit = () => {
        handleClose(id);
    };

    const handleClick = (event, id) => {
        setAnchorEl((prevState) => ({
            ...prevState,
            [id]: event.currentTarget,
        }));
    };


    const handleDetails = (id) => {
        // Lógica para manejar la visualización de detalles de la fila con el ID proporcionado
        handleClose(id);
    };

    const handleDelete = (id) => {
        DialogEliminar();
        handleClose(id);
    };

    useEffect(() => {
        TablaPedidosProduccion()
    }, []);  //Constante para cargar datos a las tablas      


    const TablaPedidosProduccion = async () => {
        console.log('axel se la come');
        try {
            const customHeaders = {
                'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
            };
            const response = await axios.get(process.env.REACT_APP_API_URL + 'api/PedidosProduccion/Listar', {
                headers: customHeaders,
            });
            const rows = response.data.data.map((item, index) => {


                const detallesJson = JSON.parse(item.detalles)
                console.log("perro", detallesJson)
                let detalles = null
                if (detallesJson) {
                    detalles = detallesJson.map((datos, index2) => {
                        return {
                            key: index2,
                            ppde_Id: datos['ppde_Id'],
                            lote_Id: datos['lote_Id'],
                            mate_Descripcion: datos['mate_Descripcion'],
                            ppde_Cantidad: datos['ppde_Cantidad']
                        }
                    })
                }





                return {
                    key: index,
                    ppro_Id: item.ppro_Id,
                    empl_NombreCompleto: item.empl_NombreCompleto,
                    ppro_Fecha: item.ppro_Fecha,
                    ppro_Estados: item.ppro_Estados,
                    ppro_Observaciones: item.ppro_Observaciones,
                    detalles: detalles
                }
            });
            console.log(rows)
            setDataTabla(rows);
        } catch (error) {
            console.log(error);

        }
    };


    const [anchorEl, setAnchorEl] = useState({});
    /*Columnas de la tabla*/
    const columns = [
        {
            title: 'Id',
            dataIndex: 'ppro_Id',
            key: 'ppro_Id',
            sorter: (a, b) => a.ppro_Id - b.ppro_Id, //sorting para Numeros
        },
        {
            title: 'Empleado',
            dataIndex: 'empl_NombreCompleto',
            key: 'empl_NombreCompleto',
            sorter: (a, b) => a.empl_NombreCompleto.localeCompare(b.empl_NombreCompleto), //sorting para Letras
        },
        {
            title: 'Fecha',
            dataIndex: 'ppro_Fecha',
            key: 'ppro_Fecha',
            sorter: (a, b) => a.ppro_Fecha.localeCompare(b.ppro_Fecha), //sorting para Letras
        }, {
            title: 'Estado',
            dataIndex: 'ppro_Estados',
            key: 'ppro_Estados',
            sorter: (a, b) => a.ppro_Estados.localeCompare(b.ppro_Estados), //sorting para Letras
        }, {
            title: 'Observaciones',
            dataIndex: 'ppro_Observaciones',
            key: 'ppro_Observaciones',
            sorter: (a, b) => a.ppro_Observaciones.localeCompare(b.ppro_Observaciones), //sorting para Letras
        },
        {
            title: 'Acciones',
            key: 'operation',
            render: (params) =>
                <div key={params.ppro_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.ppro_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.ppro_Id)}
                            variant="contained"
                            style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}
                            startIcon={<Icon>menu</Icon>}
                        >
                            Opciones
                        </Button>

                        <Menu
                            ppro_Id={`menu-${params.ppro_Id}`}
                            anchorEl={anchorEl[params.ppro_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.ppro_Id])}
                            onClose={() => handleClose(params.ppro_Id)}
                        >
                            <MenuItem onClick={() => handleEdit(params.ppro_Id)}>
                                <Icon>edit</Icon>ㅤ Editar
                            </MenuItem>
                            <MenuItem onClick={() => handleDetails(params.ppro_Id)}>
                                <Icon>visibility</Icon> ㅤDetalles
                            </MenuItem>
                            <MenuItem onClick={() => handleDelete(params.ppro_Id)}>
                                <Icon>delete</Icon> ㅤEliminar
                            </MenuItem>
                        </Menu>
                    </Stack>
                </div>
            ,
        },
    ];


    const columnsExpandable = [
        {
            title: 'Id',
            dataIndex: 'ppde_Id',
            key: 'ppde_Id',
            sorter: (a, b) => a.ppde_Id - b.ppde_Id, //sorting para Numeros
        },
        {
            title: 'N° de Lote',
            dataIndex: 'lote_Id',
            key: 'lote_Id',
            sorter: (a, b) => a.lote_Id.localeCompare(b.lote_Id), //sorting para Letras
        },
        {
            title: 'Material',
            dataIndex: 'mate_Descripcion',
            key: 'mate_Descripcion',
            sorter: (a, b) => a.mate_Descripcion.localeCompare(b.mate_Descripcion), //sorting para Letras
        }, {
            title: 'Cantidad',
            dataIndex: 'ppde_Cantidad',
            key: 'ppde_Cantidad',
            sorter: (a, b) => a.ppde_Cantidad.localeCompare(b.ppde_Cantidad), //sorting para Letras
        }
    ];




    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleChange = (event) => {
        setFilas(event.target.value);
    };

    //Constantes de los campos que se utilizaran para filtrar datos
    const camposToFilter = ["ppro_Id", "empl_NombreCompleto", "ppro_Fecha", "ppro_Estados", "ppro_Observaciones"];

    //Constante que ayuda a filtrar el datatable
    const filteredRows = DataTabla.filter((row) => {
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

    /*//Constantes de los campos que se utilizaran para filtrar datos
    const camposToFilter = ["ppro_Id", "empl_NombreCompleto", "ppro_Fecha", "ppro_Estados", "ppro_Observaciones", "lote_Id", "ppde_Id", "mate_Descripcion"];
    
    const filteredRows = DataTabla.filter((row) => {
        if (searchText === "") {
          return true;  // Mostrar todas las filas si el buscador está vacío
        }
      
       /* // Filtrar campos del maestro
        for (const [key, value] of Object.entries(row)) {
          if (camposToFilter.includes(key)) {
            const formattedValue = typeof value === 'number' ? value.toString() : value.toString().toLowerCase();
            const formattedSearchText = typeof searchText === 'number' ? searchText.toString() : searchText.toLowerCase();
            if (formattedValue.includes(formattedSearchText)) {
              return true;
            }
          }
        }
      
        // Filtrar campos de los detalles si existen
        if (row.detalles) {
          const detalles = row.detalles;
      
          for (const [key, value] of Object.entries(detalles)) {
            if (camposToFilter.includes(`detalle_${key}`)) {
              const formattedValue = typeof value === 'number' ? value.toString() : value.toString().toLowerCase();
              const formattedSearchText = typeof searchText === 'number' ? searchText.toString() : searchText.toLowerCase();
              if (formattedValue.includes(formattedSearchText)) {
                return true;
              }
            }
          }
        }
      
        return false;
      });
      */

    return (
        <>
            <Collapse in={mostrarIndex}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '-30px' }}>

                    {/*Botón de Nuevo*/}
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
                                navigate("/PedidosProduccion/Crear");
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


            {/*Tabla*/}
            <Collapse in={mostrarIndex}>
                <div className='center' style={{ width: '95%', margin: 'auto' }}>
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

        </>
    );
}

export default PedidosProduccion_Tabla;