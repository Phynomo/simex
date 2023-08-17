import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from "src/app/auth/services/jwtService/dataUser";

class SubcategoriasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Subcategoria/";
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
                    subc_Id: item.subc_Id,
                    cate_Id: item.cate_Id,
                    cate_Descripcion: item.cate_Descripcion,
                    subc_Descripcion: item.subc_Descripcion,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    subc_FechaCreacion: item.subc_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    subc_FechaModificacion: item.subc_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    subc_FechaEliminacion: item.subc_FechaEliminacion,
                    subc_Estado: item.subc_Estado,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificaNombre: item.usuarioModificaNombre,
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
                cate_Id: data.categoria["value"],
                subc_Descripcion: data["subCategoria"].trim().replace(/\s+/g, ' '),
                usua_UsuarioCreacion: user()['uuid'],
                subc_FechaCreacion: instance.formatFechaHora(new Date()),
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
                subc_Id: data["id"],
                cate_Id: data.categoria["value"],
                subc_Descripcion: data["subCategoria"].trim().replace(/\s+/g, ' '),
                usua_UsuarioModificacion: user()['uuid'],
                subc_FechaModificacion: instance.formatFechaHora(new Date()),
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
                subc_Id: data["id"],
                usua_UsuarioEliminacion: user()['uuid'],
                subc_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}

const subcategoriasServices = new SubcategoriasService();
export default subcategoriasServices;
