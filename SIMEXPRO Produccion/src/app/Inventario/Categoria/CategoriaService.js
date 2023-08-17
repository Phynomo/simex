import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class CategoriasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Categoria/";
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
                    cate_Id: item.cate_Id,
                    cate_Descripcion: item.cate_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    cate_FechaCreacion: item.cate_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    cate_FechaModificacion: item.cate_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    cate_FechaEliminacion: item.cate_FechaEliminacion,
                    cate_Estado: item.cate_Estado,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre
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
                cate_Descripcion: data.categoria.trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user()['uuid'],
                cate_FechaCreacion: instance.formatFechaHora(new Date())
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
                cate_Id: data["id"],
                cate_Descripcion: data.categoria.trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user()['uuid'],
                cate_FechaModificacion: instance.formatFechaHora(new Date())
            };
            const response = await this.axiosInstance.post("Editar", datos);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


}

const CategoriasServices = new CategoriasService();
export default CategoriasServices;
