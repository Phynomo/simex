import { useEffect, useState } from 'react';
import axios from 'axios';
import instance from "src/app/auth/services/jwtService/jwtService";

class AldeasService {

    constructor() {
        this.customHeaders = {
            XApiKey: instance.extraerToken(),
        };
        this.baseURL = process.env.REACT_APP_API_URL + "api/";
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
            headers: this.customHeaders,
        });
        this.user = JSON.parse(localStorage.getItem('user'))

    }

    // Peticiones //
    async listar() {
        try {
            const response = await this.axiosInstance.get("Aldea/Listar");
            const data = response.data.data.map((item, index) => {
                return {
                    key: index + 1,
                    alde_Id: item.alde_Id,
                    alde_Nombre: item.alde_Nombre,
                    ciud_Nombre: item.ciud_Nombre,
                    ciud_Id: item.ciud_Id,
                    pvin_Nombre: item.pvin_Nombre,
                    usuarioCreacionNombre: item.usuarioCreacionNombre,
                    usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                    alde_FechaCreacion: item.alde_FechaCreacion,
                    usuarioModificadorNombre: item.usuarioModificadorNombre,
                    usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                    alde_FechaModificacion: item.alde_FechaModificacion,
                    usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
                    alde_FechaEliminacion: item.alde_FechaEliminacion,
                    alde_Estado: item.alde_Estado
                };
            });
            return data;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async crear(data) {
        try {

            let datos = {
                alde_Nombre: data["alda_Nombre"].trim().replace(/\s+/g, ' ').ToUpperCase(),
                ciud_Id: data.ciudad["value"],
                usua_UsuarioCreacion: this.user['uuid'],
                alde_FechaCreacion: instance.formatFechaHora(new Date()),
            };
            const response = await this.axiosInstance.post("Aldea/Insertar", datos);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    async editar(data) {
        try {

            let datos = {
                alde_Id: data["id"],
                alde_Nombre: data["alda_Nombre"].trim().replace(/\s+/g, ' ').ToUpperCase(),
                ciud_Id: data.ciudad["value"],
                usua_UsuarioModificacion: this.user['uuid'],
                alde_FechaModificacion: instance.formatFechaHora(new Date()),
            };

            console.log(datos, "datooos");

            const response = await this.axiosInstance.post("Aldea/Editar", datos);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


    async ciudadDDL() {
        try {

            const response = await this.axiosInstance.get("Ciudades/Listar");
            const ciudadesByProvincia = {};
            response.data.data.forEach(ciudad => {
                const provinciaNombre = ciudad.pvin_Nombre;
                if (!ciudadesByProvincia[provinciaNombre]) {
                    ciudadesByProvincia[provinciaNombre] = [];
                }
                ciudadesByProvincia[provinciaNombre].push({
                    value: ciudad.ciud_Id,
                    label: ciudad.ciud_Nombre,
                    provincia: ciudad.pvin_Nombre
                });
            });

            const groupedOptions = Object.entries(ciudadesByProvincia).map(([provincia, ciudades]) => ({
                label: provincia,
                options: ciudades
            }));
            return groupedOptions;
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }
}
const aldeasService = new AldeasService();
export default aldeasService;
