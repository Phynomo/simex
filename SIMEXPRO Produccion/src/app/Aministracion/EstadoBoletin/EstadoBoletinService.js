import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class EstadoBoletinService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/EstadoBoletin/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }


    
    async ListarEstadosBoletin(){
        try{
            const response = await this.axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    esbo_Id: item.esbo_Id, 
                    esbo_Descripcion: item.esbo_Descripcion, 

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion, 
                    esbo_FechaCreacion: item.esbo_FechaCreacion, 
                    usua_NombreCreacion: item.usua_NombreCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion, 
                    esbo_FechaModificacion: item.esbo_FechaModificacion, 
                    usua_NombreModificacion: item.usua_NombreModificacion,
                    
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion, 
                    esbo_FechaEliminacion: item.esbo_FechaEliminacion, 

                    esbo_Estado: item.esbo_Estado
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

    async CrearEstadoBoletin(data){
        try{
            let datos = {
                esbo_Descripcion: data["esbo_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: this.user['uuid'], 
                esbo_FechaCreacion: new Date(), 
            };
            const response = await this.axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            console.log(error.message);
            throw error;
        }
    };

    async EditarEstadoBoletin(data){
        try{
            let datos = {
                esbo_Id: data["esbo_Id"],
                esbo_Descripcion: data["esbo_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: this.user['uuid'], 
                esbo_FechaModificacion: new Date(), 
            };
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        }catch (error){
            console.log(error.message);
            throw error;
        }
    };

  
}

const EstadoBoletinServices = new EstadoBoletinService();
export default EstadoBoletinServices;
