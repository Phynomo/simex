/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
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
    Card,
    CardContent,
    CardMedia,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    Dialog,
    DataGrid,
    MenuItem,
    Menu,
    Box,
    Collapse,
    Typography,
    Select,
    Grid,
    GridToolbar,
    Stack,
    ListItemText,
    esES,
    FormLabel,
    Autocomplete,
    Switch,
    FormControlLabel,
    RadioGroup,
    Radio,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table } from "antd";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { toast, ToastContainer } from "react-toastify";
import MaskedInput from "react-text-mask";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import apiRequests from "src/app/Personas/Empleados/EmpleadosService";
import archiveDDL from "src/app/loadDDLs/ProduccionDDL";
import { useLocation } from "react-router-dom";

function EmpleadosEditar() {
    const location = useLocation();
    const empleadoData = location.state;

    //Variable para navegar entre paginas
    const navigate = useNavigate();

    // Para tener la variable de fecha actual
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString();

    //Constante de los valores de los textfield de la pantalla
    const [empl_Id, setId] = useState("");
    const [empl_Nombre, setNombre] = useState("");
    const [empl_Apellido, setApellido] = useState("");
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [empl_DNI, setDNI] = useState("");
    const [empl_Sexo, setSexo] = useState("");
    const [eciv_Id, setEcivId] = useState(0);
    const [empl_FechaNacimiento, setFechaNacimiento] = useState("");
    const [empl_Telefono, setTelefono] = useState("");
    const [empl_Direccion, setDireccion] = useState("");
    const [pvin_Id, setPvinId] = useState(0);
    const [empl_CorreoElectronico, setCorreoElectronico] = useState("");
    const [carg_Id, setCargId] = useState(0);
    const [pais_Id, setPais_Id] = useState(0);
    const [empl_EsAduana, setEsAduana] = useState(0);

    //Valores en string de ddls
    const [escv_Nombre, setEscv_Nombre] = useState("");
    const [pvin_Nombre, setPvin_Nombre] = useState("");
    const [carg_Nombre, setCarg_Nombre] = useState("");

    //Campos de Auditoria
    const [usuarioCreacion, setUsuarioCreacion] = useState("");
    const [usuraioModificador, setUsuarioModificador] = useState("");
    const [FechaCreacion, setFechaCreacion] = useState();
    const [FechaModificacion, setModificacion] = useState();
    const FechaCreacionForm = new Date(FechaCreacion).toLocaleString();

    // Campos para el DDL de Estados Civiles
    const [estadosCiviles, setEstadosCiviles] = useState([]);
    const [estadoCivilSeleccionado, setEstadoCivilSeleccionado] = useState(0);

    // Campos para el DDL de Cargos
    const [cargos, setCargos] = useState([]);
    const [cargoSeleccionado, setCargoSeleccionado] = useState(0);

    // Campos para el DDL de Paises
    const [paises, setPaises] = useState([]);
    const [paisSeleccionado, setPaisSeleccionado] = useState(0);

    // Campos para el DDL de Provincias
    const [provincias, setProvincias] = useState([]);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(0);
    const [provinciasHabilitadas, setProvinciasHabilitadas] = useState(false);

    // Constante para validar el campo de Sexo
    const isSexoValid = (value) => value === "F" || value === "M";

    //Constantes para cargar las provincias dependiendo del pais
    const cargarProvincias = async (paisId) => {
        try {
            const provinciasData = await apiRequests.provinciasPorPaisDDL(paisId);
            setProvincias(provinciasData.data); // Actualiza el estado de las provincias
        } catch (error) {
            console.error("Error al cargar provincias:", error);
        }
    };

    const CargarDDLS = async () => {
        try {
            const estadosCivilesData = await archiveDDL.estadoscivilesDDL();
            setEstadosCiviles(estadosCivilesData.data);
        } catch (error) {
            console.error("Error al cargar estados civiles:", error);
        }

        try {
            const cargosData = await archiveDDL.cargosDDL();
            setCargos(cargosData.data);
        } catch (error) {
            console.error("Error al cargar los cargos:", error);
        }
        try {
            const paisesData = await archiveDDL.paisesDDL();
            setPaises(paisesData.data);
        } catch (error) {
            console.error("Error al cargar los paises:", error);
        }
    };

    //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
    useEffect(() => {
        CargarDDLS();
    }, []);

    //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
    const ToastSuccess = () => {
        toast.success("Datos editados correctamente.", {
            theme: "dark",
            style: {
                marginTop: "50px",
            },
            autoClose: 1500,
            closeOnClick: true,
        });
    };

    const ToastWarning = () => {
        toast.warning("No se permiten campos vacios.", {
            theme: "dark",
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
                marginTop: "50px",
            },
            autoClose: 1500,
            closeOnClick: true,
        });
    };

    const ToastCorreoInvalido = () => {
        toast.warning("El formato de correo es inválido.", {
            theme: "dark",
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
                marginTop: "50px",
            },
            autoClose: 1500,
            closeOnClick: true,
        });
    };

    const ToastDNIInvalido = () => {
        toast.warning("El DNI es inválido.", {
            theme: "dark",
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
                marginTop: "50px",
            },
            autoClose: 1500,
            closeOnClick: true,
        });
    };

    const ToastTelfonoInvalido = () => {
        toast.warning("El número de celular o telefono es inválido.", {
            theme: "dark",
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
                marginTop: "50px",
            },
            autoClose: 1500,
            closeOnClick: true,
        });
    };

    const ToastFechaInvalida = () => {
        toast.warning("La fecha de nacimiento es invalida.", {
            theme: "dark",
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
                marginTop: "50px",
            },
            autoClose: 1500,
            closeOnClick: true,
        });
    };

    // Campos de la tabla en blanco.
    const defaultEmpleadosValues = {
        empl_Nombre: "",
        empl_Apellido: "",
        empl_DNI: "",
        empl_Sexo: "",
        eciv_Id: 0,
        empl_FechaNacimiento: "",
        empl_Telefono: "",
        empl_Direccion: "",
        pvin_Id: 0,
        empl_CorreoElectronico: "",
        carg_Id: 0,
        empl_EsAdmin: 0,
        pais_Id: 0,
    };

    // Esquema de la tabla, con especificaciones para las validaciones.
    const EmpleadosSchema = yup.object().shape({
        empl_Nombre: yup.string().required(""),
        empl_Apellido: yup.string().required(""),
        empl_DNI: yup.string().required(""),
        empl_Sexo: yup.string().required(""),
        eciv_Id: yup.string().required(""),
        empl_FechaNacimiento: yup.string().required(""),
        empl_Telefono: yup.string().required(""),
        empl_Direccion: yup.string().required(""),
        pvin_Id: yup.string().required(""),
        empl_CorreoElectronico: yup.string().required(""),
        carg_Id: yup.string().required(""),
        empl_EsAduana: yup.string().required(""),
        pais_Id: yup.string().required(""),
    });

    //Constante que nos ayuda para las validaciones con yup para los formularios
    const { handleSubmit, register, reset, control, watch, formState } = useForm({
        defaultEmpleadosValues,
        mode: "all",
        resolver: yupResolver(EmpleadosSchema),
    });

    const { isValid, dirtyFields, errors, touchedFields } = formState;

    //Constante para ejecutar las validaciones y el envio del formulario en el boton de agregar en el collapse de agregar
    const AgregarRegistro = () => {
        const formData = watch();
        guardarEmpleado(formData);
        setTimeout(() => {
            handleSubmit(guardarEmpleado)();
        }, "250");
    };

    //Variables para validar campos del formulario vacios (11 campos)
    const isDNIValido = (dni) => {
        const dniPattern = /^\d{4}-\d{4}-\d{5}$/;
        if (dni != "" && dni != null && dni != undefined) {
            if (!dniPattern.test(dni)) {
                ToastDNIInvalido();
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const isCorreoValido = (correo) => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (correo != "" && correo != null && correo != undefined) {
            if (!emailPattern.test(correo)) {
                ToastCorreoInvalido();
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const isTelefonoValido = (telefono) => {
        const telefonoPattern = /^\d{4}-\d{4}$/;
        if (telefono != "" && telefono != null && telefono != undefined) {
            if (!telefonoPattern.test(telefono)) {
                ToastTelfonoInvalido();
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const isFechaDeNacimientoValido = (fecha) => {
        const fechaNacimiento = new Date(fecha);
        const fechaActual = new Date(); // Convierte la fecha en formato ISO
        console.log(fechaNacimiento.getFullYear());
        if (fechaNacimiento.getFullYear() == fechaActual.getFullYear()) {
            ToastFechaInvalida();
            return true;
        } else {
            return false;
        }
    };

    const NombreValidar = (empl_Nombre) => {
        if (!empl_Nombre || empl_Nombre.trim() === "") {
            return true;
        } else {
            return false;
        }
    };

    const ApellidoValidar = (empl_Apellido) => {
        if (!empl_Apellido || empl_Apellido.trim() === "") {
            return true;
        } else {
            return false;
        }
    };

    const DNIValidar = (empl_DNI) => {
        if (!empl_DNI || empl_DNI.trim() === "") {
            return true;
        } else {
            return false;
        }
    };

    const SexoValidar = (empl_Sexo) => {
        if (!empl_Sexo) {
            return true;
        } else {
            return false;
        }
    };

    const EstadoCivilValidar = (eciv_Id) => {
        if (eciv_Id == 0) {
            return true;
        } else {
            return false;
        }
    };

    const FechaNacimientoValidar = (empl_FechaNacimiento) => {
        if (!empl_FechaNacimiento) {
            return true;
        } else {
            return false;
        }
    };

    const TelefonoValidar = (empl_Telefono) => {
        if (!empl_Telefono) {
            return true;
        } else {
            return false;
        }
    };

    const CorreoValidar = (empl_CorreoElectronico) => {
        if (!empl_CorreoElectronico) {
            return true;
        } else {
            return false;
        }
    };

    const PaisyProvinciaValidar = (pvin_Id, pais_Id) => {
        if (pvin_Id == 0 || pais_Id == 0) {
            return true;
        } else {
            return false;
        }
    };

    const CargoValidar = (carg_Id) => {
        if (carg_Id == 0) {
            return true;
        } else {
            return false;
        }
    };

    const DireccionValidar = (empl_Direccion) => {
        if (!empl_Direccion) {
            return true;
        } else {
            return false;
        }
    };

    {
        /*FIN Variables para validar campos del formulario (11 campos)*/
    }

    //Constante solo para que quitar el error de los textfield no controlados
    const [message, setMessage] = useState();

    // Función para Guardar Cambios

    const guardarEmpleado = async (data) => {
        console.log(data);
        // Acá se llaman todos los campos a validar
        const ErroresArray = [
            // campos vacios
            NombreValidar(data.empl_Nombre),
            ApellidoValidar(data.empl_Apellido),
            DNIValidar(data.empl_DNI),
            SexoValidar(data.empl_Sexo),
            EstadoCivilValidar(data.eciv_Id),
            FechaNacimientoValidar(data.empl_FechaNacimiento),
            TelefonoValidar(data.empl_Telefono),
            CorreoValidar(data.empl_CorreoElectronico),
            PaisyProvinciaValidar(data.pvin_Id, data.pais_Id),
            CargoValidar(data.carg_Id),
            DireccionValidar(data.empl_Direccion),
        ];

        const FormatosArray = [
            // formatos validos
            isDNIValido(data.empl_DNI),
            isTelefonoValido(data.empl_Telefono),
            isCorreoValido(data.empl_CorreoElectronico),
            isFechaDeNacimientoValido(data.empl_FechaNacimiento),
        ];

        // Se define la variable donde guardaremos los errores
        let errors = 0;
        let formatos = 0;

        // Se recorre el arreglo y se buscan los campos vacios
        for (let i = 0; i < ErroresArray.length; i++) {
            if (ErroresArray[i] === true) {
                errors++;
            }
        }

        // Se recorre el arreglo y se buscan los formatos invalidos
        for (let i = 0; i < FormatosArray.length; i++) {
            if (FormatosArray[i] === true) {
                formatos++;
            }
        }

        // Se utiliza la varibale de errores y se evalua en base a ella.
        if (errors == 0 && formatos == 0) {
            const formattedBirthday = data.empl_FechaNacimiento.toISOString(); // Convert to ISO 8601 format
            const payload = {
                empl_Id: empleadoData.empl_Id,
                empl_Nombres: data.empl_Nombre,
                empl_Apellidos: data.empl_Apellido,
                empl_DNI: data.empl_DNI,
                escv_Id: data.eciv_Id,
                empl_Sexo: data.empl_Sexo,
                empl_FechaNacimiento: formattedBirthday,
                empl_Telefono: data.empl_Telefono,
                empl_DireccionExacta: data.empl_Direccion,
                pvin_Id: data.pvin_Id,
                empl_CorreoElectronico: data.empl_CorreoElectronico,
                carg_Id: data.carg_Id,
                empl_EsAduana: false,
                usua_UsuarioModificacion: 1,
                empl_FechaModificacion: formattedCurrentDate,
            };

            const response = await apiRequests.editEmpleados(payload);
            if (response.data.messageStatus === "1") {
                setTimeout(() => {
                    ToastSuccess();
                }, "250");
                navigate("/Empleados/Index");
            } else {
                console.log(response.message);
            }
        } else {
            if (errors != 0) {
                ToastWarning();
            } else {
                console.log("hay formatos invalidos!");
            }
        }
    };

    return (
        <Card sx={{ minWidth: 275, margin: "40px" }}>
            {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/tD9Rjwz/EMPLEADOS.png"
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
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom></Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <div className=" mb-16">
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={!!errors.empl_Nombre} fullWidth={true}>
                                        <FormLabel
                                            className="font-medium text-10"
                                            component="legend"
                                        >
                                            Nombres del Empleado:
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            error={!!errors.empl_Nombre}
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
                                name="empl_Nombre"
                                control={control}
                                defaultValue={empleadoData.empl_Nombre}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className=" mb-16">
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={!!errors.empl_Apellido} fullWidth={true}>
                                        <FormLabel
                                            className="font-medium text-10"
                                            component="legend"
                                        >
                                            Apellidos del Empleado:
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            error={!!errors.empl_Apellido}
                                            fullWidth={true}
                                            inputprops={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                )}
                                name="empl_Apellido"
                                control={control}
                                defaultValue={empleadoData.empl_Apellido}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className=" mb-16">
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={!!errors.empl_DNI} fullWidth={true}>
                                        <FormLabel
                                            className="font-medium text-10"
                                            component="legend"
                                        >
                                            Número de Identidad:
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            placeholder="____-____-____"
                                            error={!!errors.empl_DNI}
                                            fullWidth={true}
                                            onChange={(event) => {
                                                const formattedValue = event.target.value
                                                    .replace(/\D/g, "") // Elimina caracteres no numéricos
                                                    .replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3") // Formato XXXX-XXXX-XXXX
                                                    .slice(0, 15); // Limita la longitud a 15 caracteres
                                                field.onChange(formattedValue);
                                            }}
                                            inputprops={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                )}
                                name="empl_DNI"
                                control={control}
                                defaultValue={empleadoData.empl_DNI}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <Controller
                            render={({ field }) => (
                                <FormControl error={!!errors.empl_Sexo} fullWidth={true}>
                                    <FormLabel className="font-medium text-10" component="legend">
                                        Sexo:
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="simple-radio"
                                        aria-label="simple-radio"
                                        marginRight="10px"
                                        {...field}
                                    >
                                        <FormControlLabel
                                            value="F"
                                            control={<Radio />}
                                            label="Femenino"
                                        />
                                        <FormControlLabel
                                            value="M"
                                            control={<Radio />}
                                            label="Masculino"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            )}
                            name="empl_Sexo"
                            control={control}
                            rules={{
                                validate: isSexoValid,
                            }}
                            defaultValue={empleadoData.empl_Sexo} // Establece el valor inicial
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Controller
                            render={({ field }) => (
                                <FormControl error={field.value === "0"} fullWidth={true}>
                                    <FormLabel className="font-medium text-10" component="legend">
                                        Estado Civil
                                    </FormLabel>
                                    <Select
                                        {...field}
                                        fullWidth={true}
                                        defaultValue={0}
                                        inputProps={{
                                            startAdornment: <InputAdornment position="start" />,
                                        }}
                                        onChange={(e) => {
                                            const selectedValue = e.target.value;
                                            setEstadoCivilSeleccionado(selectedValue);
                                            field.onChange(selectedValue); // Actualiza el valor en react-hook-form
                                        }}
                                    >
                                        <MenuItem value="0">Seleccione una opción...</MenuItem>
                                        {estadosCiviles.map((estadoCivil) => (
                                            <MenuItem
                                                key={estadoCivil.escv_Id}
                                                value={estadoCivil.escv_Id}
                                            >
                                                {estadoCivil.escv_Nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            name="eciv_Id"
                            control={control}
                            defaultValue={empleadoData.eciv_Id}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Controller
                            name="empl_FechaNacimiento"
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    error={!!errors.empl_FechaNacimiento}
                                    fullWidth={true}
                                >
                                    <FormLabel className="font-medium text-10" component="legend">
                                        Fecha de Nacimiento:
                                    </FormLabel>
                                    <DateTimePicker
                                        onChange={(date) => field.onChange(date)}
                                        required
                                        renderInput={(_props) => (
                                            <TextField
                                                className="w-full"
                                                {..._props}
                                                onBlur={field.onBlur}
                                                error={!!errors.empl_FechaNacimiento}
                                                helperText={errors?.empl_FechaNacimiento?.message}
                                            />
                                        )}
                                        className="w-full"
                                    />
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <div className=" mb-16">
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={!!errors.empl_Telefono} fullWidth={true}>
                                        <FormLabel
                                            className="font-medium text-10"
                                            component="legend"
                                        >
                                            Teléfono o Celular:
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            error={!!errors.empl_Telefono}
                                            fullWidth={true}
                                            inputprops={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                )}
                                name="empl_Telefono"
                                control={control}
                                defaultValue={empleadoData.empl_Telefono}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div className=" mb-16">
                            <Controller
                                render={({ field }) => (
                                    <FormControl
                                        error={!!errors.empl_CorreoElectronico}
                                        fullWidth={true}
                                    >
                                        <FormLabel
                                            className="font-medium text-10"
                                            component="legend"
                                        >
                                            Correo Electrónico
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            error={!!errors.empl_CorreoElectronico}
                                            fullWidth={true}
                                            inputprops={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                )}
                                name="empl_CorreoElectronico"
                                control={control}
                                defaultValue={empleadoData.empl_CorreoElectronico}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className=" mb-16">
                            <Controller
                                render={({ field }) => (
                                    <FormControl
                                        error={paisSeleccionado === "0"}
                                        fullWidth={true}
                                    >
                                        <FormLabel
                                            className="font-medium text-10"
                                            component="legend"
                                        >
                                            Pais
                                        </FormLabel>
                                        <Select
                                            {...field}
                                            fullWidth={true}
                                            error={field.value === "0"}
                                            defaultValue={0}
                                            inputProps={{
                                                startAdornment: <InputAdornment position="start" />,
                                            }}
                                            value={paisSeleccionado}
                                            onChange={(e) => {
                                                const selectedValue = e.target.value;
                                                setPaisSeleccionado(selectedValue);
                                                field.onChange(selectedValue);
                                                setProvinciasHabilitadas(selectedValue !== "0");
                                                cargarProvincias(selectedValue); // Carga las provincias cuando se selecciona un país
                                            }}
                                        >
                                            <MenuItem value="0">Seleccione una opción...</MenuItem>
                                            {paises.map((paises) => (
                                                <MenuItem key={paises.pais_Id} value={paises.pais_Id}>
                                                    {paises.pais_Codigo + " - " + paises.pais_Nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                                name="pais_Id"
                                control={control}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className="mb-16">
                            <Controller
                                defaultValue={0}
                                name="pvin_Id"
                                control={control}
                                render={({ field }) => (
                                    <FormControl error={field.value === "0"} fullWidth={true}>
                                        <FormLabel
                                            className="font-medium text-10"
                                            component="legend"
                                        >
                                            Provincias
                                        </FormLabel>
                                        <Select
                                            {...field} // Proporciona todos los atributos necesarios del campo
                                            fullWidth={true}
                                            inputProps={{
                                                startAdornment: <InputAdornment position="start" />,
                                            }}
                                            disabled={!provinciasHabilitadas}
                                        >
                                            <MenuItem value="0">Seleccione una opción...</MenuItem>
                                            {provincias.map((provincia) => (
                                                <MenuItem
                                                    key={provincia.pvin_Id}
                                                    value={provincia.pvin_Id}
                                                >
                                                    {provincia.pvin_Codigo +
                                                        " - " +
                                                        provincia.pvin_Nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div className=" mb-16">
                            <Controller
                                defaultValue={empleadoData.carg_Id}
                                render={({ field }) => (
                                    <FormControl error={field.value === "0"} fullWidth={true}>
                                        <FormLabel
                                            className="font-medium text-10"
                                            component="legend"
                                        >
                                            Cargo que desempeña:
                                        </FormLabel>
                                        <Select
                                            {...field}
                                            fullWidth={true}
                                            error={field.value === "0" || field.value === undefined}
                                            defaultValue={empleadoData.carg_Id}
                                            inputprops={{
                                                startAdornment: <InputAdornment position="start" />,
                                            }}
                                            onChange={(e) => {
                                                const selectedValue = e.target.value;
                                                setCargoSeleccionado(selectedValue);
                                                field.onChange(selectedValue); // Actualiza el valor en react-hook-form
                                            }}
                                        >
                                            <MenuItem value="0">Seleccione una opción...</MenuItem>
                                            {cargos.map((cargos) => (
                                                <MenuItem key={cargos.carg_Id} value={cargos.carg_Id}>
                                                    {cargos.carg_Nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                                name="carg_Id"
                                control={control}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className=" mb-16">
                            <Controller
                                render={({ field }) => (
                                    <FormControl error={!!errors.empl_Direccion} fullWidth={true}>
                                        <FormLabel
                                            className="font-medium text-10"
                                            component="legend"
                                        >
                                            Dirección Exacta:
                                        </FormLabel>
                                        <TextField
                                            {...field}
                                            variant="outlined"
                                            error={!!errors.empl_Direccion}
                                            fullWidth={true}
                                            inputprops={{
                                                startAdornment: (
                                                    <InputAdornment position="start"></InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                )}
                                name="empl_Direccion"
                                control={control}
                                defaultValue={empleadoData.empl_Direccion}
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
                            style={{ borderRadius: "10px", marginRight: "10px" }}
                            sx={{
                                backgroundColor: "#634A9E",
                                color: "white",
                                "&:hover": { backgroundColor: "#6e52ae" },
                            }}
                            onClick={AgregarRegistro}
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
                            onClick={() => {
                                navigate("/Empleados/Index");
                            }}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
            <ToastContainer />
        </Card>
    );
}

export default EmpleadosEditar;
