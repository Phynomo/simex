import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const UsuariosIndex = lazy(() => import('./Usuarios'));

const UsuariosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Usuarios',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <UsuariosIndex />,
        },
      ],
    },
  ],
};

export default UsuariosConfig;