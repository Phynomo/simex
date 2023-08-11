import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const ProvinciasIndex = lazy(() => import('./Provincias'));

const ProvinciasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Provincias',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ProvinciasIndex />,
        },
      ],
    },
  ],
};

export default ProvinciasConfig;