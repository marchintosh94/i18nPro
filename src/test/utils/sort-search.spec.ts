import { objectKeysToLower } from "../../utils"

describe('Test sort-search utilities', () => {

    it('objectKeysToLower', () => {
        const obj = {"SFYT": 1213, "HVjlp": "TYTY", Tasd: {}}
        expect(objectKeysToLower(obj)).toEqual({"sfyt": 1213, "hvjlp": "TYTY", tasd: {}})
    })
})