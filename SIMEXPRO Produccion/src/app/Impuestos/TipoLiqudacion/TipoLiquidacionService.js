import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class TipoLiquidacionService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/TipoLiquidacion/";
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
                    tipl_Id: item.tipl_Id, 
                    tipl_Descripcion: item.tipl_Descripcion, 
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion, 
                    tipl_FechaCreacion: item.tipl_FechaCreacion, 
                    usarioCreacion: item.usarioCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion, 
                    tipl_FechaModificacion: item.tipl_FechaModificacion, 
                    usuarioModificacion: item.usuarioModificacion,            

                    tipl_Estado: item.tipl_Estado
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
                tipl_Descripcion: data["tipl_Descripcion"].trim().replace(/\s+/g, ' '), 
                usua_UsuarioCreacion: user()['uuid'], 
                tipl_FechaCreacion: instance.formatFechaHora(new Date()), 
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
                tipl_Id: data["tipl_Id"],
                tipl_Descripcion: data["tipl_Descripcion"].trim().replace(/\s+/g, ' '), 
                usua_UsuarioModificacion: user()['uuid'], 
                tipl_FechaModificacion: instance.formatFechaHora(new Date()), 
            };
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        }catch (error){
            console.log(error.message);
            throw error;
        }
    };

}

const TipoLiquidacionServices = new TipoLiquidacionService();
export default TipoLiquidacionServices;
