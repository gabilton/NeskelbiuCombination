import React from 'react';
import { AxiosFetch } from '../hooks/AxiosFetch';
import { Link } from 'react-router-dom';


const GetPosterInfo = () => {

  const posterInfoURL = "api/v1/poster/get/${id}";

  return (
    <div>GetPosterInfo</div>
  )
}

export default GetPosterInfo;