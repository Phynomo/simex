/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
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
  Box,
  Divider,
  Chip,
} from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";

import LoadingIcon from "src/styles/iconoCargaTabla";

import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Table, Tag, Image } from "antd";

import "react-toastify/dist/ReactToastify.css";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import "src/styles/custom-pagination.css";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
  ToastDefault,
} from "src/styles/toastsFunctions";
import revisionCalidadService from "./RevisionCalidadService";
import History from "src/@history/@history";

function RevisionCalidadIndex() {
  const [searchText, setSearchText] = useState("");
  const [mostrarIndex, setmostrarIndex] = useState(true);
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [DatosDetalles, setDatosDetalles] = useState({});

  const [mostrarEditar, setmostrarEditar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);
  const [anchorEl, setAnchorEl] = useState({});

  const [filas, setFilas] = React.useState(10);

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  const handleEdit = (params) => {
    handleClose(params.reca_Id);
  };

  const handleDetails = (params) => {
    setDatosDetalles(params);
    MostrarDetalles();
    handleClose(params.reca_Id);
  };

  const handleDelete = (params) => {
    DialogEliminar();
    handleClose(params.reca_Id);
  };

  const handleChange = (event) => {
    setFilas(event.target.value);
  };

  /*Columnas de la tabla*/
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    // {
    //   title: "Nº Revision",
    //   dataIndex: "reca_Id",
    //   key: "reca_Id",
    //   sorter: (a, b) => a.reca_Id.localeCompare(b.reca_Id), //sorting para Letras
    // },
    {
      title: "Descripcion",
      dataIndex: "reca_Descripcion",
      key: "reca_Descripcion",
      sorter: (a, b) => a.reca_Descripcion.localeCompare(b.reca_Descripcion), //sorting para Letras
    },
    {
      title: "Fecha de revision",
      dataIndex: "reca_FechaRevision",
      key: "reca_FechaRevision",
      render: (text, record) =>
        `${new Date(record.reca_FechaRevision).toLocaleString()}`, // sirve para unir textos
      sorter: (a, b) =>
        a.reca_FechaRevision.localeCompare(b.reca_FechaRevision), //sorting para Letras
    },
    {
      title: "Contiene scrap",
      dataIndex: "reca_Scrap",
      key: "reca_Scrap",
      render: (text, record) => {
        return record.reca_Scrap ? (
          <Tag color="red">Si</Tag>
        ) : (
          <Tag color="green">No</Tag>
        );
      },
      sorter: (a, b) => a.reca_Scrap.localeCompare(b.reca_Scrap), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.reca_Id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.reca_Id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.reca_Id)}
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
              id={`menu-${params.reca_Id}`}
              anchorEl={anchorEl[params.reca_Id]}
              keepMounted
              open={Boolean(anchorEl[params.reca_Id])}
              onClose={() => handleClose(params.reca_Id)}
            >
              <MenuItem onClick={() => handleEdit(params)}>
                <Icon>edit</Icon> Editar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params)}>
                <Icon>visibility</Icon> Detalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params)}>
                <Icon>delete</Icon> Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  const [data, setData] = useState([]);

  const RevisionCalidadGetData = async () => {
    try {
      setData(await revisionCalidadService.listar());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    RevisionCalidadGetData();
  }, []);

  {
    /* Función para mostrar la tabla y mostrar agregar */
  }
  const CrearNuevo = () => {
    History.push('RevisionCalidad/Crear');
  };

  //Constante para mostrar el collapse de editar un registro
  const MostrarEditar = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarEditar(!mostrarEditar);
    reset(defaultRevisionValues);
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  {
    /* Filtrado de datos */
  }
  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/pwQbH4s/REVISI-N-DE-CALIDAD.png"
        alt="Encabezado de la carta"
      />
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
              onClick={CrearNuevo}
            >
              Nuevo
            </Button>
          </Stack>

          {/* Barra de Busqueda en la Tabla */}
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
            <Grid item xs={12}>
              <Divider style={{ marginBottom: "10px" }}>
                <Chip label="Detalles de la revisión de calidad" />
              </Divider>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Imagen de la prenda:
                  </Typography>

                  <Image
                    width={200}
                    fallback="data:image/png;base64,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"
                    src={DatosDetalles["reca_Imagen"]}
                  />
                </InputLabel>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Descripcion de la revisión:
                  </Typography>
                  <Typography>{DatosDetalles["reca_Descripcion"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Revisión de calidad Nº:
                  </Typography>
                  <Typography>{DatosDetalles["reca_Id"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Id del proceso revisado:
                  </Typography>
                  <Typography>{DatosDetalles["ensa_Id"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="descripcion">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Cantidad de prendas afectadas:
                  </Typography>
                  <Typography>{DatosDetalles["reca_Cantidad"]}</Typography>
                </InputLabel>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Box sx={{ textAlign: "center" }}>
                <InputLabel htmlFor="id">
                  <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                    Es Scrap:
                  </Typography>
                  <Typography>
                    {DatosDetalles["reca_Scrap"] ? (
                      <Tag color="red">Si</Tag>
                    ) : (
                      <Tag color="green">No</Tag>
                    )}
                  </Typography>
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
                      {DatosDetalles["usua_UsuarioCreacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {new Date(
                        DatosDetalles["reca_FechaCreacion"]
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr style={estilosTablaDetalles.tableRowStyle}>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["usua_UsuarioModificacion"]}
                    </td>
                    <td style={estilosTablaDetalles.tableCellStyle}>
                      {DatosDetalles["reca_FechaModificacion"]
                        ? new Date(
                            DatosDetalles["reca_FechaModificacion"]
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
      {/* Collapse para mostrar los detalles de un registro fin*/}

      {/* Dialog eliminar */}
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
              onClick={handleDelete}
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
    </Card>
  );
}

export default RevisionCalidadIndex;
