import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class TransporteService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Transporte/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }

  
}

const TransporteServices = new TransporteService();
export default TransporteServices;
