import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class MonedasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Moneda/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }

    async listar() {
        try {
            const response = await this.axiosInstance.get(`Listar?mone_EsAduana=${true}`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    mone_Id: item.mone_Id,
                    mone_Codigo: item.mone_Codigo,
                    mone_Descripcion: item.mone_Descripcion,
                    pvin_Codigo: item.pvin_Codigo,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    mone_FechaCreacion: item.mone_FechaCreacion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    mone_FechaModificacion: item.mone_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    mone_FechaEliminacion: item.mone_FechaEliminacion,
                    mone_Estado: item.mone_Estado,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
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
                mone_Id: 0,
                mone_Codigo: data.mone_Codigo.trim(),
                mone_Descripcion: data.mone_Descripcion.trim(),
                mone_EsAduana: true,
                usua_UsuarioCreacion: 1,
                mone_FechaCreacion: new Date(),
                usua_UsuarioModificacion: 0,
                mone_FechaModificacion: "2023-08-15T16:24:46.627Z",
                usua_UsuarioEliminacion: 0,
                mone_FechaEliminacion: "2023-08-15T16:24:46.627Z",
                mone_Estado: true,
                usuarioModificacionNombre: "string",
                usuarioCreacionNombre: "string"
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
                mone_Id: data.mone_Id,
                mone_Codigo: data.mone_Codigo.trim(),
                mone_Descripcion: data.mone_Descripcion.trim(),
                mone_EsAduana: true,
                usua_UsuarioCreacion: 1,
                mone_FechaCreacion: new Date(),
                usua_UsuarioModificacion: 1,
                mone_FechaModificacion: new Date(),
                usua_UsuarioEliminacion: 0,
                mone_FechaEliminacion: "2023-08-15T16:24:46.627Z",
                mone_Estado: true,
                usuarioModificacionNombre: "string",
                usuarioCreacionNombre: "string"
            };
            const response = await this.axiosInstance.post("Editar", datos);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const monedasService = new MonedasService();
export default monedasService;
