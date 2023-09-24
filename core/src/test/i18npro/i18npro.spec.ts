
import { _i18nPro } from "../../i18npro/i18npro";
import { i18nPro } from "../../i18npro"

describe('Test i18nPro class with all its methods', () => {

    const successfulResponseDictionary = Promise.resolve<Response>({
        json: () => Promise.resolve({ "success": "true" }),
        ok: true,
        status: 200,
        headers: {} as Headers
    } as Response);
    const invalidDictionaryResponseEmpty = Promise.resolve<Response>({
        json: () => Promise.resolve({}),
        ok: true,
        status: 200,
        headers: {} as Headers
    } as Response);
    const invalidDictionaryResponseFormat = Promise.resolve<Response>({
        json: () => Promise.resolve({abc: true}),
        ok: true,
        status: 200,
        headers: {} as Headers
    } as Response);
    const errorResponseDictionary = Promise.resolve<Response>({
        json: () => Promise.reject(),
        ok: false,
        status: 500,
        headers: {} as Headers
    } as Response);

    it('Default language', () => {
        i18nPro.defaultLocale = "en-US";
        expect(i18nPro.defaultLocale).toEqual('en-US')
    })
    it('getPluralFromArgs => undefined', () => {
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'getPluralFromArgs')
        i18nPro.t('test')
        expect(methodSpy).toHaveBeenCalled()
        expect(methodSpy).toReturnWith(undefined)
        methodSpy.mockClear()
        i18nPro.t('test', {obj: 12})
        expect(methodSpy).toReturnWith(undefined)
        methodSpy.mockClear()
        i18nPro.t('test', "dfgdf")
        expect(methodSpy).toReturnWith(undefined)
        methodSpy.mockClear()
        i18nPro.t('test', 0)
        expect(methodSpy).toReturnWith(undefined)
        methodSpy.mockClear()
        i18nPro.t('test', 4)
        expect(methodSpy).toReturnWith(undefined)
    })
    it('getPluralFromArgs => number', () => {
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'getPluralFromArgs')
        i18nPro.t('test', 1)
        expect(methodSpy).toReturnWith(1)
        methodSpy.mockClear()
        i18nPro.t('test', 2)
        expect(methodSpy).toReturnWith(2)
        methodSpy.mockClear()
        i18nPro.t('test', 3)
        expect(methodSpy).toReturnWith(3)
    })
    it('getDynamicDataFromArgs => undefined', () => {
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'getDynamicDataFromArgs')
        i18nPro.t('test', 1, 3564)
        expect(methodSpy).toHaveBeenCalled()
        expect(methodSpy).toHaveBeenCalledWith([1, 3564])
        expect(methodSpy).toReturnWith(undefined)
        methodSpy.mockClear()
        i18nPro.t('test', 1, "sgewsg")
        expect(methodSpy).toReturnWith(undefined)
        methodSpy.mockClear()
        i18nPro.t('test', "dfbsadf", ['string'])
        expect(methodSpy).toReturnWith(undefined)
        methodSpy.mockClear()
        i18nPro.t('test', "dafg", () => {})
        expect(methodSpy).toReturnWith(undefined)
        methodSpy.mockClear()
    })
    it('getDynamicDataFromArgs => object', () => {
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'getDynamicDataFromArgs')
        i18nPro.t('test', {var: 12})
        expect(methodSpy).toReturnWith({var: 12})
        methodSpy.mockClear()
        i18nPro.t('test', 1, {23: "sdfgjk"})
        expect(methodSpy).toReturnWith({23: "sdfgjk"})
        methodSpy.mockClear()
    })
    it('setLocale => called from LoadMessages', async () => {
        global.fetch = jest.fn(() => successfulResponseDictionary)
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'setLocale')
        expect(i18nPro['locale']).toBe(undefined)
        expect(i18nPro['storedLocales']).toEqual([])
        await i18nPro.loadMessages('en', '/')
        expect(methodSpy).toHaveBeenCalled()
        expect(methodSpy).toHaveBeenCalledWith('en')
        expect(i18nPro['locale']).toBe('en')
        expect(i18nPro['storedLocales']).toEqual(['en'])
        methodSpy.mockClear()
    })
    it('setLocale => called from LoadLocalMessages', async () => {
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'setLocale')
        expect(i18nPro['locale']).toBe('en')
        expect(i18nPro['storedLocales']).toEqual(['en'])
        await i18nPro.loadLocalMessages('en', {test: 12})
        expect(methodSpy).toHaveBeenCalled()
        expect(methodSpy).toHaveBeenCalledWith('en')
        expect(i18nPro['locale']).toBe('en')
        expect(i18nPro['storedLocales']).toEqual(['en'])
        methodSpy.mockClear()
        await i18nPro.loadLocalMessages('en-us', {test: 12})
        expect(methodSpy).toHaveBeenCalledWith('en-us')
        expect(i18nPro['locale']).toBe('en-us')
        expect(i18nPro['storedLocales']).toEqual(['en', 'en-us'])
        methodSpy.mockClear()
    })
    it('setLocaleMessages', async () => {
        const newI18pro = new _i18nPro()
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'setLocaleMessages')
        const dictionary = {test: 12, a: 'sfdhnjgb'}
        expect(newI18pro['messages']).toEqual({})
        newI18pro['setLocaleMessages']('en', dictionary)
        expect(methodSpy).toHaveBeenCalled()
        expect(methodSpy).toHaveBeenCalledWith('en', dictionary)
        expect(newI18pro['messages']).toEqual({en: dictionary})
        methodSpy.mockClear()
        newI18pro['setLocaleMessages']('en', dictionary)
        expect(methodSpy).toHaveBeenCalled()
        expect(methodSpy).toHaveBeenCalledWith('en', dictionary)
        expect(newI18pro['messages']).toEqual({en: dictionary})
        methodSpy.mockClear()
        newI18pro['setLocaleMessages']('en-us', {...dictionary, en: 'true'})
        expect(methodSpy).toHaveBeenCalled()
        expect(methodSpy).toHaveBeenCalledWith('en-us', {...dictionary, en: 'true'})
        expect(newI18pro['messages']).toEqual({en: dictionary, 'en-us': {...dictionary, en: 'true'}})
        methodSpy.mockClear()
    })
    it('checkMessageObjectFormat => no error', async () => {
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'checkMessageObjectFormat')
        const dictionary = {test: 12, a: 'sfdhnjgb'}
        i18nPro['checkMessageObjectFormat'](dictionary)
        expect(methodSpy).toHaveBeenCalled()
        expect(methodSpy).toHaveBeenCalledWith(dictionary)
        expect(methodSpy).toReturnWith('')
        methodSpy.mockClear()
    })
    it('checkMessageObjectFormat => empty dictionary error', async () => {
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'checkMessageObjectFormat')
        const dictionary = {}
        i18nPro['checkMessageObjectFormat'](dictionary)
        expect(methodSpy).toHaveBeenCalled()
        expect(methodSpy).toHaveBeenCalledWith(dictionary)
        expect(methodSpy).toReturnWith('No keys found. Please check the JSON and return at least 1 translation')
        methodSpy.mockClear()
    })
    it('checkMessageObjectFormat => invalid format', async () => {
        const errMsg = 'Invalid format for dictionary. It must be like a Record<string, string>'
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'checkMessageObjectFormat')
        i18nPro['checkMessageObjectFormat'](["sdgrf"] as any)
        expect(methodSpy).toReturnWith(errMsg)
        methodSpy.mockClear()
        //pass function as value
        i18nPro['checkMessageObjectFormat']({key: () => {}} as any)
        expect(methodSpy).toReturnWith(errMsg)
        methodSpy.mockClear()
        //pass object as value
        i18nPro['checkMessageObjectFormat']({key: {val1: 12}} as any)
        expect(methodSpy).toReturnWith(errMsg)
        methodSpy.mockClear()
        //pass null as value
        i18nPro['checkMessageObjectFormat']({key: null} as any)
        expect(methodSpy).toReturnWith(errMsg)
        methodSpy.mockClear()
        //pass undefined as value
        i18nPro['checkMessageObjectFormat']({key: undefined} as any)
        expect(methodSpy).toReturnWith(errMsg)
        methodSpy.mockClear()
        //pass boolean as value
        i18nPro['checkMessageObjectFormat']({key: true} as any)
        expect(methodSpy).toReturnWith(errMsg)
        methodSpy.mockClear()
    })
    it('getRemoteMessages & Loading language propery => succeed', async () => {
        global.fetch = jest.fn(() => successfulResponseDictionary)
        const loading = jest.spyOn(_i18nPro.prototype as any, 'setIsLoadingLanguage')
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'getRemoteMessages')
        expect(i18nPro['isLoadingLanguage']).toBeFalsy()
        const data = await i18nPro['getRemoteMessages']('/')
        expect(i18nPro['isLoadingLanguage']).toBeFalsy()
        expect(methodSpy).toHaveBeenCalled()
        expect(methodSpy).toHaveBeenCalledWith('/')
        expect(data).toEqual({ "success": "true" })
        expect(loading).toHaveBeenCalledTimes(2)
        expect(loading).toHaveBeenNthCalledWith(1, true)
        expect(loading).toHaveBeenNthCalledWith(2, false)
        jest.clearAllMocks()
    })
    it('getRemoteMessages & Loading language propery => error', async () => {
        global.fetch = jest.fn(() => errorResponseDictionary)
        const loading = jest.spyOn(_i18nPro.prototype as any, 'setIsLoadingLanguage')
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'getRemoteMessages')
        expect(i18nPro['isLoadingLanguage']).toBeFalsy()
        expect(i18nPro['getRemoteMessages']('/')).rejects.toBeTruthy().finally(() => {
            expect(methodSpy).toHaveBeenCalled()
            expect(methodSpy).toHaveBeenCalledWith('/')
            expect(i18nPro['isLoadingLanguage']).toBeFalsy()
            expect(loading).toHaveBeenCalledTimes(2)
            expect(loading).toHaveBeenNthCalledWith(1, true)
            expect(loading).toHaveBeenNthCalledWith(2, false)
            jest.clearAllMocks()
        })
    })
    it('loadMessages => succeed', async () => {
        const freshI18nPro = new _i18nPro()
        global.fetch = jest.fn(() => successfulResponseDictionary)
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'loadMessages')
        expect(freshI18nPro.loadMessages('en', '/api')).resolves.toEqual('en').then(() => {
            expect(methodSpy).toHaveBeenCalledWith('en', '/api')
            expect(freshI18nPro['locale']).toEqual('en')
            expect(freshI18nPro['messages']).toEqual({'en': {success: 'true'}})
            expect(freshI18nPro['isLoadingLanguage']).toEqual(false)
            expect(freshI18nPro['getRemoteMessages']).toHaveBeenCalled()
            expect(freshI18nPro['getRemoteMessages']).toHaveBeenCalledWith('/api')
            jest.clearAllMocks()
        })
    })
    it('loadMessages => error: rest api fails', async () => {
        const freshI18nPro = new _i18nPro()
        global.fetch = jest.fn(() => errorResponseDictionary)
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'loadMessages')
        expect(freshI18nPro.loadMessages('en', '/api')).rejects.toBeTruthy().finally(() => {
            expect(methodSpy).toHaveBeenCalledWith('en', '/api')
            expect(freshI18nPro['locale']).toEqual(undefined)
            expect(freshI18nPro['messages']).toEqual({})
            expect(freshI18nPro['isLoadingLanguage']).toEqual(false)
            jest.clearAllMocks()
        })
    })
    it('loadMessages => error: invalid dictionary (empty)', async () => {
        const freshI18nPro = new _i18nPro()
        global.fetch = jest.fn(() => invalidDictionaryResponseEmpty)
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'loadMessages')
        expect(freshI18nPro.loadMessages('en', '/api')).rejects.toEqual('No keys found. Please check the JSON and return at least 1 translation').finally(() => {
            expect(methodSpy).toHaveBeenCalledWith('en', '/api')
            expect(freshI18nPro['locale']).toEqual(undefined)
            expect(freshI18nPro['messages']).toEqual({})
            expect(freshI18nPro['isLoadingLanguage']).toEqual(false)
            jest.clearAllMocks()
        })
    })
    it('loadMessages => error: invalid dictionary (format)', async () => {
        const freshI18nPro = new _i18nPro()
        global.fetch = jest.fn(() => invalidDictionaryResponseFormat)
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'loadMessages')
        expect(freshI18nPro.loadMessages('en', '/api')).rejects.toEqual('Invalid format for dictionary. It must be like a Record<string, string>').finally(() => {
            expect(methodSpy).toHaveBeenCalledWith('en', '/api')
            expect(freshI18nPro['locale']).toEqual(undefined)
            expect(freshI18nPro['messages']).toEqual({})
            expect(freshI18nPro['isLoadingLanguage']).toEqual(false)
            jest.clearAllMocks()
        })
    })
    it('loadMessages => succeed: same active locale', async () => {
        const freshI18nPro = new _i18nPro()
        global.fetch = jest.fn(() => successfulResponseDictionary)
        const methodSpy = jest.spyOn(_i18nPro.prototype as any, 'loadMessages')
        await freshI18nPro.loadMessages('en', '/api')
        expect(freshI18nPro.loadMessages('en', '/api')).resolves.toEqual('en').finally(() => {
            expect(methodSpy).toHaveBeenCalledWith('en', '/api')
            expect(freshI18nPro['getRemoteMessages']).toHaveBeenCalledTimes(1)
            expect(freshI18nPro['locale']).toEqual('en')
            expect(freshI18nPro['messages']).toEqual({'en': {success: 'true'}})
            expect(freshI18nPro['isLoadingLanguage']).toEqual(false)
            jest.clearAllMocks()
        })
    })
    it('loadMessages => succeed: already loaded locale', async () => {
        const freshI18nPro = new _i18nPro()
        global.fetch = jest.fn(() => successfulResponseDictionary)
        expect(Promise.all([
            freshI18nPro.loadMessages('en', '/api'),
            freshI18nPro.loadMessages('en', '/api')
        ])).resolves.toContain(undefined).finally(() => {
            expect(freshI18nPro['getRemoteMessages']).toHaveBeenCalledTimes(1)
            expect(freshI18nPro['messages']).toEqual({'en': {success: 'true'}})
            jest.clearAllMocks()
        })
    })
    it('loadLocalMessages => succeed: dictionary as object', async () => {
        const freshI18nPro = new _i18nPro()
        expect(freshI18nPro.loadLocalMessages('en', {success: "true"})).resolves.toEqual('en').finally(() => {
            expect(freshI18nPro['messages']).toEqual({'en': {success: 'true'}})
            expect(freshI18nPro['locale']).toEqual('en')
            jest.clearAllMocks()
        })
    })
    it('loadLocalMessages => succeed: dictionary as string', async () => {
        const freshI18nPro = new _i18nPro()
        expect(freshI18nPro.loadLocalMessages('en', '{"success": "true"}')).resolves.toEqual('en').finally(() => {
            expect(freshI18nPro['locale']).toEqual('en')
            expect(freshI18nPro['messages']).toEqual({'en': {success: 'true'}})
            jest.clearAllMocks()
        })
    })
    it('loadLocalMessages => error: invalid json as string', async () => {
        const freshI18nPro = new _i18nPro()
        expect(freshI18nPro.loadLocalMessages('en', '{success: "true"}')).rejects.toBeTruthy().finally(() => {
            expect(freshI18nPro['locale']).toEqual(undefined)
            expect(freshI18nPro['messages']).toEqual({})
            jest.clearAllMocks()
        })
    })
    it('loadLocalMessages => error: invalid dictionary object', async () => {
        const freshI18nPro = new _i18nPro()
        expect(freshI18nPro.loadLocalMessages('en', '{"success": true}')).rejects.toEqual('Invalid format for dictionary. It must be like a Record<string, string>').finally(() => {
            expect(freshI18nPro['locale']).toEqual(undefined)
            expect(freshI18nPro['messages']).toEqual({})
            jest.clearAllMocks()
        })
    })
    it('changeLanguage => succeed: load from api', async () => {
        const freshI18nPro = new _i18nPro()
        global.fetch = jest.fn(() => successfulResponseDictionary)
        const loadLocalMessagesMock = jest.spyOn(_i18nPro.prototype as any, 'loadLocalMessages')
        expect(freshI18nPro.changeLanguage('en-us', '/api')).resolves.toEqual('en-us').then(() => {
            expect(freshI18nPro.loadMessages).toHaveBeenCalled()
            expect(loadLocalMessagesMock).not.toHaveBeenCalled()
            expect(freshI18nPro['locale']).toEqual('en-us')
            expect(freshI18nPro['messages']).toEqual({'en-us': {success: 'true'}})
            jest.clearAllMocks()
        })
    })
    it('changeLanguage => succeed: load from local', async () => {
        const freshI18nPro = new _i18nPro()
        const loadMessagesMock = jest.spyOn(_i18nPro.prototype as any, 'loadMessages')
        expect(freshI18nPro.changeLanguage('en-us', '{"dictionary": "my translation"}')).resolves.toEqual('en-us').then(() => {
            expect(freshI18nPro.loadLocalMessages).toHaveBeenCalled()
            expect(loadMessagesMock).not.toHaveBeenCalled()
            expect(freshI18nPro['locale']).toEqual('en-us')
            expect(freshI18nPro['messages']).toEqual({'en-us': {"dictionary": "my translation"}})
            jest.clearAllMocks()
        })
    })
    it('changeLanguage => error: load from api with empty url', async () => {
        const freshI18nPro = new _i18nPro()
        const loadMessagesMock = jest.spyOn(_i18nPro.prototype as any, 'loadMessages')
        const loadLocalMessagesMock = jest.spyOn(_i18nPro.prototype as any, 'loadLocalMessages')
        expect(freshI18nPro.changeLanguage('en-us', '')).rejects.toEqual({message: 'Arguments provided are not valid', data: {newLocale: 'en-us', args: ''}}).finally(() => {
            expect(loadLocalMessagesMock).not.toHaveBeenCalled()
            expect(loadMessagesMock).not.toHaveBeenCalled()
            expect(freshI18nPro['locale']).toEqual(undefined)
            expect(freshI18nPro['messages']).toEqual({})
            jest.clearAllMocks()
        })
    })
    it('changeLanguage => error: load from api with empty url', async () => {
        const freshI18nPro = new _i18nPro()
        expect(freshI18nPro.changeLanguage('en-us', false as any)).rejects.toEqual({message: 'Arguments provided are not valid', data: {newLocale: 'en-us', args: false}}).finally(() => {
            expect(freshI18nPro['locale']).toEqual(undefined)
            expect(freshI18nPro['messages']).toEqual({})
            jest.clearAllMocks()
        })
    })
    it('changeLanguage => error: locale not provided', async () => {
        const freshI18nPro = new _i18nPro()
        const loadMessagesMock = jest.spyOn(_i18nPro.prototype as any, 'loadMessages')
        const loadLocalMessagesMock = jest.spyOn(_i18nPro.prototype as any, 'loadLocalMessages')
        expect(freshI18nPro.changeLanguage('', '')).rejects.toEqual({message: 'Provide a locale', data: ''}).finally(() => {
            expect(loadLocalMessagesMock).not.toHaveBeenCalled()
            expect(loadMessagesMock).not.toHaveBeenCalled()
            expect(freshI18nPro['locale']).toEqual(undefined)
            expect(freshI18nPro['messages']).toEqual({})
            jest.clearAllMocks()
        })
    })
    it('changeLanguage => duplicate call returns locale', async () => {
        const freshI18nPro = new _i18nPro()
        freshI18nPro['setLocale']('es')
        expect(Promise.all([
            freshI18nPro.changeLanguage('en-us', '/api'),
            freshI18nPro.changeLanguage('en', '/api')
        ])).resolves.toContain(undefined)
    })
})