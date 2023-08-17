import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class EstadosCivilesService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/EstadosCiviles/";
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
                    escv_Id: item.escv_Id,
                    escv_Nombre: item.escv_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    escv_FechaCreacion: item.escv_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificadorNombre: item.usuarioModificadorNombre,
                    escv_FechaModificacion: item.escv_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    escv_FechaEliminacion: item.escv_FechaEliminacion,
                    escv_Estado: item.escv_Estado,
                };
            });
            return data;
        } catch (error) {
            throw error;
        }
    }   
}

const EstadosCivilesServices = new EstadosCivilesService();
export default EstadosCivilesServices;

