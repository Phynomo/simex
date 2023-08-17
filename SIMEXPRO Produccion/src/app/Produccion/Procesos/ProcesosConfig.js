import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const ProcesosIndex = lazy(() => import('./Procesos'));

const ProcesosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Procesos',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ProcesosIndex />,
        },
      ],
    },
  ],
};

export default ProcesosConfig;