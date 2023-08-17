import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const ColoniasIndex = lazy(() => import('./Colonias'));

const ColoniasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Colonias',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ColoniasIndex />,
        },
      ],
    },
  ],
};

export default ColoniasConfig;