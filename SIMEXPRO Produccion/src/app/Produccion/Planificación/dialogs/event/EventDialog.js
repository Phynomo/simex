import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import FuseUtils from '@fuse/utils/FuseUtils';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { Popover, MenuItem,
  Menu } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { FormControl, Icon, InputAdornment, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Fragment } from 'react';
import {
  addEvent,
  closeEditEventDialog,
  closeNewEventDialog,
  removeEvent,
  selectEventDialog,
  updateEvent,
} from '../../store/eventsSlice';
import EventLabelSelect from '../../EventLabelSelect';
import EventModel from '../../model/EventModel';
import { selectFirstLabelId } from '../../store/labelsSlice';
import CardMedia from '@mui/material/CardMedia';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const defaultValues = EventModel();


/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  detallePO: yup.string().required(''),
  fechainicio: yup.string().required(''),
  fechafin: yup.string().required(''),
});


function EventDialog(props) {
  
/* Trae los datos de todos los ddl */
useEffect(() => {
  CargasDatosDdl();
}, []);

  const [open, setOpen] = useState(false); // Agregar estado para controlar el modal
  const [ProcesosDdl, setProcesosDdl] = useState([]);
  const [proceso, setproceso] = useState("");
  const [EmpleadosDdl, setEmpleadosDdl] = useState([]);
  const [empleados, setempleados] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const eventDialog = useSelector(selectEventDialog);
  const firstLabelId = useSelector(selectFirstLabelId);

  const { handleSubmit, reset, formState, watch, control, getValues } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const fechainicio = watch('fechainicio');
  const fechafin = watch('fechafin');
  const id = watch('id');

  /* DDLS*/
  const CargasDatosDdl = async () => {
    const customHeaders = {
      'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
    };
    const responseDdl = await axios.get(process.env.REACT_APP_API_URL+'api/Procesos/Listar', {
      headers: customHeaders,
    });
      setProcesosDdl(
        responseDdl.data.data.map(item => ({
          proc_Id: item.proc_Id,
          proceso: item.proc_Descripcion,
        }))
      )

      const responseDdl2 = await axios.get(process.env.REACT_APP_API_URL+'api/Empleados/Listar', {
        headers: customHeaders,
      });
        setEmpleadosDdl(
          responseDdl2.data.data.map(item => ({
            empl_Id: item.empl_Id,
            empleado: item.empl_Nombres + ' ' + item.empl_Apellidos,
          }))
        )
  }

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (eventDialog.type === 'edit' && eventDialog.data) {
      reset({ ...eventDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (eventDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...eventDialog.data,
        extendedProps: {
          ...defaultValues.extendedProps,
          label: firstLabelId,
        },
        id: FuseUtils.generateGUID(),
      });
    }
  }, [eventDialog.data, eventDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (eventDialog.props.open) {
      initDialog();
    }
  }, [eventDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return eventDialog.type === 'edit'
      ? dispatch(closeEditEventDialog())
      : dispatch(closeNewEventDialog());
  }

  const GuardarLote = () => {
    const formData = watch();
    validarLotes(formData);
    handleSubmit(validarLotes)();
  }

  function validarLotes(data) {
    if(data.lote != null || data.cantidadlote != null){
      if(data.lote.trim() === "" || data.cantidadlote.trim() === ""){
        toast.error('Debe completar los campos.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      }else{
        handleClose();
        toast.success('Datos ingresados correctamente.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      }
    }else{
      toast.error('Debe completar los campos.', {
        theme: 'dark',
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }
  }

  const GuardarPlanificacion = () => {
    const formData = watch();
    onSubmit(formData);
    handleSubmit(onSubmit)();
  };
  function onSubmit(data) {
    if (data.detallePO != null || data.fechainicio != null || data.fechafin != null || data.detallePO != null || data.proceso != null) {
      if (data.detallePO.trim() === "") {
        toast.error('Debe completar los campos.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      } else {
        if (eventDialog.type === 'new') {
          dispatch(addEvent(data));
        } else {
          dispatch(updateEvent({ ...eventDialog.data, ...data }));
        }
        closeComposeDialog();
        toast.success('Datos ingresados correctamente.', {
          theme: 'dark',
          style: {
            marginTop: '50px'
          },
          autoClose: 1500,
          closeOnClick: true
        });
      }
    } else {
      toast.error('Debe completar los campos.', {
        theme: 'dark',
        style: {
          marginTop: '50px'
        },
        autoClose: 1500,
        closeOnClick: true
      });
    }
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeEvent(id));
    closeComposeDialog();
  }



  return (
  
    <Popover
      {...eventDialog.props}
      anchorReference="anchorPosition"
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      onClose={closeComposeDialog}
      component="form"
    >
 <ToastContainer/>


      <br></br>

      <img src='https://i.ibb.co/vz0XJyB/AGREGAR.png' width={250} style={{ alignItems: 'center', marginLeft: '125px' }}></img>

      <div className="flex flex-col max-w-full p-24 pt-32 sm:pt-20 sm:p-32 w-480">
        <div className="flex sm:space-x-20 mb-10">
       
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>
            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              heroicons-outline:pencil-alt
            </FuseSvgIcon>
            <Controller
            name='detallePO'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id='detallePO'
                error={!!errors.detallePO}
                style={{ borderRadius: '10px', width: '350px' }}
                label="# Detalle de PO" />
            )}
            />
          </Grid>

        </div>
        <div className="flex sm:space-x-20 mb-10">



          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>


            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              material-outline:dry_cleaning
            </FuseSvgIcon>
            <Controller
            name='estilo'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id='estilo'
                style={{ borderRadius: '10px', width: '100px' }}
                label="Estilo" />
            )}
            />
            <Controller
            name='talla'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                name='talla'
                style={{ borderRadius: '10px', width: '75px', marginLeft: '15px' }}
                label="Talla" />
            )}
            />
            <Controller
            name='talla'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                name='color'
                style={{ borderRadius: '10px', width: '145px', marginLeft: '15px' }}
                label="Color" />
            )}
            />
          </Grid>

        </div>
        <div className="flex sm:space-x-20 mb-10">



          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>


            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              material-outline:calendar_today
            </FuseSvgIcon>

            <Grid item xs={6}>
            <Controller
                  name="fechainicio"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                  <DateTimePicker
                  variant="outlined"
                  dateFormat="dd/MM/yyyy"
                  value={value}
                  onChange={onChange}
                  renderInput={(_props) => (
                    <TextField
                    error={!!errors.fechainicio}
                      label='Fecha de inicio'
                      id='fechainicio'
                      style={{ borderRadius: '10px', width: '168px' }}
                      className="w-full"
                      {..._props} />
                  )}
                  className="w-full" />
                  )}
                  />
            </Grid>

            <Grid item xs={6}>
            <Controller
                  name="fechafin"
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                  <DateTimePicker
                  value={value}
                  onChange={onChange}
                  renderInput={(_props) => (
                    <TextField
                    error={!!errors.fechafin}
                    label='Fecha de fin'
                      id='fechafin'
                      style={{ borderRadius: '10px', width: '168px', marginLeft: '15px' }}
                      className="w-full"
                      {..._props} />
                  )}
                  className="w-full" />
                  )}
                  />
            </Grid>
          </Grid>
        </div>

        <div className="flex sm:space-x-20 mb-10">

          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>

            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              material-outline:settings
            </FuseSvgIcon>


            
            <Controller
            defaultValue={" "}
            name='proceso'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel htmlFor="grouped-native-select">Proceso</InputLabel>
              <Select
              {...field}
                style={{ borderRadius: '4px', width: '350px' }}
                label="Proceso" >
                  {ProcesosDdl.map(proceso => (
                          <MenuItem key={proceso.proc_Id} value={proceso.proc_Id}>
                            {proceso.proceso}
                          </MenuItem>
                        ))}  
                </Select>
                </FormControl>
            )}
            />
          </Grid>


        </div>

        <div className="flex sm:space-x-20 mb-10">

          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>

            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              material-outline:volunteer_activism
            </FuseSvgIcon>


            <Controller
            name='empleado'
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel htmlFor="grouped-native-select">Empleado Encargado</InputLabel>
              <Select
                {...field}
                style={{ borderRadius: '4px', width: '200px' }}
                label="Empleado Encargado">
                  {EmpleadosDdl.map(empleado => (
                          <MenuItem key={empleado.empl_Id} value={empleado.empl_Id}>
                            {empleado.empleado}
                          </MenuItem>
                        ))}  
                </Select>
            </FormControl>
            )}
            />


            <Controller
            name='cantidad'
            defaultValue={[0]}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id='cantidad'
                type='number'
                style={{ borderRadius: '10px', width: '145px'}}
                label="Cantidad" />
            )}
            />
          </Grid>

  
        </div>
        <div className="flex sm:space-x-20 mb-10">



          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ marginTop: '10px' }}>
            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action" style={{ width: '50px' }}>
              material-outline:animation
            </FuseSvgIcon>
            <FormControl>
              <TextField
                style={{ borderRadius: '10px', width: '350px' }}
                label="Lotes Asignados"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleOpen}>
                        <FuseSvgIcon color="action" style={{ width: '24px', height: '24px' }}>
                          heroicons-outline:plus-circle
                        </FuseSvgIcon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }} />
            </FormControl>


          </Grid>


        </div>
        <br></br>

        <div className="flex sm:space-x-20 mb-10">
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} style={{ marginLeft: '100px' }}>
            <Button
              startIcon={<Icon>checked</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px', marginRight: '10px' }}
              sx={{
                backgroundColor: '#634A9E', color: 'white',
                "&:hover": { backgroundColor: '#6e52ae' },
              }}
              onClick={GuardarPlanificacion}
            >
              Guardar  </Button>

            <Button
              startIcon={<Icon>close</Icon>}
              variant="contained"
              color="primary"
              style={{ borderRadius: '10px' }}
              sx={{
                backgroundColor: '#DAD8D8', color: 'black',
                "&:hover": { backgroundColor: '#BFBABA' },
              }}
              onClick={closeComposeDialog}
            >
              Cancelar </Button>
          </Grid>
        </div>
      </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginLeft: '75px' }}>
            ASIGNAR LOTES
          </Typography>
          <br></br>
          <div className="flex sm:space-x-20 mb-10">
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
              style={{ marginTop: '10px' }}>
               <Controller
                  render={({ field }) => (
                  <TextField
                  {...field}
                  error={!!errors.lote}
                  variant="outlined"
                  style={{ borderRadius: '10px', width: '328px' }}
                  label="N° de Lote" />
                  )}
                  name='lote'
                  control={control}
                  />
            </Grid>
          </div>


          <div className="flex sm:space-x-20 mb-10">
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}
              style={{ marginTop: '10px' }}>
               <Controller
                  render={({ field }) => (
                  <TextField
                  {...field}
                  variant="outlined"
                  error={!!errors.cantidadlote}
                  style={{ borderRadius: '10px', width: '328px' }}
                  label="Cantidad" />
                  )}
                  name='cantidadlote'
                  control={control}
                  />
            </Grid>
          </div>
          <br></br>
          <div className="flex sm:space-x-20 mb-10">
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }} style={{ marginLeft: '50px' }}>
              <Button
                startIcon={<Icon>checked</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px', marginRight: '10px' }}
                sx={{
                  backgroundColor: '#634A9E', color: 'white',
                  "&:hover": { backgroundColor: '#6e52ae' },
                }}
                onClick={GuardarLote}
              >
                Guardar  </Button>

              <Button
                startIcon={<Icon>close</Icon>}
                variant="contained"
                color="primary"
                style={{ borderRadius: '10px' }}
                sx={{
                  backgroundColor: '#DAD8D8', color: 'black',
                  "&:hover": { backgroundColor: '#BFBABA' },
                }}
                onClick={handleClose}
              >
                Cancelar </Button>
            </Grid>
            
          </div>

        </Box>
      </Modal>
      <ToastContainer/>
    </Popover>
  );
}

export default EventDialog;
