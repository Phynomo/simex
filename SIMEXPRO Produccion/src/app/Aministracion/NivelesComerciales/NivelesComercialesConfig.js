import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const NivelesComercialesIndex = lazy(() => import('./NivelesComerciales'));

const NivelesComercialesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'NivelesComerciales',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <NivelesComercialesIndex />,
        },
      ],
    },
  ],
};

export default NivelesComercialesConfig;