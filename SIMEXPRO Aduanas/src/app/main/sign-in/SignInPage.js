import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import jwtService from "../../auth/services/jwtService";
import Swal from "sweetalert2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { InputAdornment } from "@material-ui/core";

/**
 * Form Validation Schema
 */

//Toasts

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "red",
  width: 400,
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const Toast2 = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "orange",
  width: 400,
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const schema = yup.object().shape({
  email: yup.string().required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function SignInPage() {
  const { control, formState, handleSubmit, setError, watch, setValue } =
    useForm({
      mode: "all",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const Image = "https://i.ibb.co/DVgPnbS/fondo.png";

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue('email', 'juan', { shouldDirty: true, shouldValidate: true });
    setValue('password', '123', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  function onSubmit({ email, password }) {
    if (
      (email || email.trim().length !== 0) &&
      (password || password.trim().length !== 0)
    ) {
      jwtService
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          // No need to do anything, user data will be set at app/auth/AuthContext
        })
        .catch((_errors) => {
          Toast.fire({
            icon: "error",
            title: "No se pudo iniciar sesion.",
          });
        });
    } else {
      Toast2.fire({
        icon: "error",
        title: "Hay campos vacios.",
      });
    }
  }

  const data = watch();

  const Validar = () => {
    if (
      !data.email ||
      data.email.trim().length === 0 ||
      !data.password ||
      data.password.trim().length === 0
    ) {
      Toast2.fire({
        icon: "error",
        title: "Hay campos vacios.",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1 ">
        <div className="w-full max-w-400 sm:w-400 mx-auto sm:mx-0">
          <Typography
            style={{ textAlign: "center", color: "#9452F9", fontSize: "40px" }}
            className="mt-32 text-4xl font-extrabold tracking-tight leading-tight"
          >
            INICIO DE SESIÓN
          </Typography>

          <div
            style={{ textAlign: "center" }}
            className="flex items-baseline mt-2 font-medium"
          >
            <Typography style={{ fontSize: "20px" }}>
              Ingrese su usuario y contraseña para iniciar sesión
            </Typography>
          </div>

          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Usuario o correo"
                  autoFocus
                  type="email"
                  error={!!errors.email}
                  // helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

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
                  // helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Recuérdame"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />
              <Link className="text-md font-medium" to="/forgot-password/user">
                ¿Contraseña olvidada?
              </Link>
            </div>

            <Button
              variant="contained"
              color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
              onClick={Validar}
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundImage: `url(${Image})` }}
        style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
      />
    </div>
  );
}

export default SignInPage;
