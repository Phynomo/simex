import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class EstadoMercanciasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/EstadoMercancias/";
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
                    merc_Id: item.merc_Id,
                    merc_Codigo: item.merc_Codigo,
                    merc_Descripcion: item.merc_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    merc_FechaCreacion: item.merc_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    merc_FechaModificacion: item.merc_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    merc_FechaEliminacion: item.merc_FechaEliminacion,
                    merc_Estado: item.merc_Estado,
                    usua_NombreCreacion: item.usua_NombreCreacion,
                    usua_NombreModificacion: item.usua_NombreModificacion,                   
                };
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async crear(data) {
        try {
            let datos = {
                merc_Codigo:data['CodigoEstado'].trim().replace(/\s+/g, ' ').toUpperCase(),
                merc_Descripcion:data['Estado'].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioCreacion: user()['uuid'],
                merc_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Insertar',datos);
            return response;
        } catch (error) {
            throw error;
        }
    }


    async editar(data,Id) {
        try {
            let datos = {
                merc_Id:Id,
                merc_Codigo:data['CodigoEstado'].trim().replace(/\s+/g, ' ').toUpperCase(),
                merc_Descripcion:data['Estado'].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioModificacion:user()['uuid'],
                merc_FechaModificacion:instance.formatFechaHora(new Date())  
            }
            const response = await this.axiosInstance.post('Editar',datos);
            return response;
        } catch (error) {
            throw error;
        }
    }

}

const EstadoMercanciasServices = new EstadoMercanciasService();
export default EstadoMercanciasServices;
