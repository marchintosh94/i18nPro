import { DynamicData, I18Message, I18Dictionary } from "../types";
import { http, objectKeysToLower } from "../utils";

class _i18nPro {
  private storedLocales: string[] = [];
  private isLoadingLanguage: boolean = false;
  private locale!: string;
  private messages: I18Dictionary = {};

  public defaultLocale = "";

  constructor() {}

  private getPluralFromArgs(args: any[]): 1 | 2 | 3 | undefined {
    return typeof args[0] === "number" ? (args[0] as 1 | 2 | 3) : undefined;
  }
  private getDynamicDataFromArgs(args: any[]): DynamicData {
    return (typeof args[0] === "object" ? args[0] : args[1]) as DynamicData;
  }

  private setLocale(locale: string) {
    this.storedLocales = [...new Set([...this.storedLocales, locale])];
    this.locale = locale;
  };

  private setLocaleMessages(locale: string, messages: I18Message) {
    this.messages = { ...this.messages, [locale]: objectKeysToLower(messages) };
  };

  /**
   * This method checks the consistency of translation dictionary of selected locale
   * If it returns a NON empty string, it means that there is an error
   * @param {I18Message} message
   * @returns {string} error message
   */
  private checkMessageObjectFormat(message: I18Message): string {
    const messageKeys = Object.keys(message);
    if (messageKeys.length === 1) {
      return "Multiple keys found at locale level. Please check the JSON and return only 1 key at index 0 of the JSON";
    }
    if (Array.isArray(message[0])) {
      return "Invalid format for dictionary. It must be like a Record<string, string>";
    }
    return "";
  }

  private getRemoteMessages(apiUrl: string): Promise<I18Message> {
    this.isLoadingLanguage = true;
    // load locale messages with dynamic import
    return http<I18Message>({
      method: "GET",
      url: `${apiUrl}`,
    })
      .then((response) => {
        this.isLoadingLanguage = false;
        return response;
      })
      .catch((error) => {
        this.isLoadingLanguage = false;
        return Promise.reject(error);
      });
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
          return locale;
        });
      }
    });
  }

  public loadLocalMessages(
    locale: string,
    messages: string | Record<string, string | number>
  ): Promise<string> {
    const dictionary: Record<string, string | number> =
      typeof messages === "string"
        ? (JSON.parse(messages) as Record<string, string | number>)
        : messages;

    const error = this.checkMessageObjectFormat(dictionary);
    if (error) {
      return Promise.reject(error);
    }
    this.setLocale(locale);
    this.setLocaleMessages(locale, dictionary);
    return Promise.resolve(locale);
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
        translation = translation!.replace(`{${key}}`, dynamicData[key] || key);
      }
    }

    return translation.trim();
  }
}
const i18nPro = new _i18nPro();
export default i18nPro;
