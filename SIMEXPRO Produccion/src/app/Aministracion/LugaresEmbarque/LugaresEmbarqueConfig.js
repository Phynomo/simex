import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const LugaresEmbarqueIndex = lazy(() => import('./LugaresEmbarque'));

const LugaresEmbarqueConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'LugaresEmbarque',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <LugaresEmbarqueIndex />,
        },
      ],
    },
  ],
};

export default LugaresEmbarqueConfig;