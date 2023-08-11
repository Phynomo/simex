import axios from 'axios';

// Headers //
const customHeaders = {
    'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
};

const apiService = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: customHeaders,
});

// Peticiones //
const apiRequests = {

    listarAldeas: async () => {
        try {
            const response = await apiService.get('/api/Aldea/Listar');
            return response.data.data;
            console.log(response.data.data, "index");
        } catch (error) {
            throw error;
        }
    },
    insertarAldeas: async (payload) => {
        try {
            const response = await apiService.post('/api/Aldea/Insertar', payload);
            return response.data;
            console.log(response.data, "crear??");

        } catch (error) {
            throw error;
        }
    },
    editarAldeas: async (payload) => {
        try {
            const response = await apiService.post('/api/Aldea/Editar', payload);
            return response.data;
            console.log(response.data, "edita??");

        } catch (error) {
            throw error;
        }
    },

   

  

   

};

export default apiRequests;