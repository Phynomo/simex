import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const FuncionesMaquinaIndex = lazy(() => import('./FuncionesMaquina'));

const FuncionesMaquinaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'FuncionesMaquina',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <FuncionesMaquinaIndex />,
        },
      ],
    },
  ],
};

export default FuncionesMaquinaConfig;