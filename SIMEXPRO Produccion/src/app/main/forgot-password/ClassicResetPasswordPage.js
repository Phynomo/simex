import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jwtService from "../../auth/services/jwtService";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  password: yup
    .string()
    .required('Ingresa tu nueva contraseña.')
    .min(8, 'Contraseña invalida - La contraseña debe tener al menos 8 caractere.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no son iguales'),
});

const defaultValues = {
  password: '',
  passwordConfirm: '',
};

function ClassicResetPasswordPage() {
  const location = useLocation();
  const myData = location.state?.data ?? History.push('/forgot-password/user');
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(password) {
    let datos = {
      "usua_Nombre": myData['user'],
      "usua_Contrasenia": password['password'],
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}api/Usuarios/CambiarContrasenia`, datos)
      .then(response => {
        if (response.data) {
          console.log('Contraseña cambiada exitosamente')
          jwtService
            .signInWithEmailAndPassword(myData['user'], password['password'])
            .then((user) => {
              // No need to do anything, user data will be set at app/auth/AuthContext
            })
            .catch((_errors) => {
              
            });

        } else {
          console.log('No se pudo actualizar tu contraseña')
        }
      }).catch((error) => {
        console.log(error)
      });
    reset(defaultValues);
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
        <img className="h-40" src="https://i.ibb.co/HgdBM0r/slogan.png" alt="logo" />

          <Typography className="mt-32 text-3xl font-extrabold tracking-tight leading-tight">
            Reestablecer contraseña
          </Typography>
          <Typography className="font-medium">Ingresa la nueva contraseña de tu cuenta</Typography>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Contraseña"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Contraseña (Confirmacion)"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-4"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Guardar contraseña
            </Button>

            {/* <Typography className="mt-32 text-md font-medium" color="text.secondary">
              <span>Return to</span>
              <Link className="ml-4" to="/sign-in">
                sign in
              </Link>
            </Typography> */}
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default ClassicResetPasswordPage;
