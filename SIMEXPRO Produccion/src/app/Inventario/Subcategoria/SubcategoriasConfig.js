import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const SubcategoriasIndex = lazy(() => import('./Subcategorias'));

const SubcategoriasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Subcategorias',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <SubcategoriasIndex />,
        },
      ],
    },
  ],
};

export default SubcategoriasConfig;