import { useEffect, useState } from "react";
import axios from "axios";


function loadDDl(urlpeticion) {

    const [data, setData] = useState([])

    useEffect(() => {
        FetchData();
    }, []);

    const FetchData = async () => {
        try {
            const customHeaders = {
                'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
            };

            const url = `https://simexpro.azurewebsites.net/${urlpeticion}`;
            const response = await axios.get(url, {
                headers: customHeaders,
            });
            const rows = response.data.data.map(item => {
                return {
                    value: item.adua_Id,
                    label: `${item.adua_Id} - ${item.adua_Nombre}`,
                }
            });
            setData(rows);
        } catch (error) {
            console.log(error.message);
        }
    };

    return data

}

export default loadDDl