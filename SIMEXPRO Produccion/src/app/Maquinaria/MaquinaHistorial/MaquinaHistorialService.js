import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class MauqinaHistorialService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/MaquinaHistorial/";
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
                    mahi_Id: item.mahi_Id,
                    maqu_Id: item.maqu_Id,
                    maquinaNumeroSerie: item.maquinaNumeroSerie,
                    mahi_FechaInicio: new Date(item.mahi_FechaInicio).toLocaleString(),
                    mahi_FechaFin: new Date(item.mahi_FechaFin).toLocaleString(),
                    mahi_Observaciones: item.mahi_Observaciones,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    mahi_FechaCreacion: item.mahi_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificaNombre: item.usuarioModificaNombre,
                    mahi_FechaModificacion: item.mahi_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    mahi_FechaEliminacion: item.mahi_FechaEliminacion,
                    mahi_Estado: item.mahi_Estado,
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
                maqu_Id: data.maquina["value"],
                mahi_FechaInicio: data["mahi_FechaInicio"],
                mahi_FechaFin: data["mahi_FechaFin"],
                mahi_Observaciones: data["mahi_Observaciones"],
                usua_UsuarioCreacion: this.user['uuid'],
                mahi_FechaCreacion: instance.formatFechaHora(new Date()),
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
                mahi_Id: data["id"],
                maqu_Id: data.maquina["value"],
                mahi_FechaInicio: data["mahi_FechaInicio"],
                mahi_FechaFin: data["mahi_FechaFin"],
                mahi_Observaciones: data["mahi_Observaciones"].trim(),
                usua_UsuarioModificacion: this.user['uuid'],
                mahi_FechaModificacion: instance.formatFechaHora(new Date()),
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

const MauqinaHistorialServices = new MauqinaHistorialService();
export default MauqinaHistorialServices;
