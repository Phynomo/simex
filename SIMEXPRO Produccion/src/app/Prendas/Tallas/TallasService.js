import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class TallasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Tallas/";
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
                    tall_Id: item.tall_Id,
                    tall_Codigo: item.tall_Codigo,
                    tall_Nombre: item.tall_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    tall_FechaCreacion: item.tall_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    tall_FechaModificacion: item.tall_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    tall_FechaEliminacion: item.tall_FechaEliminacion,
                    tall_Estado: item.tall_Estado,
                    usarioCreacion: item.usarioCreacion,
                    usuarioModificacion: item.usuarioModificacion
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
                tall_Codigo: data.tall_Codigo.trim().toUpperCase().replace(/\s+/g, ' '),
                tall_Nombre: data.tall_Nombre.trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: this.user['uuid'],
                tall_FechaCreacion: instance.formatFechaHora(new Date()),
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
                tall_Id: data.tall_Id,
                tall_Codigo: data.tall_Codigo.trim().toUpperCase().replace(/\s+/g, ' '),
                tall_Nombre: data.tall_Nombre.trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: this.user['uuid'],
                tall_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}

const TallasServices = new TallasService();
export default TallasServices;
