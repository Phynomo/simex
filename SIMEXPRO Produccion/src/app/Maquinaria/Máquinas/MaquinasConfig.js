import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const MaquinasIndex = lazy(() => import('./Maquinas'));

const MaquinasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Maquinas',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <MaquinasIndex />,
        },
      ],
    },
  ],
};

export default MaquinasConfig;