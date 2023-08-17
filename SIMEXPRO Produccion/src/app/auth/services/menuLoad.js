import axios from "axios";
import instance from "src/app/auth/services/jwtService/jwtService";
import { appendNavigationItem } from "app/store/fuse/navigationSlice";

class MenuLoad {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL + "api/RolesPorPantallas/";
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });

  }
  async dibujar(data) {
    try {
      let seguridadMapeada = null;
      let ProduccionMapeada = null;
      let AduanaMapeada = null;
      let GeneralMapeada = null;
      const customHeaders = {
        XApiKey: instance.extraerToken(),
      };
      let datos = {
        role_Id: data["roleId"],
      };
      const response = await this.axiosInstance.put(
        "DibujarMenu",
        datos,
        {
          headers: customHeaders,
        }
      );
      console.log(response);
      if (response?.data?.data) {
        var PantallasSeguridad = response.data.data.filter(function (objeto) {
          return objeto.pant_Esquema === "Acce";
        });
        var PantallasProduccion = response.data.data.filter(function (objeto) {
          return objeto.pant_Esquema === "Prod";
        });
        var PantallasAduana = response.data.data.filter(function (objeto) {
          return objeto.pant_Esquema === "Adua";
        });
        var PantallasGeneral = response.data.data.filter(function (objeto) {
          return objeto.pant_Esquema === "Gral";
        });

        console.log(PantallasSeguridad);
        if (PantallasSeguridad.length > 0) {
          var pantallas = PantallasSeguridad.map((item, index) => {
            return {
              id: index,
              title: item.pant_Nombre,
              type: "item",
              icon: item.pant_Icono,
              url: item.pant_URL,
            };
          });

          seguridadMapeada = {
            id: "Acesso",
            title: "Acesso",
            type: "group",
            icon: "material-outline:content_cut",
            translate: "SEGURIDAD",
            children: [
              {
                id: "Seguridad",
                title: "Seguridad",
                type: "collapse",
                icon: "material-outline:content_cut",
                translate: "Acceso",
                children: pantallas,
              },
            ],
          };
        }

        if (PantallasProduccion.length > 0) {
          var pantallas = PantallasProduccion.map((item, index) => {
            return {
              id: index,
              title: item.pant_Nombre,
              type: "item",
              icon: item.pant_Icono,
              url: item.pant_URL,
            };
          });

          ProduccionMapeada = {
            id: "Produccion",
            title: "Produccion",
            type: "group",
            icon: "material-outline:content_cut",
            translate: "Produccion",
            children: [
              {
                id: "Produccion",
                title: "Produccion",
                type: "collapse",
                icon: "material-outline:store",
                translate: "Produccion",
                children: pantallas,
              },
            ],
          };
        }

        if (PantallasAduana.length > 0) {
          var pantallas = PantallasAduana.map((item, index) => {
            return {
              id: index,
              title: item.pant_Nombre,
              type: "item",
              icon: item.pant_Icono,
              url: item.pant_URL,
            };
          });

          AduanaMapeada = {
            id: "Aduanas",
            title: "Aduanas",
            type: "group",
            icon: "material-twotone:find_in_page",
            translate: "Aduanas",
            children: [
              {
                id: "Aduanas",
                title: "Aduanas",
                type: "collapse",
                icon: "material-twotone:find_in_page",
                translate: "Aduanas",
                children: pantallas,
              },
            ],
          };
        }

        if (PantallasGeneral.length > 0) {
          var pantallas = PantallasGeneral.map((item, index) => {
            return {
              id: index,
              title: item.pant_Nombre,
              type: "item",
              icon: item.pant_Icono,
              url: item.pant_URL,
            };
          });

          GeneralMapeada = {
            id: "Generales",
            title: "Generales",
            type: "group",
            icon: "heroicons-outline:bookmark-alt",
            translate: "Generales",
            children: [
              {
                id: "Generales",
                title: "Generales",
                type: "collapse",
                icon: "heroicons-outline:bookmark-alt",
                translate: "Generales",
                children: pantallas,
              },
            ],
          };
        }
      }

      return [
        seguridadMapeada,
        GeneralMapeada,
        ProduccionMapeada,
        AduanaMapeada,
      ];
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}

const menuLoad = new MenuLoad();
export default menuLoad;
