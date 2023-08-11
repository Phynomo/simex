import axios from 'axios';

class UnidadesMedidaService {
    constructor() {
        this.customHeaders = {
            'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
        };
        this.baseURL = process.env.REACT_APP_API_URL + 'api/UnidadMedidas/';
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
    }

    async listar() {
        try {
            const response = await this.axiosInstance.get('Listar');
            return response.data.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async crear(data) {
        try {
            let datos = {
                unme_Descripcion: data['nombre'],
                usua_UsuarioCreacion: 1,
                unme_FechaCreacion: new Date(),
            }
            const response = await this.axiosInstance.post('Insertar',datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    
    async editar(data) {
        try {
            let datos = {
                unme_Id: data['id'],
                unme_Descripcion: data['nombre'],
                usua_UsuarioModificacion: 1,
                unme_FechaModificacion: new Date(),
            }
            console.log(datos)
            const response = await this.axiosInstance.post('Editar',datos);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
   
    async eliminar(data) {
        try {
            let datos = {
                unme_Id: data['id'],
                usua_UsuarioEliminacion: 1,
                unme_FechaEliminacion: new Date(),
            }
            console.log(datos)
            const response = await this.axiosInstance.post('Eliminar',datos);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const unidadesMedidaService = new UnidadesMedidaService();
export default unidadesMedidaService;