import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class FuncionesMaquinaService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/FuncionesMaquina/";
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
                    func_Id: item.func_Id,
                    func_Nombre: item.func_Nombre,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    func_FechaCreacion: item.func_FechaCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    func_FechaModificacion: item.func_FechaModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    func_FechaEliminacion: item.func_FechaEliminacion,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,

                    func_Estado: item.func_Estado,
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
                func_Nombre: data["func_Nombre"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user()['uuid'],
                func_FechaCreacion: instance.formatFechaHora(new Date()),
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
                func_Id: data["id"],
                func_Nombre: data["func_Nombre"].trim().replace(/\s+/g, ' '),

                usua_UsuarioModificacion: user()['uuid'],
                func_FechaModificacion: instance.formatFechaHora(new Date()),
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
                func_Id: data["id"],
                usua_UsuarioEliminacion: user()['uuid'],
                func_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


}

const FuncionesMaquinaServices = new FuncionesMaquinaService();
export default FuncionesMaquinaServices;
