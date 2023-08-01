import axios from 'axios';
import { useEffect, useState } from 'react';

const AxiosFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect( () => {
        async function pavadinimas(){
            try{
                const response = await axios.get(url);
                setData(response.data);
                console.log(response.data);
                setIsPending(false);
            } catch (error){
                error.message = "Connection to the server failed";
                setError(error);
                setIsPending(false);
            }
        }
        pavadinimas();
    },[url]);
    console.log(data, isPending, error);
    return [ data, isPending, error ];
}
 
export default AxiosFetch;

