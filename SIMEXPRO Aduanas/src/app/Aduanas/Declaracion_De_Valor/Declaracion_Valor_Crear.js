/* eslint-disable no-lone-blocks */
/* eslint-disable camelcase */


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Autocomplete, Button, IconButton, Chip, Divider, FormControl, Icon, InputAdornment, InputLabel, TextField, MenuItem, Menu, FormLabel } from '@mui/material';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import CardMedia from '@mui/material/CardMedia';
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search';

import DatosDDLs from './Crear/DatosDDL'
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Grid from '@mui/material/Grid';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { useState, useRef } from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker, DatePicker } from '@mui/x-date-pickers';

import loadDDl from 'src/app/CargarDDLs/loadDDLs';

import { Badge, Dropdown, Space, Table } from 'antd';

const camposAduanasImportador = {
  AduanaIngreso: "",
  AduanaSalida: "",
  DeclaracionMercancia: "",
  FechaAceptacion: "",
  NombreImportador: "",
  RTNImportador: "",
  NumeroRegistroImportador: "",
  DireccionImportador: "",
  PaisImportador: "",
  EstadoImportador: "",
  CorreoElectronicoImportador: "",
  TelefonoImportador: "",
  FaxImportador: "",
  NivelComercialImportador: "",
  OtroNivelComercialImportador: "",
};

const schemaAduanasImportador = yup.object().shape({
  AduanaIngreso: yup.object().required(),
  AduanaSalida: yup.string().required(),
  DeclaracionMercancia: yup.string(),
  FechaAceptacion: yup.string().required(),
  NombreImportador: yup.string().required(),
  RTNImportador: yup.string().required(),
  NumeroRegistroImportador: yup.string().required(),
  DireccionImportador: yup.string().required(),
  PaisImportador: yup.string().required(),
  EstadoImportador: yup.string().required(),
  CorreoElectronicoImportador: yup.string().required(),
  TelefonoImportador: yup.string().required(),
  FaxImportador: yup.string(),
  NivelComercialImportador: yup.string().required(),
  OtroNivelComercialImportador: yup.string(),
});

const camposProveedorIntermediaro = {
  IdentificacionProveedor: "",
  NombreProveedor: "",
  DireccionProveedor: "",
  PaisProveedor: "",
  EstadoProveedor: "",
  CorreoProveedor: "",
  TelefonoProveedor: "",
  FaxProveedor: "",
  CondicionComercialProveedor: "",
  OtraCondicionComercialProveedor: "",
  IdentificacionIntermedario: "",
  NombreIntermediario: "",
  DireccionIntermediario: "",
  PaisIntermediario: "",
  EstadoIntermediario: "",
  CorreoIntermediario: "",
  TelefonoIntermediario: "",
  FaxIntermediario: "",
  TipoIntermediario: "",
  OtroTipoIntermediario: "",
};

const schemaProveedorIntermediaro = yup.object().shape({
  IdentificacionProveedor: yup.string().required(),
  NombreProveedor: yup.string().required(),
  DireccionProveedor: yup.string().required(),
  PaisProveedor: yup.string(),
  EstadoProveedor: yup.string().required(),
  CorreoProveedor: yup.string().required(),
  TelefonoProveedor: yup.string().required(),
  FaxProveedor: yup.string().required(),
  CondicionComercialProveedor: yup.string().required(),
  OtraCondicionComercialProveedor: yup.string().required(),
  IdentificacionIntermedario: yup.string().required(),
  NombreIntermediario: yup.string().required(),
  DireccionIntermediario: yup.string().required(),
  PaisIntermediario: yup.string().required(),
  EstadoIntermediario: yup.string(),
  CorreoIntermediario: yup.string().required(),
  TelefonoIntermediario: yup.string(),
  FaxIntermediario: yup.string(),
  TipoIntermediario: yup.string(),
  OtroTipoIntermediario: yup.string(),
});

const camposTransaccion = {
  LugarEntrega: "",
  PaisEntrega: "",
  Incoterm: "",
  Version: "",
  NumeroContrato: "",
  FechaContrato: "",
  FormaEnvio: "",
  OtraFormaEnvio: "",
  PagoEfectuado: "",
  FormaPago: "",
  OtraFormaPago: "",
  LugarEmbarque: "",
  PaisExportacion: "",
  FechaExportacion: "",
  MonedaTransaccion: "",
  OtraMoneda: "",
  CambioMoneda: "",
  PaisEmbarque: "",
};

const schemaTransaccion = yup.object().shape({
  LugarEntrega: yup.string().required(),
  PaisEntrega: yup.string().required(),
  Incoterm: yup.string().required(),
  Version: yup.string().required(),
  NumeroContrato: yup.string().required(),
  FechaContrato: yup.string().required(),
  FormaEnvio: yup.string().required(),
  OtraFormaEnvio: yup.string().required(),
  PagoEfectuado: yup.string().required(),
  FormaPago: yup.string().required(),
  OtraFormaPago: yup.string().required(),
  LugarEmbarque: yup.string().required(),
  PaisExportacion: yup.string().required(),
  FechaExportacion: yup.string().required(),
  MonedaTransaccion: yup.string().required(),
  OtraMoneda: yup.string().required(),
  CambioMoneda: yup.string().required(),
  PaisEmbarque: yup.string().required(),
});

const camposFactura = {
  NumeroFactura: "",
  Fecha: "",
};

const schemaFactura = yup.object().shape({
  NumeroFactura: yup.string().required(),
  Fecha: yup.string().required(),
});

const camposItems = {
  NumeroItem: "",
  Cantidad: "",
  UnidadMedida: "",
  IdentificacionComercial: "",
  CaracteristicasMercadedira: "",
  Marca: "",
  ModeloEstilo: "",
  EstadoMercaderia: "",
  OrigenMecaderia: "",
  ClasificacionArancelaria: "",
  ValorUnitario: "",
  TotalUnitario: "",
};

const schemaItems = yup.object().shape({
  NumeroItem: yup.string().required(),
  Cantidad: yup.string().required(),
  UnidadMedida: yup.string().required(),
  IdentificacionComercial: yup.string().required(),
  CaracteristicasMercadedira: yup.string().required(),
  Marca: yup.string().required(),
  ModeloEstilo: yup.string().required(),
  EstadoMercaderia: yup.string().required(),
  OrigenMecaderia: yup.string().required(),
  ClasificacionArancelaria: yup.string().required(),
  ValorUnitario: yup.string().required(),
  TotalUnitario: yup.string().required(),
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
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const getRowClassName = (params) => {
  return params.rowIndex % 2 === 0 ? '#f2f2f2' : '#ffffff';
};

function Declaracion_Valor_Crear() {

  const DatosDDL = DatosDDLs()
  // const DatosDDL = DatosDDLss.data
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const { handleSubmit: handleSubmitAdunasImportador, reset: resetAdunasImportador, control: controlAduanasImportador, formState: formAduanasImportador, watch: watchAduanasImportador, setValue: setValueAduanasImportador } = useForm({
    camposAduanasImportador,
    mode: "all",
    resolver: yupResolver(schemaAduanasImportador),
  });

  const { isValid: isValidAduanasImportador, dirtyFields: dirtyFieldsAduanasImportador, errors: errorsAduanasImportador } = formAduanasImportador;
  const datosAduanasImportador = watchAduanasImportador()

  const { handleSubmit: handleSubmitProveedorIntermediaro, reset: resetProveedorIntermediaro, control: controlProveedorIntermediaro, formState: formProveedorIntermediaro, watch: watchProveedorIntermediaro } = useForm({
    camposProveedorIntermediaro,
    mode: "all",
    resolver: yupResolver(schemaProveedorIntermediaro),
  });

  const { isValid: isValidProveedorIntermediaro, dirtyFields: dirtyFieldsProveedorIntermediaro, errors: errorsProveedorIntermediaro } = formProveedorIntermediaro;
  const datosProveedorIntermediaro = watchProveedorIntermediaro()


  const { handleSubmit: handleSubmitTransaccion, reset: resetTransaccion, control: controlTransaccion, formState: formTransaccion, watch: watchTransaccion } = useForm({
    camposTransaccion,
    mode: "all",
    resolver: yupResolver(schemaTransaccion),
  });

  const { isValid: isValidTransaccion, dirtyFields: dirtyFieldsTransaccion, errors: errorsTransaccion } = formTransaccion;
  const datosTransaccion = watchTransaccion()


  const { handleSubmit: handleSubmitFactura, reset: resetFactura, control: controlFactura, formState: formFactura, watch: watchFactura } = useForm({
    camposFactura,
    mode: "all",
    resolver: yupResolver(schemaFactura),
  });

  const { isValid: isValidFactura, dirtyFields: dirtyFieldsFactura, errors: errorsFactura } = formFactura;
  const datosFactura = watchFactura()


  const { handleSubmit: handleSubmitItems, reset: resetItems, control: controlItems, formState: formItems, watch: watchItems } = useForm({
    camposItems,
    mode: "all",
    resolver: yupResolver(schemaItems),
  });

  const { isValid: isValidItems, dirtyFields: dirtyFieldsItems, errors: errorsItems } = formItems;
  const datosItems = watchItems()

  {
    /* Columnas de la tabla */
  }
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

  const [filas, setFilas] = React.useState(5);
  const [searchText, setSearchText] = useState('');
  const [anchorEl, setAnchorEl] = useState({});

  const handleChangeFilas = (event) => {
    setFilas(event.target.value);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nº Duca',
      dataIndex: 'nduca',
      key: 'nduca',
    },
    {
      title: 'Importador',
      dataIndex: 'importador',
      key: 'importador',
    },
    {
      title: 'RTN Importador',
      dataIndex: 'rtnimportador',
      key: 'rtnimportador',
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

  {
    /* Datos de la tabla */
  }
  const data = [];
  for (let i = 0; i < 50; ++i) {
    data.push({
      key: i.toString(),
      id: i.toString(),
      nduca: '0000000 ' + i,
      importador: 'Importador ' + i,
      rtnimportador: '0000-0000-00000' + i,
      tabla: [
        { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
        { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
        // Add more rows to the nested table here...
      ],
    })
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const filteredRows = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
    )
  );
  const rows2 = [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const validacion = (params, event) => {
    if (event) {
      event.preventDefault();
    }
    if (params === 1) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
      });
      setValue(1);
    }

    if (params === 2) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
      });
      setValue(2);
    }

    if (params === 3) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
      });
      setValue(3);
    }

    if (params === 4) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
      });
      setValue(4);
    }

    if (params === 5) {
      settabsEstado({
        tab1: false,
        tab2: false,
        tab3: false,
        tab4: false,
        tab5: false,
      });
      setValue(5);
    }
  };

  const [tabsEstado, settabsEstado] = useState({
    tab1: false,
    tab2: false,
    tab3: false,
    tab4: false,
    tab5: false,
  });

  const [mostrarAddH, setmostrarAddH] = useState(true);
  const [mostrarAddD, setmostrarAddD] = useState(false);
  const [mostrarAddF, setmostrarAddF] = useState(false);
  const [mostrarAddFD, setmostrarAddFD] = useState(false);
  const [mostrarBoton, setmostrarBoton] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const collapseRef = useRef(null);



  const getdata = (event, data) => {
    const id = event.target.id.split('-');
    setValueAduanasImportador(id[0], data)
  }

  const ddlAduanas = loadDDl('api/Aduanas/Listar'); 

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/Trhd4rH/DECLARACI-N-DE-VALOR.png"
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
            <Tab label="I. Aduana e Importador" {...a11yProps(0)} />
            <Tab
              label="I.I Proveedor e Intermediario"
              {...a11yProps(1)}
              disabled={tabsEstado.tab1}
            />
            <Tab
              label="I.II Característica de la transacción"
              {...a11yProps(2)}
              disabled={tabsEstado.tab2}
            />
            <Tab label="Facturas" {...a11yProps(3)} disabled={tabsEstado.tab4} />
            <Tab
              label="II. Condiciones de la transacción"
              {...a11yProps(4)}
              disabled={tabsEstado.tab4}
            />
            <Tab
              label="III. Valor en Aduana"
              {...a11yProps(5)}
              disabled={tabsEstado.tab5}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip color='default' label="Información General de la Aduana" />
                </Divider>
                {/* <Typography variant="" color="rgb(55, 188, 155)">
                      A. Información General de la Aduana
                    </Typography> */}
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Aduana de Ingreso</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="AduanaIngreso"
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        options={ddlAduanas}
                        value={datosAduanasImportador['AduanaIngreso']}
                        onChange={(event, value) => { value ? getdata(event, value) : null }}
                        renderInput={(params) => <TextField {...params} error={!!errorsAduanasImportador.AduanaIngreso} InputLabelProps={{ shrink: true }} />}
                      />
                    )}
                    name="AduanaIngreso"
                    error={!!errorsAduanasImportador.AduanaIngreso}
                    control={controlAduanasImportador}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel>Aduana de Salida</FormLabel>
                  <Controller render={({ field }) => (

                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.aduanas}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsAduanasImportador.AduanaSalida} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="AduanaSalida"
                    control={controlAduanasImportador}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Declaracion de mercancia</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        disabled
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsAduanasImportador.DeclaracionMercancia}
                      ></TextField>
                    )}
                    name="DeclaracionMercancia"
                    control={controlAduanasImportador}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel>Fecha de Aceptación</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <DatePicker
                        disablePast
                        views={['year', 'month', 'day']}
                        onChange={(date) => {
                        }}
                        value={camposAduanasImportador['FechaAceptacion']}
                        renderInput={(_props) => (
                          <TextField
                            className="w-full"
                            {..._props}
                            style={{ borderRadius: '10px' }}
                            label=""
                            variant="outlined"
                            error={!!errorsAduanasImportador.FechaAceptacion}
                          />
                        )}
                        className="w-full"
                      />
                    )}
                    name="FechaAceptacion"
                    control={controlAduanasImportador}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '30px', marginBottom: '0px' }}>
                  <Chip label="Información General del Importador" />
                </Divider>
                {/* <Typography variant="" color="rgb(55, 188, 155)">
                      B. Información General del Importador
                    </Typography> */}
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Nombre o Razón Social</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsAduanasImportador.NombreImportador}
                      ></TextField>
                    )}
                    name="NombreImportador"
                    control={controlAduanasImportador}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Registro Tributario (RTN)</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsAduanasImportador.RTNImportador}
                      ></TextField>
                    )}
                    name="RTNImportador"
                    control={controlAduanasImportador}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Número de Registro</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsAduanasImportador.NumeroRegistroImportador}
                      ></TextField>
                    )}
                    name="NumeroRegistroImportador"
                    control={controlAduanasImportador}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel>Direccion del importador</FormLabel>
                  <Controller render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-multiline-static"
                      label=""
                      placeholder=""
                      error={!!errorsAduanasImportador.DireccionImportador}
                      defaultValue=""
                      InputLabelProps={{ shrink: true }}
                    />
                  )} name="DireccionImportador"
                    control={controlAduanasImportador} />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">País del importador</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.paises}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsAduanasImportador.PaisImportador} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="PaisImportador"
                    control={controlAduanasImportador}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Estado del importador</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.provincias}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsAduanasImportador.EstadoImportador} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="EstadoImportador"
                    control={controlAduanasImportador}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Correo Electrónico del importador</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsAduanasImportador.CorreoElectronicoImportador}
                      ></TextField>
                    )}
                    name="CorreoElectronicoImportador"
                    control={controlAduanasImportador}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Teléfono del importador</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsAduanasImportador.TelefonoImportador}
                      ></TextField>
                    )}
                    name="TelefonoImportador"
                    control={controlAduanasImportador}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Fax del importador</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsAduanasImportador.FaxImportador}
                      ></TextField>
                    )}
                    name="FaxImportador"
                    control={controlAduanasImportador}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Nivel Comercial del importador</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.nivelComercia}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsAduanasImportador.NivelComercialImportador} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="NivelComercialImportador"
                    control={controlAduanasImportador}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Otro Nivel Comercial</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsAduanasImportador.OtroNivelComercialImportador}
                      ></TextField>
                    )}
                    name="OtroNivelComercialImportador"
                    control={controlAduanasImportador}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

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
                onClick={() => validacion(1)}
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
                  navigate('/Declaracion-de-Valor/Listado');
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip color='default' label="Información General del proveedor" />
                </Divider>
                {/* <Typography variant="" color="rgb(55, 188, 155)">
                      C. Proveedor
                    </Typography> */}
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Identificación del Proveedor</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.IdentificacionProveedor}
                      ></TextField>
                    )}
                    name="IdentificacionProveedor"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Nombre o Razón Social del Proveedor</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.NombreProveedor}
                      ></TextField>
                    )}
                    name="NombreProveedor"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Dirección del Proveedor</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.DireccionProveedor}
                      ></TextField>
                    )}
                    name="DireccionProveedor"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">País del proveedor</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.paises}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsProveedorIntermediaro.PaisProveedor} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="PaisProveedor"
                    control={controlProveedorIntermediaro}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Estado del proveedor</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.provincias}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsProveedorIntermediaro.EstadoProveedor} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="EstadoProveedor"
                    control={controlProveedorIntermediaro}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Correo Electrónico del proveedor</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.CorreoProveedor}
                      ></TextField>
                    )}
                    name="CorreoProveedor"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Teléfono del proveedor</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.TelefonoProveedor}
                      ></TextField>
                    )}
                    name="TelefonoProveedor"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Fax del proveedor</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.FaxProveedor}
                      ></TextField>
                    )}
                    name="FaxProveedor"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Condición Comercial del proveedor</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.condicionComercia}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsProveedorIntermediaro.CondicionComercialProveedor} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="CondicionComercialProveedor"
                    control={controlProveedorIntermediaro}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Otra Condición Comercial</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.OtraCondicionComercialProveedor}
                      ></TextField>
                    )}
                    name="OtraCondicionComercialProveedor"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '30px', marginBottom: '0px' }}>
                  <Chip label="Información General del Intermediario" />
                </Divider>
                {/* <Typography variant="" color="rgb(55, 188, 155)">
                      D. 
                    </Typography> */}
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Identificación del Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.IdentificacionIntermedario}
                      ></TextField>
                    )}
                    name="IdentificacionIntermedario"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Nombre o Razón Social del Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.NombreIntermediario}
                      ></TextField>
                    )}
                    name="NombreIntermediario"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Dirección del Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.DireccionIntermediario}
                      ></TextField>
                    )}
                    name="DireccionIntermediario"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">País del Intermediario</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.paises}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsProveedorIntermediaro.PaisIntermediario} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="PaisIntermediario"
                    control={controlProveedorIntermediaro}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Estado del Intermediario</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.provincias}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsProveedorIntermediaro.EstadoIntermediario} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="EstadoIntermediario"
                    control={controlProveedorIntermediaro}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Correo Electrónico del Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.CorreoIntermediario}
                      ></TextField>
                    )}
                    name="CorreoIntermediario"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Teléfono del Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.TelefonoIntermediario}
                      ></TextField>
                    )}
                    name="TelefonoIntermediario"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Fax del Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.FaxIntermediario}
                      ></TextField>
                    )}
                    name="FaxIntermediario"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Tipo de Intermediario</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.tipoIntermediario}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsProveedorIntermediaro.TipoIntermediario} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="TipoIntermediario"
                    control={controlProveedorIntermediaro}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Otro Tipo de Intermediario</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsProveedorIntermediaro.OtroTipoIntermediario}
                      ></TextField>
                    )}
                    name="OtroTipoIntermediario"
                    control={controlProveedorIntermediaro}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', mt: '30px' }}
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
                onClick={() => validacion(2)}
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
                  navigate('/Declaracion-de-Valor/Listado');
                }}
              >
                Cancelar
              </Button>
            </Grid>

          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <Grid container spacing={3}>
              <Grid item textAlign="center" xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip label="Característica de la Transacción" />
                </Divider>
                {/* <Typography variant="" color="rgb(55, 188, 155)">
                      E. 
                    </Typography> */}
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Lugar de Entrega</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTransaccion.LugarEntrega}
                      ></TextField>
                    )}
                    name="LugarEntrega"
                    control={controlTransaccion}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">País de Entrega</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.paises}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsTransaccion.PaisEntrega} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="PaisEntrega"
                    control={controlTransaccion}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Incoterm</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.incoterm}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsTransaccion.Incoterm} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="Incoterm"
                    control={controlTransaccion}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Versión</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTransaccion.Version}
                      ></TextField>
                    )}
                    name="Version"
                    control={controlTransaccion}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Número de Contrato</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTransaccion.NumeroContrato}
                      ></TextField>
                    )}
                    name="NumeroContrato"
                    control={controlTransaccion}
                  ></Controller>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Fecha de Contrato</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTransaccion.FechaContrato}
                      ></TextField>
                    )}
                    name="FechaContrato"
                    control={controlTransaccion}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Forma de Envio</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.formaEnvio}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsTransaccion.FormaEnvio} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="FormaEnvio"
                    control={controlTransaccion}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Otra Forma de Envío</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTransaccion.OtraFormaEnvio}
                      ></TextField>
                    )}
                    name="OtraFormaEnvio"
                    control={controlTransaccion}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3} justifyContent={"center"} className="flex justify-content-center">
                <FormControl fullWidth>
                  <FormLabel id="group-label">Pago Efectuado</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <>
                        <Stack direction="row" spacing={1} justifyContent={"center"} alignItems="center">
                          <Typography>No</Typography>
                          <Switch
                            {...field}
                          />
                          <Typography>Sí</Typography>
                        </Stack>
                      </>
                    )}
                    name="PagoEfectuado"
                    control={controlTransaccion}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Forma de Pago</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.formaPago}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsTransaccion.FormaPago} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="FormaPago"
                    control={controlTransaccion}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Otra Forma de Pago</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTransaccion.OtraFormaPago}
                      ></TextField>
                    )}
                    name="OtraFormaPago"
                    control={controlTransaccion}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">País de Embarque</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.paises}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsTransaccion.PaisEmbarque} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="PaisEmbarque"
                    control={controlTransaccion}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Lugar de Embarque</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.lugarEmbarque}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsTransaccion.LugarEmbarque} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="LugarEmbarque"
                    control={controlTransaccion}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">País de exporatación</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.paises}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsTransaccion.PaisExportacion} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="PaisExportacion"
                    control={controlTransaccion}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Fecha de exportación</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTransaccion.FechaExportacion}
                      ></TextField>
                    )}
                    name="FechaExportacion"
                    control={controlTransaccion}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Moneda de transacción</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={DatosDDL.moenda}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsTransaccion.MonedaTransaccion} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="MonedaTransaccion"
                    control={controlTransaccion}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Otra Moneda</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTransaccion.OtraMoneda}
                      ></TextField>
                    )}
                    name="OtraMoneda"
                    control={controlTransaccion}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Cambio de moneda a USD</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        label=""
                        placeholder=""
                        InputProps={{
                          startAdornment: (<InputAdornment position="start"></InputAdornment>),
                        }}
                        error={!!errorsTransaccion.CambioMoneda}
                      ></TextField>
                    )}
                    name="CambioMoneda"
                    control={controlTransaccion}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>

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
                onClick={() => validacion(3)}
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
                  navigate('/Declaracion-de-Valor/Listado');
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <Collapse in={mostrarAddH}>
              <Grid container spacing={3} justifyContent={"center"}>
                <Grid item xs={12}>
                  <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Chip label="Agregar factura " />
                  </Divider>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Número de factura</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsFactura.NumeroFactura}
                        ></TextField>
                      )}
                      name="NumeroFactura"
                      control={controlFactura}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel>Fecha</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <DatePicker
                          disablePast
                          views={['year', 'month', 'day']}
                          onChange={(date) => {
                          }}
                          value={camposAduanasImportador['FechaAceptacion']}
                          renderInput={(_props) => (
                            <TextField
                              className="w-full"
                              {..._props}
                              style={{ borderRadius: '10px' }}
                              label=""
                              variant="outlined"
                              error={!!errorsFactura.Fecha}
                            />
                          )}
                          className="w-full"
                        />
                      )}
                      name="Fecha"
                      control={controlFactura}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Button
                    startIcon={<Icon>add</Icon>}
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: '10px', marginRight: '10px' }}
                    sx={{
                      backgroundColor: '#634A9E',
                      color: 'white',
                      '&:hover': { backgroundColor: '#6e52ae' },
                    }}
                    onClick={(e) => {
                      setmostrarAddH(false)
                      setmostrarDetalles(true)
                    }}
                  >
                    Agregar Factura
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Chip label="Facturas" />
                  </Divider>
                </Grid>
                <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} >
                  <Stack direction="row" spacing={1}>
                    <label className='mt-8'>Filas por página:</label>
                    <FormControl sx={{ minWidth: 50 }} size="small">
                      {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={filas}
                        // label="Filas"  
                        onChange={handleChangeFilas}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
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
                </Grid>
                <Grid item xs={12}>
                  <div className='center' style={{ width: '95%', margin: 'auto' }}>

                    <Table
                      columns={columns}
                      expandable={{
                        expandedRowRender: (record) => <Table columns={columns} dataSource={record.tabla} pagination={false} />,
                        rowExpandable: (record) => record.name !== 'Not Expandable',
                      }}
                      dataSource={filteredRows}
                      size="small"
                      pagination={{
                        pageSize: filas
                        , className: 'decoration-white'
                      }}

                    />
                  </div>
                </Grid>
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
                    onClick={() => validacion(4)}
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
                    onClick={(e) => {
                      navigate('/Declaracion-de-Valor/Listado');
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Collapse>

            <Collapse in={mostrarDetalles}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ marginBottom: 4 }}>
                  <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Chip label="Descripción de las mercancías (Items)" />
                  </Divider>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Número Item</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsItems.NumeroItem}
                        ></TextField>
                      )}
                      name="NumeroItem"
                      control={controlItems}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Cantidad</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsItems.Cantidad}
                        ></TextField>
                      )}
                      name="Cantidad"
                      control={controlItems}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Unidad de medida</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={DatosDDL.nivelComercia}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} label="" error={!!errorsItems.UnidadMedida} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="UnidadMedida"
                      control={controlItems}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4} >
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Designación o Identificación Comercial de las Mercancías</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsItems.IdentificacionComercial}
                        ></TextField>
                      )}
                      name="IdentificacionComercial"
                      control={controlItems}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Características de la Mercancía</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsItems.CaracteristicasMercadedira}
                        ></TextField>
                      )}
                      name="CaracteristicasMercadedira"
                      control={controlItems}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Marca</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsItems.Marca}
                        ></TextField>
                      )}
                      name="Marca"
                      control={controlItems}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Modelo y/o Estilo</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsItems.ModeloEstilo}
                        ></TextField>
                      )}
                      name="ModeloEstilo"
                      control={controlItems}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Estado de la Mercancía</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={DatosDDL.nivelComercia}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} label="" error={!!errorsItems.EstadoMercaderia} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="EstadoMercaderia"
                      control={controlItems}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Origen de la Mercancía</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={DatosDDL.nivelComercia}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} label="" error={!!errorsItems.OrigenMecaderia} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="OrigenMecaderia"
                      control={controlItems}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Clasificación Arancelaria</FormLabel>
                    <Controller render={({ field }) => (
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={DatosDDL.nivelComercia}
                        placeholder=''
                        renderInput={(params) => <TextField {...params} label="" error={!!errorsItems.ClasificacionArancelaria} InputLabelProps={{ shrink: true }} />}
                      />
                    )} name="ClasificacionArancelaria"
                      control={controlItems}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Valor Unitario</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsItems.ValorUnitario}
                        ></TextField>
                      )}
                      name="ValorUnitario"
                      control={controlItems}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">Total Factura Unitario</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-disabled"
                          label=""
                          placeholder=""
                          InputProps={{
                            startAdornment: (<InputAdornment position="start"></InputAdornment>),
                          }}
                          error={!!errorsItems.TotalUnitario}
                        ></TextField>
                      )}
                      name="TotalUnitario"
                      control={controlItems}
                    ></Controller>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
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
                    onClick={(e) => {
                    }}
                    ref={collapseRef}
                  >
                    Agregar Item
                  </Button>

                </Grid>
                <Grid item xs={5}>
                  <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                    <Chip label="Items" />
                  </Divider>
                </Grid>
                <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }} >
                  <Stack direction="row" spacing={1}>
                    <label className='mt-8'>Filas por página:</label>
                    <FormControl sx={{ minWidth: 50 }} size="small">
                      {/* <InputLabel id="demo-select-small-label">Filas</InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={filas}
                        // label="Filas"  
                        onChange={handleChangeFilas}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
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
                    onClick={(e) => {
                      setmostrarAddH(true)
                      setmostrarDetalles(false)
                    }}
                    ref={collapseRef}
                  >
                    Finalizar factura
                  </Button>

                </Grid>
              </Grid>
            </Collapse>
          </TabPanel>

          <TabPanel value={value} index={4} dir={theme.direction}>
            <Grid container spacing={3} style={{ marginBottom: '20px' }}>
              <Grid item textAlign="center" xs={12}>
                <Typography variant="h5" color="rgb(55, 188, 155)">
                  II. Condiciones de la Transacción
                </Typography>
              </Grid>
            </Grid>

            {/* HEADER DE LA TABLA */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginTop: '15px', marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>#</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>CONDICIÓN</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Typography>VALOR ASIGNADO CONDICIÓN</Typography>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #1 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>24</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Existen restricciones a la cesión o utilización de las mercancías por el
                    comprador, distintas de las excepciones previstas en el artículo 1.1 a) del
                    Acuerdo
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #2 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>24.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography> Indicar en que consiste la o las restricciones </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #3 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>25</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Depende la venta o el precio de alguna condición o contraprestación, con
                    relación a las mercancías a valorar
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #4 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>25.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    {' '}
                    Indicar en que consiste la condición o contrapresentación, y si es cuantificable
                    consignar el monto en la casilla Nro. 42.1{' '}
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #5 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>26</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Está la venta condicionada a revertir directa o indirectamente al vendedor parte
                    alguna del producto de la reventa o de cualquier cesión o utilización posterior
                    de las mercancías, por el comprador, en caso afirmativo, declara el monto de la
                    reversión en la casilla Nro. 42
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Seleccione una opción"
                    size="small"
                    select
                    placeholder="Seleccione una opción"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #6 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>27</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Existe vinculación entre el vendedor y el comprador</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Seleccione una opción"
                    size="small"
                    select
                    placeholder="Seleccione una opción"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #7 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>27.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Indicar si la vinculación ha influido en el precio</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #8 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>27.2</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Indicar si la vinculación ha influido en el precio</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Seleccione una opción"
                    size="small"
                    select
                    placeholder="Seleccione una opción"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #9 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>28</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Existen pagos indirectos y/o descuentos retroactivos</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Seleccione una opción"
                    size="small"
                    select
                    placeholder="Seleccione una opción"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #10 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>28.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Indicar en que concepto y el monto declarado en la casilla Nro. 40
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #11 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>29</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Existen cánones y derechos de licencia que el comprador tenga que pagar directa
                    o indirectamente
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Seleccione una opción"
                    size="small"
                    select
                    placeholder="Seleccione una opción"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #12 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>29.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Indicar su naturaleza y el monto declarado en la casilla Nro. 42.9
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* BOTONES */}
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
                onClick={() => validacion(5)}
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
                onClick={(e) => {
                  navigate('/Declaracion-de-Valor/Listado');
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={5} dir={theme.direction}>
            <Grid container spacing={3} style={{ marginBottom: '20px' }}>
              <Grid item textAlign="center" xs={12}>
                <Typography variant="h5" color="rgb(55, 188, 155)">
                  III. Determinación del Valor en Aduana, en Pesos Centroamericanos
                </Typography>
              </Grid>
            </Grid>

            {/* HEADER DE LA TABLA */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginTop: '15px', marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>#</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>BASE DE CÁLCULO</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Typography>VALOR PESO C.A. (USD)</Typography>
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #1 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>39</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Precio según factura</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #2 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>40</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography> Pagos indirectos y/o descuentos retroactivos </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #3 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>41</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Precio realmente pagado o por pagar por las mercancías importadas (39 + 40)
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #4 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    ADICIONES AL PRECIO REALMENTE PAGADO O POR PAGAR POR LAS MERCANCÍAS IMPORTADAS
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #5 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Monto de la condición o contraprestación a que se refiere la casilla 25.1
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #6 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.2</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Monto de la reversión a la que se refiere la casilla 25</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #7 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.3</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos por comisiones y correlajes, salvo los de comisiones de compra
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #8 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.4</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Gastos y costos de envases y embalajes</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #9 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.5</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de los materiales consumidos en la producción de las mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #10 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.6</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de las herramientos, matrices, moldes, y elementos análogos utilizados
                    para la producción de las mercancías
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #11 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.7</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de los materiales consumidos en la producción de las mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #12 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.8</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de ingeniería, creación y perferccionamiento, trabajos artísticos, diseños
                    y planos y croquis realizados fuera del país de importación y necesarios para la
                    producción de mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #13 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.9</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Valor de los cánones y derechos de licencia, a que se refiere la casilla 29.1
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #14 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.10</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos de transporte de la mercadería importada hasta el puerto o lugar de
                    importación
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #15 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.11</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos de carga, descarga y manipulación ocasionadas por el transporte de las
                    mercaderías importadas hasta el puerto o lugar de importación
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #16 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>42.12</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Gastos y costos de envases y embalajes</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #17 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>43</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Total de ajustes al precio realmente pagado o por pagar (sumatoria de 42.1 a
                    42.12)
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #18 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    DEDUCCIONES AL PRECIO REALMENTE PAGADO O POR PAGAR POR LAS MERCANCÍAS IMPORTADAS
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #19 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.1</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Gastos de construcción, armado, montaje, mantenimiento o asistencia técnica
                    realizados después de la importación, en relación con las mercancías importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #20 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.2</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Costos de transporte posterior al puerto o lugar de importación
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #21 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.3</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Derechos e impuestos aplicables en el país de importación</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #22 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.4</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Monto de intereses</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #23 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>44.5</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>Otras deducciones legalmente aplicables</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #24 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(255, 247, 247)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>45</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>
                    Total deducciones al precio realmente pagado o por pagar por las mercancías
                    importadas
                  </Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* FILA #25 */}
            <Grid
              container
              spacing={1}
              sx={{ backgroundColor: 'rgb(188,212,220)' }}
              style={{ marginBottom: '15px' }}
            >
              <Grid item xs={1} sx={{ border: '12px' }}>
                <FormControl fullWidth>
                  <Typography>46</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <Typography>VALOR EN ADUANA (41 + 43 - 45)</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <TextField
                    style={{ borderRadius: '3px' }}
                    sx={{ backgroundColor: 'rgb(255,255,255)' }}
                    label="Valor"
                    size="small"
                    placeholder="Valor"
                    InputProps={{
                      startAdornment: <InputAdornment position='start' />
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            {/* BOTONES */}
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
                onClick={(e) => {
                  navigate('/Declaracion-de-Valor/Listado');
                }}
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
                onClick={(e) => {
                  navigate('/Declaracion-de-Valor/Listado');
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

export default Declaracion_Valor_Crear;
