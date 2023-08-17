import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class CiudadesService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Ciudades/";
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
                    key:index + 1,
                    ciud_Id: item.ciud_Id,
                    ciud_Nombre: item.ciud_Nombre,
                    pvin_Id: item.pvin_Id,
                    pais_Codigo: item.pais_Codigo,
                    pais_Nombre: item.pais_Nombre,
                    pvin_Nombre: item.pvin_Nombre,
                    pvin_Codigo: item.pvin_Codigo,
                    pais_Id: item.pais_Id,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    ciud_FechaCreacion: item.ciud_FechaCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usuarioModificadorNombre: item.usuarioModificadorNombre,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    ciud_FechaEliminacion: item.ciud_FechaEliminacion,
                    ciud_FechaModificacion: item.ciud_FechaModificacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    ciud_Estado: item.ciud_Estado,
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
                ciud_Nombre:            data["nombreCuidad"].trim(),
                pvin_Id:                data.provincia.value,
                usua_UsuarioCreacion:   this.user['uuid'],
                ciud_FechaCreacion:     new Date() 
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
                ciud_Id:					data["id"],
                ciud_Nombre:			    data["nombreCuidad"].trim(),
                pvin_Id:					data.provincia.value,
                usua_UsuarioModificacion:	this.user['uuid'],
                ciud_FechaModificacion:     new Date(),
            };
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

}

const CiudadesServices = new CiudadesService();
export default CiudadesServices;
