import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const OficionesProfesionesIndex = lazy(() => import('./OficiosProfesiones'));

const OficiosProfesionesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'OficiosProfesiones',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <OficionesProfesionesIndex />,
        },
      ],
    },
  ],
};

export default OficiosProfesionesConfig;