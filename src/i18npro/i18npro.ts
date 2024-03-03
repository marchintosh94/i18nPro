import { ChangeLanguage } from "../types/i18npro.types";
import { DynamicData, I18Message, I18Dictionary } from "../types";
import { http, objectKeysToLower } from "../utils";

export class _i18nPro {
  private storedLocales: string[] = [];
  private isLoadingLanguage: boolean = false;
  private messages: I18Dictionary = {};
  
  public locale!: string;
  public defaultLocale = "";

  constructor() {}

  private getPluralFromArgs(args: any[]): 1 | 2 | 3 | undefined {
    return typeof args[0] === "number" && args[0] > 0 && args[0] < 4? (args[0] as 1 | 2 | 3) : undefined;
  }
  private getDynamicDataFromArgs(args: any[]): DynamicData | undefined {
    const resArg0 = typeof args[0] === "object" ? args[0] : undefined
    const resArg1 = typeof args[1] === "object" ? args[1] : undefined
    return resArg0 || resArg1
  }

  private setLocaleMessages(locale: string, messages: I18Message) {
    this.messages = { ...this.messages, [locale]: objectKeysToLower(messages) };
  };

  private setIsLoadingLanguage(val: boolean){
    this.isLoadingLanguage = val
  }

  /**
   * This method checks the consistency of translation dictionary of selected locale
   * If it returns a NON empty string, it means that there is an error
   * @param {I18Message} message
   * @returns {string} error message
   */
  private checkMessageObjectFormat(message: I18Message): string {
    const messageKeys = Object.keys(message);
    if (messageKeys.length === 0) {
      return "No keys found. Please check the JSON and return at least 1 translation";
    }
    //TODO: improve this validation by extending objectKeysToLower() to accept a callback (val: string | number) => string
    // where val is the value of each key in the dictionary. The function will contains the validation below
    if (Array.isArray(message) || Object.entries(message).find(([_, val]) => typeof val !== 'string' && typeof val !== 'number')) {
      return "Invalid format for dictionary. It must be like a Record<string, string>";
    }
    return "";
  }

  private getRemoteMessages(apiUrl: string): Promise<I18Message> {
    this.setIsLoadingLanguage(true);
    // load locale messages with dynamic import
    return http<I18Message>({
      method: "GET",
      url: `${apiUrl}`,
    })
      .then((response) => {
        this.setIsLoadingLanguage(false);
        return response;
      })
      .catch((error) => {
        this.setIsLoadingLanguage(false);
        return Promise.reject(error);
      });
  }

  private checkParseDictionary(data: string | Record<string, string | number>){
    try {
      const dictionary = typeof data === "string"
        ? (JSON.parse(data) as Record<string, string | number>)
        : data;
      return Promise.resolve(dictionary)
    } catch(err){
      return Promise.reject(err)
    }
  }

  public setLocale(locale: string) {
    this.storedLocales = [...new Set([...this.storedLocales, locale])];
    this.locale = locale;
  };

  public isLocaleAvailable(locale: string): boolean {
    return this.storedLocales.includes(locale)
  }

  public loadMessages(
    locale: string,
    apiUrl: string
  ): Promise<string | undefined> {
    return new Promise<string | undefined>((resolve, reject) => {    
      if (this.isLoadingLanguage) {
        return resolve(undefined);
      }
      if (this.locale === locale) {
        resolve(this.locale);
      }
      const alreadyLoaded = this.storedLocales.includes(locale);
      if (alreadyLoaded) {
        this.setLocale(locale);
        return resolve(locale);
      } else {
        return this.getRemoteMessages(apiUrl).then((messages) => {
          const error = this.checkMessageObjectFormat(messages);
          if (error) {
            return reject(error);
          }
          this.setLocaleMessages(locale, messages);
          this.setLocale(locale);
          return resolve(locale);
        }).catch(reject)
      }
    });
  }

  public loadLocalMessages(
    locale: string,
    messages: string | Record<string, string | number>
  ): Promise<string> {
    return this.checkParseDictionary(messages).then(res => {
      let dictionary: Record<string, string | number> = res
      const error = this.checkMessageObjectFormat(dictionary);
      if (error) {
        return Promise.reject(error);
      }
      this.setLocale(locale);
      this.setLocaleMessages(locale, dictionary);
      return Promise.resolve(locale);
    })
  }

  public changeLanguage: ChangeLanguage = (...args): Promise<string | undefined> => {
    const newLocale = args[0] 
    if (!newLocale) {
        const errMsg = "Provide a locale";
        console.error(errMsg);
        return Promise.reject({message: errMsg, data: newLocale})
    }
    return this.checkParseDictionary(args[1]).then(res => {
      return this.loadLocalMessages(newLocale, res)
    }).catch(() => {
      const apiUrl = typeof args[1] === 'string'? args[1] : undefined
      if(apiUrl){
        return this.loadMessages(newLocale, apiUrl)
      } else {
        return Promise.reject({message: 'Arguments provided are not valid', data: {newLocale, args: args[1]}})
      }
    })
    
  }

  public t(value: string, ...args: any[]): string {
    const flatArgs = args.flat();
    const plural = this.getPluralFromArgs(flatArgs);
    const dynamicData = this.getDynamicDataFromArgs(flatArgs);

    const locale = this.locale || this.defaultLocale;
    const translationKey =
      this.messages[locale] && this.messages[locale]![value.toLocaleLowerCase()]
        ? value.toLocaleLowerCase()
        : undefined;

    let translation = translationKey
      ? `${this.messages[locale]![translationKey]}`
      : value;

    if (translationKey && plural) {
      translation = translation.split("|")[plural - 1] || value;
    }
    if (dynamicData) {
      for (const key in dynamicData) {
        translation = translation.replace(`{${key}}`, dynamicData[key] || key);
      }
    }

    return translation.trim();
  }
}
const i18nPro = new _i18nPro();
export default i18nPro;
