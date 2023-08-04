import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useState, useEffect } from "react";
const useAxiosDelete = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect( () => {
        async function dataDelete(){
            try{
                const response = await useAxiosPrivate.delete(url)
                    .then( response => {
                        console.log("Your post was deleted")
                    })
                setData(response.data);
                console.log(response);
                setIsPending(false);
            } catch (error){
                error.message = "Connection to the server failed";
                setError(error);
                setIsPending(false);
            }
        }
        dataDelete();
    },[url]);
    console.log("stuff from AxiosFetch.js" + data, isPending, error);
    return [ data, isPending, error ];
}
 
export default useAxiosDelete;

