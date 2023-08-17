import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const DucaIndex = lazy(() => import('./duca_Index'));
const DucaCrear = lazy(() => import('./duca_Crear'));

const DucaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Duca',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <DucaIndex />,
        },
        {
            path: 'crear',
            element: <DucaCrear />,
          },
      ],
    },
  ],
};

export default DucaConfig;