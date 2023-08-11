import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import History from 'src/@history/@history';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  user: yup.string().required('Ingresa tu usuario'),
});

const defaultValues = {
  user: '',
};

function MakeAleatoryCode(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function ClassicForgotPasswordPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const history = History;

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(user) {
    let tokenGenerate = MakeAleatoryCode(6)

    axios
      .get(`${process.env.REACT_APP_API_URL}api/Usuarios/UsuarioCorreo?usua_Nombre=${user['user']}`)
      .then(response => {
        if (response.data) {
          let datos = { token: tokenGenerate, user: user['user'], email: response.data.data['messageStatus'] };

          let SendMail = {
            service_id: 'service_vmi2fud',
            template_id: 'template_7pts636',
            user_id: 'v8MonHOTfcrwu9Q4E',
            template_params: {
              to_name: user['user'],
              message: tokenGenerate,
              send_to: response.data.data['messageStatus'],
            }
          };
          console.log(SendMail)
          axios
            .post(`https://api.emailjs.com/api/v1.0/email/send`, SendMail)
            .then(response => {
              if (response['status'] == 200) {
                console.log('Token enviado')
                history.push('/forgot-password/code', { data: datos });
              } else {
                console.log('No se pudo enviar')
              }
            })
            .catch((error) => {
              alert("ñonga3");
              console.log(error)
            });
        } else {
          alert("ñonga2");
          console.log("El usuario no existe")
        }
      })
      .catch((error) => {
        alert("ñonga");
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
            ¿Contaseña olvidada?
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Completa el formulario para recuperarla</Typography>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="user"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Usuario"
                  type="email"
                  error={!!errors.user}
                  helperText={errors?.user?.message}
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
              Enviar correo
            </Button>

            <Typography className="mt-32 text-md font-medium" color="text.secondary">
              <span>Regresar al </span>
              <Link className="ml-4" to="/sign-in">
                Login
              </Link>
            </Typography>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default ClassicForgotPasswordPage;
