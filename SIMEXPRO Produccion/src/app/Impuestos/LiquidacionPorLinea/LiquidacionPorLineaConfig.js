import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const LiquidacionPorLineaIndex = lazy(() => import('./LiquidacionPorLinea'));

const LiquidacionPorLineaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'LiquidacionPorLinea',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <LiquidacionPorLineaIndex />,
        },
      ],
    },
  ],
};

export default LiquidacionPorLineaConfig;