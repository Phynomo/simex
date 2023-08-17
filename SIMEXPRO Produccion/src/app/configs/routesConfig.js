/* eslint-disable react/jsx-pascal-case */
/* eslint-disable camelcase */
import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import UnidadesMedidaConfig from '../Generales/UnidadesMedida/UniodadesMedidaConfig';
import pagesConfigs from '../main/pages/pagesConfigs';
import UsuariosConfig from '../Seguridad/Usuarios/UsuariosConfig';
import UsuariosIndex from '../Seguridad/Usuarios/Usuarios';
import OrdenProcesosIndex from '../Produccion/OrdenDeProcesos/OrdenDeProcesos';
import CalendarApp from '../Produccion/Planificación/CalendarApp';
import Revision_de_Calidad_Index from '../Produccion/Revisión de Calidad/RevisionCalidad';
import OrdenPedido_Index from '../Produccion/OrdenPedidos/OrdenPedido_Index';
import OrdenPedido_Crear from '../Produccion/OrdenPedidos/OrdenPedido_Crear';
import PedidosProduccion from '../Produccion/PedidosProduccion/PedidosProduccion';
import PedidosProduccion_Crear from '../Produccion/PedidosProduccion/PedidosProduccion_Crear';
import OrdenCompraIndex from '../Produccion/OrdenCompra/OrdenCompra';
import OrdenCompra_Crear from '../Produccion/OrdenCompra/OrdenCompra_Crear';
import ReportesModulo from '../Reportes/RevisionModuloDia';
import forgotPasswordPagesConfig from '../main/forgot-password/forgotPasswordPagesConfig';
import EmpleadosConfig from '../Personas/Empleados/EmpleadosConfig';
import TiposIdentificacionConfig from '../Generales/TipoIdentificacion/TiposIdentificacionConfig';
import CargosConfig from '../Personas/Cargos/CargosConfig';
import MonedasConfig from '../Generales/Monedas/MonedasConfig';
import AreasConfig from '../Inventario/Areas/AreasConfig';
import CategoriasConfig from '../Inventario/Categoria/CategoriasConfig';
import LotesConfig from '../Inventario/Lotes/LotesConfig';
import MaterialesConfig from '../Inventario/Materiales/MaterialesConfig';
import MaterialesBrindarConfig from '../Inventario/MaterialesBrindar/MaterialesBrindasConfig';
import SubcategoriasConfig from '../Inventario/Subcategoria/SubcategoriasConfig';
import FuncionesMaquinaConfig from '../Maquinaria/FuncionesMaquina/FuncionesMaquinaConfig';
import MaquinaHistorialConfig from '../Maquinaria/MaquinaHistorial/MaquinaHistorialConfig';
import MaquinasConfig from '../Maquinaria/Máquinas/MaquinasConfig';
import MarcasMaquinaConfig from '../Maquinaria/MarcasMaquina/MarcasMaquinaConfig';
import ModelosMaquinaConfig from '../Maquinaria/ModelosMaquina/ModelosMaquinaConfig';
import EstadosCivilesConfig from '../Personas/EstadosCiviles/EstadosCivilesConfig';
import OficinasConfig from '../Personas/Oficinas/OficinasConfig';
import OficioProfesionesConfig from '../Personas/OficiosProfesiones/OficiosProfesionesConfig';
import OficionesProfesionesIndex from '../Personas/OficiosProfesiones/OficiosProfesiones';
import ProveedoresConfig from '../Personas/Proveedores/ProveedoresConfig';
import ColoresConfig from '../Prendas/Colores/ColoresConfig';
import TipoEmbalajeConfig from '../Inventario/TipoDeEmbalaje/TipoDeEmbalajeConfig';
import EstilosConfig from '../Prendas/Estilos/EstilosConfig';
import TallasConfig from '../Prendas/Tallas/TallasConfig';
import InspeccionesConfig from '../Produccion/Inspecciones/InspeccionesEstadoConfig';
import ModulosConfig from '../Produccion/Modulos/ModulosConfig';
import OrdenDeProcesosConfig from '../Produccion/OrdenDeProcesos/OrdenDeProcesosConfig';
import OrdenPedidoConfig from '../Produccion/OrdenPedidos/OrdenPedidoConfig';
import ProcesosConfig from '../Produccion/Procesos/ProcesosConfig';
import AldeasConfig from '../Ubicaciones/Aldeas/AldeasConfig';
import CiudadesConfig from '../Ubicaciones/Ciudades/CiudadesConfig';
import ColoniasConfig from '../Ubicaciones/Colonias/ColoniasConfig';
import PaisesConfig from '../Ubicaciones/Paises/PaisesConfig';
import RolesConfig from '../Seguridad/Roles/rolesconfig';
import FormaEnvioConfig from '../Generales/FormasEnvio/FormaEnvioConfig';
import FormaDeEnvioIndex from '../Generales/FormasEnvio/FormasEnvio';
import RevisionCalidadConfig from '../Produccion/Revisión de Calidad/RevisionCalidadConfig';
import ArancelesConfig from '../Impuestos/Aranceles/ArancelesConfig';
import CodigoImpuestoConfig from '../Impuestos/CodigoImpuesto/CodigoImpuestoConfig';
import ConceptoPagoConfig from '../Impuestos/ConceptoPago/ConceptoPagoConfig';
import ImpuestosConfig from '../Impuestos/Impuestos/ImpuestosConfig';
import ConductorConfig from '../Transporte/Conductor/ConductorConfig';
import MarcasCarrosConfig from '../Transporte/MarcasCarros/MarcasCarrosConfig';
import ModoTransporteConfig from '../Transporte/ModoTransporte/ModoTransporteConfig';
import IncotermConfig from '../Impuestos/Incoterms/IncotermConfig';
import LiquidacionGeneralConfig from '../Impuestos/LiquidacionGeneral/LiquidacionGeneralConfig';
import TipoLiquidacionConfig from '../Impuestos/TipoLiqudacion/TipoLiquidacionConfig';
import CondicionesComercialesConfig from '../Documentacion/CondicionesComerciales/CondicionesComercialesConfig';
import DocumentosContratosConfig from '../Documentacion/DocumentosContratos/DocumentosContratosConfig';
import EstadoBoletinConfig from '../Aministracion/EstadoBoletin/EstadoBoletinConfig';
import EstadoMercanciaConfig from '../Aministracion/EstadoMercancia/EstadoMercanciaConfig';
import ItemsConfig from '../Aministracion/Items/ItemsConfig';
import LugaresEmbarqueConfig from '../Aministracion/LugaresEmbarque/LugaresEmbarqueConfig';
import NivelesComercialesConfig from '../Aministracion/NivelesComerciales/NivelesComercialesConfig';
import TipoDocumentoConfig from '../Documentacion/TipoDocumento/TipoDocumentosConfig';
import TransporteConfig from '../Transporte/Transporte/TransporteConfig';
import TipoIdentificacionConfig from '../Generales/TipoIdentificacion/TiposIdentificacionConfig';
import TipoIntermediario from '../Personas/TipoIntermediario/TipoIntermediario';
import TipoIntermediarioConfig from '../Personas/TipoIntermediario/TipoIntermediarioConfig';
import PersonasConfig from '../Personas/Personas/PersonasConfig';
import LiquidacionPorLineaConfig from '../Impuestos/LiquidacionPorLinea/LiquidacionPorLineaConfig';
import FormasPagoConfig from '../Facturacion/FormasPago/FormasPagoConfig';
import DucaConfig from '../Aduanas/DUCA/ducaConfig';
import Declaracion_ValorConfig from '../Aduanas/Declaracion_De_Valor/Declaracion_ValorConfig';
import ComercianteIndividualConfig from '../Aduanas/Contratos_de_Adhesión/Comerciante_Individual/Comerciante_Individual_Config';
import ClientesConfig from '../Personas/Clientes/ClientesConfig';
import PersonaNaturalConfig from '../Aduanas/Contratos_de_Adhesión/Persona_Natural/PersonaNaturalConfig';
import EstadoMercanciasIndex from '../Aministracion/EstadoMercancia/EstadoMercancia';
import Comerciante_IndividualConfig from '../Aduanas/Contratos_de_Adhesión/Comerciante_Individual/Comerciante_IndividualConfig';
import ProvinciasConfig from '../Ubicaciones/Provincias/ProvinciasConfig';

const routeConfigs = [
  ...dashboardsConfigs,
  ...pagesConfigs,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  forgotPasswordPagesConfig,
  ProvinciasConfig,
  UsuariosConfig,
  UnidadesMedidaConfig,
  EmpleadosConfig,
  TiposIdentificacionConfig,
  CargosConfig,
  MonedasConfig,
  TiposIdentificacionConfig,
  AreasConfig,
  CategoriasConfig,
  LotesConfig,
  MaterialesConfig,
  MaterialesBrindarConfig,
  SubcategoriasConfig,
  TipoEmbalajeConfig,
  FuncionesMaquinaConfig,
  MaquinaHistorialConfig,
  MaquinasConfig,
  MarcasMaquinaConfig,
  ModelosMaquinaConfig,
  CargosConfig,
  EstadosCivilesConfig,
  OficinasConfig,
  OficioProfesionesConfig,
  ColoresConfig,
  EstilosConfig,
  TallasConfig,
  InspeccionesConfig,
  ModulosConfig,
  OrdenDeProcesosConfig,
  OrdenPedidoConfig,
  ProcesosConfig,
  AldeasConfig,
  CiudadesConfig,
  ColoniasConfig,
  PaisesConfig,
  RolesConfig,
  FormaEnvioConfig,
  RevisionCalidadConfig,
  ArancelesConfig,
  CodigoImpuestoConfig,
  ConceptoPagoConfig,
  ImpuestosConfig,
  ConductorConfig,
  MarcasCarrosConfig,
  ModoTransporteConfig,
  IncotermConfig,
  LiquidacionGeneralConfig,
  TipoLiquidacionConfig,
  CondicionesComercialesConfig,
  DocumentosContratosConfig,
  EstadoBoletinConfig,
  EstadoMercanciaConfig,
  ItemsConfig,
  LugaresEmbarqueConfig,
  NivelesComercialesConfig,
  TipoDocumentoConfig,
  TransporteConfig,
  TipoIdentificacionConfig,
  TipoIntermediarioConfig,
  ProveedoresConfig,
  PersonasConfig,
  FormasPagoConfig,
  DucaConfig,
  Declaracion_ValorConfig,
  ClientesConfig,
  PersonaNaturalConfig,
  Comerciante_IndividualConfig,
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="dashboards/analytics" />,
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
    path: 'Usuarios/Index',
    element: <UsuariosIndex />,
  },


  {
    path: 'Usuarios/Index',
    element: <UsuariosIndex />,
  },

  {
    path: 'RevisionCalidad/Index',
    element: <Revision_de_Calidad_Index />,
  },
  {
    path: 'OficiosProfesiones/Index',
    element: <OficionesProfesionesIndex />,
  },

  {
    path: 'FormasEnvio/Index',
    element: <FormaDeEnvioIndex />,
  },

  {
    path: 'OficiosProfesiones/Index',
    element: <OficionesProfesionesIndex />,
  },

  {
    path: 'FormasEnvio/Index',
    element: <FormaDeEnvioIndex />,
  },

  {
    path: 'Usuarios/Index',
    element: <UsuariosIndex />,
  },


  {
    path: 'OrdenProcesos/Index',
    element: <OrdenProcesosIndex />,
  },
  {
    path: 'Planificacion/Index',
    element: <CalendarApp />,
  },
  {
    path: 'OrdenPedido/Index',
    element: <OrdenPedido_Index />,
  },
  {
    path: 'OrdenPedido/Crear',
    element: <OrdenPedido_Crear />,
  },
  {
    path: 'PedidosProduccion/Index',
    element: <PedidosProduccion />,
  },
  {
    path: 'PedidosProduccion/Crear',
    element: <PedidosProduccion_Crear />,
  },
  {
    path: 'OrdenCompra/Index',
    element: <OrdenCompraIndex />,
  },
  {
    path: 'OrdenCompra_Crear/Index',
    element: <OrdenCompra_Crear />,
  },
  {
    path: 'ReporteModulo/Index',
    element: <ReportesModulo />,
  },
  {
    path: 'TipoIntermediario/Index',
    element: <TipoIntermediario />,
  },

];

export default routes;
