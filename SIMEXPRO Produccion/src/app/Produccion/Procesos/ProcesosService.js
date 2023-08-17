import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class ProcesosService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Procesos/";
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
                    proc_Id: item.proc_Id,
                    proc_Descripcion: item.proc_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    proc_FechaCreacion: item.proc_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    proc_FechaModificacion: item.proc_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    proc_FechaEliminacion: item.proc_FechaEliminacion,
                    proc_Estado: item.proc_Estado,
                    usarioCreacion: item.usarioCreacion,
                    usuarioModificacion: item.usuarioModificacion,
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
                proc_Descripcion: data["descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user()['uuid'],
                proc_FechaCreacion: instance.formatFechaHora(new Date()),
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
                proc_Id: data["id"],
                proc_Descripcion: data["descripcion"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user()['uuid'],
                proc_FechaModificacion: instance.formatFechaHora(new Date()),
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
                proc_Id: data["id"],
                usua_UsuarioEliminacion: user()['uuid'],
                proc_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}

const procesosServices = new ProcesosService();
export default procesosServices;
