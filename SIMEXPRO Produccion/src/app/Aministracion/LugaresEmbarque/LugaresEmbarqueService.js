import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class LugaresEmbarqueService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/LugaresEmbarque/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
    }

    async listar () {
        try{
            const response = await this.axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    emba_Id: item.emba_Id,
                    emba_Codigo: item.emba_Codigo,
                    emba_Descripcion: item.emba_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    emba_FechaCreacion: item.emba_FechaCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    emba_FechaModificacion: item.emba_FechaModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    emba_FechaEliminacion: item.emba_FechaEliminacion,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,

                    emba_Estado: item.emba_Estado,
                };            
            });
            return data;
        }
        catch (error){
            console.log(error.message);
            throw error;
        }
    };

    async crear (data) {
        try{
            let datos = {
                    emba_Codigo: data["emba_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(),
                    emba_Descripcion: data["emba_Descripcion"].trim().replace(/\s+/g, ' ').toUpperCase(),
                    usua_UsuarioCreacion: user()['uuid'],
                    emba_FechaCreacion: instance.formatFechaHora(new Date()),               
            }
            const response = await this.axiosInstance.post("Insertar", datos);
            return response;
        }
        catch (error) {
            console.log(error.message);
            throw error;           
        }
    };

    async editar (data) {
        try{
            let datos = {
                emba_Id: data["emba_Id"],                
                emba_Codigo: data["emba_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(),
                emba_Descripcion: data["emba_Descripcion"].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioModificacion: user()['uuid'],
                emba_FechaModificacion: instance.formatFechaHora(new Date()), 
            }
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        }
        catch (error) {
            console.log(error.message);
            throw error;    
        }
    };

    async eliminar (data) {
        try{
            let datos = {
                emba_Id: data["emba_Id"],
                usua_UsuarioEliminacion: user()['uuid'],
                emba_FechaEliminacion: instance.formatFechaHora(new Date()), 
            }
            const response = await this.axiosInstance.post("Eliminar", datos);
            return response;
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }
  
};

const LugaresEmbarqueServices = new LugaresEmbarqueService();
export default LugaresEmbarqueServices;
