import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";

class ArancelesService {
    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/Aranceles/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))
    }

  
}

const ArancelesServices = new ArancelesService();
export default ArancelesServices;
