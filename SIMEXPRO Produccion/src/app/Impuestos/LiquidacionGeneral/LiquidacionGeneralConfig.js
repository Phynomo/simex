import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const LiquidacionGeneralIndex = lazy(() => import('./LiquidacionGeneral'));

const LiquidacionGeneralConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'LiquidacionGeneral',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <LiquidacionGeneralIndex />,
        },
      ],
    },
  ],
};

export default LiquidacionGeneralConfig;