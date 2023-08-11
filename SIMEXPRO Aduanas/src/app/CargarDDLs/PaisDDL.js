import { useEffect, useState } from "react";
import axios from "axios";


function PaisDDl() {

    const [data, setData] = useState([])

    useEffect(() => {
        FetchData();
    }, []);

    const FetchData = async () => {
        try {
            const customHeaders = {
                'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
            };

            const url = `${process.env.REACT_APP_API_URL}api/paises/Listar`;
            const response = await axios.get(url, {
                headers: customHeaders,
            });
            console.log("cagando",response)
            const rows = response.data.map(item => {
                return {
                    value: item.pais_Id,
                    label: `${item.pais_Codigo} - ${item.pais_Nombre}`,
                }
            });
            setData(rows);
        } catch (error) {
            console.log(error.message);
        }
    };

    return data

}

export default PaisDDl