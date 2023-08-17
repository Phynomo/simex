import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class TipoDocumentoService {
    constructor(){
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/TipoDocumento/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
    };

    async listar () {
        try{
            const response = await this.axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return{
                    key: index + 1,
                    tido_Id: item.tido_Id,
                    tido_Codigo: item.tido_Codigo,
                    tido_Descripcion: item.tido_Descripcion,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    tido_FechaCreacion: item.tido_FechaCreacion,
                    usarioCreacion: item.usarioCreacion,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    tido_FechaModificacion: item.tido_FechaModificacion,
                    usuarioModificacion: item.usuarioModificacion,

                    tido_Estado: item.tido_Estado,
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
                    tido_Codigo: data["tido_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(),
                    tido_Descripcion: data["tido_Descripcion"].trim().replace(/\s+/g, ' '),
                    usua_UsuarioCreacion: user()['uuid'],
                    tido_FechaCreacion: instance.formatFechaHora(new Date()),                
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
                tido_Id: data["tido_Id"],                
                tido_Codigo: data["tido_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(),
                tido_Descripcion: data["tido_Descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user()['uuid'],
                tido_FechaModificacion: instance.formatFechaHora(new Date()), 
            }
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        }
        catch (error) {
            console.log(error.message);
            throw error;    
        }
    };

};

const tipoDocumentoService = new TipoDocumentoService();
export default tipoDocumentoService;