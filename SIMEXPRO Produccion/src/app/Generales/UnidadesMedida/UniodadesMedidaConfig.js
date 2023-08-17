import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const UnidadesMedidaIndex = lazy(() => import('./UnidadesMedidas'));

const UnidadesMedidaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'UnidadesMedida',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <UnidadesMedidaIndex />,
        },
      ],
    },
  ],
};

export default UnidadesMedidaConfig;