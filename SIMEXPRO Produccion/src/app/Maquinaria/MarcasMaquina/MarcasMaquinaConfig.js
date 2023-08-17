import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import authRoles from '../../auth/authRoles';

const MarcasMaquinasIndex = lazy(() => import('./MarcasMaquina'));

const MarcasMaquinaConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'MarcasMaquina',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <MarcasMaquinasIndex />,
        },
      ],
    },
  ],
};

export default MarcasMaquinaConfig;