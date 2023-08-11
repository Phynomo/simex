import axios from 'axios';

class PaisesService {
   constructor() {
      this.customHeaders = {
         'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
      };
      this.baseURL = 'https://simexpro.azurewebsites.net/api/';
      this.axiosInstance = axios.create({
         baseURL: this.baseURL,
         headers: this.customHeaders,
      });
   }

   async listar() {
      try {
         const response = await this.axiosInstance.get('Paises/Listar');
         return response.data
      } catch (error) {
         console.log(error.message);
         throw error;
      }
   }
   async crear(data) {
      try {
         let datos = {
            pais_Codigo: data.codigo,
            pais_Nombre: data.Nombre,
            usua_UsuarioCreacion: 1,
            pais_FechaCreacion: new Date()
         }
         const response = await this.axiosInstance.post('Paises/Insertar', datos);
         return response;
      } catch (error) {
         console.log(error.message);
         throw error;
      }
   }

   async editar(data) {
      try {
        let datos = {
            pais_Id: data.id,
            pais_Codigo: data.codigo,
            pais_Nombre: data.Nombre,
            usua_UsuarioModificacion: 1,
            pais_FechaModificacion: new Date()
         }
         const response = await this.axiosInstance.post('Paises/Editar', datos);
         console.log(response)
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
         let datos = {
            pais_Id: data.pais_Id,
         }
         // console.log(datos)
         const response = await this.axiosInstance.post('Paises/Eliminar', datos);
         console.log(response)
         return response;
      } catch (error) {
         console.log(error.message);
         throw error;
      }
   }

}

const paisesService = new PaisesService();
export default paisesService;
