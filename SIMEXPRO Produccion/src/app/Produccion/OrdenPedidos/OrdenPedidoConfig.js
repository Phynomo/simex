import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const OrdenPedidoIndex = lazy(() => import('./OrdenPedido_Index'));

const OrdenPedidoConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'OrdenPedido',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <OrdenPedidoIndex />,
        },
      ],
    },
  ],
};

export default OrdenPedidoConfig;