import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const ImpuestosIndex = lazy(() => import('./Impuestos'));

const ImpuestosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Impuestos',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ImpuestosIndex />,
        },
      ],
    },
  ],
};

export default ImpuestosConfig;