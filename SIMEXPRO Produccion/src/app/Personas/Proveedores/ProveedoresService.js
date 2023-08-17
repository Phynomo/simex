import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";

class ProveedoresService {
   constructor() {
      this.customHeaders = {
         XApiKey: instance.extraerToken(),
      };
      this.baseURL = process.env.REACT_APP_API_URL + "api/Proveedores/";
      this.axiosInstance = axios.create({
         baseURL: this.baseURL,
         headers: this.customHeaders,
      });
      this.user = JSON.parse(localStorage.getItem('user'))


      // Para formatear la fecha a la actual.
      this.formatFechaHora = (date) => {
         const year = date.getFullYear();
         const mes = String(date.getMonth() + 1).padStart(2, '0');
         const dia = String(date.getDate()).padStart(2, '0');
         const hora = String(date.getHours()).padStart(2, '0');
         const minutos = String(date.getMinutes()).padStart(2, '0');
         const segundos = String(date.getSeconds()).padStart(2, '0');
         
         return `${year}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
     };
   }

   async listar() {
      
      try {
         const response = await this.axiosInstance.get("Listar");
         const data = response.data.data.map((item, index) => {
            return {
               key: index + 1,
               prov_Id: item.prov_Id,
               prov_NombreCompania: item.prov_NombreCompania,
               prov_NombreContacto: item.prov_NombreContacto,
               prov_Telefono: item.prov_Telefono,
               prov_CodigoPostal: item.prov_CodigoPostal,
               prov_Ciudad: item.prov_Ciudad,
               ciud_Nombre: item.ciud_Nombre,
               pvin_Id: item.pvin_Id,
               pvin_Nombre: item.pvin_Nombre,
               pais_Id: item.pais_Id,
               pais_Codigo: item.pais_Codigo,
               pais_Nombre: item.pais_Nombre,
               prov_DireccionExacta: item.prov_DireccionExacta,
               prov_CorreoElectronico: item.prov_CorreoElectronico,
               prov_Fax: item.prov_Fax,

               usua_UsuarioCreacion: item.usua_UsuarioCreacion,
               prov_FechaCreacion: item.prov_FechaCreacion,
               usuarioCreacionNombre: item.usuarioCreacionNombre,
               
               usua_UsuarioModificacion: item.usua_UsuarioModificacion,
               prov_FechaModificacion: item.prov_FechaModificacion,
               usuarioModificadorNombre: item.usuarioModificadorNombre,

               usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
               prov_FechaEliminacion: item.prov_FechaEliminacion,
               usuarioEliminacionNombre: item.usuarioEliminacionNombre,

               prov_Estado: item.prov_Estado,
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
            prov_NombreCompania: data["prov_NombreCompania"].trim(),
            prov_NombreContacto: data["prov_NombreContacto"].trim(),
            prov_Telefono: data["prov_Telefono"].trim(),
            prov_CodigoPostal: data["prov_CodigoPostal"].trim(),
            prov_Ciudad: data.Ciudad["value"],
            prov_DireccionExacta: data["prov_DireccionExacta"].trim(),
            prov_CorreoElectronico: data["prov_CorreoElectronico"].trim(),
            prov_Fax: data["prov_Fax"].trim(),

            usua_UsuarioCreacion: this.user['uuid'],
            prov_FechaCreacion: this.formatFechaHora(new Date()),
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
            prov_Id: data["id"],
            prov_NombreCompania: data["prov_NombreCompania"].trim(),
            prov_NombreContacto: data["prov_NombreContacto"].trim(),
            prov_Telefono: data["prov_Telefono"].trim(),
            prov_CodigoPostal: data["prov_CodigoPostal"].trim(),
            prov_Ciudad: data.Ciudad["value"],
            prov_DireccionExacta: data["prov_DireccionExacta"].trim(),
            prov_CorreoElectronico: data["prov_CorreoElectronico"].trim(),
            prov_Fax: data["prov_Fax"].trim(),

            usua_UsuarioModificacion: this.user['uuid'],
            prov_FechaModificacion: this.formatFechaHora(new Date()),
         };
         const response = await this.axiosInstance.post("Editar", datos);
         return response;
      } catch (error) {
         console.log(error.message);
         throw error;
      }
   }

   async eliminar(data) {
      
      try {
         let datos = {
            prov_Id: data["id"],
           
            usua_UsuarioEliminacion: this.user['uuid'],
            prov_FechaEliminacion: this.formatFechaHora(new Date()),
         };
         const response = await this.axiosInstance.post("Eliminar", datos);
         //console.log(response);
         return response;
      } catch (error) {
         console.log(error.message);
         throw error;
      }  
   }
}

const proveedoresService = new ProveedoresService();
export default proveedoresService;
