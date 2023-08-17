import axios from "axios";
import instance from "../auth/services/jwtService/jwtService";
import user from "../auth/services/jwtService/dataUser";

class Load_DDLs {
  constructor() {
    this.customHeaders = {
      XApiKey: instance.extraerToken(),
    };
    this.baseURL = process.env.REACT_APP_API_URL + "api/";
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: this.customHeaders,
    });
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  async aduanas() {
    try {
      const response = await this.axiosInstance.get("Aduanas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.adua_Id,
          label: `${item.adua_Id} - ${item.adua_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Aldeas() {
    try {
      const response = await this.axiosInstance.get("Aldea/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.alde_Id,
          label: `${item.alde_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async aldeaPorCiudad(id) {
    try {
      const response = await this.axiosInstance.get("Aldea/FiltrarPorCiudades?alde_Id=" + id); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.alde_Id,
          label: `${item.alde_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Areas() {
    try {
      const response = await this.axiosInstance.get("Areas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.tipa_Id,
          label: `${item.tipa_area} - ${item.proc_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async AsignacionesOrden() {
    try {
      const response = await this.axiosInstance.get("AsignacionesOrden/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.asor_Id,
          label: `${item.asor_OrdenDetId}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async BaseCalculo() {
    try {
      const response = await this.axiosInstance.get("BaseCalculo/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.aran_Id,
          label: `${item.arn_Codigo} - ${item.aran_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async BoletinPago() {
    try {
      const response = await this.axiosInstance.get("BoletinPago/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.boen_Id,
          label: `${item.liqu_Id} - ${item.duca_No_Duca}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async ColoniasPorCiudad(id) {
    try {
      const response = await this.axiosInstance.get("Colonias/FiltrarPorCiudad?ciud_Id=" + id); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.colo_Id,
          label: `${item.colo_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Categorias() {
    try {
      const response = await this.axiosInstance.get("Categoria/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.cate_Id,
          label: `${item.cate_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async SubCategoriasPorCategoria(id) {
    try {
      const response = await this.axiosInstance.get("SubCategoria/ListarByIdCategoria?cate_Id="+id); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.subc_Id,
          label: `${item.subc_Descripcion}`,
          
        };
      });
      console.log("Aqui");
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Cargos() {
    try {
      const response = await this.axiosInstance.get("Cargos/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.carg_Id,
          label: `${item.carg_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async CondicionesComerciales() {
    try {
      const response = await this.axiosInstance.get("CondicionesComerciales/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.coco_Id,
          label: `${item.coco_Codigo}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Ciudades() {
    try {
      const response = await this.axiosInstance.get("Ciudades/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.ciud_Id,
          label: `${item.ciud_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async CiudadesPorProvincia(id) {
    try {
      const response = await this.axiosInstance.get("Ciudades/CiudadesFiltradaPorProvincias?pvin_Id=" + id); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.ciud_Id,
          label: `${item.ciud_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Clientes() {
    try {
      const response = await this.axiosInstance.get("Clientes/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.clie_Id,
          label: `${item.clie_Nombre_O_Razon_Social}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Colores() {
    try {
      const response = await this.axiosInstance.get("Colores/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.colr_Id,
          label: `${item.colr_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Empleados() {
    try {
      const response = await this.axiosInstance.get("Empleados/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.empl_Id,
          label: `${item.empl_NombreCompleto}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async EmpleadosNoTieneUsuario() {
    try {
      const response = await this.axiosInstance.get("Empleados/ListarNoTieneUsuario?empl_EsAduana=" + user()["esAduana"].toString()); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.empl_Id,
          label: `${item.empl_NombreCompleto}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Estadosciviles() {
    try {
      const response = await this.axiosInstance.get("EstadosCiviles/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.escv_Id,
          label: `${item.escv_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Estilos() {
    try {
      const response = await this.axiosInstance.get("Estilos/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.esti_Id,
          label: `${item.esti_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async EstadosMercancia() {
    try {
      const response = await this.axiosInstance.get("EstadosMercancia/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.merc_Id,
          label: `${item.merc_Codigo}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async FormasEnvio() {
    try {
      const response = await this.axiosInstance.get("FormasEnvio/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.foen_Id,
          label: `${item.foen_Codigo}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async FormasPago() {
    try {
      const response = await this.axiosInstance.get("FormasDePago/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.fopa_Id,
          label: `${item.fopa_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async FuncionesMaquinas() {
    try {
      const response = await this.axiosInstance.get("FuncionesMaquina/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.func_Id,
          label: `${item.func_Nombre}`,
        };
      });
    }
    catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Incoterm() {
    try {
      const response = await this.axiosInstance.get("Incoterm/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.inco_Id,
          label: `${item.inco_Codigo}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Maquinas() {
    try {
      const response = await this.axiosInstance.get("Maquinas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.maqu_Id,
          label: `${item.maqu_NumeroSerie}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Materiales() {
    try {
      const response = await this.axiosInstance.get("Materiales/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.mate_Id,
          label: `${item.mate_Descripcion}`,
        };
      });
      return data
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async MarcasMaquinas() {
    try {
      const response = await this.axiosInstance.get("MarcasMaquinas/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.marq_Id,
          label: `${item.marq_Nombre}`,
        };
      });
    }
    catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async ModelosMaquinas() {
    try {
      const response = await this.axiosInstance.get("/ModelosMaquinas/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.mmaq_Id,
          label: `${item.mmaq_Nombre} - ${item.marq_Nombre}`,
        };
      });
      console.log(data);
      return data
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Modulos() {
    try {
      const response = await this.axiosInstance.get("Modulos/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.modu_Id,
          label: `${item.modu_Nombre} - ${item.proc_Descripcion}`,
        };
      });
      console.log(data);
      return data
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async NivelesComerciales() {
    try {
      const response = await this.axiosInstance.get("NivelesComerciales/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.nico_Id,
          label: `${item.nico_Codigo}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Oficinas() {
    try {
      const response = await this.axiosInstance.get("Oficinas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.ofic_Id,
          label: `${item.ofic_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Oficios() {
    try {
      const response = await this.axiosInstance.get("Oficio_Profesiones/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.ofpr_Id,
          label: `${item.ofpr_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async paises() {
    try {
      const response = await this.axiosInstance.get("Paises/Listar" + (this.user['esAduana'] == null ? "" : "?pais_EsAduana=" + this.user['esAduana'])); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.pais_Id,
          label: `${item.pais_Codigo} - ${item.pais_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async PedidoOrdenDetalle() {
    try {
      const response = await this.axiosInstance.get("PedidosOrdenDetalles/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.prod_Id,
          label: `${item.prod_Cantidad} - ${item.prod_Precio} - ${item.prod_Peso}`,
        };
      });
      return data
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Procesos() {
    try {
      const response = await this.axiosInstance.get("Procesos/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.proc_Id,
          label: `${item.proc_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Provincias() {
    try {
      const response = await this.axiosInstance.get("Provincias/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.pvin_Id,
          label: `${item.pvin_Codigo} - ${item.pvin_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async ProvinciasPorPais(id) {
    try {
      const response = await this.axiosInstance.get("Provincias/ProvinciasFiltradaPorPais?pais_Id=" + id); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.pvin_Id,
          label: `${item.pvin_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  async Roles() {
    try {
      const response = await this.axiosInstance.get("Roles/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.role_Id,
          label: `${item.role_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async Tallas() {
    try {
      const response = await this.axiosInstance.get("Tallas/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.tall_Id,
          label: `${item.tall_Nombre}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async TipoEmbalaje() {
    try {
      const response = await this.axiosInstance.get("TipoEmbalaje/Listar"); //copiar url despues del endpoint
      const data = response.data.data.map((item) => {
        return {
          value: item.tiem_Id,
          label: `${item.tiem_Descripcion}`,
        };
      });
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async UnidadMedida() {
    try {
      const response = await this.axiosInstance.get("UnidadMedidas/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.unme_Id,
          label: `${item.unme_Descripcion}`,
        };
      });
      return data
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async PedidoOrdenDetalle() {
    try {
      const response = await this.axiosInstance.get("PedidosOrdenDetalles/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.prod_Id,
          label: `${item.prod_Cantidad} - ${item.prod_Precio} - ${item.prod_Peso}`,
        };
      });
    }
    catch (error) {
      console.log(error)
    }
  }
  async UnidadMedida() {
    try {
      const response = await this.axiosInstance.get("UnidadMedidas/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.unme_Id,
          label: `${item.unme_Descripcion}`,
        };
      });
      return data
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async TipoArea() {
    try {
      const response = await this.axiosInstance.get("PedidosOrdenDetalles/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.prod_Id,
          label: `${item.prod_Cantidad} - ${item.prod_Precio} - ${item.prod_Peso}`,
        };
      });
      return data
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async MarcasMaquinas() {
    try {
      const response = await this.axiosInstance.get("MarcasMaquinas/Listar");

      const data = response.data.data.map((item) => {
        return {
          value: item.marq_Id,
          label: `${item.marq_Nombre}`,
        };
      });
      return data

    }
    catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async ModelosMaquinas() {
    try {
      const response = await this.axiosInstance.get("/ModelosMaquinas/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.mmaq_Id,
          label: `${item.mmaq_Nombre} - ${item.marq_Nombre}`,
        };
      });
      console.log(data);
      return data
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async FuncionesMaquinas() {
    try {
      const response = await this.axiosInstance.get("FuncionesMaquina/Listar");

      const data = response.data.data.map((item) => {
        return {
          value: item.func_Id,
          label: `${item.func_Nombre}`,
        };
      });
      return data

    }
    catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  async Modulos() {
    try {
      const response = await this.axiosInstance.get("Modulos/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.modu_Id,
          label: `${item.modu_Nombre} - ${item.proc_Descripcion}`,
        };
      });
      console.log(data);
    }
    catch (error) {

    }
  }

  async Procesos() {
    try {
      const response = await this.axiosInstance.get("Procesos/Listar");
      const data = response.data.data.map((item) => {
        return {
          value: item.proc_Id,
          label: `${item.proc_Descripcion}`,
        };
      });
      return data
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

const load_DDLs = new Load_DDLs();
export default load_DDLs;