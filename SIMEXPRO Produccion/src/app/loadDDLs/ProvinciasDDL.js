import { useEffect, useState } from 'react';
import axios from 'axios';

function fetchProvinciasData() {
  const customHeaders = {
    'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
  };

  const url = `${process.env.REACT_APP_API_URL}api/Ciudades/Listar`;
  return axios.get(url, {
    headers: customHeaders,
  });
}

export function useProvinciasDDL() {
  const [provinciasOptions, setProvinciasOptions] = useState([]);

  useEffect(() => {
    fetchProvinciasData()
      .then(response => {
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

        setProvinciasOptions(groupedOptions);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return provinciasOptions;
}