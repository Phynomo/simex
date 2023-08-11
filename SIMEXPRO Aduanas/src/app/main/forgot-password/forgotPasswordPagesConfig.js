import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import authRoles from '../../auth/authRoles';

const ClassicForgotPasswordPage = lazy(() => import('./ClassicForgotPasswordPage'));
const GetCode = lazy(() => import('./GetCode'));
const ClassicResetPasswordPage = lazy(() => import('./ClassicResetPasswordPage'));

const forgotPasswordPagesConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'forgot-password',
      children: [
        {
          path: '',
          element: <Navigate to="user" />,
        },
        {
          path: 'user',
          element: <ClassicForgotPasswordPage />,
        },
        {
          path: 'code',
          element: <GetCode />,
        },
        {
          path: 'password',
          element: <ClassicResetPasswordPage />,
        },
      ],
    },
  ],
};

export default forgotPasswordPagesConfig;
