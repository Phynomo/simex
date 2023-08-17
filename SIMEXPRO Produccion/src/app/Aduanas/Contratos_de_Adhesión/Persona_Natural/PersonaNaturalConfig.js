import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { authRoles } from 'src/app/auth';

const PersonaNaturalIndex = lazy(() => import('./PersonaNatural_Index'));
const PersonaNaturalCrear = lazy(() => import('./PersonaNatural_Crear'));
const PersonaNaturalEditar = lazy(() => import('./PersonaNatural_Editar'));

const PersonaNaturalConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'PersonaNatural',
      children: [
        {
          path: '',
          element: <Navigate to="index" />,
        },
        {
          path: 'index',
          element: <PersonaNaturalIndex />,
        },
        {
          path: 'crear',
          element: <PersonaNaturalCrear />,
        },
        {
          path: 'editar',
          element: <PersonaNaturalEditar />,
        },
      ],
    },
  ],
};

export default PersonaNaturalConfig;