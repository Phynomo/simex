import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class TiposIntermediarioService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/TipoIntermediario/";
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
                    tite_Id: item.tite_Id,
                    tite_Codigo: item.tite_Codigo,
                    tite_Descripcion: item.tite_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    tite_FechaCreacion: item.tite_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    tite_FechaModificacion: item.tite_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    tite_FechaEliminacion: item.tite_FechaEliminacion,
                    tite_Estado: item.tite_Estado,
                    usarioCreacion: item.usarioCreacion,
                    usuarioModificacion: item.usuarioModificacion,
                };
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async crear(data){
        try{
            let datos = {
                tite_Codigo: data["tite_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(), 
                tite_Descripcion: data["tite_Descripcion"].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioCreacion: this.user['uuid'], 
                tite_FechaCreacion: instance.formatFechaHora(new Date()), 
            };
            const response = await this.axiosInstance.post("Insertar", datos);
            return response;
        }catch (error){
            throw error;
        }
    };

    async editar(data){
        try{
            let datos = {
                tite_Id: data["id"],
                tite_Codigo: data["tite_Codigo"].trim().replace(/\s+/g, ' ').toUpperCase(), 
                tite_Descripcion: data["tite_Descripcion"].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioModificacion: this.user['uuid'], 
                tite_FechaModificacion: instance.formatFechaHora(new Date()), 
            };
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        }catch (error){
            throw error;
        }
    };

    async eliminar(data) {
        try {
            let datos = {
                tite_Id: data['id'],
                usua_UsuarioEliminacion: user()['uuid'],
                tite_FechaEliminacion: instance.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Eliminar',datos);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const TiposIntermediarioServices = new TiposIntermediarioService();
export default TiposIntermediarioServices;
