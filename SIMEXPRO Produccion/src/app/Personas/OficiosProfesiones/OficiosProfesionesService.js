import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";

class OficiosProfesionesService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + 'api/Oficio_Profesiones/';
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }

    async listar() {
        try {
            const response = await this.axiosInstance.get('Listar');
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    ofpr_Id: item.ofpr_Id,
                    ofpr_Nombre: item.ofpr_Nombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    ofpr_FechaCreacion: item.ofpr_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    ofpr_FechaModificacion: item.ofpr_FechaModificacion,
                    ofpr_Estado: item.ofpr_Estado,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                };
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async crear(data) {
        try {
            let datos = {
                ofpr_Nombre:  data["oficios"].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioCreacion: this.user['uuid'],
                ofpr_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Insertar',datos);
            return response;
        } catch (error) {
            throw error;
        }
    }
    
    async editar(data,Id) {
        try {
            let datos = {
                ofpr_Id:Id,
                ofpr_Nombre: data["oficios"].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioModificacion: this.user['uuid'],
                ofpr_FechaModificacion: instance.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Editar',datos);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const oficiosProfesionesService = new OficiosProfesionesService();
export default oficiosProfesionesService;