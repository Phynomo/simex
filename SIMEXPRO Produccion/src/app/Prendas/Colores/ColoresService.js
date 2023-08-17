import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class ColoresService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Colores/";
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
                    colr_Id: item.colr_Id,
                    colr_Nombre: item.colr_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioNombreCreacion: item.usuarioNombreCreacion,
                    colr_FechaCreacion: item.colr_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioNombreModificacion: item.usuarioNombreModificacion,
                    colr_FechaModificacion: item.colr_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    colr_FechaEliminacion: item.colr_FechaEliminacion,
                    colr_Estado: item.colr_Estado,
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
                colr_Nombre: data["colr_Nombre"].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioCreacion: this.user['uuid'],
                colr_FechaCreacion: instance.formatFechaHora(new Date()),
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
                colr_Id: data["id"],
                colr_Nombre: data["colr_Nombre"].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioModificacion: this.user['uuid'],
                colr_FechaModificacion: instance.formatFechaHora(new Date()), 
            };
            console.log(datos);
            const response = await this.axiosInstance.post("Editar", datos);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const ColoresServices = new ColoresService();
export default ColoresServices;
