import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from 'src/app/auth/services/jwtService/dataUser';

class ModelosMaquinaService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/ModelosMaquinas/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))

    }


    async ListarModelosMaquina() {
        try {
            const response = await this.axiosInstance.get("Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    mmaq_Id: item.mmaq_Id,
                    mmaq_Nombre: item.mmaq_Nombre,
                    marcaMaquina: item.marcaMaquina,
                    marq_Id: item.marq_Id,
                    funcionMaquina: item.funcionMaquina,
                    func_Id: item.func_Id,
                    mmaq_Imagen: item.mmaq_Imagen,

                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    mmaq_FechaCreacion: item.mmaq_FechaCreacion,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,

                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    mmaq_FechaModificacion: item.mmaq_FechaModificacion,
                    usuarioModificacionNombre: item.usuarioModificacionNombre,

                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    mmaq_FechaEliminacion: item.mmaq_FechaEliminacion,

                    mmaq_Estado: item.esbo_Estado
                };
            });
            return data;
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    };



    async CrearModeloMaquina(data, image) {
        const ImagenDefault = 'https://i.ibb.co/rwp91Z1/maq.webp';
        let ImageCrear = '';
        if (image != ImagenDefault) {
            let ImageUpload = await this.SubirImagen(image);
            ImageCrear = (ImageUpload.data.url).toString();
        } else {
            ImageCrear = image;
        }

        try {
            let datos = {
                mmaq_Nombre: data.mmaq_Nombre.trim().replace(/\s+/g, ' '),
                marq_Id: data.marq_Id["value"],
                func_Id: data.func_Id["value"],
                mmaq_Imagen: ImageCrear,
                usua_UsuarioCreacion: user()['uuid'],
                mmaq_FechaCreacion: instance.formatFechaHora(new Date()),
            }
            const response = await this.axiosInstance.post('Insertar', datos);
            console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    };


    async EditarModeloMaquina(data,Id,Image) {

        let ModelosLista = await ModelosMaquinaServices.ListarModelosMaquina();
        let RegistroModelo = await ModelosLista.find((lista) => lista.mmaq_Id === Id)
        let ImageEdit = '';
        if(RegistroModelo.mmaq_Imagen === Image) { ImageEdit = Image;}
        else{let ImageUpload = await this.SubirImagen(Image);
            ImageEdit = (ImageUpload.data.url).toString();}

       
                
        try {
            let datos = {
                mmaq_Id: Id,
                mmaq_Nombre: data.mmaq_NombreEditar.trim().replace(/\s+/g, ' '),
                marq_Id: data.marq_IdEditar["value"],
                func_Id: data.func_IdEditar["value"],
                mmaq_Imagen: ImageEdit,
                usua_UsuarioModificacion: user()['uuid'],
                mmaq_FechaModificacion:  instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Editar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    async EliminarModeloMaquina(data) {
        try {
            let datos = {
                mmaq_Id: data["mmaq_Id"],
                usua_UsuarioEliminacion: this.user['uuid'],
                mmaq_FechaEliminacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Eliminar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
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

const ModelosMaquinaServices = new ModelosMaquinaService();
export default ModelosMaquinaServices;
