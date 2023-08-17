/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";



class PaisesService {
  constructor() {
    this.customHeaders = {
      XApiKey: instance.extraerToken(),
    };
    this.baseURL = `${process.env.REACT_APP_API_URL}api/Paises/`;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: this.customHeaders,
    });
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  async listar() {
    try {
      const response = await this.axiosInstance.get('Listar', {
        params: {
          esAduana: this.user.empl_EsAduana
        }
      });

      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          pais_Id: item.pais_Id,
          pais_Codigo: item.pais_Codigo,
          pais_Nombre: item.pais_Nombre,
          usua_UsuarioCreacion: item.usua_UsuarioCreacion,
          pais_FechaCreacion: item.pais_FechaCreacion,
          usua_UsuarioModificacion: item.usua_UsuarioModificacion,
          pais_FechaModificacion: item.pais_FechaModificacion,
          usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
          pais_FechaEliminacion: item.pais_FechaEliminacion,
          usuarioCreacionNombre: item.usuarioCreacionNombre,
          usuarioModificadorNombre: item.usuarioModificadorNombre,
          pais_Estado: item.pais_Estado
        };
      });

      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async crear(data) {
    try {
      let datos = {
        pais_Codigo: data["pais_Codigo"].trim(),
        pais_Nombre: data["pais_Nombre"].trim(),
        usua_UsuarioCreacion: this.user['uuid'],
        pais_FechaCreacion: this.formatFechaHora(new Date()),
      };
      const response = await this.axiosInstance.post("Insertar", datos);
      return response;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }


  async editar(data) {
    try {
      let datos = {
        pais_Id: data["pais_Id"],
        pais_Codigo: data["pais_Codigo"].trim(),
        pais_Nombre: data["pais_Nombre"].trim(),
        usua_UsuarioModificacion: this.user['uuid'],
        pais_FechaModificacion: this.formatFechaHora(new Date()),
      };
      const response = await this.axiosInstance.post("Editar", datos);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }


  async listarUsuarios() {
    try {
      const response = await this.axiosInstance.get('Usuarios/Listar');
      return response.data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }


  async eliminar(data) {
    try {
      const datos = {
        pais_Id: data.pais_Id,
      }
      // console.log(datos)
      const response = await this.axiosInstance.post('Eliminar', datos);
      console.log(response)
      return response;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  formatFechaHora = (date) => {
    const year = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    const hora = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
  }
}

const paisesService = new PaisesService();
export default paisesService;
