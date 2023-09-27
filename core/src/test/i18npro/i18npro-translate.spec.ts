import { i18nPro } from "../../i18npro"
import { I18Message } from "../../types"

describe('Test translate method of i18nPro class', () => {

    const dictionary: I18Message = {
        simple: "  Simple  ",
        plural: "One | Multi | Ultra",
        plural2: "One | Multi ",
        date: "Today is {date}"
    }

    beforeAll(() => {
        i18nPro.loadLocalMessages('en', dictionary)
    })

    it('t => return key value', () => {
        expect(i18nPro.t('Not found')).toEqual('Not found')
    })
    it('t => return key value and remove extra whitespaces', () => {
        expect(i18nPro.t(' Not found  ')).toEqual('Not found')
    })
    it('t => return the value for matching key', () => {
        expect(i18nPro.t('simple')).toEqual('Simple')
    })
    it('t => return plural at index 0', () => {
        expect(i18nPro.t('plural', 1)).toEqual('One')
    })
    it('t => return plural at index 1', () => {
        expect(i18nPro.t('plural', 2)).toEqual('Multi')
    })
    it('t => return plural at index 2', () => {
        expect(i18nPro.t('plural', 3)).toEqual('Ultra')
    })
    it('t => plural at index 3 return default value', () => {
        expect(i18nPro.t('plural2', 3)).toEqual('plural2')
    })
    it('t => return translation with dynamic value', () => {
        const date = Date.now().toLocaleString()
        expect(i18nPro.t('date', {date})).toEqual(`Today is ${date}`)
    })
    it('t => translation with dynamic value returns default value', () => {
        expect(i18nPro.t('date', {})).toEqual(`Today is {date}`)
    })
    it('t => translation with dynamic value returns default value', () => {
        expect(i18nPro.t('date', {date: ""})).toEqual(`Today is date`)
    })
})