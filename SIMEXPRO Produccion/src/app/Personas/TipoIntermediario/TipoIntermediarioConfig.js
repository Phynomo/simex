import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const TipoIntermediarioIndex = lazy(() => import('./TipoIntermediario'));

const TipoIntermediarioConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'TipoIntermediario',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <TipoIntermediarioIndex />,
        },
      ],
    },
  ],
};

export default TipoIntermediarioConfig;