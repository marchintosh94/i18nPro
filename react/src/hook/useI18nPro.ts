import { useState } from "react";
import { i18nPro } from "@marchintosh94/i18n-pro";
import { ChangeLanguage } from "@marchintosh94/i18n-pro";

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

  const t: typeof i18nPro.t = (value: string, ...args) => {
    return i18nPro.t(value, ...args)
  }

  return {
    locale,
    t,
    switchLanguage
  }
}
