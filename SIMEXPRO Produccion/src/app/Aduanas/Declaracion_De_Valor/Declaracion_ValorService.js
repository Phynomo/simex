import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class Declaracion_ValorService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Declaracion_Valor/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }

  
}

const Declaracion_ValorServices = new Declaracion_ValorService();
export default Declaracion_ValorServices;
