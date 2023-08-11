import axios from 'axios';

class ProvinciasService {
    constructor() {
        this.customHeaders = {
            'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
        };
        this.baseURL = process.env.REACT_APP_API_URL + 'api/Provincias/';
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
                pvin_Nombre: data['prov_Nombre'],
                pvin_Codigo: data['prov_Codigo'],
                pais_Id: data.pais['value'],
                usua_UsuarioCreacion: 1,
                pvin_FechaCreacion: new Date(),
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
                pvin_Id: data['id'],
                pvin_Nombre: data['prov_Nombre'],
                pvin_Codigo: data['prov_Codigo'],
                pais_Id: data.pais['value'],
                usua_UsuarioModificacion: 1,
                pvin_FechaModificacion: new Date(),
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
}

const provinciasService = new ProvinciasService();
export default provinciasService;