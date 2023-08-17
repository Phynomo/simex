import React from "react";
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
  Stack,
  CardContent,
  CardMedia,
  Card,
  Grid,
  Typography,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  FormLabel,
  TextareaAutosize,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "react-toastify/dist/ReactToastify.css";
import estilosTablaDetalles from "src/styles/tablaDetalles";
import "src/styles/custom-pagination.css";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon/FuseSvgIcon";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
  ToastDefault,
} from "src/styles/toastsFunctions";
import revisionCalidadService from "./RevisionCalidadService";
import History from "src/@history/@history";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Table, Tag, Image } from "antd";

const defaultRevisionValues = {
  image: null,
  cantidad: "",
  fechaRevision: "",
  observaciones: "",
  codigoproceso: "",
  scrap: false,
};

const RevisionSchema = yup.object().shape({
  image: yup.string().required(""),
  cantidad: yup.string().required(""),
  fechaRevision: yup.string().nullable().required(""),
  observaciones: yup.string().required(""),
  codigoproceso: yup.string().required(""),
  scrap: yup.bool().required(""),
});

function RevisionCalidadCrear() {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
      };
    } else {
      ToastWarningImagen();
    }
  };

  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultRevisionValues,
    mode: "all",
    resolver: yupResolver(RevisionSchema),
  });

  const { isValid, dirtyFields, errors } = formState;

  return (
    <Card sx={{ minWidth: 275, margin: "40px" }}>
      <CardMedia
        component="img"
        height="200"
        image="https://i.ibb.co/pwQbH4s/REVISI-N-DE-CALIDAD.png"
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
          <Grid item xs={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <Typography>Imagen de la prenda:</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"center"}
                maxHeight={"250px"}
              >
                <Image
                  width={250}
                  style={{
                    overflow: "hidden",
                    maxHeight: "100%",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                  src="https://wallpapercrafter.com/desktop/297246-Earth-Reflection-Phone-Wallpaper.jpg"
                  fallback="data:image/png;base64,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"
                />
              </Grid>

              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <Button
                  startIcon={
                    <FuseSvgIcon className="text-48" size={24} color="white">
                      material-outline:broken_image
                    </FuseSvgIcon>
                  }
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: "10px", marginRight: "10px" }}
                  sx={{
                    backgroundColor: "#634A9E",
                    color: "white",
                    "&:hover": { backgroundColor: "#6e52ae" },
                  }}
                  onClick={() => {}}
                >
                  Seleccionar una foto
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Right column for all the TextFields */}
          <Grid item xs={8} style={{}}>
            <Grid container spacing={3}>
              {/* Left column for TextFields */}
              <Grid item xs={6}>
                <Controller
                  name="empl_FechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      error={!!errors.empl_FechaNacimiento}
                      fullWidth={true}
                    >
                      <FormLabel error={!!errors.prov_Codigo}>
                        Fecha de revisión
                      </FormLabel>
                      <DatePicker
                        onChange={(date) => field.onChange(date)}
                        value={field.value}
                        required
                        renderInput={(_props) => (
                          <TextField
                            className="w-full"
                            {..._props}
                            onBlur={field.onBlur}
                            error={!!errors.empl_FechaNacimiento}
                          />
                        )}
                        className="w-full"
                      />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.prov_Codigo}>Cantidad</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        InputProps={{
                          maxLength: 20,
                        }}
                        error={!!errors.prov_Codigo}
                      />
                    )}
                    name="prov_Codigo"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={6}
                justifyContent={"center"}
                className="flex justify-content-center"
              >
                <Box sx={{ textAlign: "center" }}>
                  <FormControl fullWidth>
                    <FormLabel id="group-label">SCRAP</FormLabel>
                    <Controller
                      render={({ field }) => (
                        <>
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent={"center"}
                            alignItems="center"
                          >
                            <Typography>No</Typography>
                            <Switch {...field} />
                            <Typography>Sí</Typography>
                          </Stack>
                        </>
                      )}
                      name="PagoEfectuado"
                      control={control}
                    />
                  </FormControl>
                </Box>
                {/* <FormControl fullWidth>
                  <FormControlLabel
                    control={<Switch sx={{ '&.Mui-checked': { color: '#634A9E' } }} />}
                    label="SCRAP"
                    labelPlacement="top"
                  />
                </FormControl> */}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel error={!!errors.prov_Codigo}>
                    Descripcion
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-disabled"
                        InputProps={{
                          maxLength: 20,
                        }}
                        error={!!errors.prov_Codigo}
                      />
                    )}
                    name="prov_Codigo"
                    control={control}
                  ></Controller>
                </FormControl>
              </Grid>
            </Grid>
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
              startIcon={<Icon>check</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: "10px", marginRight: "10px" }}
              sx={{
                backgroundColor: "#634A9E",
                color: "white",
                "&:hover": { backgroundColor: "#6e52ae" },
              }}
              onClick={() => {}}
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
              onClick={() => {}}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default RevisionCalidadCrear;
