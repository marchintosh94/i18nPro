export interface I18Message {
  [key: string]: string | number;
}
export interface I18Dictionary {
  [key: string]: I18Message;
}
export interface DynamicData {
  [key: string]: string;
}

