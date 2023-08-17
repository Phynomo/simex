import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const CondicionesComercialesIndex = lazy(() => import('./CondicionesComerciales'));
const CondicionesComercialesCrear = lazy(() => import('./CondicionesComercialesCrear'));
const CondicionesComercialesEditar = lazy(() => import('./CondicionesComercialesEditar'));

const CondicionesComercialesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'CondicionesComerciales',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <CondicionesComercialesIndex />,
        },
        {
          path: 'crear',
          element: <CondicionesComercialesCrear />,
        },
        {
          path: 'editar',
          element: <CondicionesComercialesEditar />,
        },
      ],
    },
  ],
};

export default CondicionesComercialesConfig;