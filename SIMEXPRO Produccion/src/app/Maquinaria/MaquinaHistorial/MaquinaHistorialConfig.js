import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const MaquinaHistorialIndex = lazy(() => import('./MaquinaHistorial'));

const MaquinaHistorialConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'MaquinaHistorial',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <MaquinaHistorialIndex />,
        },
      ],
    },
  ],
};

export default MaquinaHistorialConfig;