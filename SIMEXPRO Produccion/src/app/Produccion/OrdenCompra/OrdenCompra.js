import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  Grid,
  Box,
  Typography,
  Select,
  Switch,
  FormControlLabel,
  Collapse,
  DataGrid,
  GridToolbar,
  esES,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Badge, Dropdown, Space, Table } from "antd";

function OrdenCompraIndex() {
  //Constante navigate para las redirecciones a otras pantallas
  const navigate = useNavigate();

  //Constante para mostrar el index de la pantalla
  const [mostrarIndex, setmostrarIndex] = useState(true);

  //Constante para la busqueda del datatable
  const [searchText, setSearchText] = useState("");
  const [mostrarAdd, setmostrarAdd] = useState(false);
  const [Eliminar, setEliminar] = useState(false);
  const [mostrarDetalles, setmostrarDetalles] = useState(false);

  //Constante para las filas que tendrá cada paginación del datatable
  const [filas, setFilas] = React.useState(10);

  const handleClose = (id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: null,
    }));
  };

  //Constante para la accion de editar, abre el collapse de editar y carga el dato en el textfield
  const handleEdit = (rowId) => {
    handleClose(id);
  };

  //Constante abrir el collapse de los detalles de la pantalla
  const handleDetails = (id) => {
    MostrarCollapseDetalles();
    handleClose(id);
  };

  //Constante para la accción de eliminar y que abre el dialog de eliminar en el index y cierra el boton de opciones
  const handleDelete = (id) => {
    DialogEliminar();
    handleClose(id);
  };

  //Constante para la accción de añadir un nuevo material
  const handleAddMaterial = (id) => {
    handleClose(id);
  };

  //Constante cuando se hace click para el boton de opciones
  const handleClick = (event, id) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [id]: event.currentTarget,
    }));
  };

  //Constante para mostrar el collapse de detalles un registro
  const MostrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante para cerrar el collapse de detalles
  const CerrarCollapseDetalles = () => {
    setmostrarIndex(!mostrarIndex);
    setmostrarDetalles(!mostrarDetalles);
  };

  //Constante para el boton de opciones
  const [anchorEl, setAnchorEl] = useState({});

  const DialogEliminar = () => {
    setEliminar(!Eliminar);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id, //sorting para Numeros
    },
    {
      title: "Fecha de Emisión",
      dataIndex: "FechaEmision",
      key: "FechaEmision",
      sorter: (a, b) => a.FechaEmision.localeCompare(b.FechaEmision), //sorting para Letras
    },
    {
      title: "Fecha de Limite",
      dataIndex: "FechaLimite",
      key: "FechaLimite",
      sorter: (a, b) => a.FechaLimite.localeCompare(b.FechaLimite), //sorting para Letras
    },
    {
      title: "Cliente",
      dataIndex: "Cliente",
      key: "Cliente",
      sorter: (a, b) => a.Cliente.localeCompare(b.Cliente), //sorting para Letras
    },
    {
      title: "Acciones",
      key: "operation",
      render: (params) => (
        <div key={params.id}>
          <Stack direction="row" spacing={1}>
            <Button
              aria-controls={`menu-${params.id}`}
              aria-haspopup="true"
              onClick={(e) => handleClick(e, params.id)}
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
              id={`menu-${params.id}`}
              anchorEl={anchorEl[params.id]}
              keepMounted
              open={Boolean(anchorEl[params.id])}
              onClose={() => handleClose(params.id)}
            >
              <MenuItem onClick={() => handleEdit(params.id)}>
                <Icon>edit</Icon>ㅤEditar
              </MenuItem>
              <MenuItem onClick={() => handleDetails(params.id)}>
                <Icon>visibility</Icon>ㅤDetalles
              </MenuItem>
              <MenuItem onClick={() => handleDelete(params.id)}>
                <Icon>delete</Icon>ㅤ Eliminar
              </MenuItem>
            </Menu>
          </Stack>
        </div>
      ),
    },
  ];

  //Constante para que se carguen los datos en la tabla del index
  const data = [];
  for (let i = 1; i < 12; ++i) {
    data.push({
      key: i.toString(),
      id: i.toString(),
      FechaEmision: "0" + i + "/0" + i + "/200" + i,
      FechaLimite: "0" + i + "/0" + i + "/200" + i,
      Cliente: "Cliente " + i,
      tabla: [
        { key: "1", name: "Value1" + i, platform: "Value2" + i },
        { key: "2", name: "Value3" + i, platform: "Value4" + i },
        // Add more rows to the nested table here...
      ],
    });
  }

  //Constante para alinear los iconos de la tabla de detalles con los headers de la tabla y cambiar el color a los iconos
  const iconStyle = {
    marginRight: "5px",
    verticalAlign: "middle",
    color: "#634a9e",
  };

  //Constante para los estilos de los headers de la tabla de detalles
  const tableHeaderStyle = {
    verticalAlign: "middle",
    padding: "15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f2f2f2",
  };

  //Constante para los estilos de los filas de la tabla de detalles
  const tableRowStyle = {
    "&:hover": {
      backgroundColor: "coral",
    },
  };

  //Constante para los estilos de los celdas de la tabla de detalles
  const tableCellStyle = {
    verticalAlign: "middle",
    padding: "15px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  {
    /*Datos de la tabla*/
  }
  const rows = [
    {
      id: "5686464564",
      FechaEmision: "16-10-2023",
      FechaLimite: "16-10-2023",
      Cliente: "Isaac Zepeda GOD",
    },
    {
      id: "2423423423",
      FechaEmision: "16-10-2023",
      FechaLimite: "16-10-2023",
      Cliente: "Isaac Zepeda GOD",
    },
    {
      id: "2342342342",
      FechaEmision: "16-10-2023",
      FechaLimite: "16-10-2023",
      Cliente: "Isaac Zepeda GOD",
    },
    {
      id: "3423423423",
      FechaEmision: "16-10-2023",
      FechaLimite: "16-10-2023",
      Cliente: "Isaac Zepeda GOD",
    },
    {
      id: "5564564565",
      FechaEmision: "16-10-2023",
      FechaLimite: "16-10-2023",
      Cliente: "Isaac Zepeda GOD",
    },
    {
      id: "3455345454",
      FechaEmision: "16-10-2023",
      FechaLimite: "16-10-2023",
      Cliente: "Isaac Zepeda GOD",
    },
  ];

  //Constante que detecta el cambio de las filas que se mostraran en el index
  const handleChange = (event) => {
    setFilas(event.target.value);
    setMessage(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //Constante que ayuda a filtrar el datatable
  const filteredRows = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      {/* CardMedia para los header de la carta (Imagenes header con nombres de la carta)*/}
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/D5SZnc4/ORDEN-DE-COMPRA.png"
        alt="Encabezado de la carta"
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/*Botón de Nuevo*/}
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
              navigate("/OrdenCompra_Crear/Index");
            }}
          >
            Nuevo
          </Button>
        </Stack>
        {/* Botón de Nuevo Fin */}

        {/* Select para las filas de la tabla inicio*/}
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

          {/* Barra de Busqueda en la Tabla inicio */}
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
      </CardContent>

      {/* Mostrar tabla index inicio*/}
      <Collapse in={mostrarIndex}>
        <div className="center" style={{ width: "95%", margin: "auto" }}>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <Table
                  columns={columns}
                  dataSource={record.tabla}
                  pagination={false}
                />
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={filteredRows}
            size="small"
            pagination={{
              pageSize: filas,
              className: "decoration-white",
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
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>Detalles de la Orden de compra</h2>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Orden de compra id:
                    </Typography>
                    <Typography></Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Codigo orden de compra:
                    </Typography>
                    <Typography></Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="id">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Otro campo:
                    </Typography>
                    <Typography></Typography>
                  </InputLabel>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <InputLabel htmlFor="descripcion">
                    <Typography sx={{ fontWeight: "bold", color: "#000000" }}>
                      Otro campo:
                    </Typography>
                    <Typography></Typography>
                  </InputLabel>
                </Box>
              </Box>
            </Grid>
            <br></br>
            <Grid item xs={12}>
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
                    <td style={tableCellStyle}>Usuario Creación</td>
                    <td style={tableCellStyle}>00/00/0000</td>
                  </tr>
                  <tr style={tableRowStyle}>
                    <td style={tableCellStyle}>
                      <strong>Modificación</strong>
                    </td>
                    <td style={tableCellStyle}>Usuario Modificación</td>
                    <td style={tableCellStyle}>00/00/0000</td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <br></br>
            <Grid item xs={12}>
              <div className="card-footer">
                <Button
                  variant="contained"
                  onClick={CerrarCollapseDetalles}
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

      {/* Dialog para eliminar un registro inicio*/}
      <Dialog
        open={Eliminar}
        fullWidth={"md"}
        onClose={DialogEliminar}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmación de Eliminación"}
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
              onClick={DialogEliminar}
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
      {/* Dialog para eliminar un registro fin*/}
    </Card>
  );
}

export default OrdenCompraIndex;
