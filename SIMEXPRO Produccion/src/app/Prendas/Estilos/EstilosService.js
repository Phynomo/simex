import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class EstilosService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Estilos/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }

    async listar() {
        try {
            const response = await this.axiosInstance.get(`Listar`);
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    esti_Id: item.esti_Id,
                    esti_Descripcion: item.esti_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    esti_FechaCreacion: item.esti_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    esti_FechaModificacion: item.esti_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    esti_FechaEliminacion: item.esti_FechaEliminacion,
                    esti_Estado: item.esti_Estado,
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
                esti_Descripcion: data.esti_Descripcion.trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user()['uuid'],
                esti_FechaCreacion: instance.formatFechaHora(new Date())
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
                esti_Id: data.esti_Id,
                esti_Descripcion: data.esti_Descripcion.trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user()['uuid'],
                esti_FechaModificacion: instance.formatFechaHora(new Date())
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
                esti_Id: data.esti_Id,
                usua_UsuarioEliminacion: user()['uuid'],
                esti_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const estilosService = new EstilosService();
export default estilosService;
