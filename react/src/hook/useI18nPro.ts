import { useState } from "react";
import { i18nPro } from "i18n-pro";

interface ChangeLanguage {
  (
    locale: string,
    messages: string | Record<string, string | number>
  ): Promise<string>;
  (
    locale: string,
    apiUrl: string
  ): Promise<string>;
}


export const useI18nPro = () => {
  const [locale, setLocale] = useState<string>(i18nPro.defaultLocale);

  const updateLocaleState = (newLocale: string | undefined): string => {
    if (newLocale){
      setLocale(newLocale)
    }
    return newLocale || ''
  }

  const changeLanguage: ChangeLanguage = (...args): Promise<string> => {
    const newLocale = args[0] 
    if (!newLocale) {
        const errMsg = "Provide a locale";
        console.error(errMsg);
        return Promise.reject({message: errMsg, data: newLocale})
    }
    const messages = typeof args[1] === 'object' || typeof JSON.parse(args[1]) === 'object' ? args[1] : undefined
    const apiUrl = typeof args[1] === 'string'? args[1] : undefined
    if (messages){
      return i18nPro.loadLocalMessages(newLocale, messages).then(updateLocaleState)
    }
    if(apiUrl){
      return i18nPro.loadMessages(newLocale, apiUrl).then(updateLocaleState)
    }
    return Promise.reject({message: 'Argouments provided are not valid', data: {newLocale, args: args[1]}})
  }

  return {
    locale,
    t: i18nPro.t,
    changeLanguage
  }
}
