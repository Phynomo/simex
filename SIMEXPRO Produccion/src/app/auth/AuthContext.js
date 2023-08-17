import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import { showMessage } from "app/store/fuse/messageSlice";
import { logoutUser, setUser } from "app/store/userSlice";
import jwtService from "./services/jwtService";
import { appendNavigationItem } from "app/store/fuse/navigationSlice";
import "react-toastify/dist/ReactToastify.css";
import {
  ToastSuccess,
  ToastWarning,
  ToastError,
  ToastDefault,
} from "src/styles/toastsFunctions";
import axios from "axios";
const AuthContext = React.createContext();
import menuLoad from "./services/menuLoad";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    jwtService.on("onAutoLogin", async () => {
      // dispatch(showMessage({ message: 'Signing in with JWT' }));
      // ToastSuccess("¡Bienvenido!")
      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then(async (user) => {
          const dibujo = await menuLoad.dibujar(user);
          {dibujo[0]? dispatch(appendNavigationItem(dibujo[0])):null}
          {dibujo[1]? dispatch(appendNavigationItem(dibujo[1])):null}
          {dibujo[2]? dispatch(appendNavigationItem(dibujo[2])):null}
          {dibujo[3]? dispatch(appendNavigationItem(dibujo[3])):null}
          success(user, "¡Bienvenido!");
        })
        .catch((error) => {
          pass(error.message);
        });
    });

    jwtService.on("onLogin", async (user) => {
     
      const dibujo = await menuLoad.dibujar(user);
      {dibujo[0]? dispatch(appendNavigationItem(dibujo[0])):null}
      {dibujo[1]? dispatch(appendNavigationItem(dibujo[1])):null}
      {dibujo[2]? dispatch(appendNavigationItem(dibujo[2])):null}
      {dibujo[3]? dispatch(appendNavigationItem(dibujo[3])):null}
      
      success(user, "¡Bienvenido!");
    });

    jwtService.on("onLogout", () => {
      pass();

      dispatch(logoutUser());
    });

    jwtService.on("onAutoLogout", (message) => {
      pass(message);

      dispatch(logoutUser());
    });

    jwtService.on("onNoAccessToken", () => {
      pass();
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        // dispatch(showMessage({ message }));
        ToastDefault(message);
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
        ToastError(message);
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
