import { i18nPro } from "@/i18npro"

describe('Test i18nPro class with all its methods', () => {

    it('Default language', () => {
        i18nPro.defaultLocale = "en-US";
        expect(i18nPro.defaultLocale).toEqual('en-US')
    })
})