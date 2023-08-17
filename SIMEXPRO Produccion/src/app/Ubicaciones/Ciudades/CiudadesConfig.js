import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const CiudadesIndex = lazy(() => import('./Ciudades'));

const CiudadesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Ciudades',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <CiudadesIndex />,
        },
      ],
    },
  ],
};

export default CiudadesConfig;