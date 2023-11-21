const databaseModule = require('../resouces/scripts/app')

describe('Loading database json file', () => {
    afterEach(() => {
        jest.restoreAllMocks(); // Restore mocked functions after each test
    })

    test('should return an array with 2 items', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve({ words: ['house', 'candy'] }),
        })

        expect(await databaseModule.loadWords()).toEqual(['house', 'candy'])
    })

    test('should return an empty array', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: () => Promise.resolve({ words: [] }),
        })

        expect(await databaseModule.loadWords()).toEqual([])
    })

    test('should return an empty array when something unexpected happens..', async () => {
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('something unexpected happens...'))

        expect(await databaseModule.loadWords()).toEqual([])
    })
})
