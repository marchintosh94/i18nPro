import { renderHook } from '@testing-library/react'
import { useI18nPro } from '../hook/useI18nPro'
import { i18nPro } from '@marchintosh94/i18n-pro'

describe("useI18nPro Hook", () => {

    beforeAll(() => {
        i18nPro.defaultLocale = 'en-US'
    })

    it("init", () => {
        const {result} = renderHook(useI18nPro)
        expect(result.current.locale).toEqual('en-US')
        expect(result.current.t).toBeDefined()
        expect(result.current.switchLanguage).toBeDefined()
    })
})