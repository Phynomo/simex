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
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import "src/styles/custom-pagination.css";

function PedidosProduccion_Tabla() {
    const navigate = useNavigate();
    const [detallespedidos, setdetallespedidos] = useState([])
    const [mostrarDetalles, setmostrarDetalles] = useState(false);

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
    const [empleado, setempleado] = useState("");
    const [fecha, setfecha] = useState("");
    const [estado, setestado] = useState("");
    const [observaciones, setobservaciones] = useState("");

    const DialogEliminar = () => {
        setEliminar(!Eliminar);
    };


    //Campos de Auditoria
    const [UsuarioCreacion, setUsuarioCreacion] = useState("");
    const [UsuarioModificador, setUsuarioModificador] = useState("");
    const [FechaCreacion, setFechaCreacion] = useState();
    const [FechaModificacion, setModificacion] = useState();
    const FechaCreacionForm = new Date(FechaCreacion).toLocaleString();


    //Constante abrir el collapse de los detalles de la pantalla
    const handleDetails = (ppro_Id) => {
        DetallesTabla(ppro_Id);
        MostrarCollapseDetalles();
        handleClose(ppro_Id);
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
                console.log(detalles)




                return {
                    key: index,
                    ppro_Id: item.ppro_Id,
                    empl_NombreCompleto: item.empl_NombreCompleto,
                    ppro_Fecha: item.ppro_Fecha,
                    ppro_Estados: item.ppro_Estados,
                    ppro_Observaciones: item.ppro_Observaciones,
                    detalles: detalles,
                    UsuarioCreacion: item.usuCreacion,
                    UsuarioModificador: item.usuModificacion,
                    FechaCreacion: item.ppro_FechaCreacion,
                    FechaModificacion: item.ppro_FechaModificacion

                }
            });
            console.log(rows)
            setDataTabla(rows);
        } catch (error) {
            console.log(error);

        }
    };


    //Constante para el detalle de las pantallas
    const DetallesTabla = (ppro_Id) => {
        const Detalles = DataTabla.find((registro) => registro.ppro_Id === ppro_Id);

        setid(Detalles.ppro_Id);
        setempleado(Detalles.empl_NombreCompleto);
        setfecha(Detalles.ppro_Fecha);
        setestado(Detalles.ppro_Estados);
        setobservaciones(Detalles.ppro_Observaciones);
        setUsuarioCreacion(Detalles.UsuarioCreacion);
        setUsuarioModificador(Detalles.UsuarioModificador);
        setFechaCreacion(Detalles.FechaCreacion);
        setModificacion(Detalles.FechaModificacion);
        setdetallespedidos(Detalles.detalles);
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
                                <Chip label="DETALLES DE LOS PEDIDOS DE PRODUCCIÓN" />
                            </Divider>
                        </Grid>


                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                                        <InputLabel htmlFor="id">
                                            <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                                                Id del pedido:
                                            </Typography>
                                            <Typography>{id}</Typography>
                                        </InputLabel>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <InputLabel htmlFor="descripcion">
                                            <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                                                Empleado encargado:
                                            </Typography>
                                            <Typography>{empleado}</Typography>
                                        </InputLabel>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6} style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                                        <InputLabel htmlFor="id">
                                            <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                                                Fecha:
                                            </Typography>
                                            <Typography>{fecha}</Typography>
                                        </InputLabel>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <InputLabel htmlFor="descripcion">
                                            <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                                                Estado:
                                            </Typography>
                                            <Typography>{estado}</Typography>
                                        </InputLabel>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
                                        <InputLabel htmlFor="id">
                                            <Typography sx={{ fontWeight: 'bold', color: '#000000' }}>
                                                Observaciones:
                                            </Typography>
                                            <Typography>{observaciones}</Typography>
                                        </InputLabel>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>


                        <Grid container justifyContent="center" style={{ marginBottom: '25px', marginLeft: '30px', marginBottom: '40px' }}>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Box sx={{ flex: 1 }}>
                                        <InputLabel htmlFor="pantallas">
                                            <Divider style={{ marginTop: '0px', marginBottom: '10px', borderColor: '#aa8caf' }}>
                                                <Chip color='default' variant='outlined' label="Materiales asignados" />
                                            </Divider>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                                                {detallespedidos ? (
                                                    detallespedidos.map((materiales, index) => (
                                                        <div key={index} style={{ textAlign: 'center', margin: '0 30px' }}>
                                                            {materiales.mate_Descripcion}
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
                                                            No se han asignado materiales hasta el momento.
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
                                        <td style={tableCellStyle}>{UsuarioCreacion}</td>
                                        <td style={tableCellStyle}>{FechaCreacionForm}</td>
                                    </tr>
                                    <tr style={tableRowStyle}>
                                        <td style={tableCellStyle}>
                                            <strong>Modificación</strong>
                                        </td>
                                        <td style={tableCellStyle}>{UsuarioModificador}</td>
                                        <td style={tableCellStyle}>
                                            {FechaModificacion
                                                ? new Date(FechaModificacion).toLocaleString()
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