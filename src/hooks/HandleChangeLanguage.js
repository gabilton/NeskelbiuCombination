import { useTranslation } from "react-i18next";
import React from 'react';

const HandleChangeLanguage = () => {

    const [t, i18n] = useTranslation("global");

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };
    
 
   return (
    <>
        <button className="loginbutton" onClick = {() => handleChangeLanguage("en")}>EN</button>
        <button className="loginbutton" onClick = {() => handleChangeLanguage("lt")}>LT</button>
    </>
  )
}

export default HandleChangeLanguage;