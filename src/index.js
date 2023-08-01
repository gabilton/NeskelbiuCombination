import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider';
import global_lt from './language/lithuanian/global.json';
import global_en from './language/english/global.json';
import i18next from 'i18next';
import { I18nContext, I18nextProvider } from "react-i18next";


i18next.init({
  interpolation: {escapeValue: true},
  lng: "en",
  resources:{
      en: {
          global: global_en
      },
      lt: {
          global: global_lt
      },
  },
});




const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <I18nextProvider i18n={i18next}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
