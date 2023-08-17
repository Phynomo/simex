/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
/* eslint-disable prettier/prettier */
import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class MaquinasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = `${process.env.REACT_APP_API_URL}api/Maquinas/`;
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
                    maqu_Id: item.maqu_Id,
                    maqu_NumeroSerie: item.maqu_NumeroSerie,
                    mmaq_Id: item.mmaq_Id,
                    modu_Id: item.modu_Id,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    maqu_FechaCreacion: item.maqu_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    maqu_FechaModificacion: item.maqu_FechaModificacion,
                    usua_UsuarioEliminacion:item.usua_UsuarioEliminacion,
                    maqu_FechaEliminacion: item.maqu_FechaEliminacion,
                    maqu_Estado: item.maqu_Estado
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
                maqu_Id: data["maqu_Id"].trim(),
                maqu_NumeroSerie: data["maqu_NumeroSerie"].trim(),
                mmaq_Id: data["mmaq_Id"].trim(),
                modu_Id: data["modu_Id"].trim(),
                usua_UsuarioCreacion: user()['uuid'],
                maqu_FechaCreacion: instance.formatFechaHora(new Date()),
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
                maqu_Id: data["maqu_Id"].trim(),
                maqu_NumeroSerie: data["maqu_NumeroSerie"].trim(),
                mmaq_Id: data["mmaq_Id"].trim(),
                modu_Id: data["modu_Id"].trim(),
                usua_UsuarioModificacion: user()['uuid'],
                maqu_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Editar", datos);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


    async listarUsuarios() {
        try {
            const response = await this.axiosInstance.get('Usuarios/Listar');
            return response.data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


    async eliminar(data) {
        try {
            const datos = {
                pais_Id: data.pais_Id,
            }
            // console.log(datos)
            const response = await this.axiosInstance.post('Eliminar', datos);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}

const MaquinasServices = new MaquinasService();
export default MaquinasServices;
