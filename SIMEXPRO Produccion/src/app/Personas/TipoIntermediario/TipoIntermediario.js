/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
    Button,
    FormControl,
    Icon, IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    Box,
    FormLabel,
    Divider,
    Chip,
    Collapse,
    Grid,
    Typography,
    Select,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Menu,
    MenuItem
} from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

// import del yup para validaciones
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//Imports tabla
import { Badge, Dropdown, Space, Table } from "antd";
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
import "react-toastify/dist/ReactToastify.css";
import {
    ToastSuccess,
    ToastWarning,
    ToastError,
} from "src/styles/toastsFunctions";

// import del servicio
import TiposIntermediarioServices from "./TipoIntermediarioService";

/* Campos del formulario*/
const defaultIntermediarioValues = {
    id: "", //id necesario para el editar
    tite_Codigo: "",
    tite_Descripcion: "",
};

/* Esquema del fomulario (validaciones) */
//En el esquema se eligen las validaciones que el formulario tendra
const accountSchema = yup.object().shape({
    id: yup.string(),
    tite_Codigo: yup.string().trim().required(""),
    tite_Descripcion: yup.string().trim().required(""),
});

function TipoIntermediario() {

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

    /* Controlador del Index(Tabla) */
    const VisibilidadTabla = () => {
        setmostrarIndex(!mostrarIndex);
        setmostrarAdd(!mostrarAdd);
        reset(defaultIntermediarioValues);
    };

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
        setDatosDetalles(datos) //se guardan los datos en la variable escrita antes
        setmostrarIndex(!mostrarIndex);
        setmostrarDetalles(!mostrarDetalles);
        handleClose(datos.tite_Id);
    };

    //Handle que inicia la funcion de editar
    const handleEdit = (datos) => {
        VisibilidadTabla();
        setEditar(true);
        //insertar aca las variables necesarias en su formulario
        setValue("id", datos["tite_Id"]);
        setValue("tite_Codigo", datos["tite_Codigo"]);
        setValue("tite_Descripcion", datos["tite_Descripcion"]);
        handleClose(datos.tite_Id);
    };

    const handleDelete = (datos) => {
        setValue('id', datos['tite_Id']);
        setEliminar(true);
        handleClose(datos.tite_Id);
    };

    //Declaracion del formulario
    const { handleSubmit, register, reset, control, watch, formState, setValue } =
        useForm({
            defaultIntermediarioValues, //Campos del formulario
            mode: "all",
            resolver: yupResolver(accountSchema), //Esquema del formulario
        });

    {
        /* Columnas de la tabla */
    }
    const columns = [
        {
            title: "#",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key, //sorting para Numeros
        },
        {
            title: "Código",
            dataIndex: "tite_Codigo",
            key: "tite_Codigo",
            sorter: (a, b) => a.tite_Codigo.localeCompare(b.tite_Codigo), //sorting para Letras
        },
        {
            title: "Tipo Intermediario",
            dataIndex: "tite_Descripcion",
            key: "tite_Descripcion",
            sorter: (a, b) => a.tite_Descripcion.localeCompare(b.tite_Descripcion), //sorting para Letras
        },
        {
            title: "Acciones",
            key: "operation",
            render: (params) => (
                <div key={params.tite_Id}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            aria-controls={`menu-${params.tite_Id}`}
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, params.tite_Id)}
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
                            id={`menu-${params.tite_Id}`}
                            anchorEl={anchorEl[params.tite_Id]}
                            keepMounted
                            open={Boolean(anchorEl[params.tite_Id])}
                            onClose={() => handleClose(params.tite_Id)}
                        >
                            <MenuItem onClick={() => handleEdit(params)}>
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

    //Controlador de la barra buscadora de la tabla
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    //Constantes de los campos que se utilizaran para filtrar datos (Ingresar los campos que pusieron en la tabla(Columns))
    const camposToFilter = ["key", "tite_Codigo", "tite_Descripcion"];

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

    //Validacion de campos vacios y errores
    const { isValid, dirtyFields, errors } = formState;

    //Datos del formulario
    const datosWatch = watch();

    //Peticion para cargar datos de la tabla
    const TipoIntermediarioGetData = async () => {
        try {
            setData(await TiposIntermediarioServices.listar());
        } catch (error) {
            console.log(error.message);
        }
    };

    //useEffect para cargar datos al ingresar a la pantalla
    useEffect(() => {
        TipoIntermediarioGetData();
    }, []);

    //Peticion para crear un registro
    const intermediarioCreate = async () => {
        try {
            const response = await TiposIntermediarioServices.crear(datosWatch);
            if (response.data.data.messageStatus == "1") {
                ToastSuccess("El registro se ha insertado exitosamente");
                TipoIntermediarioGetData();
                VisibilidadTabla();
                reset(defaultIntermediarioValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarning("El registro ya existe");
            }
        } catch (error) {
            console.log(error.message);
            ToastError("Error inesperado");
        }
    };

    //Constante en la que la
    const intermediarioDelete = async () => {
        try {
            const response = (await TiposIntermediarioServices.eliminar(datosWatch))
            if (response.data.data.messageStatus == '1') {
                ToastSuccess('El registro se ha eliminado exitosamente')
                TipoIntermediarioGetData();
                DialogEliminar()
                reset(defaultIntermediarioValues)
            } else if (response.data.data.messageStatus == '0'){
                ToastError('El registro está en uso.')
                TipoIntermediarioGetData();
                DialogEliminar()
            }
        } catch (error) {
            ToastError('Error inesperado')
        }
    };

    // Peticion para editar un registro
    const intermediarioEdit = async () => {
        try {
            const response = await TiposIntermediarioServices.editar(datosWatch);
            if (response.data.data.messageStatus == "1") {
                ToastSuccess("El registro se ha editado exitosamente");
                TipoIntermediarioGetData();
                VisibilidadTabla();
                reset(defaultIntermediarioValues);
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarning("El registro ya existe");
            }
        } catch (error) {
            console.log(error.message);
            ToastError("Error inesperado");
        }
    };

    //Controlador del formulario
    const GuardarIntermediario = () => {
        if (isValid) {
            // Validacion de campos completos
            if (!editar) {
                // Validacion de la funcion a realizar
                intermediarioCreate();
            } else {
                intermediarioEdit();
            }
        } else {
            ToastWarning("Completa todos los campos");
        }
    };

    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/0McQFgV/TIPO-DE-INTERMEDIARIO.png"
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

            {/* Inicio del Formulario */}
            <form onSubmit={handleSubmit((_data) => { })}>
                <Collapse in={mostrarAdd}>
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
                                        label={editar ? "Editar Tipo de Intermediario" : "Agregar Tipo de Intermediario"}
                                    />
                                </Divider>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel error={!!errors.tite_Codigo}>Codigo Tipo Intermediario</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-disabled"
                                                inputProps={{
                                                    maxLength: 2,
                                                }}
                                                error={!!errors.tite_Codigo}
                                            ></TextField>
                                        )}
                                        name="tite_Codigo"
                                        control={control}
                                    ></Controller>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel error={!!errors.tite_Descripcion}>Tipo de Intermediario</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                id="outlined-disabled"
                                                inputProps={{
                                                    maxLength: 100,
                                                }}
                                                error={!!errors.tite_Descripcion}
                                            />
                                        )}
                                        name="tite_Descripcion"
                                        control={control}
                                    ></Controller>
                                </FormControl>

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
                                    type="submit"
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={GuardarIntermediario}
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
            {/* Fin del Formulario */}

            {/* Eliminar Tipo de Intermediario */}
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
                            onClick={intermediarioDelete}
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
            {/* Eliminar Tipo de Intermediario */}

            {/* Inicia del collapse Detalles */}
            <Collapse in={mostrarDetalles}>
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-center",
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ marginBottom: "30px" }}>
                            <Divider style={{ marginTop: "0px", marginBottom: "10px" }}>
                                <Chip label="Detalles del Tipo Intermediario" />
                            </Divider>
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
                                <InputLabel htmlFor="id">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Id del Tipo Intermediario:
                                    </Typography>
                                    <Typography>{DatosDetalles["tite_Id"]}</Typography>
                                </InputLabel>
                            </Box>
                            <Box sx={{ flex: 1, textAlign: "center" }}>
                                <InputLabel htmlFor="descripcion">
                                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                                        Código del Tipo Intermediario:
                                    </Typography>
                                    <Typography>{DatosDetalles["tite_Codigo"]}</Typography>
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
                                        Nombre del Tipo Intermediario:
                                    </Typography>
                                    <Typography>{DatosDetalles["tite_Descripcion"]}</Typography>
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
                                            {DatosDetalles["usarioCreacion"]}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["tite_FechaCreacion"]
                                                ? new Date(
                                                    DatosDetalles["tite_FechaCreacion"]
                                                ).toLocaleString()
                                                : ""}
                                        </td>
                                    </tr>
                                    <tr style={estilosTablaDetalles.tableRowStyle}>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            <strong>Modificación</strong>
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["usuarioModificacion"]}
                                        </td>
                                        <td style={estilosTablaDetalles.tableCellStyle}>
                                            {DatosDetalles["tite_FechaModificacion"]
                                                ? new Date(
                                                    DatosDetalles["tite_FechaModificacion"]
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
    );
}

export default TipoIntermediario;