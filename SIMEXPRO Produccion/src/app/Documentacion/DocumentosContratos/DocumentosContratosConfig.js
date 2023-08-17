import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const DocumentosContratosIndex = lazy(() => import('./DocumentosContratos'));

const DocumentosContratosConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'DocumentosContratos',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <DocumentosContratosIndex />,
        },
      ],
    },
  ],
};

export default DocumentosContratosConfig;