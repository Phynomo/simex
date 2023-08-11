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
import { useLocation } from 'react-router-dom';
import History from 'src/@history/@history';
import { useEffect } from 'react';
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  token: yup.string().required('Ingresa tu usuario'),
});

const defaultValues = {
  token: '',
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

function GetCode() {
  const location = useLocation();
  const myData = location.state?.data ?? History.push('/forgot-password/user');
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [datos, setDatos] = useState(myData)
  const { isValid, dirtyFields, errors } = formState;
  const [reToken, setReToken] = useState(false)
  const [reTokenClic, setReTokenClic] = useState(1)
  const [timer, setTimer] = useState()


  function reenviarToken() {
    setReToken(true);
    let newToken = MakeAleatoryCode(6)

    setDatos((prevState) => ({
      ...prevState,
      ...{token: newToken},
    }));

    let data = {
      service_id: 'service_vmi2fud',
      template_id: 'template_7pts636',
      user_id: 'v8MonHOTfcrwu9Q4E',
      template_params: {
        to_name: datos['user'],
        message: newToken,
        send_to: datos['email'],
      }
    };

    axios
    .post(`https://api.emailjs.com/api/v1.0/email/send`, data)
    .then(response => {
        if(response['status'] == 200){
          console.log('Token enviado')
        }else{
          console.log('No se pudo enviar')
        }
      })
      .catch((error) => {
        console.log('Error inesperado')
      });

    setTimeout(function () {
      setReToken(false);
    }, 15000 * reTokenClic);
    setReTokenClic(reTokenClic + 1);
    for (let index = 15000 * reTokenClic / 1000; index >= 0; index--) {
      setTimeout(function () {
        setTimer((15000 * reTokenClic / 1000) - index)
      }, 1000 * index);
    }
  }




  function onSubmit(token) {
    if(token['token'].toUpperCase() == datos['token']){
      History.push("/forgot-password/password", { data: datos });
    }else{
      console.log('Token erroneo')
    }

    reset(defaultValues);
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
      <Paper className="w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-3xl font-extrabold tracking-tight leading-tight">
            Validar token
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Se te fue enviado un token al correo: {datos['email'].split('@')[0].substr(0, 4)}*******@{datos['email'].split('@')[1]}</Typography>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="token"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Token"
                  type="email"
                  error={!!errors.token}
                  helperText={errors?.token?.message}
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
              Validar token
            </Button>


            <Typography className="mt-32 text-md font-medium flex justify-center" color="text.secondary">
              <span>¿No has recibido tu token?</span>
            </Typography>
            <Typography className="text-md font-medium flex justify-center" color="text.secondary">
              <Button
                variant="contained"
                color="primary"
                className=" mt-4"
                aria-label="Register"
                disabled={reToken}
                onClick={reenviarToken}
                type="button"
                size="small"
              >
                Reenviar token {timer>0?(timer):null}
              </Button>
            </Typography>

          </form>
        </div>
      </Paper>
    </div>
  );
}

export default GetCode;
