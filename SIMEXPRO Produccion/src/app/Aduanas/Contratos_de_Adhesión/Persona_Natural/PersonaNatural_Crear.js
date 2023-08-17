/* eslint-disable camelcase */
import {
  CardMedia,
  CardContent,
  Card,
  Button,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Icon,
  TextField,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Box,
  Avatar,
  InputAdornment,
  InputLabel,
  MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { useState } from 'react';
import { margin } from '@mui/system';

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from "@lodash";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withWidth } from '@material-ui/core';

import {useDropzone} from 'react-dropzone';




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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


function PersonaNatural_Crear() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  
  const [RTNSolicitante, setRTNSolicitante] = useState('');
  const [DNI, setDNI] = useState('');
  const [Recibo, setRecibo] = useState('');
  const [OficinaRegional, setOficinaRegional] = useState('');
  const [EstadoCivil, setEstadoCivil] = useState('');
  const [Profesion, setProfesion] = useState('');
  const [DepartamentoMunicipio, setDepartamentoMunicipio] = useState('');
  const [Ciudad, setCiudad] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [TelefonoFijo, setTelefonoFijo] = useState('');
  const [Celular, setCelular] = useState('');
  const [Correo, setCorreo] = useState('');
  const [CodigoVeri, setCodigoVeri] = useState('');
  const [CorreoAlter, setCorreoAlter] = useState('');
  const [CodigoVeri2, setCodigoVeri2] = useState('');

  const [id, setId] = useState("");
  const [rtn, setRtn] = useState("");
  const [telefono, setTelefono] = useState("");

  const [validRTNSolicitante, setValidRTNSolicitante] = useState(true);
  const [validDNI, setValidDNI] = useState(true);
  const [validRecibo, setValidRecibo] = useState(true);
  const [validOficinaRegional, setValidOficinaRegional] = useState(true);
  const [validEstadoCivil, setValidEstadoCivil] = useState(true);
  const [validProfesion, setValidProfesion] = useState(true);
  const [validDepartamentoMunicipio, setValidDepartamentoMunicipio] = useState(true);
  const [validCiudad, setValidCiudad] = useState(true);
  const [validDireccion, setValidDireccion] = useState(true);
  const [validTelefonoFijo, setValidTelefonoFijo] = useState(true);
  const [validCelular, setValidCelular] = useState(true);
  const [validCorreo, setValidCorreo] = useState(true);

  const [phone, setPhone] = React.useState();
  console.log(phone);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'document/pdf': ['.pdf'],
    }
  });

  // const acceptedFileItems = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  // const fileRejectionItems = fileRejections.map(({ file, errors }) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //     <ul>
  //       {errors.map(e => (
  //         <li key={e.code}>{e.message}</li>
  //       ))}
  //     </ul>
  //   </li>
  // ));

  const sendTab1 = () => {
    let valid = true;
    if (RTNSolicitante.trim() === '') {
      setValidRTNSolicitante(false);
      valid = false;
    }
    if (DNI.trim() === '') {
      setValidDNI(false);
      valid = false;
    }
    if (Recibo.trim() === '') {
      setValidRecibo(false);
      valid = false;
    }

    if (valid == true) {
      // Your logic to save data when all fields are valid

      console.log('Data saved!');
      validacion(1);
      // Reset the form

    }
  };

  const sendTab2 = () => {
    let valid = true;
        
    if (OficinaRegional.trim() === '') {
      setValidOficinaRegional(false);
      valid = false;
    }
    if (EstadoCivil.trim() === '') {
      setValidEstadoCivil(false);
      valid = false;
    }
    if (Profesion.trim() === '') {
      setValidProfesion(false);
      valid = false;
    }
    if (DepartamentoMunicipio.trim() === '') {
      setValidDepartamentoMunicipio(false);
      valid = false;
    }
    if (Ciudad.trim() === '') {
      setValidCiudad(false);
      valid = false;
    }
    if (Direccion.trim() === '') {
      setValidDireccion(false);
      valid = false;
    }
    if (TelefonoFijo.trim() === '') {
      setValidTelefonoFijo(false);
      valid = false;
    }
    if (Celular.trim() === '') {
      setValidCelular(false);
      valid = false;
    }
    if (Correo.trim() === '') {
      setValidCorreo(false);
      valid = false;
    }

    if(valid){
      console.log('Data saved 2!');
    };
  };

  const defaultTab1Values = {
    rtn: "",
    dni: "",
    recibo: "",
  };
  const Tab1Schema = yup.object().shape({
    rtn: yup.string().required(),
    dni: yup.string().required(),
    recibo: yup.string().required(),
  });
  
  
  const defaultTab2Values = {
    oficinareg: "",
    estadocivil: "",
    profesion: "",
    depamun: "",
    ciudad: "",
    direccion: "",
    telefonofijo: "",
    telefonocelular: "",
    correo: "",
    correoveri: "",
    correoalter: "",
    correoveri2: "",
  };
  const Tab2Schema = yup.object().shape({
    rtn: yup.string().required(),
    dni: yup.string().required(),
    recibo: yup.string().required(),
  });
  
  
  const { handleSubmit, reset, control, formState, watch } = useForm({
    defaultTab1Values,
    mode: "all",
    resolver: yupResolver(Tab1Schema),
  });

  
  const ValidacionAgregar = (data) => {
    if (data.rtn != null) {
      if (data.rtn.trim() === "") {
        toast.error('Datos no ingresados correctamente.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      } else {
        toast.success('Datos ingresados correctamente.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
        setTimeout(() => {
          validacion(1);
        }, 100); // Establece un pequeño retraso antes de llamar a MostrarCollapseAgregar
      }
    } else {
      toast.error('Datos no ingresados correctamente.', {
        theme: 'dark',
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }
  };
  
  
  const { handleSubmit: handlesubmit1, reset: reset1, control: control1, formState: formState1 } = useForm({
    defaultTab2Values,
    mode: "all",
    resolver: yupResolver(Tab2Schema),
  });
  
  const { isValid, dirtyFields, errors } = formState;
  const { isValid: isValid1, dirtyFields: dirtyFields1, errors: errors1 } = formState1;

  const AgregarRegistro = () => {
    const formData = watch();
    ValidacionAgregar(formData);
    handleSubmit(ValidacionAgregar)();
    reset(defaultTab1Values);
  };


  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const onSubmitTab1 = (data) =>{
    console.log(data);
    settabsEstado({
      tab1: false,
    })
    setValue(1);
  };

  const onSubmitTab2 = (data) =>{
    console.log(data);
    setValue(2);
  }

  const validacion = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    if (params === 1) {
      settabsEstado({
        tab1: false,
      });
      setValue(1);
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <ToastContainer />
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/zrcrcFK/CONTRATO-DE-ADHESI-N-PERSONA-NATURAL.png"
        alt="Encabezado de la carta"
      />

      <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
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
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
              <Card style={{ marginBottom: '25px', Width: '100%'}}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="outlined-disabled"
                              label="RTN Solicitante"
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
                    <Grid item xs={2}>
                      {/* <div className="flex w-full h-48" style={{ marginLeft: '120%'}} >
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col  w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col ml-5 pt-5 pb-6">
                            <Avatar
                              alt="PDF Img"
                              src="https://i.ibb.co/7Wfzw5H/pdf.png"
                              sx={{ height: '25px', width: '25px' }}
                              variant="rounded"
                            />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400" {...getRootProps({ className: 'dropzone' })}>
                              <span className="font-semibold">Subir Archivo PDF</span>
                            </p>
                          </div>
                          <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" />
                        </label>
                      </div> */}
                        <label
                        htmlFor="dropzone"
                        className="flex flex-col w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" 
                        style={{ marginLeft: '120%'}}
                        >
                        <section className="container">
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <em><div className="flex flex-col ml-5 pt-5 pb-6">
                          <Avatar
                            alt="PDF Img"
                            src="https://i.ibb.co/7Wfzw5H/pdf.png"
                            sx={{ height: '25px', width: '25px' }}
                            variant="rounded"
                          />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Subir Archivo PDF</span>
                          </p>
                        </div></em>
                          </div>
                        </section>
                        </label>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="outlined-disabled"
                              label="DNI"
                              placeholder="Documento Nacional de Identificación (DNI)"
                              InputProps={{
                                startAdornment: (<InputAdornment position="start"></InputAdornment>),
                              }}
                              error={!!errors.dni}
                            ></TextField>
                          )}
                          name="dni"
                          control={control}
                        ></Controller>
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={6}>
                          <TextField
                            label="Documento Nacional de Identificación (DNI)"
                            fullWidth
                            variant="outlined"
                            placeholder="Documento Nacional de Identificación (DNI)"
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                            style={{
                              borderRadius: '10px',
                              // marginTop: '10px',
                              // border: '1.5px solid',
                              // borderColor: validDNI ? 'initial' : 'red'
                            }}
                            value={DNI}
                            onChange={(e) => {
                              setDNI(e.target.value);
                              setValidDNI(true);
                            }}
                          />
                    </Grid> */}
                    <Grid item xs={2}>
                      {/* <div className="flex w-full h-48" style={{ marginLeft: '120%'}}>
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col  w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col ml-5 pt-5 pb-6">
                            <Avatar
                              alt="PDF Img"
                              src="https://i.ibb.co/7Wfzw5H/pdf.png"
                              sx={{ height: '25px', width: '25px' }}
                              variant="rounded"
                            />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Subir Archivo PDF</span>
                            </p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                      </div> */}
                      <label
                        htmlFor="dropzone"
                        className="flex flex-col w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" 
                        style={{ marginLeft: '120%'}}
                        >
                        <section className="container">
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <em><div className="flex flex-col ml-5 pt-5 pb-6">
                          <Avatar
                            alt="PDF Img"
                            src="https://i.ibb.co/7Wfzw5H/pdf.png"
                            sx={{ height: '25px', width: '25px' }}
                            variant="rounded"
                          />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Subir Archivo PDF</span>
                          </p>
                        </div></em>
                          </div>
                        </section>
                        </label>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="outlined-disabled"
                              label="Recibo de Servicio Público"
                              placeholder="Número Recibo de Servicio Público (ENEE, SANAA, etc.)"
                              InputProps={{
                                startAdornment: (<InputAdornment position="start"></InputAdornment>),
                              }}
                              error={!!errors.recibo}
                            ></TextField>
                          )}
                          name="recibo"
                          control={control}
                        ></Controller>
                      </FormControl>
                    </Grid>
                    {/* <Grid item xs={6}>
                          <TextField
                            label="Número Recibo de Servicio Público (ENEE, SANAA, etc.)"
                            variant="outlined"
                            fullWidth
                            placeholder="Número Recibo de Servicio Público (ENEE, SANAA, etc.)"
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                            style={{
                              borderRadius: '10px',
                              // marginTop: '10px',
                              // border: '1.5px solid',
                              // borderColor: validRecibo ? 'initial' : 'red'
                            }}
                            value={Recibo}
                            onChange={(e) => {
                              setRecibo(e.target.value);
                              setValidRecibo(true);
                            }}
                          />
                    </Grid> */}
                    <Grid item xs={2}>
                      {/* <div className="flex w-full h-48" style={{ marginLeft: '120%'}}>
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col  w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col ml-5 pt-5 pb-6">
                            <Avatar
                              alt="PDF Img"
                              src="https://i.ibb.co/7Wfzw5H/pdf.png"
                              sx={{ height: '25px', width: '25px' }}
                              variant="rounded"
                            />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Subir Archivo PDF</span>
                            </p>
                          </div>
                          <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                      </div> */}
                      <label
                        htmlFor="dropzone"
                        className="flex flex-col w-full border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" 
                        style={{ marginLeft: '120%'}}
                        >
                        <section className="container">
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <em><div className="flex flex-col ml-5 pt-5 pb-6">
                          <Avatar
                            alt="PDF Img"
                            src="https://i.ibb.co/7Wfzw5H/pdf.png"
                            sx={{ height: '25px', width: '25px' }}
                            variant="rounded"
                          />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Subir Archivo PDF</span>
                          </p>
                        </div></em>
                          </div>
                        </section>
                        </label>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}
              >
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
                  onClick={() => AgregarRegistro(1)}
                  type="button"
                >
                  Guardar
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
                  onClick={() => {
                    navigate('/PersonaNatural/Index');
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>

              <Card style={{ marginBottom: '25px' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                          {/* <TextField
                            label="Oficina Regional de Aduanas más cercana"
                            select
                            fullWidth
                            variant="outlined"
                            placeholder="Oficina Regional de Aduanas más cercana"
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                            style={{
                              borderRadius: '10px',
                              // marginTop: '10px',
                              // border: '1.5px solid',
                              // borderColor: validOficinaRegional ? 'initial' : 'red'
                            }}
                            value={OficinaRegional}
                            onChange={(e) => {
                              setOficinaRegional(e.target.value);
                              setValidOficinaRegional(true);
                            }}                            
                          /> */}
                          <Controller
                            defaultValue=""
                            render={({ field }) => (
                              <FormControl error={!!errors.oficinareg} fullWidth>
                                <FormLabel
                                  className="font-medium text-10"
                                  component="legend"
                                >
                                  Oficina Regional
                                </FormLabel>
                                <Select
                                  {...field}
                                  fullWidth={true} 
                                  inputProps={{
                                    startadornment: <InputAdornment position="start" />,
                                  }}
                                >
                                <MenuItem value='Corte'>01 - Tegucigalpa, M.D.C</MenuItem>
                                <MenuItem value='Producción'>02 - San Pedro Sula, Cortés</MenuItem>

                                </Select>
                              </FormControl>
                            )}
                            name="oficinareg"
                            control={control}
                          />
                          
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        {/* <TextField
                          label="Estado Civil de la Persona"
                          select
                          variant="outlined"
                          placeholder="Estado Civil de la Persona"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '10px',
                            // marginTop: '10px',
                            // border: '1.5px solid',
                            // borderColor: validEstadoCivil ? 'initial' : 'red'
                          }}
                          value={EstadoCivil}
                          onChange={(e) => {
                            setEstadoCivil(e.target.value);
                            setValidEstadoCivil(true);
                          }}
                        /> */}
                        <Controller
                            defaultValue=""
                            render={({ field }) => (
                              <FormControl error={!!errors.estadocivil} fullWidth>
                                <FormLabel
                                  className="font-medium text-10"
                                  component="legend"
                                >
                                  Estado Civil
                                </FormLabel>
                                <Select
                                  {...field}
                                  fullWidth={true} 
                                  inputProps={{
                                    startadornment: <InputAdornment position="start" />,
                                  }}
                                >
                                <MenuItem value='soltero'>S - Soltero</MenuItem>
                                <MenuItem value='casado'>C - Casado</MenuItem>
                                <MenuItem value='divorciado'>D - Divorciado</MenuItem>
                                <MenuItem value='viudo'>V - Viudo</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                            name="estadocivil"
                            control={control}
                          />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl fullWidth>
                        {/* <TextField
                          label="Profesión u Oficio de la Persona"
                          style={{ borderRadius: '10px' }}
                          select
                          variant="outlined"
                          placeholder="Profesión u Oficio de la persona"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                        /> */}
                        <Controller
                            defaultValue=""
                            render={({ field }) => (
                              <FormControl error={!!errors.profesion} fullWidth>
                                <FormLabel
                                  className="font-medium text-10"
                                  component="legend"
                                >
                                  Profesión u Oficio de la persona
                                </FormLabel>
                                <Select
                                  {...field}
                                  fullWidth={true} 
                                  inputProps={{
                                    startadornment: <InputAdornment position="start" />,
                                  }}
                                >
                                <MenuItem value='Corte'>Hay no se, todas las profesiones</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                            name="pr"
                            control={control}
                          />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Divider style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <Chip label="DOMICILIO DE LA PERSONA" />
                  </Divider>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                          {/* <TextField
                            label="Departamento y Municipio"
                            select
                            variant="outlined"
                            placeholder="Departamento y Municipio"
                            InputProps={{
                              startAdornment: <InputAdornment position="start" />,
                            }}
                            style={{
                              borderRadius: '10px',
                              // marginTop: '10px',
                              // border: '1.5px solid',
                              // borderColor: validDepartamentoMunicipio ? 'initial' : 'red'
                            }}
                            value={DepartamentoMunicipio}
                            onChange={(e) => {
                              setDepartamentoMunicipio(e.target.value);
                              setValidDepartamentoMunicipio(true);
                            }}
                          /> */}
                          <Controller
                            defaultValue=""
                            render={({ field }) => (
                              <FormControl error={!!errors.depamun} fullWidth>
                                <FormLabel
                                  className="font-medium text-10"
                                  component="legend"
                                >
                                  Departamento y Municipio
                                </FormLabel>
                                <Select
                                  {...field}
                                  fullWidth={true} 
                                  inputProps={{
                                    startadornment: <InputAdornment position="start" />,
                                  }}
                                >
                                <MenuItem value='Corte'>0101 - Atlantida, La Ceiba</MenuItem>
                                <MenuItem value='Corte'>0102 - Atlantida, El Porvenir</MenuItem>
                                <MenuItem value='Corte'>0103 - Atlantida, Esparta</MenuItem>
                                <MenuItem value='Corte'>0104 - Atlantida, Jutiapa</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                            name="depamun"
                            control={control}
                          />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{ marginTop: '14px'}}>
                      <FormControl fullWidth>
                        <TextField
                          label="Ciudad"
                          variant="outlined"
                          placeholder=""
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '10px',
                            // marginTop: '10px',
                            // border: '1.5px solid',
                            // borderColor: validCiudad ? 'initial' : 'red'
                          }}
                          value={Ciudad}
                          onChange={(e) => {
                            setCiudad(e.target.value);
                            setValidCiudad(true);
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: '10px'}}>
                      <FormControl fullWidth>
                        <TextField
                          label="Dirección Completa"
                          variant="outlined"
                          placeholder=""
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '10px',
                            // marginTop: '10px',
                            // border: '1.5px solid',
                            // borderColor: validDireccion ? 'initial' : 'red'
                          }}
                          value={Direccion}
                          onChange={(e) => {
                            setDireccion(e.target.value);
                            setValidDireccion(true);
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Divider style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <Chip label="INFORMACIÓN DE CONTACTO" />
                  </Divider>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sx={{ marginTop: '10px'}}>
                      <FormControl fullWidth>
                        <TextField
                          label="Número de Teléfono Fijo de la Persona"
                          variant="outlined"
                          placeholder=""
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '10px',
                            // marginTop: '10px',
                            // border: '1.5px solid',
                            // borderColor: validTelefonoFijo ? 'initial' : 'red'
                          }}
                          value={TelefonoFijo}
                          onChange={(e) => {
                            setTelefonoFijo(e.target.value);
                            setValidTelefonoFijo(true);
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sx={{ marginTop: '10px'}}>
                      <FormControl fullWidth>
                        <TextField
                          label="Número de Teléfono Celular de la Persona"
                          variant="outlined"
                          placeholder=""
                            InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '10px',
                            // marginTop: '10px',
                            // border: '1.5px solid',
                            // borderColor: validCelular ? 'initial' : 'red'
                          }}
                          value={Celular}
                          onChange={(e) => {
                            setCelular(e.target.value);
                            setValidCelular(true);
                          }}
                        />
                      </FormControl>
                        </Grid>
                    <Grid item xs={6} sx={{ marginTop: '10px'}}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{
                            marginTop: '-19px',
                            color: validCorreo ? 'grey' : 'red',
                          }}
                        >
                        </InputLabel>
                        <TextField
                          label="Correo Electrónico"
                          variant="outlined"
                          placeholder="Correo Electrónico para recepción de notificaciones"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '5px',
                            // marginTop: '18px',
                            // border: '.5px solid',
                            // borderColor: validCorreo ? 'initial' : 'red'
                          }}
                          value={Correo}
                          onChange={(e) => {
                            setCorreo(e.target.value);
                            setValidCorreo(true);
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={4} sx={{ marginTop: '10px'}}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{
                            marginTop: '-19px',
                            color: validCorreo ? 'grey' : 'red',
                          }}
                        >
                        </InputLabel>
                        <TextField
                          label="Codigo de Verificación"
                          variant="outlined"
                          placeholder="Codigo Enviado al Correo brindado"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '5px',
                            // marginTop: '18px',
                            // border: '.5px solid',
                            // borderColor: validCorreo ? 'initial' : 'red'
                          }}
                          value={CodigoVeri}
                          onChange={(e) => {
                            setCodigoVeri(e.target.value);
                            // setValidCorreo(true);
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'right', marginTop:'10px' }}>
                    <Button 
                        size="small"
                        startIcon={<Icon>checked</Icon>}
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: '5px', width: '120%', height:'100%'}}
                        sx={{
                          backgroundColor: '#634A9E',
                          color: 'white',
                          '&:hover': { backgroundColor: '#6e52ae'},
                          fontSize: '0.9rem'
                        }}
                        type="button"
                        >
                          Validacion de Correo Electrónico  
                      </Button>
                    </Grid>

                    <Grid item xs={6} sx={{ marginTop: '10px'}}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{
                            marginTop: '-19px',
                            color: validCorreo ? 'grey' : 'red',
                          }}
                        >
                        </InputLabel>
                        <TextField
                          label="Correo Electrónico Alternativo"
                          variant="outlined"
                          placeholder="Correo Alternativo para recepción de notificaciones"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '5px',
                            // marginTop: '18px',
                            // border: '.5px solid',
                            // borderColor: validCorreo ? 'initial' : 'red'
                          }}
                          value={CorreoAlter}
                          onChange={(e) => {
                            setCorreoAlter(e.target.value);
                            setValidCorreo(true);
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={4} sx={{ marginTop: '10px'}}>
                      <FormControl fullWidth>
                        <InputLabel
                          style={{
                            marginTop: '-19px',
                            color: validCorreo ? 'grey' : 'red',
                          }}
                        >
                        </InputLabel>
                        <TextField
                          label="Codigo de Verificación de Correo Alternativo"
                          variant="outlined"
                          placeholder="Codigo enviado al Correo brindado"
                          InputProps={{
                            startAdornment: <InputAdornment position="start" />,
                          }}
                          style={{
                            borderRadius: '5px',
                            // marginTop: '18px',
                            // border: '.5px solid',
                            // borderColor: validCorreo ? 'initial' : 'red'
                          }}
                          value={CodigoVeri2}
                          onChange={(e) => {
                            setCodigoVeri2(e.target.value);
                            setValidCorreo(true);
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'right', marginTop:'10px'}}>
                    <Button 
                        size="small"
                        startIcon={<Icon>checked</Icon>}
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: '5px', width: '120%', height:'100%'}}
                        sx={{
                          backgroundColor: '#634A9E',
                          color: 'white',
                          '&:hover': { backgroundColor: '#6e52ae'},
                          fontSize: '0.9rem'
                        }}
                        type="button"
                        >
                          Validación de Correo Alternativa
                      </Button>
                    </Grid>

                    

                    {/* <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'right'}}>
                    <Button 
                        size="small"
                        startIcon={<Icon>checked</Icon>}
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: '5px', width: '120%', height:'100%'}}
                        sx={{
                          backgroundColor: '#634A9E',
                          color: 'white',
                          '&:hover': { backgroundColor: '#6e52ae'},
                        }}
                        type="button"
                        >
                          Validacion de Corrreo
                      </Button>
                    </Grid> */}
                  </Grid>
                </CardContent>
              </Card>

              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', marginTop:'20px' }}
              >
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
                  onClick={sendTab2}
                  // onClick={() => {
                  //   navigate('/Contrato-de-Adhesion-Persona-Natural/Index');
                  // }}
                  type="button"
                >
                  Guardar
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
                  onClick={() => {
                    navigate('/PersonaNatural/Index');
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </Card>
  );
}

export default PersonaNatural_Crear;
