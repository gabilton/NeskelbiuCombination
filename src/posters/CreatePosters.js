import React, { Component, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useTranslation } from "react-i18next"
import { computerAEnum as catA,
  categoryTranslationKeys as langFileStrings,
  allArrays,
  cities
} from './AllEnumArrays';
import GetPosterInfo from './GetPosterInfo';

const PRICE_REGEX = /^[0-9]+$/;
const CATEGORY_CITY_REGEX = /^[a-zA-Z]+$/;
const PHONE_REGEX = /^[+]?\d+$/;
const WEBSITE_REGEX = /\.[a-zA-Z]{2,}/; //NOT SURE IF WORTH IT

const CreatePosters = () => {
    const privateAxios = useAxiosPrivate();
    const [t, i18n] = useTranslation("global");
    
    
    const [catBArray, setCatBArray] = useState([]);
    const [tempLangString, setTempLangString] = useState("");

    const {auth} = useAuth();  
    const createURL="api/v1/poster/"+auth.userId+"/create"; //GALIMAI PERKELTI EDIT FUNKCIONALUMA I KITA FORMA

    const [success, setSuccess] = useState(false);
    const [requestError, setRequestError] = useState("");
    const [postName, setPostName] = useState("");
    const [posterDescription, setPosterDescription] = useState("");
    const [priceFront, setPriceFront] = useState('');
    const [price, setPrice] = useState('');
    const [categoryA, setCategoryA] = useState('');
    const [categoryB, setCategoryB] = useState("");
    const [status] = useState("ACTIVE");

    
    const [phoneNumber, setPhoneNumber] = useState(" ");
    const [validPhoneNumber, serValidPhoneNumber] = useState(false);

    const [city, setCity] = useState('');
    const [website, setWebsite] = useState('');
    const [videoLink, setVideoLink] = useState('');
    // const [poster, setPoster] = useState({
    //   postName: ' ', 
    //   description: ' ',
    //   price: ' ',
    //   categoryA: ' ',
    //   categoryB: ' ',
    //   status: ' ',
    //   phoneNumber: ' ',
    //   city: ' ',
    //   website: ' ',
    //   videoLink: ' '
    // })
    
    async function handleSubmit(event)  {
      event.preventDefault();
      const newPoster = { //created poster to be able to inspect whether all parameters are getting through
        postName: postName, 
        description: posterDescription,
        price: +price,
        categoryA: categoryA,
        categoryB: categoryB,
        status: status,
        phoneNumber: phoneNumber,
        city: city,
        website: website,
        videoLink: videoLink
      }
      console.log(newPoster);
      console.log(createURL)
      
      try {
        const response = await privateAxios.post(createURL,{
          postName: postName, 
          description: posterDescription,
          price: +price, //konvertuoja i skaiciu
          categoryA: categoryA,
          categoryB: categoryB,
          status: status,
          phoneNumber: phoneNumber,
          city: city,
          website: website,
          videoLink: videoLink
        }
        );
        console.log(response.data);
        setSuccess(true);
      } catch(err) {
        setRequestError(err.message);
        console.log(requestError);
      }
    }

    //================= Setting all inputs and select windows
    const handleNameChange = (event) => {
      setPostName(event.target.value);
      // postName, setPostName
    }
    const handleDescriptionChange = (e) => {
      setPosterDescription(e.target.value);
    }
    const handlePriceChange = (e) =>{
      let tempPrice = e.target.value*100
      setPrice(tempPrice);//Kaina saugoma centais, nes backend yra Long
      setPriceFront(e.target.value);
    }
    
    // ======= event watch makes sure that once the primary category is selected, a selection for secondary will appear
    const handleSelectA = (event) => {
      let selectKey = catA.indexOf(event.target.value);
      setTempLangString(langFileStrings[selectKey]);
      setCatBArray(allArrays[selectKey]);

      setCategoryA(event.target.value);
      console.log(event.target.value) 
    }
    const handleSelectB = (event) => { //testing using temmporary variable because setCategoryB works slower thus console shows previous meaning of it
      const i = event.target.value
      setCategoryB(event.target.value);
      console.log(i);
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
   
  return (
    <>{ success? (<>
      <div style={{color:'black'}}> 
        <h1>Skelbimas sukurtas sėkmingai!</h1>
        <Link to="/">grįžti namo</Link>
        <Link to="/">grįžti namo</Link>
        
        

      </div>
    </>) : (
    <div style={{color:'black'}}>
      <h2> {t("createPosterPage.addNewPoster")}</h2>
      <form onSubmit={handleSubmit}>
        <label >{t("createPosterPage.posterTitle")}</label>
        <input type="text" name="posterName" id="posterName" value={postName} onChange={handleNameChange}/>

        <label >{t("createPosterPage.posterDescription")}</label>
        <input type="textbox" name="posterDescription" id="posterDescription"
            maxLength={100} value={posterDescription} onChange={handleDescriptionChange}/>

        <label >{t("createPosterPage.posterPrice")}</label>
        <input type="number" name="price" id="price" step="0.01" min="0"
             value={priceFront} onChange={handlePriceChange}/>
{/* ==========================================================SELECT FORM AUTOMATION BEGINING=================================== */}
        <label >{t("createPosterPage.categoryAName")}</label>
        <select id="categoryA" onChange={handleSelectA}>
          { catA.map((category, index) => {
            return(
              <option value={category} key={index}> {t("computerCategoryA."+ index)} </option>
            );
          })}
        </select>
    {/* =====================================Kompiuterija is mazosios, technika is didziosios DELETE ME */}
    {/* According to what was selected for primary category, secondary category options are automatically loaded */}
        { !tempLangString ? <p>{t("createPosterPage.defaultChoicePText")}</p>:
          <>
          <label >{t("createPosterPage.categoryBName")}</label>
          <select id="categoryB" onChange={handleSelectB}>
            { catBArray.map( ( categoryB, index) => {
              return (              
                <option value={categoryB} key={index}>  {t( tempLangString+"."+ index)} </option>                 
              );
            })}
          </select>
          </>
        }   

        <label>{t("createPosterPage.phoneNumber")}</label>
        <input type="text" name="phoneNumber" id="phoneNumber" 
          maxLength={15} value={ phoneNumber } onChange={handlePhoneNumberChange}/>

        <label >{t("createPosterPage.city")}</label>
        <select id="city" onChange={handleSelectCity}>
          { cities.map( ( city, index) => {
            return(
              <option value={city} key={index}> {city} </option>
            );
          })}
        </select>
  
{/* ==============TODO prie interneto svetaines galima butu prideti patikrinima ar yra . ir po jo pora raidziu or smth */}
        <label>{t("createPosterPage.website")}</label>
        <input type="text" name="website" id="website"
          maxLength={20} value={website} onChange={handleWebsiteChange}/>
         
        <label>{t("createPosterPage.videoLink")}</label>
        <input type="text" name="videoLink" id="videoLinke"
          maxLength={20} value={videoLink} onChange={handleVideoLinkChange}/>
        <button> {t("createPosterPage.submitButton")} </button>
      </form>
    </div>)}
    </>
  )
}

export default CreatePosters;