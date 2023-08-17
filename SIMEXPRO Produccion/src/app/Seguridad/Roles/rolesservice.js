import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from 'src/app/auth/services/jwtService/dataUser';


class RolesService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Roles/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    async ListadoRoles() {
        try {

            const response = await this.axiosInstance.get("Listar?role_Aduana=" + user()["esAduana"].toString());
            const data = response.data.data.map((item, index) => {

                const detallesJson = JSON.parse(item.detalles)
                let detalles = null

                if (detallesJson) {
                    detalles = detallesJson.map((datos, index2) => {
                        return {
                            key: index2 + 1,
                            pant_Id: datos['pant_Id'],
                            pant_Nombre: datos['pant_Nombre'],
                        }
                    })
                }

                return {
                    key: index + 1,
                    role_Id: item.role_Id,
                    role_Descripcion: item.role_Descripcion,
                    aduanero: item.aduanero,
                    detalles: detalles,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    role_FechaCreacion: item.role_FechaCreacion,
                    usuarioModificadorNombre: item.usuarioModificadorNombre,
                    role_FechaModificacion: item.role_FechaModificacion
                }
            });
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };


    async CrearRoles(RolesModelo, Pantallas) {
        try {
            const pant_Ids = {
                pantallas: Pantallas.map(item => ({ pant_Id: item.pant_Id }))
            };
            const jsonPantIds = JSON.stringify(pant_Ids);

            let datos = {
                role_Descripcion: RolesModelo.role_Descripcion.trim(),
                role_Aduana: user()["esAduana"],
                pant_Ids: jsonPantIds,
                usua_UsuarioCreacion: user()['uuid'],
                role_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Insertar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async EditarRoles(id, RolesModelo, Pantallas) {
        try {
            const pant_Ids = {
                pantallas: Pantallas.map(item => ({ pant_Id: item.pant_Id }))
            };
            const jsonPantIds = JSON.stringify(pant_Ids);

            let datos = {
                role_Id: id,
                role_Descripcion: RolesModelo.role_Descripcion.trim(),
                role_Aduana: user()["esAduana"],
                pant_Ids: jsonPantIds,
                usua_UsuarioModificacion: user()['uuid'],
                role_FechaModificacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


    async EliminarRoles(data) {
        try {
            let datos = {
                role_Id: data["id"],
                usua_UsuarioEliminacion: user()['uuid'],
                role_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }



}

const RolesServices = new RolesService();
export default RolesServices;
