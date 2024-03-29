import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const ProveedoresIndex = lazy(() => import('./Proveedores'));
const ProveedoresCrear = lazy(() => import('./ProveedoresCrear'));
const ProveedoresEditar = lazy(() => import('./ProveedoresEditar'));

const ProveedoresConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Proveedores',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ProveedoresIndex />,
        },
        {
          path: 'crear',
          element: <ProveedoresCrear />,
        },
        {
          path: 'editar',
          element: <ProveedoresEditar />,
        },
      ],
    },
  ],
};

export default ProveedoresConfig;