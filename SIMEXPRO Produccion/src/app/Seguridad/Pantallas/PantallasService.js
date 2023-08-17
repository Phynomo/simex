import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import user from 'src/app/auth/services/jwtService/dataUser';

class PantallasService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Pantallas/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }

    
    async ListadoPantallas() {
        try {

            const response = await this.axiosInstance.get("Listar?pant_EsAduana=" + user()["esAduana"].toString());
            console.log(user()["esAduana"])
            const data = response.data.data.map((item, index) => {
                return {
                    key: index,
                    pant_Id: item.pant_Id,
                    pant_Nombre: item.pant_Nombre,
                }
            });
            return data;
        } catch (error) {
            console.log(error);

        }
    };


    async ListadoPantallasLeft(right) {
        try {
            console.log(right)
            const response = await this.axiosInstance.get("Listar?pant_EsAduana=" + user()["esAduana"].toString());
            const seleccionadas = [];
            const data = response.data.data.map((item, index) => {

                right.forEach(function (pantalla) {
                    if (item.pant_Id === pantalla.pant_Id) {
                        seleccionadas[index] = {
                            key: pantalla.key,
                            pant_Id: pantalla.pant_Id,
                            pant_Nombre: pantalla.pant_Nombre
                        }
                    }

                });

                return {
                    key: index,
                    pant_Id: item.pant_Id,
                    pant_Nombre: item.pant_Nombre,
                }
            });

            const resultado = data.filter(objeto2 => {
                return !seleccionadas.some(objeto1 => objeto1.pant_Id === objeto2.pant_Id);
            });
            
            return resultado;

        } catch (error) {
            console.log(error);

        }
    };

    async ListadoPantallasRight(right) {
        try {
            console.log(right)
            const response = await this.axiosInstance.get("Listar?pant_EsAduana=" + user()["esAduana"].toString());
            const seleccionadas = [];
            const data = response.data.data.map((item, index) => {

                right.forEach(function (pantalla) {
                    if (item.pant_Id === pantalla.pant_Id) {
                        seleccionadas[index] = {
                            key: pantalla.key,
                            pant_Id: pantalla.pant_Id,
                            pant_Nombre: pantalla.pant_Nombre
                        }
                    }

                });

                return {
                    key: index,
                    pant_Id: item.pant_Id, 
                    pant_Nombre: item.pant_Nombre,
                }
            });
            return seleccionadas;

        } catch (error) {
            console.log(error);

        }
    };



}

const PantallasServices = new PantallasService();
export default PantallasServices;
