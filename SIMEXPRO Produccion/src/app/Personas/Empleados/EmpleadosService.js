import axios from "axios";

// Headers //
const customHeaders = {
    XApiKey: "4b567cb1c6b24b51ab55248f8e66e5cc",
};

const apiService = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: customHeaders,
});

// Peticiones //
const apiRequests = {
    listarEmpleados: async () => {
        try {
            const response = await apiService.get("api/Empleados/Listar");
            return response.data.data;
        } catch (error) {
            throw error;
        }
    },

    deleteEmpleados: async (payload) => {
        try {
            const response = await apiService.post(
                "/api/Empleados/Eliminar",
                payload
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    provinciasPorPaisDDL: async (paisID) => {
        try {
            const payload = {
                pais_Id: paisID,
            };

            const response = await apiService.post(
                "api/Provincias/ProvinciasFiltradaPorPais",
                payload
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    insertEmpleados: async (payload) => {
        try {
            const response = await apiService.post("api/Empleados/Insertar", payload);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    editEmpleados: async (payload) => {
        try {
            const response = await apiService.post("api/Empleados/Editar", payload);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default apiRequests;
