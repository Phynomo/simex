import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { authRoles } from 'src/app/auth';

const Comerciante_Individual_Index = lazy(() => import('./Comerciante_Individual_Index'));
const Comerciante_Individual_Agregrar = lazy(() => import('./Comerciante_Individual_Agregrar'));

const Comerciante_IndividualConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'Comerciante_Individual',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <Comerciante_Individual_Index />,
        },
        {
          path: 'crear',
          element: <Comerciante_Individual_Agregrar />,
        },
      ],
    },
  ],
};

export default Comerciante_IndividualConfig;