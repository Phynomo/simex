import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
class UnidadesMedidaService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + 'api/UnidadMedidas/';
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))

        this.formatFechaHora = (date) => {
            const year = date.getFullYear();
            const mes = String(date.getMonth() + 1).padStart(2, '0');
            const dia = String(date.getDate()).padStart(2, '0');
            const hora = String(date.getHours()).padStart(2, '0');
            const minutos = String(date.getMinutes()).padStart(2, '0');
            const segundos = String(date.getSeconds()).padStart(2, '0');
            
            return `${year}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
        };
    }

    async listar() {
        try {
            const response = await this.axiosInstance.get("Listar?unme_EsAduana=" + this.user["esAduana"].toString());
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    unme_Id: item.unme_Id,
                    unme_Descripcion: item.unme_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    unme_FechaCreacion: item.unme_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    unme_FechaModificacion: item.unme_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    unme_FechaEliminacion: item.unme_FechaEliminacion,
                    unme_Estado: item.unme_Estado,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre
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
                unme_Descripcion: data['nombre'].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioCreacion: this.user['uuid'],
                unme_FechaCreacion: this.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Insertar',datos);
            return response;
        } catch (error) {
            throw error;
        }
    }
    
    async editar(data) {
        try {
            let datos = {
                unme_Id: data['id'],
                unme_Descripcion: data['nombre'].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioModificacion: this.user['uuid'],
                unme_FechaModificacion: this.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Editar',datos);
            return response;
        } catch (error) {
            throw error;
        }
    }
   
    async eliminar(data) {
        try {
            let datos = {
                unme_Id: data['id'],
                usua_UsuarioEliminacion: this.user['uuid'],
                unme_FechaEliminacion: this.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Eliminar',datos);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const unidadesMedidaService = new UnidadesMedidaService();
export default unidadesMedidaService;