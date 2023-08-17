import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const ClientesIndex = lazy(() => import('./Clientes'));
const ClientesCrear = lazy(() => import('./ClientesCrear'));
const ClientesEditar = lazy(() => import('./ClientesEditar'));

const ClientesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Clientes',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ClientesIndex />,
        },
        {
          path: 'crear',
          element: <ClientesCrear />,
        },
        {
          path: 'editar',
          element: <ClientesEditar />,
        },
      ],
    },
  ],
};

export default ClientesConfig;