import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
    Autocomplete,
    Button,
    FormControl,
    FormLabel,
    Icon,
    InputLabel,
    TextField,
    InputAdornment
} from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid";

import { useState, useEffect } from "react";

import InputMask from "react-input-mask";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { black } from "tailwindcss/colors";

//Imports de validaciones
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import load_DDLs from "src/app/loadDDLs/Load_DDL";

/* Campos del formulario*/
const defaultTab1Values = {
    id: "", //id necesario para el editar
    pers_Id: "",
    oficina: null, //para los campos que son ddl poner null
    estadocivil: null,
    estadocivilrep: null,
    oficio: null,
    oficiorep: null,
    };
  
  /* Esquema del fomulario (validaciones) */
  //En el esquema se eligen las validaciones que el formulario tendra
  const accountSchema = yup.object().shape({
    id: yup.string(),
    pers_Id: yup.string().trim().required(""),
    oficina: yup.object().required(""),
    estadocivil: yup.object().required(""),
    estadocivilrep: yup.object().required(""),
    oficio: yup.object().required(""),
    oficiorep: yup.object().required(""),
  });

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

function Comerciante_Individual_Agregar() {



    //Variables DDL
    const [oficinas_DDL, setOficinas_DDL] = useState([]);
    const [estadosciviles_DDL, setEstadosCiviles_DDL] = useState([]);
    const [oficios_DDL, setOficios_DDL] = useState([]);

    //Cargado de las variables DDL
    async function ddls() {
    setOficinas_DDL(await load_DDLs.Oficinas());
    setEstadosCiviles_DDL(await load_DDLs.Estadosciviles());
    setOficios_DDL(await load_DDLs.Oficios());
    
  }

    //useEffect para cargar datos al ingresar a la pantalla
    useEffect(() => {
        ddls();
      }, []);
      
    const Navigate = useNavigate();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const [tabsEstado, settabsEstado] = useState({
        tab1: true,
        tab2: true,
        tab3: true,
        tab4: true,
    });

    const validacion = (params, event) => {
        if (event) {
            event.preventDefault();
        }
        if ((params == 1)) {
            settabsEstado({
                tab1: false,
                tab2: true,
                tab3: true,
                tab4: true,
            });
            setValue(1);
        }

        if ((params == 2)) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: true,
                tab4: true,
            });
            setValue(2);
        }

        if ((params == 3)) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: true,
            });
            setValue(3);
        }

        if ((params == 4)) {
            settabsEstado({
                tab1: false,
                tab2: false,
                tab3: false,
                tab4: false,
            });
            setValue(4);
        }
    };

    //Declaracion del formulario
  const { handleSubmit, register, reset, control, watch, formState } =
  useForm({
    defaultTab1Values, //Campos del formulario
    mode: "all",
    resolver: yupResolver(accountSchema), //Esquema del formulario
  });

    //Validacion de campos vacios y errores
    const { isValid, dirtyFields, errors } = formState;

    //Datos del formulario
    const datosWatch = watch();


    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/FBTmyr7/CONTRATO-DE-ADHESI-N-COMERCIANTE-INDIVIDUAL.png"
                alt="Encabezado de la carta"
            />
            <CardContent sx={{ textAlign: "center" }}>

            </CardContent>

            <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        sx={{ backgroundColor: "#FFF7F7", color: black }}
                    >
                        <Tab
                            label="Datos Generales"
                            sx={{ fontSize: "16px" }}
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Domicilio del Comerciante"
                            sx={{ fontSize: "16px" }}
                            {...a11yProps(1)}
                            disabled={tabsEstado.tab1}
                        />
                        <Tab
                            label="Domicilio del Representante Legal"
                            sx={{ fontSize: "16px" }}
                            {...a11yProps(2)}
                            disabled={tabsEstado.tab2}
                        />
                        <Tab
                            label="Información de Contacto"
                            sx={{ fontSize: "16px" }}
                            {...a11yProps(3)}
                            disabled={tabsEstado.tab3}
                        />
                        <Tab
                            label="Documentos a Informar"
                            sx={{ fontSize: "16px" }}
                            {...a11yProps(4)}
                            disabled={tabsEstado.tab4}
                        />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <div className="mb-16">
                                    <Controller
                                    render={({ field }) => (
                                        <InputMask
                                        mask="99999999999999"
                                        // value={modelo["pers_RTN"]}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        maskChar=" "
                                        >
                                        {() => (

                                            <FormControl fullWidth={true}>
                                            <FormLabel
                                                error={!!errors.pers_Id}
                                                className="font-medium text-13"
                                                component="legend"
                                            >
                                                RTN Solicitante:
                                            </FormLabel>
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                // error={!!errors.empl_Telefono}
                                                fullWidth={true}
                                                inputprops={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                                }}
                                                error={!!errors.pers_Id}
                                            />
                                            </FormControl>
                                        )}
                                        </InputMask>
                                    )}
                                    name="pers_Id"
                                    control={control}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={6}></Grid>
                            {/* <Grid item xs={12}></Grid> */}

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel
                                    
                                        className="font-medium text-13"
                                        component="legend"

                                    >Oficina Donde Presenta la Solicitud y Documentación</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            id="oficina"
                                            isOptionEqualToValue={(option, value) =>
                                            option.value === value?.value
                                            }
                                            options={oficinas_DDL}
                                            value={datosWatch.oficina ?? null}
                                            onChange={(event, value) => {
                                            setValue("oficina", value);
                                            }
                                        }
                                            renderInput={(params) => (
                                            <TextField {...params} />
                                            )}
                                        />
                                        )}
                                        name="oficina"
                                        // error={!!errors.pais}
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <FormLabel 

                                        className="font-medium text-13"
                                        component="legend"

                                    >Estado Civil del Comerciante</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            id="estadocivil"
                                            isOptionEqualToValue={(option, value) =>
                                            option.value === value?.value
                                            }
                                            options={estadosciviles_DDL}
                                            value={datosWatch.estadocivil ?? null}
                                            onChange={(event, value) => {
                                            setValue("estadocivil", value);
                                            }}
                                            renderInput={(params) => (
                                            <TextField {...params} />
                                            )}
                                        />
                                        )}
                                        name="estadocivil"
                                        // error={!!errors.pais}
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                {/* <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Profesión u oficio del comerciante
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Profesión u oficio del comerciante"
                                        placeholder="Profesión u oficio del comerciante"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl> */}
                                <FormControl fullWidth>
                                    <FormLabel
                                    
                                    className="font-medium text-13"
                                    component="legend"
                                    
                                    >Oficina donde presenta la solicitud y documentación</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            id="oficio"
                                            isOptionEqualToValue={(option, value) =>
                                            option.value === value?.value
                                            }
                                            options={oficios_DDL}
                                            value={datosWatch.oficio ?? null}
                                            onChange={(event, value) => {
                                            setValue("oficio", value);
                                            }}
                                            renderInput={(params) => (
                                            <TextField {...params} />
                                            )}
                                        />
                                        )}
                                        name="oficio"
                                        // error={!!errors.pais}
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Forma de representación
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Forma de representación"
                                        placeholder="Forma de representación"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                {/* <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Estado civil del representante legal (si ha informado
                                        representación legal )
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        label="Estado civil del representante legal (si ha informado representación legal )"
                                        placeholder="Estado civil del representante legal (si ha informado representación legal )"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl> */}

                                <FormControl fullWidth>
                                    <FormLabel

                                        className="font-medium text-13"
                                        component="legend"

                                    >Estado civil del representante legal (si ha informado
                                        representación legal )</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            id="estadocivilrep"
                                            isOptionEqualToValue={(option, value) =>
                                            option.value === value?.value
                                            }
                                            options={estadosciviles_DDL}
                                            value={datosWatch.oficina ?? null}
                                            onChange={(event, value) => {
                                            setValue("estadocivilrep", value);
                                            }
                                        }
                                            renderInput={(params) => (
                                            <TextField {...params} />
                                            )}
                                        />
                                        )}
                                        name="estadocivilrep"
                                        // error={!!errors.pais}
                                        control={control}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                {/* <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Profesión u oficio del represantente legal (si ha informado
                                        representación legal )
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        label="Profesión u oficio del represantente legal (si ha informado representación legal )"
                                        placeholder="Profesión u oficio del represantente legal (si ha informado representación legal )"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl> */}

                                <FormControl fullWidth>
                                    <FormLabel

                                        className="font-medium text-13"
                                        component="legend"

                                    >Profesión u oficio del represantente legal (si ha informado
                                        representación legal )</FormLabel>
                                    <Controller
                                        render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            id="oficiorep"
                                            isOptionEqualToValue={(option, value) =>
                                            option.value === value?.value
                                            }
                                            options={oficios_DDL}
                                            value={datosWatch.oficina ?? null}
                                            onChange={(event, value) => {
                                            setValue("oficiorep", value);
                                            }
                                        }
                                            renderInput={(params) => (
                                            <TextField {...params} />
                                            )}
                                        />
                                        )}
                                        name="oficiorep"
                                        // error={!!errors.pais}
                                        control={control}
                                    />
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
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={() => validacion(1)}
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
                                    onClick={(e) => {
                                        Navigate("/Contrato-de-Adhesion-Comerciante-Individual/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ textAlign: "center", marginBottom: 5, color: "#575757" }}
                            >
                                Para efecto de ubicación, en el contrato de adhesión se mostrará
                                el domicilio fiscal registrado en la administración tributaria.
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Estado
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Estado"
                                        placeholder="Estado"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Ciudad
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Ciudad"
                                        placeholder="Ciudad"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Aldea"
                                        placeholder="Aldea"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Dirección Exacta"
                                        placeholder="Dirección Exacta"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
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
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={() => validacion(2)}
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
                                    onClick={(e) => {
                                        Navigate("/Contrato-de-Adhesion-Comerciante-Individual/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ textAlign: "center", marginBottom: 5, color: "#575757" }}
                            >
                                Si hubiese informado representación bajo un representante legal.
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Estado
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Estado"
                                        placeholder="Estado"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="grouped-native-select">
                                        Ciudad
                                    </InputLabel>
                                    <Select
                                        style={{ borderRadius: "3px" }}
                                        required
                                        label="Ciudad"
                                        placeholder="Ciudad"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Aldea"
                                        placeholder="Aldea"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Dirección Exacta"
                                        placeholder="Dirección Exacta"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
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
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={() => validacion(3)}
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
                                    onClick={(e) => {
                                        Navigate("/Contrato-de-Adhesion-Comerciante-Individual/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <Grid item xs={12}>
                            <Typography
                                variant="body1"
                                gutterBottom
                                sx={{ textAlign: "center", marginBottom: 5, color: "#575757" }}
                            >
                                En el Contrato de Adhesión se mostrará los números de télefono
                                regisrados en la administración tributaria
                            </Typography>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Número de teléfono fijo del comerciante"
                                        placeholder="Número de teléfono fijo del comerciante"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Número de teléfono celular del comerciante"
                                        placeholder="Número de teléfono celular del comerciante"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Correo electrónico donde notificar"
                                        placeholder="Correo electrónico donde notificar"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        sx={{
                                            textAlign: "justify",
                                            marginBottom: 1,
                                            color: "#575757",
                                        }}
                                    >
                                        (para efectos de la recepción o envío de solicitudes,
                                        escritos, autos, notificaciones, requerimientos y cualquier
                                        otro proveído, comunicaciones, resoluciones y cualquier otra
                                        actuación ante la administración aduanera o emitido por
                                        esta)
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Codigo de verificacion de correo electrónico donde notificar"
                                        placeholder="Codigo de verificacion de correo electrónico donde notificar"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        sx={{
                                            textAlign: "justify",
                                            marginBottom: 1,
                                            color: "#575757",
                                        }}
                                    >
                                        (esto asegura que se ha informado un correo electrónico
                                        válido, accesible por la persona o personal de la empresa, y
                                        los correos de aduanas de honduras no se encuentren
                                        bloqueados por el proveedor/servidor de correo electrónico)
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Correo electrónico alternativo"
                                        placeholder="Correo electrónico alternativo"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Codigo de verificacion de correo electrónico alternativo"
                                        placeholder="Codigo de verificacion de correo electrónico alternativo"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
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
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={() => validacion(4)}
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
                                    onClick={(e) => {
                                        Navigate("/Contrato-de-Adhesion-Comerciante-Individual/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={4} dir={theme.direction}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Registro Tributario Nacional (RTN) del comerciante individual"
                                        placeholder="Registro Tributario Nacional (RTN) del comerciante individual"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Documento o Tarjeta de Identidad del comerciante individual"
                                        placeholder="Documento o Tarjeta de Identidad del comerciante individual"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        label="Registro Tributario Nacional (RTN) del representante legal"
                                        placeholder="Registro Tributario Nacional (RTN) del representante legal"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        sx={{
                                            textAlign: "justify",
                                            marginBottom: 0,
                                            color: "#575757",
                                        }}
                                    >
                                        (si ha informado representación bajo representación legal)
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Documento o Tarjeta de Identidad del representante legal"
                                        placeholder="Documento o Tarjeta de Identidad del representante legal"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        sx={{
                                            textAlign: "justify",
                                            marginBottom: 0,
                                            color: "#575757",
                                        }}
                                    >
                                        (si ha informado representación bajo representación legal)
                                    </Typography>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        style={{ borderRadius: "10px" }}
                                        required
                                        label="Declaración de comerciante individual y sus modificaciones si las hubiera"
                                        placeholder="Declaración de comerciante individual y sus modificaciones si las hubiera"
                                        InputProps={{ startAdornment: <InputAdornment position="start" />, }}
                                    />
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
                                    startIcon={<Icon>checked</Icon>}
                                    variant="contained"
                                    color="primary"
                                    style={{ borderRadius: "10px", marginRight: "10px" }}
                                    sx={{
                                        backgroundColor: "#634A9E",
                                        color: "white",
                                        "&:hover": { backgroundColor: "#6e52ae" },
                                    }}
                                    onClick={() => validacion(5)}
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
                                    onClick={(e) => {
                                        Navigate("/Contrato-de-Adhesion-Comerciante-Individual/Index");
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </Card>
    );
}

export default Comerciante_Individual_Agregar;
