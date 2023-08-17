import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const Declaracion_ValorIndex = lazy(() => import('./Declaracion_Valor_Index'));
const Declaracion_ValorCrear = lazy(() => import('./Declaracion_Valor_Crear'));

const Declaracion_ValorConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Declaracion_Valor',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <Declaracion_ValorIndex />,
        },
        {
            path: 'crear',
            element: <Declaracion_ValorCrear />,
          },
      ],
    },
  ],
};

export default Declaracion_ValorConfig;