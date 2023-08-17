import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class ColoniasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Colonias/";
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
                    colo_Id: item.colo_Id,
                    colo_Nombre: item.colo_Nombre,
                    alde_Id: item.alde_Id,
                    alde_Nombre: item.alde_Nombre,
                    ciud_Id: item.ciud_Id,
                    ciud_Nombre: item.ciud_Nombre,
                    pvin_Id: item.pvin_Id,
                    pvin_Nombre: item.pvin_Nombre,
                    pais_Id: item.pais_Id,
                    pais_Codigo: item.pais_Codigo,
                    pais_Nombre: item.pais_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    colo_FechaCreacion: item.colo_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    colo_FechaModificacion: item.colo_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    colo_FechaEliminacion: item.colo_FechaEliminacion,
                    colo_Estado: item.colo_Estado
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
                colo_Nombre:            data["colonia"].trim(),
                ciud_Id:                data.ciudad.value,
                usua_UsuarioCreacion:   this.user['uuid'],
                colo_FechaCreacion:     instance.formatFechaHora(new Date())
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
                colo_Id:                    data["id"],
                colo_Nombre:                data["colonia"].trim(),
                ciud_Id:                    data.ciudad.value,
                usua_UsuarioModificacion:   this.user['uuid'],
                colo_FechaModificacion:     instance.formatFechaHora(new Date()),
            };
            console.log("let");
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

const ColoniasServices = new ColoniasService();
export default ColoniasServices;
