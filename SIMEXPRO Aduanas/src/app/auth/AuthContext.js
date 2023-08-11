import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { showMessage } from 'app/store/fuse/messageSlice';
import { logoutUser, setUser } from 'app/store/userSlice';
import jwtService from './services/jwtService';
import Swal from 'sweetalert2';

const AuthContext = React.createContext();

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'purple',
  width: 400,
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const Toast2 = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'green',
  width: 400,
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});



function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  function toastSuccess(message) {
    Toast2.fire({
      icon: 'success',
      title: message,
    });
  }
  function toastError(message) {
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }
  useEffect(() => {
    jwtService.on('onAutoLogin', () => {
      // dispatch(showMessage({ message: 'Signing in with JWT' }));
      toastSuccess("Reconectando")
      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then((user) => {
          success(user, 'Reconetado');
        })
        .catch((error) => {
          pass(error.message);
        });
    });

    jwtService.on('onLogin', (user) => {
      success(user, '¡Bienvenido!');
    });

    jwtService.on('onLogout', () => {
      pass('Sesió cerrada');

      dispatch(logoutUser());
    });

    jwtService.on('onAutoLogout', (message) => {
      pass(message);

      dispatch(logoutUser());
    });

    jwtService.on('onNoAccessToken', () => {
      pass();
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        // dispatch(showMessage({ message }));
        toastSuccess(message)
      }

      Promise.all([
        dispatch(setUser(user)),
        // You can receive data in here before app initialization
      ]).then((values) => {
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        // dispatch(showMessage({ message }));
        toastError(message)
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
