import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";
import user from 'src/app/auth/services/jwtService/dataUser';

class FormaEnvioService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + 'api/FormasEnvio/';
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
                    foen_Id: item.foen_Id,
                    foen_Codigo: item.foen_Codigo,
                    foen_Descripcion: item.foen_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    foen_FechaCreacion: item.foen_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    foen_FechaModificacion: item.foen_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    foen_FechaEliminacion: item.foen_FechaEliminacion,
                    foen_Estado: item.foen_Estado,
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
                foen_Codigo:data['CodigoFormaEnvio'].trim().replace(/\s+/g, ' ').toUpperCase(),
                foen_Descripcion:data['FormaEnvio'].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioCreacion:  user()['uuid'],
                foen_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Insertar',datos);
            return response;
        } catch (error) {
            throw error;
        }
    }
    
    async editar(data,Id) {
        console.log(data)
        try {
            let datos = {
                foen_Id:Id,
                foen_Codigo:data['CodigoFormaEnvio'].trim().replace(/\s+/g, ' ').toUpperCase(),
                foen_Descripcion:data['FormaEnvio'].trim().replace(/\s+/g, ' ').toUpperCase(),
                usua_UsuarioModificacion: user()['uuid'],
                foen_FechaModificacion:instance.formatFechaHora(new Date())  
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
                foen_Id: data['foen_Codigo'],
                usua_UsuarioEliminacion: user()['uuid'],
                foen_FechaEliminacion: instance.formatFechaHora(new Date())
            }
            console.log(datos)
            const response = await this.axiosInstance.post('Eliminar',datos);
            console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const formaEnvioService = new FormaEnvioService();
export default formaEnvioService;