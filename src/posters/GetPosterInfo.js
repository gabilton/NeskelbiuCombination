import React from 'react';
import AxiosFetch from '../hooks/AxiosFetch';
import { Link, useParams} from 'react-router-dom';


const GetPosterInfo = () => {
  
  const { id } = useParams();
  const posterInfoURL = `api/v1/poster/get/`+ id;
  
  const [poster, isPending, error ] = AxiosFetch(posterInfoURL);
  // console.log(posterInfoURL);
  console.log(posterInfoURL);
  
  return (
    <>
      <div style={{color:'black'}}> 
        
        { error && <p style={{color:'black'}} > { error.message } </p> }
        { isPending && <p style={{color:'black'}} >Kraunama...</p> }
         
        {poster && 
          <div key={poster.posterId}>
            <h1> {poster.postName} </h1>
            <p>Skelbimas sukurtas: {poster.createdAt.substring(0, 10)}</p>
            { poster.updatedAt && 
              <p>Skelbimas atnaujintas: {poster.updatedAt.substring(0,10)}</p>
            }
            {/* <img src={} alt="img is not available"/> TODO --------- ISSIAISKINTI KAIP UZKRAUTI PAV*/}
            <p>Aprasymas: </p>
            <p>{poster.description}</p>
          </div>
        }
        
            
      </div>
    </>
  )
}

export default GetPosterInfo;