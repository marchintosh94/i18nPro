import { useState } from "react";
import { i18nPro } from "@marchintosh94/i18n-pro";
import { ChangeLanguage } from "@marchintosh94/i18n-pro/dist/types/i18npro.types";

export const useI18nPro = () => {
  const [locale, setLocale] = useState<string>(i18nPro.defaultLocale);

  const updateLocaleState = (newLocale: string | undefined): string => {
    if (newLocale){
      setLocale(newLocale)
    }
    return newLocale || ''
  }

  const switchLanguage: ChangeLanguage = (...args) => {
    return i18nPro.changeLanguage(...args).then(updateLocaleState)
  }

  return {
    locale,
    t: i18nPro.t,
    switchLanguage
  }
}
