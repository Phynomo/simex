import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class AreasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Areas/";
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
                    tipa_Id: item.tipa_Id,
                    tipa_area: item.tipa_area,
                    proc_Id: item.proc_Id,
                    proc_Descripcion: item.proc_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    tipa_FechaCreacion: item.tipa_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    tipa_FechaModificacion: item.tipa_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    tipa_FechaEliminacion: item.tipa_FechaEliminacion,
                    tipa_Estado: item.tipa_Estado,
                    usarioCreacion: item.usarioCreacion,
                    usuarioModificacion: item.usuarioModificacion,
                    usuarioEliminacion: item.usuarioEliminacion
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
                tipa_area: data["area"].trim().replace(/\s+/g, ' '),
                proc_Id: data.proceso["value"],
                usua_UsuarioCreacion: user()['uuid'],
                tipa_FechaCreacion: instance.formatFechaHora(new Date()),
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
                tipa_Id: data["id"],
                tipa_area: data["area"].trim().replace(/\s+/g, ' '),
                proc_Id: data.proceso["value"],
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
                tipa_Id: data["id"],
                usua_UsuarioEliminacion: user()['uuid'],
                tipa_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}

const AreasServices = new AreasService();
export default AreasServices;
