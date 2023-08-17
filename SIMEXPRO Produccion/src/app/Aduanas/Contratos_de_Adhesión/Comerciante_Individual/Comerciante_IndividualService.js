import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";

class Comerciante_IndividualService {
    constructor() {
        this.customHeaders = {
            'XApiKey': instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + 'api/ComercianteIndividual/';
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
                  key: index+1,
                  coin_Id: item.coin_Id,
                  pers_Id: item.pers_Id,
                  pers_FormaRepresentacion: item.pers_FormaRepresentacion,
                  colo_Id: item.colo_Id,
                  coin_PuntoReferencia: item.coin_PuntoReferencia,
                  coin_ColoniaRepresentante: item.coin_ColoniaRepresentante,
                  coin_NumeroLocalReprentante: item. coin_NumeroLocalReprentante,
                  coin_PuntoReferenciaReprentante: item.coin_PuntoReferenciaReprentante,
                  coin_TelefonoCelular: item.coin_TelefonoCelular,
                  coin_TelefonoFijo: item.coin_TelefonoFijo,
                  coin_CorreoElectronico: item.coin_CorreoElectronico,
                  coin_CorreoElectronicoAlternativo: item.coin_CorreoElectronico,
                  usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                  coin_FechaCreacion: item.coin_FechaCreacion,
                  usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                  coin_FechaModificacion: item.coin_FechaModificacion,
                  coin_Estado: item.coin_Estado
                };
              });
            return data;
        } catch (error) {
            console.log(error.message);
            console.log(data);
            throw error;
        }
    }

    // async crear(data) {
    //     try {
    //         let datos = {
    //             pers_Id: data.pers_Id["value"],
    //             pers_FormaRepresentacion: data["pers_FormaRepresentacion"].trim(),
    //             colo_Id: data.colo_Id["value"],
    //             coin_PuntoReferencia: data["coin_PuntoReferencia"].trim(),
    //             coin_ColoniaRepresentante: data["coin_ColoniaRepresentante"].trim(),
    //             coin_NumeroLocalReprentante: data["coin_NumeroLocalReprentante"].trim(),
    //             coin_PuntoReferenciaReprentante: data["coin_PuntoReferenciaReprentante"],
    //             coin_TelefonoCelular: data["coin_TelefonoCelular"],
    //             coin_TelefonoFijo: data["coin_TelefonoFijo"].trim(),
    //             coin_CorreoElectronico: data["coin_CorreoElectronico"].trim(),
    //             coin_CorreoElectronicoAlternativo: data["coin_CorreoElectronico"].trim(),
    //             usua_UsuarioCreacion: this.user['uuid'],
    //             coin_FechaCreacion: new Date()
    //         }
    //         const response = await this.axiosInstance.post('Insertar',datos);
    //         return response;
    //     } catch (error) {
    //         console.log(error.message);
    //         throw error;
    //     }
    // }
    
    // async editar(data) {
    //     try {
    //         let datos = {
    //             coin_Id: data["coin_Id"].trim(),
    //             pers_Id: data.pers_Id["value"],
    //             pers_FormaRepresentacion: data["pers_FormaRepresentacion"].trim(),
    //             colo_Id: data.colo_Id["value"],
    //             coin_PuntoReferencia: data["coin_PuntoReferencia"].trim(),
    //             coin_ColoniaRepresentante: data["coin_ColoniaRepresentante"].trim(),
    //             coin_NumeroLocalReprentante: data["coin_NumeroLocalReprentante"].trim(),
    //             coin_PuntoReferenciaReprentante: data["coin_PuntoReferenciaReprentante"].trim(),
    //             coin_TelefonoCelular: data["coin_TelefonoCelular"].trim(),
    //             coin_TelefonoFijo: data["coin_TelefonoFijo"].trim(),
    //             coin_CorreoElectronico: data["coin_CorreoElectronico"].trim(),
    //             coin_CorreoElectronicoAlternativo: data["coin_CorreoElectronico"].trim(),
    //             usua_UsuarioModificacion: this.user['uuid'],
    //             coin_FechaModificacion: new Date(),
    //         }
    //         console.log(datos)
    //         const response = await this.axiosInstance.post('Editar',datos);
    //         console.log(response)
    //         return response;
    //     } catch (error) {
    //         console.log(error.message);
    //         throw error;
    //     }
    // }
}

const comerciante_IndividualService = new Comerciante_IndividualService();
export default comerciante_IndividualService;