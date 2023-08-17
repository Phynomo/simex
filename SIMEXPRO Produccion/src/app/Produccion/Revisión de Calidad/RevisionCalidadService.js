import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class RevisionCalidadService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/RevisionDeCalidad/";
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
                    reca_Id: item.reca_Id,
                    ensa_Id: item.ensa_Id,
                    reca_Descripcion: item.reca_Descripcion,
                    reca_Cantidad: item.reca_Cantidad,
                    reca_Scrap: item.reca_Scrap,
                    reca_FechaRevision: item.reca_FechaRevision,
                    reca_Imagen: item.reca_Imagen,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    reca_FechaCreacion: item.reca_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    reca_FechaModificacion: item.reca_FechaModificacion,
                    reca_Estado: item.reca_Estado,
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
                iden_Descripcion: data["tipoIdentificacion"].trim(),
                usua_UsuarioCreacion: this.user['uuid'],
                iden_FechaCreacion: new Date(),
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
                iden_Id: data["id"],
                iden_Descripcion: data["tipoIdentificacion"].trim(),
                usua_UsuarioModificacion: this.user['uuid'],
                iden_FechaModificacion: new Date(),
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
                iden_Id: data["id"],
                usua_UsuarioEliminacion: this.user['uuid'],
                iden_FechaEliminacion: new Date(),
            };
            const response = await this.axiosInstance.post("Eliminar", datos);
            console.log(response)
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const revisionCalidadService = new RevisionCalidadService();
export default revisionCalidadService;
