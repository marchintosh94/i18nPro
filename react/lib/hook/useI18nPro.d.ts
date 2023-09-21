interface ChangeLanguage {
    (locale: string, messages: string | Record<string, string | number>): Promise<string>;
    (locale: string, apiUrl: string): Promise<string>;
}
export declare const useI18nPro: () => {
    locale: string;
    t: (value: string, ...args: any[]) => string;
    changeLanguage: ChangeLanguage;
};
export {};
//# sourceMappingURL=useI18nPro.d.ts.map