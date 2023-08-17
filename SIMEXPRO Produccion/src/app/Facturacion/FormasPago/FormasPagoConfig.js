import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const FomasPagoIndex = lazy(() => import('./FormasPago'));

const FomasPagoConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'FormasPago',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <FomasPagoIndex />,
        },
      ],
    },
  ],
};

export default FomasPagoConfig;