import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const OficinasIndex = lazy(() => import('./Oficinas'));

const OficinasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Oficinas',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <OficinasIndex />,
        },
      ],
    },
  ],
};

export default OficinasConfig;