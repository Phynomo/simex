import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const RevisionCalidadIndex = lazy(() => import('./RevisionCalidad'));
const RevisionCalidadCrear = lazy(() => import('./RevisionCalidadCrear'));

const RevisionCalidadConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'RevisionCalidad',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <RevisionCalidadIndex />,
        },
        {
          path: 'crear',
          element: <RevisionCalidadCrear />,
        },
      ],
    },
  ],
};

export default RevisionCalidadConfig;