export interface I18Message {
  [key: string]: string | number;
}
export interface I18Dictionary {
  [key: string]: I18Message;
}
export interface DynamicData {
  [key: string]: string;
}

export interface ChangeLanguage {
  (
    locale: string,
    messages: string | Record<string, string | number>
  ): Promise<string | undefined>;
  (
    locale: string,
    apiUrl: string
  ): Promise<string | undefined>;
}
