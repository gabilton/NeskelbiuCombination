import React, {useState} from 'react';
import AxiosFetch from '../hooks/AxiosFetch';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const GetPosterInfo = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const { id } = useParams();
  const posterInfoURL = `api/v1/poster/get/`+ id;
  const posterDeleteURL = `api/v1/poster/` + auth?.userId + `/delete/`+ id
  

  const [poster, isPending, error ] = AxiosFetch(posterInfoURL);
  // console.log(posterInfoURL);

  const privateAxios = useAxiosPrivate();
  
  const deletePost = () => {
    const controller = new AbortController();

    const deleteThing = async () => {
      console.log(posterDeleteURL)
      try{
        await privateAxios.delete(
          posterDeleteURL,
          {
            signal: controller.signal
          }
        );

        // console.log(response);

        navigate("/", {
          state: {from: location},
          replace: true
        })
      } catch (err) {
        console.log(err);
      }
    }
    deleteThing();
  }
  
    
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
            <p>{poster.username}</p>
            
            
            { auth.userId === poster.userId && <>
            <button onClick={deletePost}>istrinti</button>
            <button>Redaguoti</button>
            </>}
            
          </div>
        }
        
            
      </div>
    </>
  )
}

export default GetPosterInfo;