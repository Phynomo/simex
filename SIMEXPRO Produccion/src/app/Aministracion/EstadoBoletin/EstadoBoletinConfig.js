import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const EstadoBoletinIndex = lazy(() => import('./EstadoBoletin'));

const EstadoBoletinConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'EstadoBoletin',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <EstadoBoletinIndex />,
        },
      ],
    },
  ],
};

export default EstadoBoletinConfig;