import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const CategoriasIndex = lazy(() => import('./Categorias'));

const CategoriasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Categorias',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <CategoriasIndex />,
        },
      ],
    },
  ],
};

export default CategoriasConfig;