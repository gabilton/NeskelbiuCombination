import { Link } from 'react-router-dom';
import AxiosFetch from '../hooks/AxiosFetch';

const posterListURL = "api/v1/poster/get/all";

const GetPosterList = () => {
    
    const [posts, isPending, error ] = AxiosFetch(posterListURL);


  return (
    <div style={{color:'black'}}>
        {console.log(posts)}
        <h1 >VISI SKELBIMAI</h1>
        { error && <p style={{color:'black'}} > { error.message } </p> }
        { isPending && <p style={{color:'black'}} >Loading...</p> }
        { posts && posts.map((post) => (
            <div style={{color:'black'}} className='allPostersList' key={post.posterId}>  
                <Link to={'api/v1/poster/get/'+post.posterId}>
                    <h2>{post.postName}</h2>
                    <p>Ikele: {post.username}</p>
                    <p> Kaina: {post.price} </p>
                    <img src={post.images[0]} alt="Img not available"/>
                    { 
                      post.updatedAt ? 
                      <p> atnaujintas: {post.updatedAt.substring(0,10)} </p> 
                      : <p> sukurtas: {post.createdAt.substring(0,10)}</p> 
                    }
                </Link>
            </div>
        ))
         }
    
    </div>
  )
}

export default GetPosterList