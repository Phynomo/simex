import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  FormControl,
  Icon,
  InputLabel,
  TextField,
  Chip,
  InputAdornment,
  FormLabel,
  Divider
} from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardMedia from "@mui/material/CardMedia";
import Autocomplete from '@mui/material/Autocomplete';
import History from "src/@history/@history";
import Grid from "@mui/material/Grid";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { black } from "tailwindcss/colors";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

function Persona_Juridica_Agregar() {

  //Constante Navigate para la redirección a otras paginas
  const Navigate = useNavigate();
  const theme = useTheme();

  //Constante value para movernos entre las tabs, seteandose en 0 para colocarnos en la primera tabulacion
  const [value, setValues] = React.useState(0);
  
  //Constante que se validara en la primera tab de Datos Generales
  const [RTNSolicitante, setRTNSolicitante] = useState('');
  const [validRTNSolicitante, setValidRTNSolicitante] = useState(true);

  //Constante para setear los valores vacios de los autocomplete tab 2
  const [estadosciviles, setestadosciviles] = useState(  {value: '0',label: 'Seleccione una opción',},);
  const [oficinas, setoficinas] = useState(  {value: '0',label: 'Seleccione una opción',},);
  const [oficios, setoficios] = useState(  {value: '0',label: 'Seleccione una opción',},);

  //Constante para setear los valores vacios de los autocomplete tab 3
  const [departamento, setdepartamento] = useState( {value: '0',label: 'Seleccione una opción',},);
  const [ciudad, setciudad] = useState( {value: '0',label: 'Seleccione una opción',},);
  const [aldea, setaldea] = useState( {value: '0',label: 'Seleccione una opción',},);

   //Constante para setear los valores vacios de los autocomplete tab 4
   const [departamentoTab4, setdepartamentoTab4] = useState( {value: '0',label: 'Seleccione una opción',},);
   const [ciudadTab4, setciudadTab4] = useState( {value: '0',label: 'Seleccione una opción',},);
   const [aldeaTab4, setaldeaTab4] = useState( {value: '0',label: 'Seleccione una opción',},);

  //Constante para obtener los valores del autocomplete y asignarlo.
  const getdataOficinas = (data) => {
    if (data.value != null) {
      setoficinas({ value: data.value, label: data.label })
      SetValueTab2('oficinas', data.value)
    } else {
      console.log('Mundo rosita!')
    }
  }

  //Constante para obtener los valores del autocomplete y asignarlo.
  const getdataEstadosCiviles = (data) => {
    if (data.value != null) {
      setestadosciviles({ value: data.value, label: data.label })
      SetValueTab2('estadosciviles', data.value)
    } else {
      console.log('Mundo rosita!')
    }
  }

  //Constante para obtener los valores del autocomplete y asignarlo.
  const getdataOficios = (data) => {
    if (data.value != null) {
      setoficios({ value: data.value, label: data.label })
      SetValueTab2('oficios', data.value)
    } else {
      console.log('Mundo rosita!')
    }
  }

   //Constante para obtener los valores del autocomplete y asignarlo.
   const getdataDepartamentos = (data) => {
    if (data.value != null) {
      setdepartamento({ value: data.value, label: data.label })
      SetValueTab3('departamento', data.value)
    } else {
      console.log('Mundo rosita!')
    }
  }

  //Constante para obtener los valores del autocomplete y asignarlo.
  const getdataCiudades = (data) => {
    if (data.value != null) {
      setciudad({ value: data.value, label: data.label })
      SetValueTab3('ciudad', data.value)
    } else {
      console.log('Mundo rosita!')
    }
  }

  //Constante para obtener los valores del autocomplete y asignarlo.
  const getdataAldea = (data) => {
    if (data.value != null) {
      setaldea({ value: data.value, label: data.label })
      SetValueTab3('aldea', data.value)
    } else {
      console.log('Mundo rosita!')
    }
  }

   //Constante para obtener los valores del autocomplete y asignarlo.
   const getdataDepartamentosTab4 = (data) => {
    if (data.value != null) {
      setdepartamento({ value: data.value, label: data.label })
      SetValueTab4('departamento', data.value)
    } else {
      console.log('Mundo rosita!')
    }
  }

  //Constante para obtener los valores del autocomplete y asignarlo.
  const getdataCiudadesTab4 = (data) => {
    if (data.value != null) {
      setciudad({ value: data.value, label: data.label })
      SetValueTab4('ciudad', data.value)
    } else {
      console.log('Mundo rosita!')
    }
  }

  //Constante para obtener los valores del autocomplete y asignarlo.
  const getdataAldeaTab4 = (data) => {
    if (data.value != null) {
      setaldea({ value: data.value, label: data.label })
      SetValueTab4('aldea', data.value)
    } else {
      console.log('Mundo rosita!')
    }
  }


  const handleChange = (event, newValue) => {
    setValues(newValue);
  };

  //Constante para validar la primera tab
  const sendTab1 = () => {
    let valid = true;

    //Validar que el RTN no este vacio
    if (RTNSolicitante.trim() === '') {
      setValidRTNSolicitante(false);
      valid = false;
    }

    if (valid) {
      //Una vez el rtn esta lleno el valid cambia a true ya se tabula a la siguiente tabulacion

      console.log('Data saved!');
      validacion(1);
      // Reset the form

    }
  };

  //Constante para los valores por defecto de la primera tab 1
  const defaultTab1Values = {
    rtn: ""
  };

  //Constante para los valores por defecto de la primera tab 2
  const defaultTab2Values = {
    oficinas: '',
    estadosciviles: '',
    oficios: ''
  };  

  //Constante para los valores por defecto de la primera tab 3
  const defaultTab3Values = {
    departamento: '',
    ciudad: '',
    aldea: '',
    calle: '',
    colonia: '',
    edificio: '',
    referencia: ''
  };  

  //Constante para los valores por defecto de la primera tab 4
  const defaultTab4Values = {
    departamento: '',
    ciudad: '',
    aldea: '',
    calle: '',
    colonia: '',
    edificio: '',
    referencia: ''
  }; 
  
  //Constante para los valores por defecto de la primera tab 5
  const defaultTab5Values = {
    numerofijoempresa: '',
    numerofijorepresentante:'', 
    telefonorepresentante:'', 
    correoelectronico:'', 
    codigoverificacion:'',
    correoalternativo:'',
    codigoverificacionalternativo:''
  };

   //Constante para los valores por defecto de la primera tab 6
   const defaultTab6Values = {
    RTNMercantil: '',
    RTNLegal:'', 
    DNILegal:'', 
    EscrituraPublica:''
  };

   //Esquema de validacion de la tabulacion 1
   const Tab1Schema = yup.object().shape({
    rtn: yup.string().required()
  });

  //Esquema de validacion de la tabulacion 2
  const Tab2Schema = yup.object().shape({
    oficinas: yup.string().required(),
    estadosciviles: yup.string().required(),
    oficios: yup.string().required(),
  });

   //Esquema de validacion de la tabulacion 3
   const Tab3Schema = yup.object().shape({
    departamento: yup.string().required(),
    ciudad: yup.string().required(),
    aldea: yup.string().required(),
    calle: yup.string().required(),
    colonia: yup.string().required(),
    edificio: yup.string().required(),
    referencia: yup.string().required()
  });

  //Esquema de validacion de la tabulacion 4
  const Tab4Schema = yup.object().shape({
    departamento: yup.string().required(),
    ciudad: yup.string().required(),
    aldea: yup.string().required(),
    calle: yup.string().required(),
    colonia: yup.string().required(),
    edificio: yup.string().required(),
    referencia: yup.string().required()
  });

  //Esquema de validacion de la tabulacion 5
  const Tab5Schema = yup.object().shape({
    numerofijoempresa: yup.string().required(),
    numerofijorepresentante: yup.string().required(),
    telefonorepresentante: yup.string().required(),
    correoelectronico: yup.string().required(),
    codigoverificacion: yup.string().required(),
    correoalternativo: yup.string().required(),
    codigoverificacionalternativo: yup.string().required()
  });


   //Constante UseForm que nos ayudara con las validacions de las tabulaciones
    const { handleSubmit, reset, control, formState, watch,setValue } = useForm({
      defaultTab1Values,
      mode: "all",
      resolver: yupResolver(Tab1Schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    //Constante UseForm que nos ayudara con las validacions de las tabulaciones
    const { handleSubmit:HandleSubmitTab2, reset:Tab2Reset, control:Tab2Control, formState:FormState2, watch:WacthTab2,setValue:SetValueTab2 } = useForm({
      defaultTab2Values,
      mode: "all",
      resolver: yupResolver(Tab2Schema),
    });

    const { isValid:IsvalidXD, dirtyFields:QueraroXD, errors:ErroresTab2 } = FormState2;

     //Constante UseForm que nos ayudara con las validacions de las tabulaciones
     const { handleSubmit:HandleSubmitTab3, reset:Tab3Reset, control:Tab3Control, formState:FormState3, watch:WacthTab3,setValue:SetValueTab3 } = useForm({
      defaultTab3Values,
      mode: "all",
      resolver: yupResolver(Tab3Schema),
    });

    const { isValid:IsvalidTab3, dirtyFields:dirtyTab3, errors:ErroresTab3 } = FormState3;

     //Constante UseForm que nos ayudara con las validacions de las tabulaciones
     const { handleSubmit:HandleSubmitTab4, reset:Tab4Reset, control:Tab4Control, formState:FormState4, watch:WacthTab4,setValue:SetValueTab4 } = useForm({
      defaultTab4Values,
      mode: "all",
      resolver: yupResolver(Tab4Schema),
    });
  
    const { isValid:IsvalidTab4, dirtyFields:dirtyTab4, errors:ErroresTab4 } = FormState4;

    //Constante UseForm que nos ayudara con las validacions de las tabulaciones
    const { handleSubmit:HandleSubmitTab5, reset:Tab5Reset, control:Tab5Control, formState:FormState5, watch:WacthTab5,setValue:SetValueTab5 } = useForm({
      defaultTab5Values,
      mode: "all",
      resolver: yupResolver(Tab5Schema),
    });
  
    const { isValid:IsvalidTab5, dirtyFields:dirtyTab5, errors:ErroresTab5 } = FormState5;

  //Constante ToastSuccess y ToastWarning que nos sirven para las alertas en las validaciones del formulario
  const ToastSuccess =() => {
    toast.success('Datos ingresados correctamente.', {
      theme: 'dark',
      style: {
        marginTop: '50px'
      },
      autoClose: 1500,
      closeOnClick: true
    });
  }

  //Constante que ejecuta el toast cuando los datos fueron correctos y se pasa a la siguiente tab
    const ToastWarning = () => {
      toast.warning('No se permiten campos vacios.', {
        theme: 'dark',
        //  position: toast.POSITION.BOTTOM_RIGHT
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }

    //Constante que ejecuta el toast cuando los datos que deseamos ingresar ya existen
    const ToastInfoWarning = () => {
      toast.warning('El dato que desea ingresar ya existe.', {
        theme: 'dark',
        //  position: toast.POSITION.BOTTOM_RIGHT
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }

    //Constante que ejecuta el toast cuando la APÍ falla
    const ToastErrorApi = () => {
      toast.warning('Error en el proceso de los.', {
        theme: 'dark',
        //  position: toast.POSITION.BOTTOM_RIGHT
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }

   //Constante que valida los datos de la tab 1 y que ejecuta los toast cuando sean necesarios
  const ValidacionAgregar = (data) => {
    let validarTab1 = true;
    if (data.rtn != null) {
      if (data.rtn.trim() === "") {
        ToastWarning();
        return validarTab1 = true;
      } else {
        ToastSuccess();
        setTimeout(() => {
          validacion(1);
        }, 100); // Establece un pequeño retraso antes de llamar a MostrarCollapseAgregar
        return validarTab1 = false;
      }
    } else {
     ToastInfoWarning();
     return validarTab1 = true;
    }
  };  

   //Constante que valida los datos de la tab 2 y que ejecuta los toast cuando sean necesarios
   const ValidacionTab2 = (data) => {
    let validar = true;
    if(data.oficinas != undefined || data.estadosciviles != undefined || data.oficios != undefined){
      console.log(validar)
      if(data.oficinas === '' || data.estadosciviles === '' || data.oficios === ''){
        ToastWarning();
        return validar = true;
      }else{
        ToastSuccess();
        validacion(2);
        return validar = false;
      }
    }else{
      ToastWarning();
      return validar = true;
    }
  };  

  //Constante que valida los datos de la tab 3 y que ejecuta los toast cuando sean necesarios
  const ValidacionTab3 = (data) => {
    let validar = true;
    if(data.departamento != undefined || data.ciudad != undefined || data.aldea != undefined ){
      if(data.departamento  === '' || data.ciudad === '' ||  data.aldea === '' || data.calle === '' || data.colonia === '' || data.edificio === '' || data.referencia === ''){
        ToastWarning();
        return validar = true;
      }else{
        ToastSuccess();
        validacion(3);
        return validar = false;
      }
    }else{
      ToastWarning();
      return validar = true;
    }
  };  

  //Constante que valida los datos de la tab 4 y que ejecuta los toast cuando sean necesarios
  const ValidacionTab4 = (data) => {
    let validar = true;
    if(data.departamento != undefined || data.ciudad != undefined || data.aldea != undefined ){
      if(data.departamento  === '' || data.ciudad === '' ||  data.aldea === '' || data.calle === '' || data.colonia === '' || data.edificio === '' || data.referencia === ''){
        ToastWarning();
        return validar = true;
      }else{
        ToastSuccess();
        validacion(3);
        return validar = false;
      }
    }else{
      ToastWarning();
      return validar = true;
    }
  }; 

    //Constante que valida los datos de la tab 4 y que ejecuta los toast cuando sean necesarios
    const ValidacionTab5 = (data) => {
      let validar = true;
      if(data.numerofijoempresa != null || data.numerofijorepresentante != null || data.telefonorepresentante != null || data.correoalternativo != null || data.correoelectronico != null || data.codigoverificacion != null || data.codigoverificacionalternativo != null){
        if(data.numerofijoempresa != '' && data.numerofijorepresentante  != '' && data.telefonorepresentante != '' && data.correoalternativo  != '' && data.correoelectronico != '' && data.codigoverificacion  != '' && data.codigoverificacionalternativo  != ''){
          ToastSuccess();
          // validacion(4);
          History.push('/Contrato-de-Adhesion-Persona-Juridica/Index')
          return validar = false;
        }else{
          ToastWarning();
          return validar = true;
        }
      }else{
        ToastWarning();
        return validar = true;
      }
    }; 
    
  

  const AgregarRegistro = () => {
    const formData = watch();
    const ValidarSub = ValidacionAgregar(formData);
    if(ValidarSub){
      handleSubmit(ValidacionAgregar)();
    }
  };

  const AgregarRegistroTab2 = () => {
    const formData = WacthTab2();
    const validationResult = ValidacionTab2(formData);
    if (validationResult){
    HandleSubmitTab2(ValidacionTab2)();
  }
  };

  
  const AgregarRegistroTab3 = () => {
    const formData = WacthTab3();
    const validationResult = ValidacionTab3(formData);
    if (validationResult){
      HandleSubmitTab3(ValidacionTab3)();
    }
  };

  const AgregarRegistroTab4 = () => {
    const formData = WacthTab4();
    const validationResult = ValidacionTab4(formData);
    if (validationResult){
      HandleSubmitTab4(ValidacionTab4)();
    }
  };

  const AgregarRegistroTab5 = () => {
    const formData = WacthTab5();
    const validationResult = ValidacionTab5(formData);
    if (validationResult){
      HandleSubmitTab5(ValidacionTab5)();
    }
  };



  const handleChangeIndex = (index) => {
    setValues(index);
  };

  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
    tab2: true,
    tab3: true,
    tab4: true,
  });

  /*const validacion = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    if (params == 1) {
      settabsEstado({
        tab1: false,
        tab2: true,
        tab3: true,
        tab4: true,
      });
      setValue(1);
    }

    if (params == 2) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: true,
        tab4: true,
      });
      setValue(2);
    }

    if (params == 3) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: true,
      });
      setValue(3);
    }

    if (params == 4) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
      });
      setValue(4);
    }
  };*/

  const validacion = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    if (params === 1) {
      settabsEstado({
        tab1: false,
      });
      setValues(1);
    }
    if (params === 2) {
      settabsEstado({
        tab1: false,
        tab2: false,  
      });
      setValues(2);
    }
    if (params === 3) {
      settabsEstado({
        tab1: false,
        tab2: false, 
        tab3: false, 
      });
      setValues(3);
    }

    if (params === 4) {
      settabsEstado({
        tab1: false,
        tab2: false, 
        tab3: false, 
        tab4: false,
      });
      setValues(4);
    }
  };


  const options = [
    {
      value: 'chocolate',
      label: 'Chocolate',
    },
    {
      value: 'strawberry',
      label: 'Strawberry',
    },
    {
      value: 'vanilla',
      label: 'Vanilla',
    },
  ];

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <ToastContainer />
       <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/cFBKy66/CONTRATO-DE-ADHESI-N-PERSONA-JURIDICA.png"
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
            sx={{ backgroundColor: '#FFF7F7', color: black }}
          >
            <Tab label="Datos Generales" {...a11yProps(0)} />
            <Tab label="Datos a Informar" {...a11yProps(1)} disabled={tabsEstado.tab1} />
            <Tab label="Datos a Informar" {...a11yProps(1)} disabled={tabsEstado.tab2} />
            <Tab label="Datos a Informar" {...a11yProps(1)} disabled={tabsEstado.tab3} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip color='default' label="Dato General" />
                </Divider>
            </Grid>
            <br></br>
            <Grid container spacing={3}>
            <Grid item xs={3}></Grid>
              <Grid item xs={6}>
              <FormControl error={!!errors.rtn} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      RTN Solicitante
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="Registro Nacional Tributario"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errors.rtn}
                      ></TextField>
                    )}
                    name="rtn"
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
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={() => AgregarRegistro(1)}
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
                    Navigate("/Contrato-de-Adhesion-Persona-Juridica/Index");
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
          <h2>Dato a Informar</h2>
            <br></br>
            <Grid container spacing={3}>
              <Grid item xs={6}>
              <Controller
                    render={({ field }) => (
                      <FormControl error={!!ErroresTab2.oficinas} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Oficinas
                    </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        // isOptionEqualToValue={(option, value) => option.value === value.value}
                        id="combo-box-demo"
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option.label}
                        options={options}
                        value={oficinas}
                        onChange={(event, value) => { value ? getdataOficinas(value) : null }}
                        // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
                        renderInput={(params) => <TextField {...params} error={!!ErroresTab2.oficinas} InputLabelProps={{ shrink: true }} />}
                      />
                      </FormControl>
                    )}
                    name="oficinas"
                    error={!!ErroresTab2.oficinas}
                    control={Tab2Control}
                  />
              </Grid>

              <Grid item xs={6}>
              <Controller
                    render={({ field }) => (
                      <FormControl error={!!ErroresTab2.estadosciviles} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                     Estados Civiles
                    </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        // isOptionEqualToValue={(option, value) => option.value === value.value}
                        id="combo-box-demo"
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option.label}
                        options={options}
                        value={estadosciviles}
                        onChange={(event, value) => { value ? getdataEstadosCiviles(value) : null }}
                        // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
                        renderInput={(params) => <TextField {...params} error={!!ErroresTab2.estadosciviles} InputLabelProps={{ shrink: true }} />}
                      />
                      </FormControl>
                    )}
                    name="estadosciviles"
                    error={!!ErroresTab2.estadosciviles}
                    control={Tab2Control}
                  />
              </Grid>

              <Grid item xs={12}>
              <Controller
                    render={({ field }) => (
                      <FormControl error={!!ErroresTab2.oficios} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                     Profesiones/Oficios
                    </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        // isOptionEqualToValue={(option, value) => option.value === value.value}
                        id="combo-box-demo"
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option.label}
                        options={options}
                        value={oficios}
                        onChange={(event, value) => { value ? getdataOficios(value) : null }}
                        // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
                        renderInput={(params) => <TextField {...params} error={!!ErroresTab2.oficios} InputLabelProps={{ shrink: true }} />}
                      />
                      </FormControl>
                    )}
                    name="oficios"
                    error={!!ErroresTab2.oficios}
                    control={Tab2Control}
                  />
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
                  onClick={() => AgregarRegistroTab2()}
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
                    Navigate("/Contrato-de-Adhesion-Persona-Juridica/Index");
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip color='default' label="Domicilio de la empresa" />
                </Divider>
            </Grid>
            <Grid container spacing={3}>
            <Grid item xs={6}>
            <Controller
                    render={({ field }) => (
                      <FormControl error={!!ErroresTab3.departamento} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Departamento
                    </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        // isOptionEqualToValue={(option, value) => option.value === value.value}
                        id="combo-box-demo"
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option.label}
                        options={options}
                        value={departamento}
                        onChange={(event, value) => { value ? getdataDepartamentos(value) : null }}
                        // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
                        renderInput={(params) => <TextField {...params} error={!!ErroresTab3.departamento} InputLabelProps={{ shrink: true }} />}
                      />
                      </FormControl>
                    )}
                    name="departamento"
                    error={!!ErroresTab3.departamento}
                    control={Tab3Control}
                  />
              </Grid>       
              <Grid item xs={6}>
                <Controller
                    render={({ field }) => (
                      <FormControl error={!!ErroresTab3.ciudad} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Ciudad
                    </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        // isOptionEqualToValue={(option, value) => option.value === value.value}
                        id="combo-box-demo"
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option.label}
                        options={options}
                        value={ciudad}
                        onChange={(event, value) => { value ? getdataCiudades(value) : null }}
                        // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
                        renderInput={(params) => <TextField {...params} error={!!ErroresTab3.ciudad} InputLabelProps={{ shrink: true }} />}
                      />
                      </FormControl>
                    )}
                    name="ciudad"
                    error={!!ErroresTab3.ciudad}
                    control={Tab3Control}
                  />
              </Grid>       

              <Grid item xs={6}>
                <Controller
                    render={({ field }) => (
                      <FormControl error={!!ErroresTab3.aldea} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Aldea
                    </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        // isOptionEqualToValue={(option, value) => option.value === value.value}
                        id="combo-box-demo"
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option.label}
                        options={options}
                        value={aldea}
                        onChange={(event, value) => { value ? getdataAldea(value) : null }}
                        // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
                        renderInput={(params) => <TextField {...params} error={!!ErroresTab3.aldea} InputLabelProps={{ shrink: true }} />}
                      />
                      </FormControl>
                    )}
                    name="aldea"
                    error={!!ErroresTab3.aldea}
                    control={Tab3Control}
                  />
              </Grid>       
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab3.calle} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Calle o avenida
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="ingrese la calle o avenida"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab3.calle}
                      ></TextField>
                    )}
                    name="calle"
                    control={Tab3Control}
                  ></Controller>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab3.colonia} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Barrio o colonia
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="ingrese el barrio o colonia"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab3.colonia}
                      ></TextField>
                    )}
                    name="colonia"
                    control={Tab3Control}
                  ></Controller>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab3.edificio} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Barrio o colonia
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="Ingrese el edificio con el numero de local"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab3.edificio}
                      ></TextField>
                    )}
                    name="edificio"
                    control={Tab3Control}
                  ></Controller>
              </FormControl>
              </Grid><Grid item xs={12}>
              <FormControl error={!!ErroresTab3.referencia} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Punto de referencia
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        id="outlined-disabled"
                        placeholder="Ingrese el punto de referencia"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab3.referencia}
                      ></TextField>
                    )}
                    name="referencia"
                    control={Tab3Control}
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
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={() => AgregarRegistroTab3()}
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
                    Navigate("/Contrato-de-Adhesion-Persona-Juridica/Index");
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip color='default' label="Domicilio del representante Legal" />
                </Divider>
            </Grid>
            <Grid container spacing={3}>
            <Grid item xs={6}>
            <Controller
                    render={({ field }) => (
                      <FormControl error={!!ErroresTab4.departamento} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Departamento
                    </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        // isOptionEqualToValue={(option, value) => option.value === value.value}
                        id="combo-box-demo"
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option.label}
                        options={options}
                        value={departamentoTab4}
                        onChange={(event, value) => { value ? getdataDepartamentosTab4(value) : null }}
                        // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
                        renderInput={(params) => <TextField {...params} error={!!ErroresTab4.departamento} InputLabelProps={{ shrink: true }} />}
                      />
                      </FormControl>
                    )}
                    name="departamento"
                    error={!!ErroresTab4.departamento}
                    control={Tab4Control}
                  />
              </Grid>       
              <Grid item xs={6}>
                <Controller
                    render={({ field }) => (
                      <FormControl error={!!ErroresTab4.ciudad} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Ciudad
                    </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        // isOptionEqualToValue={(option, value) => option.value === value.value}
                        id="combo-box-demo"
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option.label}
                        options={options}
                        value={ciudadTab4}
                        onChange={(event, value) => { value ? getdataCiudadesTab4(value) : null }}
                        // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
                        renderInput={(params) => <TextField {...params} error={!!ErroresTab4.ciudad} InputLabelProps={{ shrink: true }} />}
                      />
                      </FormControl>
                    )}
                    name="ciudad"
                    error={!!ErroresTab4.ciudad}
                    control={Tab4Control}
                  />
              </Grid>       

              <Grid item xs={6}>
                <Controller
                    render={({ field }) => (
                      <FormControl error={!!ErroresTab4.aldea} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Aldea
                    </FormLabel>
                      <Autocomplete
                        {...field}
                        disablePortal
                        // isOptionEqualToValue={(option, value) => option.value === value.value}
                        id="combo-box-demo"
                        disableClearable={true}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        getOptionLabel={(option) => option.label}
                        options={options}
                        value={aldeaTab4}
                        onChange={(event, value) => { value ? getdataAldeaTab4(value) : null }}
                        // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
                        renderInput={(params) => <TextField {...params} error={!!ErroresTab4.aldea} InputLabelProps={{ shrink: true }} />}
                      />
                      </FormControl>
                    )}
                    name="aldea"
                    error={!!ErroresTab4.aldea}
                    control={Tab4Control}
                  />
              </Grid>       
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab4.calle} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Calle o avenida
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="ingrese la calle o avenida"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab4.calle}
                      ></TextField>
                    )}
                    name="calle"
                    control={Tab4Control}
                  ></Controller>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab4.colonia} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Barrio o colonia
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="ingrese el barrio o colonia"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab4.colonia}
                      ></TextField>
                    )}
                    name="colonia"
                    control={Tab4Control}
                  ></Controller>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab4.edificio} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Barrio o colonia
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="Ingrese el edificio con el numero de local"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab4.edificio}
                      ></TextField>
                    )}
                    name="edificio"
                    control={Tab4Control}
                  ></Controller>
              </FormControl>
              </Grid><Grid item xs={12}>
              <FormControl error={!!ErroresTab4.referencia} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Punto de referencia
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        multiline
                        id="outlined-disabled"
                        placeholder="Ingrese el punto de referencia"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab4.referencia}
                      ></TextField>
                    )}
                    name="referencia"
                    control={Tab4Control}
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
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={() => AgregarRegistroTab4()}
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
                    Navigate("/Contrato-de-Adhesion-Persona-Juridica/Index");
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
             <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip color='default' label="Información de contacto" />
                </Divider>
            </Grid>
            <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl error={!!ErroresTab5.numerofijoempresa} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Numero de telefono fijo de la empresa
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="Ingrese el numero fijo de la empresa"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab5.numerofijoempresa}
                      ></TextField>
                    )}
                    name="numerofijoempresa"
                    control={Tab5Control}
                  ></Controller>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab5.numerofijorepresentante} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Numero de telefono fijo del representante
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="Ingrese el numero fijo del representante"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab5.numerofijorepresentante}
                      ></TextField>
                    )}
                    name="numerofijorepresentante"
                    control={Tab5Control}
                  ></Controller>
              </FormControl>
              </Grid>             
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab5.telefonorepresentante} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Numero de telefono celular del representante
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="Ingrese el telefono celular del representante"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab5.telefonorepresentante}
                      ></TextField>
                    )}
                    name="telefonorepresentante"
                    control={Tab5Control}
                  ></Controller>
              </FormControl>
              </Grid>    
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab5.correoelectronico} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Correo electronico donde notificar sobre solicitudes
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="Ingrese el correo electronico"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab5.correoelectronico}
                      ></TextField>
                    )}
                    name="correoelectronico"
                    control={Tab5Control}
                  ></Controller>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab5.codigoverificacion} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Codigo de verificación del correo electronico 
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="Ingrese el codigo de verificacion del correo electronico"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab5.codigoverificacion}
                      ></TextField>
                    )}
                    name="codigoverificacion"
                    control={Tab5Control}
                  ></Controller>
              </FormControl>
              </Grid>    
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab5.correoalternativo} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      Correo electronico alternativo donde notificar sobre solicitudes
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="Ingrese el correo electronico alternativo"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab5.correoalternativo}
                      ></TextField>
                    )}
                    name="correoalternativo"
                    control={Tab5Control}
                  ></Controller>
              </FormControl>
              </Grid> 
              <Grid item xs={6}>
              <FormControl error={!!ErroresTab5.codigoverificacion} fullWidth>
                    <FormLabel
                      className="font-medium text-10"
                      component="legend"
                    >
                      CCodigo de verificacion de correo electronico alternativo
                    </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        placeholder="Ingrese el codigo de verficacion del correo electronico alternativo"
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!ErroresTab5.codigoverificacion}
                      ></TextField>
                    )}
                    name="codigoverificacion"
                    control={Tab5Control}
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
                  startIcon={<Icon>checked</Icon>}
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={() => AgregarRegistroTab5()}
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
                    Navigate("/Contrato-de-Adhesion-Persona-Juridica/Index");
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

export default Persona_Juridica_Agregar;