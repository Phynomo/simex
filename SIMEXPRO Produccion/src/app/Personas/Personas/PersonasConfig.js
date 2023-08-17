import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const PersonasIndex = lazy(() => import('./Personas'));
const PersonasCrear = lazy(() => import('./PersonasCrear'));
const PersonasEditar = lazy(() => import('./PersonasEditar'));

const PersonasConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Personas',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <PersonasIndex />,
        },
        {
          path: 'crear',
          element: <PersonasCrear />,
        },
        {
          path: 'editar',
          element: <PersonasEditar />,
        },
      ],
    },
  ],
};

export default PersonasConfig;