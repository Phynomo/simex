/* eslint-disable camelcase */
import {
  CardMedia,
  CardContent,
  Card,
  Button,
  Chip,
  Divider,
  FormControl,
  Icon,
  TextField,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Box,
  Avatar,
  FormLabel,
  InputAdornment,
  InputLabel,
  Autocomplete,
  MenuItem,
  Menu,
} from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { black } from 'tailwindcss/colors';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Badge, Dropdown, Space, Table } from 'antd';
import { stringify } from 'crypto-js/enc-base64';


const camposGenerales = {
  Liquidacion: "",
  Declarante: "",
  DeclaracionNO: "",
  TipoDeclaracion: "",
  FechaEmision: "",
  Estado: "",
  Preimpreso: "",
  Observaciones: "",
  BoletinNO: "",
  Periodo: "",
  RTN: "",
  CodigoImpuesto: "",
  CodigoConceptoPago: "",
};

const schemaGenerales = yup.object().shape({
  Liquidacion: yup.string().required(),
  Declarante: yup.string().required(),
  DeclaracionNO: yup.string().required(),
  TipoDeclaracion: yup.string().required(),
  FechaEmision: yup.string().required(),
  Estado: yup.string().required(),
  Preimpreso: yup.string().required(),
  Observaciones: yup.string(),
  BoletinNO: yup.string().required(),
  Periodo: yup.string().required(),
  RTN: yup.string().required(),
  CodigoImpuesto: yup.string().required(),
  CodigoConceptoPago: yup.string(),
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

function BoletindePagoCrear() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const { handleSubmit: handleSubmitGenerales, reset: resetGenerales, control: controlGenerales, formState: formGenerales, watch: watchGenerales } = useForm({
    camposGenerales,
    mode: "all",
    resolver: yupResolver(schemaGenerales),
  });

  const { isValid: isValidGenerales, dirtyFields: dirtyFieldsGenerales, errors: errorsGenerales } = formGenerales;
  const datosGenerales = watchGenerales()



  const [tabsEstado, settabsEstado] = useState({
    tab1: true,
  });

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
      });
      setValue(1);
    }
  };

  const datitos = [
    { id: 1, label: 'Pagar-PA' },
    { id: 2, label: 'Pagar-PE' },
    { id: 4, label: 'Pagar-PI' },
    { id: 5, label: 'Pagar-PO' },
    { id: 6, label: 'Pagar-PY' },
  ]

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

  const [tiposObligacion, setTiposObligacion] = useState([]);
  const [cuentaPa01, setCuentaPa01] = useState([]);

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
      title: 'Concepto',
      dataIndex: 'concepto',
      key: 'concepto',
    },
    {
      title: 'Tipo obligación',
      key: 'operation',
      render: (params) =>
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <TextField>

            </TextField>
          {/* <FormControl fullWidth>
            <Autocomplete
              disablePortal
              // isOptionEqualToValue={(option, value) => option.value === value.value}
              id="combo-box-demo"
              size='small'
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label}
              options={datitos}
              // value={tiposObligacion[params.id]?.value ? tiposObligacion[params.id].value : null}
              onChange={(event, value) => { value ? handleChangeTiposObligacion(value, params) : null }}
              // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
              renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
              />
              </FormControl> */}
          </Stack>
        </div>
      ,
    },
    {
      title: 'Cuenta PA01',
      key: 'operation1',
      render: (params) =>
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
          <FormControl fullWidth>
          {/* <FormControl variant="standard" sx={{ minWidth: 150 }}> */}
            <Autocomplete
              disablePortal
              // isOptionEqualToValue={(option, value) => option.value === value.value}
              id="combo-box-demo"
              size='small'
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label}
              options={datitos}
              // value={cuentaPa01[params.id]?.value ? cuentaPa01[params.id].value : null}
              onChange={(event, value) => { value ? handleChangeCuentaPa01(value, params) : null }}
              // value={field.value ? cuidades.find(option => option.value === field.value.value) : null}
              renderInput={(params) => <TextField {...params} InputLabelProps={{ shrink: true }} />}
              />
              </FormControl>
          </Stack>
        </div>
      ,
    },
    {
      title: 'Total Pagar/Garantizar',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const handleChangeTiposObligacion = (event, params) => {
    alert('entra')
    const newItem = { id: params['id'], value: event };

    const updatedtiposObligacion = tiposObligacion.filter(item => item.id !== newItem.id);
    // console.log(event)
    setTiposObligacion([...updatedtiposObligacion, newItem]);
    // console.log(unos)
  };
  const handleChangeCuentaPa01 = (event, params) => {
    alert('entraww')
    const newItem = { id: params['id'], value: event };
    console.log(newItem)
    const updatedcuentaPa01 = cuentaPa01.filter(item => item.id !== newItem.id);
    // console.log(event)
    setCuentaPa01([...updatedcuentaPa01, newItem]);
    // console.log(unos)
  };

  

  const data = [];
  for (let i = 0; i < 50; ++i) {
    data.push({
      key: i.toString(),
      id: i.toString(),
      concepto: 'ISV IMPTO SOBRE VENTAS ' + i,
      total: 1520 * i,
      importador: 'Importador ' + i,
      rtnimportador: '0000-0000-00000' + i,
      // tabla: [
      //   { key: '1', name: 'Value1' + i, platform: 'Value2' + i },
      //   { key: '2', name: 'Value3' + i, platform: 'Value4' + i },
      //   // Add more rows to the nested table here...
      // ],
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

  return (
    <Card sx={{ minWidth: 275, margin: '40px' }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/0KkrNp4/IMPRESI-N-BOLET-N-DE-PAGO.png"
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
            <Tab label="Detalles de liquidación" {...a11yProps(1)} disabled={tabsEstado.tab1} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}>

          <TabPanel value={value} index={0} dir={theme.direction}>

            <Grid container spacing={3}>

              <Grid item xs={12}>
                <Divider style={{ marginTop: '0px', marginBottom: '0px' }}>
                  <Chip color='default' label="Boletín de pago" />
                </Divider>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Liquidación</FormLabel>
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
                        error={!!errorsGenerales.Liquidacion}
                      ></TextField>
                    )}
                    name="Liquidacion"
                    control={controlGenerales}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Importador/Exportador</FormLabel>
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
                        error={!!errorsGenerales.ImportadorExportador}
                      ></TextField>
                    )}
                    name="ImportadorExportador"
                    control={controlGenerales}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Declarante</FormLabel>
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
                        error={!!errorsGenerales.Declarante}
                      ></TextField>
                    )}
                    name="Declarante"
                    control={controlGenerales}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Declaración No.</FormLabel>
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
                        error={!!errorsGenerales.DeclaracionNO}
                      ></TextField>
                    )}
                    name="DeclaracionNO"
                    control={controlGenerales}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Tipo Liquidación</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={null}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsGenerales.TipoDeclaracion} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="TipoDeclaracion"
                    control={controlGenerales}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Fecha Emisión</FormLabel>
                  <DateTimePicker
                    value={null}
                    onChange={undefined}
                    required
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"></InputAdornment>),
                    }}
                    label=""
                    renderInput={(_props) => (
                      <TextField
                        className="w-full"
                        {..._props}
                        onBlur={undefined}
                      />
                    )}
                    className="w-full"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Estado</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={null}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsGenerales.Estado} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="Estado"
                    control={controlGenerales}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Preimpreso</FormLabel>
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
                        error={!!errorsGenerales.Preimpreso}
                      ></TextField>
                    )}
                    name="Preimpreso"
                    control={controlGenerales}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Observaciones</FormLabel>
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
                        error={!!errorsGenerales.Observaciones}
                      ></TextField>
                    )}
                    name="Observaciones"
                    control={controlGenerales}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '20px', marginBottom: '0px' }}>
                  <Chip color='default' label="Otros Datos" />
                </Divider>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Boletín No.</FormLabel>
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
                        error={!!errorsGenerales.BoletinNO}
                      ></TextField>
                    )}
                    name="BoletinNO"
                    control={controlGenerales}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Período</FormLabel>
                  <DateTimePicker
                    value={null}
                    onChange={undefined}
                    required
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"></InputAdornment>),
                    }}
                    label=""
                    renderInput={(_props) => (
                      <TextField
                        className="w-full"
                        {..._props}
                        onBlur={undefined}
                      />
                    )}
                    className="w-full"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">R.T.N</FormLabel>
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
                        error={!!errorsGenerales.RTN}
                      ></TextField>
                    )}
                    name="RTN"
                    control={controlGenerales}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Código Impuesto</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={null}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsGenerales.CodigoImpuesto} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="CodigoImpuesto"
                    control={controlGenerales}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <FormLabel id="group-label">Código Concepto de Pago</FormLabel>
                  <Controller render={({ field }) => (
                    <Autocomplete
                      {...field}
                      disablePortal
                      id="combo-box-demo"
                      options={null}
                      placeholder=''
                      renderInput={(params) => <TextField {...params} label="" error={!!errorsGenerales.CodigoConceptoPago} InputLabelProps={{ shrink: true }} />}
                    />
                  )} name="CodigoConceptoPago"
                    control={controlGenerales}
                  />
                </FormControl>
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
                    navigate('/BoletindePago/BoletinDePagoIndex');
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Divider style={{ marginTop: '20px', marginBottom: '0px' }}>
                  <Chip color='default' label="Detalle de la Liquidación" />
                </Divider>
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
                //onClick={sendTab1}
                onClick={() => {
                  navigate('/BoletindePago/BoletinDePagoIndex');
                }}
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
                  navigate('/BoletindePago/BoletinDePagoIndex');
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

export default BoletindePagoCrear;
