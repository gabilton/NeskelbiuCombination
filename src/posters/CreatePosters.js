import React, { Component, useEffect, useState } from 'react'
import { Link, withRouter, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { useTranslation } from "react-i18next";
import cities from './CityArray';
import computerStuffBCategory from "./computerStuffBCategory";
import genTechBCategory from './genTechBCategory';

const CreatePosters = () => {

    const [t, i18n] = useTranslation("global");
    
    const {auth} = useAuth();  
    const createURL="api/v1/poster/"+auth.userId+"/create"; //GALIMAI PERKELTI EDIT FUNKCIONALUMA I KITA FORMA

    const [posterName, setPosterName] = useState("");
    const [posterDescription, setPosterDescription] = useState("");
    const [price, setPrice] = useState('');
    const [categoryA, setCategoryA] = useState('');
    const [categoryB, setCategoryB] = useState("");
    const [status] = useState("ACTIVE");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [website, setWebsite] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [comment, setComment] = useState('');
    const [poster, setPoster] = useState({
      postName: ' ', 
      description: ' ',
      price: ' ',
      categoryA: ' ',
      categoryB: ' ',
      status: ' ',
      phoneNumber: ' ',
      city: ' ',
      website: ' ',
      videoLink: ' '
    })
    
    async function handleSubmit(event)  {
      event.preventDefault();
      const newPoster = {
        posterName: posterName, 
        description: posterDescription,
        price: price,
        categoryA: categoryA,
        categoryB: categoryB,
        status: status,
        phoneNumber: phoneNumber,
        city: city,
        website: website,
        videoLink: videoLink
      }
      console.log(newPoster);
      
      try {
        const response = await axios.post(createURL,{
          posterName: posterName, 
          description: posterDescription,
          price: price,
          categoryA: categoryA,
          categoryB: categoryB,
          status: status,
          phoneNumber: phoneNumber,
          city: city,
          website: website,
          videoLink: videoLink
          }
        );
        console.log(response.data)
      } catch(err) {
        console.log(err);
      }

    }




    //================= Setting all inputs and select windows
    const handleNameChange = (event) => {
      setPosterName(event.target.value);
      // postName, setPostName
    }
    const handleDescriptionChange = (e) => {
      setPosterDescription(e.target.value);
    }
    const handlePriceChange = (e) =>{
      setPrice(e.target.value);
    }
    
    // ======= event watch makes sure that once the primary category is selected, a selection for secondary will appear
    const handleSelectA = (event) => {
      setCategoryA(event.target.value) 
    }
    const handleSelectB = (event) => {
      setCategoryB(event.target.value)
    }
    const handlePhoneNumberChange = (e) => {
      setPhoneNumber(e.target.value);
    }
    const handleSelectCity = (e) => {
      setCity(e.target.value);
    }
    const handleWebsiteChange = (e) =>{
      setWebsite(e.target.value);
    }
    const handleVideoLinkChange = (e) => {
      setVideoLink(e.target.value);
    }
    const handleCommentChange = (e) => {
      setComment(e.target.value);
    }

  return (
    <div style={{color:'black'}}>
      <h2> {t("createPosterPage.addNewPoster")}</h2>
      <form onSubmit={handleSubmit}>
        <label >{t("createPosterPage.posterTitle")}</label>
        <input type="text" name="posterName" id="posterName" value={posterName} onChange={handleNameChange}/>

        <label >{t("createPosterPage.posterDescription")}</label>
        <input type="textbox" name="posterDescription" id="posterDescription"
            maxLength={100} value={posterDescription} onChange={handleDescriptionChange}/>

        <label >{t("createPosterPage.posterPrice")}</label>
        <input type="number" name="price" id="price" step="0.01"
             value={price} onChange={handlePriceChange}/>

        <label >{t("createPosterPage.categoryAName")}</label>
        <select id="categoryA" onChange={handleSelectA}>
          <option value=""> --- </option>
          <option value="kompiuterija"> {t("categoryA.computerStuff")} </option>
          <option value="Technika"> {t("categoryA.genericTechnologies")} </option>
        </select>
    {/* =====================================Kompiuterija is mazosios, technika is didziosios DELETE ME */}
    {/* According to what was selected for primary category, secondary category options are automatically loaded */}
        { categoryA === "kompiuterija" ? (
          <>
            <label >{t("createPosterPage.categoryBName")}</label>
            <select id="categoryB" onChange={handleSelectB}>
              { computerStuffBCategory.map( ( categoryB, index) => {
                return (
                  <>
                  <option value={computerStuffBCategory[categoryB]} key={index}> {t("computerCategoryB."+ index)} </option>
                  {/* {console.log(index)} */}
                  </>
                );
              })}
            </select>
          </>
        ) : ( categoryA !== "Technika" ? (<><p>{t("createPosterPage.defaultChoicePText")}</p></>) : (
          <>
            <label >{t("createPosterPage.categoryBName")}</label>
            <select id="categoryB" onChange={handleSelectB}>
              { genTechBCategory.map( ( categoryB, index) => {
                return (
                  <>
                  <option value={genTechBCategory[categoryB]} key={index}> {t("genTechCategoryB."+ index)} </option>
                  {/* {console.log(index)} */}
                  </>
                );
              })}
            </select>
          </>
        ))}

        <label>{t("createPosterPage.phoneNumber")}</label>
        <input type="text" name="phoneNumber" id="phoneNumber"
          maxLength={15} value={phoneNumber} onChange={handlePhoneNumberChange}/>

        <label >{t("createPosterPage.city")}</label>
        <select id="city" onChange={handleSelectCity}>
          { cities.map( ( city, index) => {
            return(
              <>
              <option value={city[index]} key={index}> {cities[index]} </option>
              {/* {console.log(index)} */}
              </>
            );
          })}
        </select>
        { city === "Kita" ? 
          <>
            <label>{t("createPosterPage.otherCity")}</label>
            <input type="text" name="comment" id="comment"
              maxLength={20} value={comment} onChange={handleCommentChange}/>
          </> : <></>}
{/* =========================================TODO prie interneto svetaines galima butu prideti patikrinima ar yra . ir po jo pora raidziu or smth */}
        <label>{t("createPosterPage.website")}</label>
        <input type="text" name="website" id="website"
          maxLength={20} value={website} onChange={handleWebsiteChange}/>
         
        <label>{t("createPosterPage.videoLink")}</label>
        <input type="text" name="videoLink" id="videoLinke"
          maxLength={20} value={videoLink} onChange={handleVideoLinkChange}/>
        <button> {t("createPosterPage.submitButton")} </button>
      </form>
    </div>
  )
}

export default CreatePosters;