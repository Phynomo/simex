import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const PaisesIndex = lazy(() => import('./Paises'));

const PaisesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Paises',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <PaisesIndex />,
        },
      ],
    },
  ],
};

export default PaisesConfig;
