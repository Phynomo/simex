import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

 const RolesIndex = lazy(() => import('./roles'));
 const RolesCrear = lazy(() => import('./roles_crear'));
const RolesEditar = lazy(() => import('./roles_editar'));

const RolesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Roles',
      children: [
        {
          path: '',
          element: <Navigate to="index" replace/>,
        },
        {
          path: 'index',
          element: <RolesIndex/>,
        },
        {
          path: 'crear',
          element: <RolesCrear/>,
        },
        {
          path: 'editar',
          element: <RolesEditar/>,
        },
      ],
    },
  ],
};

export default RolesConfig;