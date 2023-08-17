import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class OficinasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Oficinas/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
    }

    async listar(){
        try{
            const response = await this.axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    ofic_Id: item.ofic_Id, 
                    ofic_Nombre: item.ofic_Nombre, 
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion, 
                    ofic_FechaCreacion: item.ofic_FechaCreacion, 
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion, 
                    ofic_FechaModificacion: item.ofic_FechaModificacion, 
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion, 
                    ofic_FechaEliminacion: item.ofic_FechaEliminacion, 

                    ofic_Estado: item.ofic_Estado
                };
            });
            return data;
        }
        catch (error)
        {
            console.log(error.message);
            throw error;
        }
    };

    async crear(data){
        try{
            let datos = {
                ofic_Nombre: data["ofic_Nombre"].trim().replace(/\s+/g, ' ').toUpperCase(), 
                usua_UsuarioCreacion: user()['uuid'], 
                ofic_FechaCreacion: instance.formatFechaHora(new Date()), 
            };
            const response = await this.axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            console.log(error.message);
            throw error;
        }
    };

    async editar(data){
        try{
            let datos = {
                ofic_Id: data["ofic_Id"],
                ofic_Nombre: data["ofic_Nombre"].trim().replace(/\s+/g, ' ').toUpperCase(), 
                usua_UsuarioModificacion: user()['uuid'], 
                ofic_FechaModificacion: instance.formatFechaHora(new Date()), 
            };
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        }catch (error){
            console.log(error.message);
            throw error;
        }
    };

    async eliminar (data){
        try{
            let datos = {
                ofic_Id: data["ofic_Id"],
                usua_UsuarioEliminacion: user()['uuid'], 
                ofic_FechaEliminacion: instance.formatFechaHora(new Date()), 
            };
            const response = await this.axiosInstance.post("Eliminar", datos);
            return response;
        }catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const OficinasServices = new OficinasService();
export default OficinasServices;
