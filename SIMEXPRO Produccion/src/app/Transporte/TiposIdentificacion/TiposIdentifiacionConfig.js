import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const TiposIdentificacionIndex = lazy(() => import('./TiposIdentificacion'));

const TiposIdentificacionConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'TiposIdentificacion',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <TiposIdentificacionIndex />,
        },
      ],
    },
  ],
};

export default TiposIdentificacionConfig;