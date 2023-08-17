import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class DocumentosContratosService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/DocumentosContratos/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }

  
}

const DocumentosContratosServices = new DocumentosContratosService();
export default DocumentosContratosServices;
