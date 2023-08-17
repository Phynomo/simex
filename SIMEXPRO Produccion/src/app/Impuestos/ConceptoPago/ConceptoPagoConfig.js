import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const ConceptoPagoIndex = lazy(() => import('./ConceptoPago'));

const ConceptoPagoConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'ConceptoPago',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <ConceptoPagoIndex />,
        },
      ],
    },
  ],
};

export default ConceptoPagoConfig;