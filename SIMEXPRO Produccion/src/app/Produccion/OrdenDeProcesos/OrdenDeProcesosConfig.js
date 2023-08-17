import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const OrdenDeProcesosIndex = lazy(() => import('./OrdenDeProcesos'));

const OrdenDeProcesosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'OrdenDeProcesos',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <OrdenDeProcesosIndex />,
        },
      ],
    },
  ],
};

export default OrdenDeProcesosConfig;