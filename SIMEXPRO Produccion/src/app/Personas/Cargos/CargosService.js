import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class CargosService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Cargos/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    };


    async listar() {
        try {
            const response = await this.axiosInstance.get("Listar?carg_EsAduana=" + user()["esAduana"].toString());
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    carg_Id: item.carg_Id,
                    carg_Nombre: item.carg_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    carg_FechaCreacion: item.carg_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificadorNombre: item.usuarioModificacionNombre,
                    carg_FechaModificacion: item.carg_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    carg_FechaEliminacion: item.carg_FechaEliminacion,
                    carg_Estado: item.carg_Estado,
                    carg_EsAduana: item.carg_Aduana
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
                carg_Nombre: data["carg_Nombre"].trim().replace(/\s+/g, ' '),
                carg_Aduana: user()["esAduana"],
                usua_UsuarioCreacion: this.user['uuid'],
                carg_FechaCreacion: instance.formatFechaHora(new Date()),
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
                carg_Id: data["id"],
                carg_Nombre: data["carg_Nombre"].trim().replace(/\s+/g, ' '),
                carg_Aduana: user()["esAduana"],
                usua_UsuarioModificacion: this.user['uuid'],
                carg_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const CargosServices = new CargosService();
export default CargosServices;
