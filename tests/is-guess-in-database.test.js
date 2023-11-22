const app = require('../resouces/scripts/app')

const wordList = ["agent", "aging", "agree", "ahead", "aides", "aimed", "agile", "alarm", "alert", "bikes", "blade", "candy", "house", "sorry", "worry"]

describe('Testing case guess is in database', () => {
    const testCases = [
        {guess: 'allow', expected: false},
        {guess: 'agile', expected: true},
        {guess: 'worry', expected: true},
        {guess: 'agent', expected: true}
    ]

    testCases.forEach(({guess, expected}) => {
        test(`should return ${expected} because ${guess} is ${expected ? '' : 'not '}in list`, () => {
            expect(app.isGuessInDatabase(guess, wordList)).toBe(expected)
        })
    })
})
