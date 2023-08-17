import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const TransporteIndex = lazy(() => import('./Transporte'));

const TransporteConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Transporte',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <TransporteIndex />,
        },
      ],
    },
  ],
};

export default TransporteConfig;