import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class TipoIdentificacionService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/TiposIdentificacion/";
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
                    iden_Id: item.iden_Id,
                    iden_Descripcion: item.iden_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    iden_FechaCreacion: item.iden_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    iden_FechaModificacion: item.iden_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    iden_FechaEliminacion: item.iden_FechaEliminacion,
                    iden_Estado: item.iden_Estado,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificacionNombre: item.usuarioModificacionNombre
                };
            });
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async crear(data) {
        try {
            let datos = {
                iden_Descripcion: data["tipoIdentificacion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user()['uuid'],
                iden_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            
            const response = await this.axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async editar(data) {
        try {
            let datos = {
                iden_Id: data["id"],
                iden_Descripcion: data["tipoIdentificacion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user()['uuid'],
                iden_FechaModificacion: instance.formatFechaHora(new Date()),
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
                iden_Id: data["id"],
                usua_UsuarioEliminacion: user()['uuid'],
                iden_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Eliminar", datos);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const tipoIdentificacionService = new TipoIdentificacionService();
export default tipoIdentificacionService;
