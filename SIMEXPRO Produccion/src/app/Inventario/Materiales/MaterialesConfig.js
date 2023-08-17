import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const MaterialesIndex = lazy(() => import('./Materiales'));

const MaterialesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Materiales',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <MaterialesIndex />,
        },
      ],
    },
  ],
};

export default MaterialesConfig;