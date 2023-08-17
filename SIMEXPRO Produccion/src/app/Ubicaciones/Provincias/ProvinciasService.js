import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class ProvinciasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Provincias/";
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
                    pvin_Id: item.pvin_Id,
                    pvin_Nombre: item.pvin_Nombre,
                    pvin_Codigo: item.pvin_Codigo,
                    pais_Id: item.pais_Id,
                    pais_Nombre: item.pais_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    pvin_FechaCreacion: item.pvin_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificadorNombre: item.usuarioModificadorNombre,
                    pvin_FechaModificacion: item.pvin_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    pvin_FechaEliminacion: item.pvin_FechaEliminacion,
                    pvin_Estado: item.pvin_Estado,
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
                pvin_Nombre: data["prov_Nombre"].trim().replace(/\s+/g, ' '),
                pvin_Codigo: data["prov_Codigo"].trim(),
                pais_Id: data.pais["value"],
                usua_UsuarioCreacion: this.user['uuid'],
                pvin_FechaCreacion: instance.formatFechaHora(new Date()),
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
                pvin_Id: data["id"],
                pvin_Nombre: data["prov_Nombre"].trim().replace(/\s+/g, ' '),
                pvin_Codigo: data["prov_Codigo"].trim(),
                pais_Id: data.pais["value"],
                usua_UsuarioModificacion: this.user['uuid'],
                pvin_FechaModificacion: instance.formatFechaHora(new Date()),
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

const provinciasService = new ProvinciasService();
export default provinciasService;
