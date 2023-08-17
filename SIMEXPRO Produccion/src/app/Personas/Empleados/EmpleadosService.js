import axios from 'axios';
import instance from 'src/app/auth/services/jwtService/jwtService';

class EmpleadosService {
    constructor() {
        this.customHeaders = {
            'XApiKey': instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + 'api/Empleados/';
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }
    
    async listar() {
        try {
            const response = await this.axiosInstance.get(`Listar?empl_EsAduana=${this.user['esAduana']}`);
            const data = response.data.data.map((item, index) => {
                return {
                  key: index+1,
                  empl_Id: item.empl_Id,
                  empl_Nombres: item.empl_Nombres,
                  empl_Apellidos: item.empl_Apellidos,
                  empl_DNI: item.empl_DNI,
                  escv_Id: item.escv_Id,
                  escv_Nombre: item.escv_Nombre,
                  empl_NombreCompleto:`${item.empl_Nombres} ${item.empl_Apellidos}`,
                  empl_Sexo: item.empl_Sexo,
                  empl_FechaNacimiento: item.empl_FechaNacimiento,
                  empl_Telefono: item.empl_Telefono,
                  empl_DireccionExacta: item.empl_DireccionExacta,
                  pvin_Id: item.pvin_Id,
                  pvin_Nombre: item.pvin_Nombre,
                  pais_Id: item.pais_Id,
                  pais_Codigo: item.pais_Codigo,
                  pais_Nombre: item.pais_Nombre,
                  empl_CorreoElectronico: item.empl_CorreoElectronico,
                  carg_Id: item.carg_Id,
                  carg_Nombre: item.carg_Nombre,
                  empl_EsAduana: item.empl_EsAduana,
                  usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                  usuarioCreacionNombre: item.usuarioCreacionNombre,
                  empl_FechaCreacion: item.empl_FechaCreacion,
                  usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                  usuarioModificacionNombre: item.usuarioModificacionNombre,
                  empl_FechaModificacion: item.empl_FechaModificacion,
                  usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                  usuarioEliminacionNombre: item.usuarioEliminacionNombre,
                  empl_FechaEliminacion: item.empl_FechaEliminacion,
                  empl_Estado: item.empl_Estado
                };
              });
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async crear(modelo) {
        try {
            let datos = {
                empl_Nombres: modelo.empl_Nombres.trim(),
                empl_Apellidos: modelo.empl_Apellidos.trim(),
                empl_DNI: modelo.empl_DNI,
                escv_Id: modelo.escv_Id.value,
                empl_NombreCompleto: modelo.empl_Nombres.trim(),
                empl_Sexo: modelo.empl_Sexo,
                empl_FechaNacimiento: modelo.empl_FechaNacimiento,
                empl_Telefono: modelo.empl_Telefono.trim(),
                empl_DireccionExacta: modelo.empl_DireccionExacta.trim(),
                pvin_Id: modelo.pvin_Id.value,
                pais_Id: modelo.pais_Id.value,
                empl_CorreoElectronico: modelo.empl_CorreoElectronico.trim(),
                carg_Id: modelo.carg_Id.value,
                empl_EsAduana: this.user['esAduana'],
                usua_UsuarioCreacion: this.user['uuid'],
                empl_FechaCreacion: new Date()
            }
            const response = await this.axiosInstance.post('Insertar',datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    
    async editar(modelo) {
        try {
            let datos = {
                empl_Id: modelo.empl_Id,
                empl_Nombres: modelo.empl_Nombres.trim(),
                empl_Apellidos: modelo.empl_Apellidos.trim(),
                empl_DNI: modelo.empl_DNI,
                escv_Id: modelo.escv_Id.value,
                empl_NombreCompleto: modelo.empl_Nombres.trim(),
                empl_Sexo: modelo.empl_Sexo,
                empl_FechaNacimiento: modelo.empl_FechaNacimiento,
                empl_Telefono: modelo.empl_Telefono.trim(),
                empl_DireccionExacta: modelo.empl_DireccionExacta.trim(),
                pvin_Id: modelo.pvin_Id.value,
                pais_Id: modelo.pais_Id.value,
                empl_CorreoElectronico: modelo.empl_CorreoElectronico.trim(),
                carg_Id: modelo.carg_Id.value,
                empl_EsAduana: this.user['esAduana'],
                usua_UsuarioCreacion: this.user['uuid'],
                empl_FechaCreacion: new Date(),
                usua_UsuarioModificacion: this.user['uuid'],
                empl_FechaModificacion: new Date()
            }
            const response = await this.axiosInstance.post('Editar',datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
   
    async deshabilitar(data) {
        try {
            let datos = {
                empl_Id: data['empl_Id'],
                usua_UsuarioEliminacion: 1,
                empl_FechaEliminacion: new Date(),
            }
            const response = await this.axiosInstance.post('Eliminar',datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async habilitar (data) {
        try {
            let datos = {
                empl_Id: data['empl_Id'],
                usua_UsuarioModificacion: 1,
                empl_FechaModificacion: new Date(),
            }
            const response = await this.axiosInstance.post('Reactivar',datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}

const empleadosService = new EmpleadosService();
export default empleadosService;