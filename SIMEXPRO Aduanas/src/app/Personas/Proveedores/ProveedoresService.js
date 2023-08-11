import axios from 'axios';

class ProveedoresService {
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
         const response = await this.axiosInstance.get('Proveedores/Listar');
         return response.data.data;
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

   async cuidadddl() {
      try {
         const response = await this.axiosInstance.get('Ciudades/Listar');
         const result = response.data.data.map(item => ({
            value: item.ciud_Id,
            label: item.ciud_Nombre
         }));
         return result
      } catch (error) {
         console.log(error.message);
         throw error;
      }
   }

   async crear(data) {
      try {
         let datos = {
            prov_NombreCompania: data.nombre,
            prov_NombreContacto: data.contacto,
            prov_Telefono: data.telefono,
            prov_CodigoPostal: data.codigo,
            prov_Ciudad: data.ciudad['value'],
            prov_DireccionExacta: data.direccion,
            prov_CorreoElectronico: data.correoelectronico,
            fax: data.fax,
            usua_UsuarioCreacion: 1,
            prov_FechaCreacion: new Date()
         }
         // console.log(datos)
         const response = await this.axiosInstance.post('Proveedores/Insertar', datos);
         console.log(response)
         return response;
      } catch (error) {
         console.log(error.message);
         throw error;
      }
   }

   async editar(data) {
      try {
         let datos = {
            prov_Id: data.id,
            prov_NombreCompania: data.nombre,
            prov_NombreContacto: data.contacto,
            prov_Telefono: data.telefono,
            prov_CodigoPostal: data.codigo,
            prov_Ciudad: data.ciudad['value'],
            prov_DireccionExacta: data.direccion,
            prov_CorreoElectronico: data.correoelectronico,
            fax: data.fax,
            usua_UsuarioModificacion: 1,
            prov_FechaModificacion: new Date()
         }
         // console.log(datos)
         const response = await this.axiosInstance.post('Proveedores/Editar', datos);
         console.log(response)
         return response;
      } catch (error) {
         console.log(error.message);
         throw error;
      }
   }

   async eliminar(data) {
      try {
         let datos = {
            prov_Id: data.prov_Id,
         }
         // console.log(datos)
         const response = await this.axiosInstance.post('Proveedores/Eliminar', datos);
         console.log(response)
         return response;
      } catch (error) {
         console.log(error.message);
         throw error;
      }
   }

}

const proveedoresService = new ProveedoresService();
export default proveedoresService;
