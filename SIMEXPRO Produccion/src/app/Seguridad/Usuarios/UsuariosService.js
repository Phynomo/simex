import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";
import user from 'src/app/auth/services/jwtService/dataUser';

class UsuariosService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + 'api/Usuarios/';
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
    }

    async listar() {
        try {
            const response = await this.axiosInstance.get("Listar?empl_EsAduana=" + user()["esAduana"].toString());
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    usua_Id: item.usua_Id,
                    usua_Nombre: item.usua_Nombre,
                    usua_Contrasenia: item.usua_Contrasenia,
                    empleadoNombreCompleto: item.empleadoNombreCompleto,
                    role_Descripcion: item.role_Descripcion ? item.role_Descripcion : "No tiene rol",
                    empl_Id: item.empl_Id,
                    usua_Image: item.usua_Image,
                    role_Id: item.role_Id,
                    usua_EsAdmin: item.usua_EsAdmin,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usua_FechaCreacion: item.usua_FechaCreacion,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,
                    usua_FechaModificacion: item.usua_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    usuarioEliminacionNombre: item.usuarioEliminacionNombre,
                    usua_FechaEliminacion: item.usua_FechaEliminacion,
                    usua_Estado: item.usua_Estado,
                };
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async crear(data, image, Administrador) {
        const ImagenDefault = 'https://i.ibb.co/tLVHzJs/imagen-usuario.png';
        let ImageCrear = '';
        if (image != ImagenDefault) {
            let ImageUpload = await this.SubirImagen(image);
            ImageCrear = (ImageUpload.data.url).toString();
        } else {
            ImageCrear = image;
        }

        let UsuarioRol
        if (data.UsuarioRol === null)
            UsuarioRol = 0
        else
            UsuarioRol = data.UsuarioRol["value"]

        try {
            let datos = {
                usua_Nombre: data.NombreUsuario.trim().replace(/\s+/g, ' '),
                usua_Contrasenia: data.ContraUsuario,
                empl_Id: data.Empleado["value"],
                role_Id: UsuarioRol,
                usua_EsAdmin: Administrador,
                usua_Image: ImageCrear,
                usua_UsuarioCreacion: user()['uuid'],
                usua_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Insertar', datos);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async editar(data, Id, Image, Administrador) {
        let ListaUsuarios = await usuarioservice.listar();
        let RegistroUsuario = await ListaUsuarios.find((lista) => lista.usua_Id === Id)
        let ImageEdit = '';
        if (RegistroUsuario.usua_Image === Image) { ImageEdit = Image; }
        else {
            let ImageUpload = await this.SubirImagen(Image);
            ImageEdit = (ImageUpload.data.url).toString();
        }

        let UsuarioRol
        if (data.UsuarioRolEditar === null || data.UsuarioRolEditar === undefined)
            UsuarioRol = 0
        else
            UsuarioRol = data.UsuarioRolEditar["value"]



        try {

            let datos = {
                usua_Id: Id,
                usua_Nombre: data.NombreUsuarioEditar.trim().replace(/\s+/g, ' '),
                empl_Id: data.EmpleadoEditar["value"],
                role_Id: UsuarioRol,
                usua_EsAdmin: Administrador,
                usua_Image: ImageEdit,
                usua_UsuarioModificacion: user()['uuid'],
                usua_FechaModificacion: instance.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Editar', datos);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async eliminar(data) {
        if (data['NombreUsuario'] === user()['uuid']) {
            return 3;
        } else {
            try {
                let datos = {
                    usua_Id: data['NombreUsuario'],
                    usua_UsuarioEliminacion: user()['uuid'],
                    usua_FechaEliminacion: instance.formatFechaHora(new Date())
                }
                const response = await this.axiosInstance.post('Eliminar', datos);
                return response;
            } catch (error) {
                throw error;
            }
        }
    }

    async activar(data) {
        try {
            let datos = {
                usua_Id: data['NombreUsuario'],
            }
            const response = await this.axiosInstance.post('Activar', datos);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async SubirImagen(imageUrl) {
        //Token de la API para subir imagenes
        const apikey = "7e4e4920016a49b1dfc06d5af4e9ffc3";

        const base64Image = imageUrl.split(',')[1]; // obtener la cadena Base64 sin el prefijo "data:image/png;base64,"
        const url = `https://api.imgbb.com/1/upload?key=${apikey}`;
        const body = new FormData();
        body.append('image', base64Image);

        try {
            let response = await fetch(url, {
                method: 'POST',
                body: body
            });

            if (!response.ok) {
                throw new Error('Error al enviar la imagen');
            }
            return (await response.json());
        } catch (error) {
            throw error;
        }
    }
}

const usuarioservice = new UsuariosService();
export default usuarioservice;