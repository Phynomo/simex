/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Box,
  Collapse,
  Typography,
  Select,
  Grid,
  Stack,
  Button,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, Controller } from "react-hook-form";
import { Badge, Dropdown, Space, Table } from "antd";
import LoadingIcon from "src/styles/iconoCargaTabla";
import "src/styles/custom-pagination.css";

import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";
import { bool } from "prop-types";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import estilosTablaDetalles from "src/styles/tablaDetalles";

//import Toast
import "react-toastify/dist/ReactToastify.css";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
  ToastDefault,
} from "src/styles/toastsFunctions";

//Import service
import EstadosCivilesServices from "./EstadosCivilesService";

const iconStyle = {
  marginRight: "5px",
  verticalAlign: "middle",
  color: "#634a9e",
};

const tableRowStyle = {
  "&:hover": {
    backgroundColor: "coral",
  },
};

const tableCellStyle = {
  verticalAlign: "middle",
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tableHeaderStyle = {
  verticalAlign: "middle",
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  backgroundColor: "#f2f2f2",
};

function EstadosCivilesIndex() {
  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constante para mostrar el Collapse de los Detalles
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  //Constante para la data de 
  const [data, setData] = useState([]);

  const [DatosDetalles, setDatosDetalles] = useState({});
  //Hook UseEffect para que cargue los datos de un solo cuando inicice la pantalla
  useEffect(() => {
    EstadosCivilesGetData()
  }, []);
  

  const handleDetails = (datos) => {
    setDatosDetalles(datos);
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
    handleClose(datos.escv_Id);
  };

  //Constante para el cerrrar las opciones del boton de opciones
  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  //Constante de las columnas del index
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key, //sorting para Numeros
    },
    {
      title: "Estado Civil",
      dataIndex: "escv_Nombre",
      key: "escv_Nombre",
      sorter: (a, b) => a.escv_Nombre.localeCompare(b.escv_Nombre), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.escv_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.escv_Id}`}
              aria-haspopup="true"
              onClick={() => handleDetails(params)}
              variant="contained"
              style={{
                borderRadius: "10px",
                backgroundColor: "#634A9E",
                color: "white",
              }}
              startIcon={<Icon>visibility</Icon>}
            >
              Detalles
            </Button>
          </Stack>
        </div>
      ),
    },
  ];

  const EstadosCivilesGetData = async () => {
    try {
      setData(await EstadosCivilesServices.listar());
    } catch (error) {
      console.log(error.message);
    }
  };

  //Constante para el textfield de busqueda
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  //Constantes de los campos que se utilizaran para filtrar datos
  const camposToFilter = ["key", "escv_Nombre"];

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

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/DWv6wP7/ESTADOS-CIVILES-1.png"
        alt="Encabezado de la carta"
      />
      {/*Collapse del index*/}
      <Collapse in={mostrarIndex}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Botón de Nuevo Inicio*/}
          <Stack direction="row" spacing={1}>
            
          </Stack>
          {/* Botón de Nuevo Fin */}

          {/* Select para las filas de la tabla inicio*/}
          <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
          <Stack direction="row" spacing={1}>
            <label className="mt-8">Filas por página:</label>
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
            {/* Select para las filas de la tabla fin*/}

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
            {/* Barra de Busqueda en la Tabla fin */}
          </Stack>
          </div>
        </CardContent>
      </Collapse>
      {/* Mostrar tabla index inicio*/}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
          locale={{
            triggerDesc: 'Ordenar descendente',
            triggerAsc: 'Ordenar ascendente',
            cancelSort: 'Cancelar'
          }}
            columns={columns}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              showSizeChanger: false,
              className: "custom-pagination",
            }}
          />
        </div>  
      </Collapse>
      {/* Mostrar tabla index fin*/}

      {/* Collapse para mostrar los detalles de un registro inicio*/}
      <Collapse in={mostrarDetalles}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-center",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ marginBottom: '30px' }}>
              <Divider style={{ marginTop: '0px', marginBottom: '10px' }}>
                <Chip label="Detalles del Estado Civil" />
              </Divider>
            </Grid>


            <Grid container spacing={2} style={{ display: "flex", justifyContent: "center", marginBottom: '40px' }}>
              <Box sx={{ flex: 1, textAlign: "center", }} >
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id del Estado Civil:
                  </Typography>
                  <Typography>{DatosDetalles['escv_Id']}</Typography>
                </InputLabel>
              </Box>
              <Box sx={{ flex: 1, textAlign: "center", }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Nombre del Estado Civil:
                  </Typography>
                  <Typography>{DatosDetalles['escv_Nombre']}</Typography>
                </InputLabel>
              </Box>
            </Grid>
           {/*  <Grid item xs={12}>
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
                    <td style={tableCellStyle}>{DatosDetalles['usuarioCreacionNombre']}</td>
                    <td style={tableCellStyle}>
                      {DatosDetalles['escv_FechaCreacion']
                        ? new Date(DatosDetalles['escv_FechaCreacion']).toLocaleString()
                        : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </Grid> */}
            <Grid item xs={12}>
              <div className="card-footer">
                <Button
                  variant="contained"
                  onClick={() => {
                    setmostrarIndex(!mostrarIndex);
                    setmostrarDetalles(!mostrarDetalles);
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
    </Card>
  );
}

export default EstadosCivilesIndex;