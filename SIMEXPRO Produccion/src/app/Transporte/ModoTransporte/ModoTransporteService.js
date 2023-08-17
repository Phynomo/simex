import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class ModoTransporteService {
    constructor() {
        this.customHeaders = {
          XApiKey: instance.extraerToken(),
        };
        this.baseURL = `${process.env.REACT_APP_API_URL}api/ModoTransporte/`;
        this.axiosInstance = axios.create({
          baseURL: this.baseURL,
          headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
      }
    
      async listar() {
        try {
          const response = await this.axiosInstance.get('Listar', {
          });
    
          const data = response.data.data.map((item, index) => {
            return {
              key: index + 1,
              motr_Id: item.motr_Id,
              motr_Descripcion: item.motr_Descripcion,
              usua_UsuarioCreacion: item.usua_UsuarioCreacion,
              motr_FechaCreacion: item.motr_FechaCreacion,
              usua_UsuarioModificacion: item.usua_UsuarioModificacion,
              motr_FechaModificacion: item.motr_FechaModificacion,
              usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
              motr_FechaEliminacion: item.motr_FechaEliminacion,
              usuarioCreacionNombre: item.usuarioCreacionNombre,
              usuarioModificadorNombre: item.usuarioModificadorNombre,
              motr_Estado: item.motr_Estado
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
            motr_Descripcion: data["motr_Descripcion"].trim(),
            usua_UsuarioCreacion: this.user['uuid'],
            motr_FechaCreacion: this.formatFechaHora(new Date()),
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
            motr_Id: data["motr_Id"],
            motr_Descripcion: data["motr_Descripcion"].trim(),
            usua_UsuarioModificacion: this.user['uuid'],
            motr_FechaModificacion: this.formatFechaHora(new Date()),
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
            motr_Id: data["motr_Id"],
            usua_UsuarioEliminacion: this.user['uuid'],
            motr_FechaEliminacion: this.formatFechaHora(new Date()),
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

const ModoTransporteServices = new ModoTransporteService();
export default ModoTransporteServices;
