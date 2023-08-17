import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const FormaEnvioIndex = lazy(() => import('./FormasEnvio'));

const FormaEnvioConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'FormaEnvio',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <FormaEnvioIndex />,
        },
      ],
    },
  ],
};

export default FormaEnvioConfig;