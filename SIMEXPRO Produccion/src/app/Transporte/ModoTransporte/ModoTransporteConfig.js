import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const ModoTransporteIndex = lazy(() => import('./ModoTransporte'));

const ModoTransporteConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'ModoTransporte',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ModoTransporteIndex />,
        },
      ],
    },
  ],
};

export default ModoTransporteConfig;