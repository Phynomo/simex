import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class MaterialesService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Materiales/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    
        
    }
    async listar() {
      
        try {
           const response = await this.axiosInstance.get("Listar");
           const data = response.data.data.map((item, index) => {
              return {
                 key: index + 1,
                 mate_Id: item.mate_Id,
                 mate_Descripcion: item.mate_Descripcion,
                 subc_Id: item.subc_Id,
                 subc_Descripcion: item.subc_Descripcion,
                 mate_Precio: item.mate_Precio,
 
                 usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                 mate_FechaCreacion: item.mate_FechaCreacion,
                 usuarioCreacionNombre: item.usuarioCreacionNombre,

                 usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                 mate_FechaModificacion: item.prov_FechaModificacion,                 
                 usuarioModificadorNombre: item.usuarioModificadorNombre,
                   
                 mate_Estado: item.mate_Estado,
              };
           });
           return data;
        } catch (error) {
           console.log(error.message);
           throw error;
        }
     }

     async crear(data) {
        
       console.log(data);
      try {
           let datos = {
              mate_Descripcion: data["mate_Descripcion"].trim(),
              subc_Id: data.subcategoria.value,               
              usua_UsuarioCreacion: this.user['uuid'],
              mate_Precio: data["mate_Precio"].trim(),
              mate_FechaCreacion: instance.formatFechaHora(new Date()),
           };
          
           const response = await this.axiosInstance.post("Insertar", datos);
           return response;
        } catch (error) {
           console.log(error.message);
           throw error;
        }
     }
    
     async editar(data) {
      console.log(data);  
      try {
           let datos = {
              mate_Id: data["id"],
              mate_Descripcion: data["mate_Descripcion"].trim(),
              subc_Id: data.subcategoria.value,               
              usua_UsuarioCreacion: this.user['uuid'],
              mate_Precio: data["mate_Precio"],
  
              usua_UsuarioModificacion: this.user['uuid'],
              mate_FechaModificacion: instance.formatFechaHora(new Date()),
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
              mate_Id: data["id"],
             
              usua_UsuarioEliminacion: this.user['uuid'],
              mate_FechaEliminacion: this.formatFechaHora(new Date()),
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


const MaterialesServices = new MaterialesService();
export default MaterialesServices;
