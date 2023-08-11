/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import forgotPasswordPagesConfig from '../main/forgot-password/forgotPasswordPagesConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import pagesConfigs from '../main/pages/pagesConfigs';
import CiudadesIndex from '../Ubicaciones/Ciudades/Ciudades';
import PaisesIndex from '../Ubicaciones/Paises/Paises';
import ColoniasIndex from '../Ubicaciones/Colonias/Colonias';
import EstadosCivilesIndex from '../Personas/EstadosCiviles/EstadosCiviles';
import CargosIndex from '../Personas/Cargos/Cargos';
import OficinasIndex from '../Personas/Oficinas/Oficinas';
import OficiosProfesiones from '../Personas/OficiosProfesiones/OficiosProfesiones';
import UsuariosIndex from '../Seguridad/Usuarios/Usuarios';
import BoletinDePagoIndex from '../Aduanas/Boletin_de_Pago/BoletinDePago';
import BoletinDePagoCrear from '../Aduanas/Boletin_de_Pago/BoletinDePagoCrear';
import PDFDocument from '../Aduanas/Boletin_de_Pago/ImpresionBoletinDePago';
import ImpresionBoletinDePago from '../Aduanas/Boletin_de_Pago/ImpresionBoletinDePago';
import RolesIndex from '../Seguridad/Roles/roles';
import RolesCrear from '../Seguridad/Roles/roles_crear';
import DucaIndex from '../Aduanas/DUCA/duca_Index';
import DucaCrear from '../Aduanas/DUCA/duca_Crear';
import Subir_Documentos from '../Aduanas/Documentacion/Subir_Documentos';

import EmpleadosIndex from '../Personas/Empleados/Empleados';
import ProveedoresIndex from '../Personas/Proveedores/Proveedores';

import PersonaNatural_Index from '../Aduanas/Contratos_de_Adhesión/Persona_Natural/PersonaNatural_Index';
import PersonaNatural_Crear from '../Aduanas/Contratos_de_Adhesión/Persona_Natural/PersonaNatural_Crear';
import Declaracion_Valor_Index from '../Aduanas/Declaracion_De_Valor/Declaracion_Valor_Index';
import Declaracion_Valor_Crear from '../Aduanas/Declaracion_De_Valor/Declaracion_Valor_Crear';
import Comerciante_Individual_Index from '../Aduanas/Contratos_de_Adhesión/Comerciante_Individual/Comerciante_Individual_Index';
import Comerciante_Individual_Agregar from '../Aduanas/Contratos_de_Adhesión/Comerciante_Individual/Comerciante_Individual_Agregrar';

import Persona_Juridica_Index from '../Aduanas/Contratos_de_Adhesión/Persona_Juridica/Persona_Juridica_Index';
import Persona_Juridica_Agregar from '../Aduanas/Contratos_de_Adhesión/Persona_Juridica/Persona_Juridica_Agregar';

import AldeaIndex from '../Ubicaciones/Aldeas/Aldeas';
import DocumentosDeSanciones from '../Aduanas/DocumentosDeSanciones/DocumentosDeSanciones';
import FormaDeEnvioIndex from '../Generales/FormasEnvio/FormasEnvio';
import MonedasIndex from '../Generales/Monedas/monedas';

import RolesEditar from '../Seguridad/Roles/roles_editar';

import EmpleadosCrear from '../Personas/Empleados/EmpleadosCrear';
import EmpleadosEditar from '../Personas/Empleados/EmpleadosEditar';

import ProvinciasConfig from '../Ubicaciones/Provincias/provinciasConfig';
import UnidadesMedidaConfig from '../Generales/UnidadesMedida/UniodadesMedidaConfig'; 

const routeConfigs = [
  ...dashboardsConfigs,
  ...pagesConfigs,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  forgotPasswordPagesConfig,
  ProvinciasConfig,
  UnidadesMedidaConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="dashboards/analytics" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '*',
    element: <Navigate to="pages/error/404" />,
  },
  {
    path: 'Ciudades/Index',
    element: <CiudadesIndex />,
  },
  {
    path: 'Paises/Index',
    element: <PaisesIndex />,
  }, 
  {
    path: 'Roles/Editar',
    element: <RolesEditar />,
  },
  {
    path: 'Colonias/Index',
    element: <ColoniasIndex />,
  },
  {
    path: 'FormaDeEnvio/Index',
    element: <FormaDeEnvioIndex />,
  },
  {
    path: 'Monedas/Index',
    element: <MonedasIndex />,
  },
  {
    path: 'Cargos/Index',
    element: <CargosIndex />,
  },
  {
    path: 'Empleados/Crear',
    element: <EmpleadosCrear />,
  },
  {
    path: 'Empleados/Editar',
    element: <EmpleadosEditar />,
  },
  {
    path: 'EstadosCiviles/Index',
    element: <EstadosCivilesIndex />,
  },
  {
    path: 'Oficinas/Index',
    element: <OficinasIndex />,
  },
  {
    path: 'OficiosProfesiones/Index',
    element: <OficiosProfesiones />,
  },
  {
    path: 'Usuarios/Index',
    element: <UsuariosIndex />,
  },
  {
    path: 'Empleados/Index',
    element: <EmpleadosIndex />,
  },
  {
    path: 'Proveedores/Index',
    element: <ProveedoresIndex />,
  },
  {
    path: 'BoletindePago/BoletinDePagoIndex',
    element: <BoletinDePagoIndex />,
  },
  {
    path: 'BoletindePago/ImpresionBoletinDePago',
    element: <ImpresionBoletinDePago />,
  },
  {
    path: 'BoletindePago/Crear',
    element: <BoletinDePagoCrear />,
  },
  {
    path: '/Contrato-de-Adhesion-Persona-Natural/Index',
    element: <PersonaNatural_Index />,
  },
  {
    path: 'Contrato-de-Adhesion/Persona-Natural-Crear',
    element: <PersonaNatural_Crear />,
  },
  {
    path: 'Declaracion-de-Valor/Listado',
    element: <Declaracion_Valor_Index />,
  },
  {
    path: 'Declaracion-de-Valor/Nueva-Declaracion',
    element: <Declaracion_Valor_Crear />,
  },
  {
    path: 'Roles/RolesIndex',
    element: <RolesIndex />,
  },
  {
    path: 'Roles/RolesCrear',
    element: <RolesCrear />,
  },
  {
    path: 'Duca/Index',
    element: <DucaIndex />,
  },
  {
    path: 'Duca/Crear',
    element: <DucaCrear />,
  },
  {
    path: 'Documentos/Subir',
    element: <Subir_Documentos />,
  },
  {
    path: 'Documentos/Sanciones',
    element: <DocumentosDeSanciones />,
  },
  {
    path: 'Contrato-de-Adhesion-Comerciante-Individual/Index',
    element: <Comerciante_Individual_Index />,
  },
  {
    path: 'Contrato-de-Adhesion-Comerciante-Individual/Agregar',
    element: <Comerciante_Individual_Agregar />,
  },
  {
    path: 'Contrato-de-Adhesion-Persona-Juridica/Index',
    element: <Persona_Juridica_Index />,
  },
  {
    path: 'Contrato-de-Adhesion-Persona-Juridica/Agregar',
    element: <Persona_Juridica_Agregar />,
  },
  {
    path: 'Aldea/Index',
    element: <AldeaIndex />,
  },
  {
    path: 'BoletinDePago/Impreso',
    element: <PDFDocument />,
  },
];

export default routes;
