import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Collapse from '@mui/material/Collapse';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField, FormLabel, FormControlLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import History from 'src/@history/@history';
import { useLocation } from 'react-router-dom';
import { forEach, values } from 'lodash';


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function RolesEditar() {

    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const [mostrarPantalla, setMostrarPantallas] = useState(false);
    const location = useLocation();
    const { role, nombre, pantallas } = location.state;
    const [PantallasSeleccionads, setPantallasSeleccionads] = useState([]);
    const [descripcion, setDescripcion] = useState(nombre);
    console.log(nombre)
    let RolesViewModel = {
        role_Descripcion: descripcion,
        role_Aduana: true,
        pant_Ids: [],
        usua_UsuarioCreacion: 1,
        role_FechaCreacion: null
    }




    //Constante de los datos que serán requeridos para el formulario
    const RolesSchema = yup.object().shape({
        role_Descripcion: yup.string().required(),
    });


    //Constante de los datos por defecto que tendran los formulario
    const DefaultRolesValues = {
        role_Descripcion: "",
    };

    const Navigate = useNavigate();



    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
        console.log(right)
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
        console.log(right)
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
        console.log(right)
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
        console.log(right)
    };

    const customList = (items) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const pant_Id = `transfer-list-item-${value.id}-label`;

                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': pant_Id,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={pant_Id} primary={` ${value.pant_Nombre}`} />
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );


    useEffect(() => {
        PickListPantallas()

    }, []);  //Constante para cargar datos a las tablas      



    const PickListPantallas = async () => {
        try {
            const customHeaders = {
                'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
            };
            const response = await axios.get(process.env.REACT_APP_API_URL + 'api/Pantallas/Listar', {
                headers: customHeaders,
            });
            const seleccionadas = [];


            const rows = response.data.data.map((item, index) => {

                location.state.pantallas.forEach(function (pantalla) {
                    if (item.pant_Id === pantalla.pant_Id) {
                        seleccionadas[index] = {
                            key: pantalla.key,
                            pant_Id: pantalla.pant_Id,
                            pant_Nombre: pantalla.pant_Nombre
                        }
                    }

                });

                return {
                    key: index,
                    pant_Id: item.pant_Id,
                    pant_Nombre: item.pant_Nombre,
                }
            });

            const resultado = rows.filter(objeto2 => {
                return !seleccionadas.some(objeto1 => objeto1.pant_Id === objeto2.pant_Id);
            });


            setRight(seleccionadas);
            setLeft(resultado);

        } catch (error) {
            console.log(error);

        }
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




    //Constante que nos ayuda para las validaciones con yup para los formularios
    const { register, reset, control, watch, formState } = useForm({
        DefaultRolesValues,
        mode: "all",
        resolver: yupResolver(RolesSchema),
    });

    const { isValid, dirtyFields, errors } = formState;


    const EditarRegistro = () => {
        const formData = watch();
       formData.role_Descripcion = descripcion;
        if (formData && formData.role_Descripcion) {
            EditarRol(formData);
        } else {
            console.log("Role Descripcion is missing in formData.");
        }
    };
    


    // Variables para validar campos
    const RoleValidar = (role_Descripcion) => {
        if (!role_Descripcion) {
            return true;
        }
        else {
            return false;
        }
    };


    const ToastSuccess = () => {
        toast.success('Datos editados correctamente.', {
            theme: 'dark',
            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
                marginTop: '50px'
            },
            autoClose: 1500,
            closeOnClick: true
        });
    }


    const ToastError = () => {
        toast.error('Ha ocurrido un error.', {

            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
                marginTop: '50px',
                backgroundColor: '#111827',
                color: 'white',
                fill: 'white'

            },
            autoClose: 5000,
            closeOnClick: true
        });
    }
    const ToastInfo = () => {
        toast.info('La descripción ya existe.', {

            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
                marginTop: '50px',
                backgroundColor: '#111827',
                color: 'white',
                fill: 'white'

            },
            autoClose: 5000,
            closeOnClick: true
        });
    }
    const RolesValidacion = () => {
        toast.error('Asegúrese de selccionar al menos una pantalla.', {

            //  position: toast.POSITION.BOTTOM_RIGHT
            style: {
                marginTop: '50px',
                backgroundColor: '#111827',
                color: 'white',
                fill: 'white'

            },
            autoClose: 5000,
            closeOnClick: true
        });
    }


    const EditarRol = (data) => {
        // Validación de campos
        const ErroresArray = [RoleValidar(data.role_Descripcion)];
        console.log(data.role_Descripcion);

        let errors = 0;
        for (let i = 0; i < ErroresArray.length; i++) {
            if (ErroresArray[i] === true) {
                errors++;
            }
        }

        if (errors > 0) {
            ToastWarning();
        } else {
            if (right.length === 0) {
                RolesValidacion();
            } else {
                const pant_Ids = {
                    pantallas: right.map((item) => ({ pant_Id: item.pant_Id })),
                };

                const jsonPantIds = JSON.stringify(pant_Ids);

                console.log(jsonPantIds);

                let values = {
                    role_Id: location.state.role,
                    role_Descripcion: data.role_Descripcion,
                    role_Aduana: true,
                    pant_Ids: jsonPantIds,
                    usua_UsuarioModificacion: 1,
                    role_FechaModificacion: new Date(),
                };

                console.log(data.role_Descripcion); // Acceder al valor del campo

                const customHeaders = {
                    'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
                };

                axios.post(process.env.REACT_APP_API_URL + 'api/Roles/Editar', values, {
                    headers: customHeaders,
                })
                    .then(response => {
                        console.log(response, "respuesta");
                        if (response.data != null) {
                            if (response.data.data.messageStatus === "1") {
                                ToastSuccess();

                                // Redirige después de 1500 ms (1.5 segundos)
                                setTimeout(() => {
                                    Navigate('/Roles/RolesIndex');
                                }, 2000);
                            } else {
                                if (response.data.data.messageStatus.includes("Violation of UNIQUE KEY constraint 'UQ_acce_tbRoles_role_Descripcion'.")) {
                                    ToastInfo();
                                }
                            }
                        } else {
                            console.log("eaeaea");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    };






    return (
        <Card sx={{ minWidth: 275, margin: '40px' }}>
            <ToastContainer />
            <CardMedia
                component="img"
                height="200"
                image="https://i.ibb.co/gMjB52g/ROLES.png"
                alt="Encabezado de la carta"
            />

            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={3}></Grid>


                <Grid item xs={6} sx={{ marginTop: "30px", marginBottom: '20px' }}>
                    <Controller
                        render={({ field }) => (
                            <FormControl error={!!errors.role_Descripcion} fullWidth={true}>
                                <FormLabel
                                    className="font-medium text-10"
                                    component="legend"
                                >
                                    Descripción del rol:
                                </FormLabel>
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    error={!!errors.role_Descripcion}
                                    fullWidth={true}
                                    value={descripcion}
                                    // Utiliza field.onChange para actualizar el estado
                                    onChange={(e) => {
                                        field.onChange(e); // Actualiza el valor en el Controller
                                        setDescripcion(e.target.value); // Actualiza el valor en el estado local
                                    }}
                                    inputProps={{
                                        startadornment: (
                                            <InputAdornment position="start"></InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                        )}
                        name="role_Descripcion"
                        control={control}
                    />

                </Grid>
            </Grid>




            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>{customList(left)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleAllRight}
                                disabled={left.length === 0}
                                aria-label="move all right"
                            >
                                ≫
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleAllLeft}
                                disabled={right.length === 0}
                                aria-label="move all left"
                            >
                                ≪
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{customList(right)}</Grid>
                </Grid>

            </CardContent>

            <Grid container className='mb-20' spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            startIcon={<Icon>checked</Icon>}
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: '10px' }}
                            sx={{
                                backgroundColor: '#634A9E', color: 'white',
                                "&:hover": { backgroundColor: '#6e52ae' },
                            }}
                            onClick={EditarRegistro}                      >
                            Guardar
                        </Button>
                    </Stack>
                    <div style={{ width: '10px' }}></div> {/* Espacio de 10px */}
                    <Stack direction="row" spacing={1}>
                        <Button
                            startIcon={<Icon>close</Icon>}
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: '10px' }}
                            sx={{
                                backgroundColor: '#797979', color: 'white',
                                "&:hover": { backgroundColor: '#b69999' },
                            }}
                            onClick={(e) => {
                                Navigate("/Roles/RolesIndex");
                            }}
                        >
                            Cancelar
                        </Button>
                    </Stack>
                </Grid>
            </Grid>




        </Card>
    )
}

export default RolesEditar;