import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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

} from "@mui/material";


import * as React from "react";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { height } from "@mui/system";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";

//Imports de Redireciones
import History from "src/@history/@history";
//Imports de validaciones
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//Imports tabla
import { Badge, Dropdown, Space, Table } from "antd";
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";
//import tabla detalles
import estilosTablaDetalles from "src/styles/tablaDetalles";
//Import service
import proveedoresService from "./ProveedoresService";
//Import ddls
import load_DDLs from "src/app/loadDDLs/Load_DDL";
//import Toast
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import {
    ToastSuccess,
    ToastWarning,
    ToastError,
    ToastDefault,
} from "src/styles/toastsFunctions";
import TextArea from "antd/es/input/TextArea";


function ProveedoresCrear() {

    // Campos para el DDL de Paises
    const [paises, setPaises] = useState([]);

    // Campos para el DDL de Provincias
    const [provincias, setProvincias] = useState([]);

    // Campos para el DDL de Ciudades
    const [ciudades, setciudades] = useState([]);


    const paisesGet = async () => {
        try {
            const data = await load_DDLs.paises()
            setPaises(data)
        } catch (error) {
            console.log(error.message);
        }
    };


    const provinciasGet = async (id) => {
        //console.log(id);
        try {
            if (id) {
                const data = await load_DDLs.ProvinciasPorPais(parseInt(id))
                setProvincias(data)
            } else {
                setProvincias([])
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const CiudadesGet = async (id) => {
        //console.log(id);
        try {
            if (id) {
                const data = await load_DDLs.CiudadesPorProvincia(parseInt(id))
                setValue()
                setciudades(data)
            } else {
                setciudades([])
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
    useEffect(() => {
        paisesGet()
    }, []);


    const defaultValues = {
        id: "", //id necesario para el editar
        prov_NombreCompania: "",
        prov_NombreContacto: "",
        prov_Telefono: "",
        prov_CodigoPostal: "",
        Pais: null,
        provincia: null,
        Ciudad: null, //para los campos que son ddl poner null
        prov_DireccionExacta: "",
        prov_CorreoElectronico: "",
        prov_Fax: "",
    };


    /* Esquema del fomulario (validaciones) */
    //En el esquema se eligen las validaciones que el formulario tendra
    const accountSchema = yup.object().shape({
        id: yup.string(),
        prov_NombreCompania: yup.string().trim().required(""),
        prov_NombreContacto: yup.string().trim().required(""),
        prov_Telefono: yup.string().trim().required(""),
        prov_CodigoPostal: yup.string().trim().required(""),

        Pais: yup.object().required(""),
        provincia: yup.object().required(""),
        Ciudad: yup.object().required(""),
        prov_DireccionExacta: yup.string().trim().required(""),
        prov_CorreoElectronico: yup.string().trim().required("").email(),
        prov_Fax: yup.string().trim(),
    });

    //Constante que nos ayuda para las validaciones con yup para los formularios
    const { handleSubmit, register, reset, control, watch, formState, setValue } =
        useForm({
            defaultValues,
            mode: "all",
            resolver: yupResolver(accountSchema),
        });

    const { isValid, dirtyFields, errors, touchedFields } = formState;

    //Datos del formulario
    const datosWatch = watch();




    //Peticion para crear un registro
    const proveedoresCreate = async () => {
        try {
            const response = await proveedoresService.crear(datosWatch);
            if (response.data.data.messageStatus == "1") {
                History.push("/Proveedores/index");
                ToastSuccess("El registro se ha insertado exitosamente");
            } else if (response.data.data.messageStatus.includes("UNIQUE")) {
                ToastWarning("Ya existe la Empresa");
            }
        } catch (error) {
            console.log(error.message);
            ToastError("Error inesperado");
        }
    };

    const validacion = async () => {
        if (isValid) {
            proveedoresCreate()
        }
        else {
            ToastWarning("Campos Vacios");
        }
    }


    return (
        <form onSubmit={handleSubmit((_data) => { })}>
            <Card sx={{ minWidth: 275, margin: "40px" }}>
                {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
                <CardMedia
                    component="img"
                    height="200"
                    image="https://i.ibb.co/JxTYhwv/PROVEEDORES.png"
                    alt="Encabezado de la carta"
                />


                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ marginBottom: "30px" }}>
                            <Divider style={{ marginTop: "0px" }}>
                                <Chip label="Crear Proveedor" />
                            </Divider>
                        </Grid>

                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_NombreCompania} fullWidth={true}>
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                            >
                                                Nombre de la Compañía:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                error={!!errors.prov_NombreCompania}
                                                variant="outlined"
                                                fullWidth={true}
                                                inputprops={{
                                                    startAdornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                    name="prov_NombreCompania"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_NombreContacto} fullWidth={true}>
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                            >
                                                Nombre del Contacto:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                error={!!errors.prov_NombreContacto}
                                                variant="outlined"
                                                fullWidth={true}
                                                inputprops={{
                                                    startAdornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                    name="prov_NombreContacto"
                                    control={control}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <InputMask
                                            mask="+504 9999-9999"
                                            value={datosWatch["prov_Telefono"]}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            maskChar=" "
                                        >
                                            {() => (

                                                <FormControl error={!!errors.prov_Telefono} fullWidth={true}>
                                                    <FormLabel
                                                        className="font-medium text-10"
                                                        component="legend"
                                                    >
                                                        Teléfono o Celular:
                                                    </FormLabel>
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        error={!!errors.prov_Telefono}
                                                        fullWidth={true}
                                                        inputprops={{
                                                            startAdornment: (
                                                                <InputAdornment position="start"></InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </FormControl>
                                            )}
                                        </InputMask>
                                    )}
                                    name="prov_Telefono"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_CodigoPostal} fullWidth={true}>
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                            >
                                                Código Postal:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                type="number"
                                                error={!!errors.prov_CodigoPostal}
                                                variant="outlined"
                                                fullWidth={true}
                                                inputprops={{
                                                    startAdornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                    name="prov_CodigoPostal"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_CorreoElectronico} fullWidth={true}>
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                            >
                                                Correo Electrónico:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                error={!!errors.prov_CorreoElectronico}
                                                variant="outlined"
                                                fullWidth={true}
                                                inputprops={{
                                                    startAdornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                    name="prov_CorreoElectronico"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_Fax} fullWidth={true}>
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                            >
                                                Fax:
                                            </FormLabel>
                                            <TextField
                                                type="number"
                                                {...field}
                                                error={!!errors.prov_Fax}
                                                variant="outlined"
                                                fullWidth={true}
                                                inputprops={{
                                                    startAdornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                    name="prov_Fax"
                                    control={control}
                                />
                            </div>
                        </Grid>


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    name="Pais"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl
                                            error={!!errors.Pais}
                                            fullWidth={true}
                                        >
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                                error={!!errors.Pais}
                                            >
                                                País
                                            </FormLabel>
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                id="Pais"
                                                options={paises}
                                                value={datosWatch["Pais"] ?? null}
                                                onChange={async (event, value) => {
                                                    setValue('Pais', value)
                                                    setValue('provincia', null)
                                                    setValue('Ciudad', null)
                                                    provinciasGet(value?.value)
                                                    if (!value) { setValue('pvin_Id', []) }
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={!!errors.Pais}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </Grid>





                        {/* <Grid item xs={6}>
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={field.value === "0"} fullWidth={true}>
                                        <FormLabel className="font-medium text-10" component="legend" error={!!errors.Pais}>
                                            País
                                        </FormLabel>
                                        <Autocomplete
                                            {...field}
                                            disablePortal
                                            isOptionEqualToValue={(option, value) =>
                                                option.value === value.value
                                            }
                                            options={paises}
                                            value={datosWatch["Pais"]}
                                            onChange={(event, value) => {
                                                setValue('Pais', value)
                                                setValue('provincia', null)
                                                setValue('Ciudad', null)
                                                provinciasGet(value?.value)
                                                if (!value) { setValue('pvin_Id', []) }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={!!errors.Pais}
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                )}
                                name="pais_Id"
                                control={control}
                            />
                        </Grid> */}


                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    name="provincia"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl
                                            error={!!errors.provincia}
                                            fullWidth={true}
                                        >
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                                error={!!errors.provincia}
                                                disabled={datosWatch['provincia'] != null ? false : true}
                                            >
                                                Provincias
                                            </FormLabel>
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                id="provincia"
                                                options={provincias}
                                                disabled={datosWatch['Pais'] != null ? false : true}
                                                value={datosWatch["provincia"] ?? null}
                                                onChange={async (event, value) => {
                                                    setValue('provincia', value)
                                                    setValue('Ciudad', '')
                                                    CiudadesGet(value?.value)
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={!!errors.provincia}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </Grid>




                        {/* <Grid item xs={6}>
                            <div className="mb-16">
                                <Controller
                                    name="pvin_Id"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                                error={!!errors.provincia}
                                                disabled={datosWatch['provincia'] != null ? false : true}
                                            >
                                                Provincias
                                            </FormLabel>
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                id="pvin_Id"
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                options={provincias}
                                                disabled={datosWatch['Pais'] != null ? false : true}
                                                value={datosWatch["provincia"]}
                                                onChange={(event, value) => {
                                                    setValue('provincia', value)
                                                    setValue('Ciudad', '')
                                                    CiudadesGet(value?.value)
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={!!errors.provincia}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </Grid> */}



                        <Grid item xs={6}>
                            <div className=" mb-16">
                                <Controller
                                    name="Ciudad"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl
                                            error={!!errors.Ciudad}
                                            fullWidth={true}
                                        >
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                                error={!!errors.Ciudad}
                                                disabled={datosWatch['Ciudad'] != null ? false : true}
                                            >
                                                Ciudades
                                            </FormLabel>
                                            <Autocomplete
                                                {...field}
                                                disablePortal
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                id="Ciudad"
                                                options={ciudades}
                                                disabled={datosWatch['provincia'] != null ? false : true}
                                                value={datosWatch["Ciudad"] ?? null}
                                                onChange={async (event, value) => {
                                                    setValue('Ciudad', value)
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={!!errors.Ciudad}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </Grid>



                        {/* <Grid item xs={6}>
                            <div className="mb-16">
                                <Controller
                                    name="ciud_Id"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth={true}>
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                                error={!!errors.Ciudad}
                                                disabled={datosWatch['provincia'] != null ? false : true}
                                            >
                                                Ciudades
                                            </FormLabel>
                                            <Autocomplete
                                                {...field}

                                                id="ciud_Id"
                                                isOptionEqualToValue={(option, value) =>
                                                    option.value === value.value
                                                }
                                                options={ciudades}
                                                disabled={datosWatch['provincia'] != null ? false : true}
                                                value={datosWatch["Ciudad"]}
                                                onChange={(event, value) => {
                                                    setValue('Ciudad', value)

                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={!!errors.Ciudad}
                                                        InputLabelProps={{ shrink: true }}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </Grid> */}

                        <Grid item xs={12}>
                            <div className=" mb-16">
                                <Controller
                                    render={({ field }) => (
                                        <FormControl error={!!errors.prov_DireccionExacta} fullWidth={true}>
                                            <FormLabel
                                                className="font-medium text-10"
                                                component="legend"
                                            >
                                                Dirección Exacta:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                error={!!errors.prov_DireccionExacta}
                                                variant="outlined"

                                                inputprops={{
                                                    startAdornment: (
                                                        <InputAdornment position="start"></InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </FormControl>
                                    )}
                                    name="prov_DireccionExacta"
                                    control={control}
                                />
                            </div>
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
                                type="submit"
                                style={{ borderRadius: "10px", marginRight: "10px" }}
                                sx={{
                                    backgroundColor: "#634A9E",
                                    color: "white",
                                    "&:hover": { backgroundColor: "#6e52ae" },
                                }}
                                onClick={validacion}
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
                                onClick={() => {
                                    History.push("/Proveedores/Index");
                                }}
                            >
                                Cancelar
                            </Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </form>
    )
}

export default ProveedoresCrear;
