import global_lt from './lithuanian/global.json';
import global_en from './english/global.json';
import i18next from 'i18next';

import React from 'react'

const languageSet = () => {
  return (
    <div>languageSet</div>
  )
}

export default languageSet

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


