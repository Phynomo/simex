import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const AldeasIndex = lazy(() => import('./Aldeas'));

const AldeasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Aldeas',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <AldeasIndex />,
        },
      ],
    },
  ],
};

export default AldeasConfig;