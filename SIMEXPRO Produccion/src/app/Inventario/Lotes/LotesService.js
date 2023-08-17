import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class LotesService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Lotes/";
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
                    lote_Id: item.lote_Id,
                    mate_Id: item.mate_Id,
                    unme_Id: item.unme_Id,
                    prod_Id: item.prod_Id,
                    lote_Stock: item.lote_Stock,
                    lote_CantIngresada: item.lote_CantIngresada,
                    lote_Observaciones: item.lote_Observaciones,
                    tipa_Id: item.tipa_Id,
                    usuario_UsuarioCreacion: item.usuario_UsuarioCreacion,
                    lote_FechaCreacion: item.lote_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    lote_FechaModificacion: item.lote_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    lote_FechaEliminacion: item.lote_FechaEliminacion,
                    lote_Estado: item.lote_Estado
                };
            });
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async crear(data){
        try {
            let datos = {
                mate_Id: data['material'],
                unme_Id: data['unidadmedida'],
                prod_Id: data['pedidoordendetalle'],
                lote_Stock: data['stock'],
                lote_CantIngresada: data['cantidadIngresada'],
                lote_Observaciones: data['observaciones'],
                tipa_Id: data['tipoarea'],
                usuario_UsuarioCreacion: 1,
                lote_FechaCreacion: new Date(),
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
                lote_Id: data['id'],
                mate_Id: data['material'],
                unme_Id: data['unidadmedida'],
                prod_Id: data['pedidoordendetalle'],
                lote_Stock: data['stock'],
                lote_CantIngresada: data['cantidadIngresada'],
                lote_Observaciones: data['observaciones'],
                tipa_Id: data['tipoarea'],
                usua_UsuarioModificacion: 1,
                lote_FechaModificacion: new Date(),
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
                lote_Id: data['id'],
                usua_UsuarioEliminacion: 1,
                lote_FechaEliminacion: new Date(),
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

const LotesServices = new LotesService();
export default LotesServices;
