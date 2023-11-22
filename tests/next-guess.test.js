const app = require('../resouces/scripts/app')

const database = ['allow', 'actor', 'badge', 'beach', 'candy', 'house']

const testCases = [
    {
        currentRow: 1,
        currentLetterPosition: 6,
        currentGuess: 'beach',
        rightGuess: 'badge',
        expectedRow: 2,
        expectedLetterPosition: 1,
        expectedGuess: ''
    },
    {
        currentRow: 2,
        currentLetterPosition: 6,
        currentGuess: 'actor',
        rightGuess: 'allow',
        expectedRow: 3,
        expectedLetterPosition: 1,
        expectedGuess: ''
    },
    {
        currentRow: 3,
        currentLetterPosition: 6,
        currentGuess: 'actor',
        rightGuess: 'candy',
        expectedRow: 4,
        expectedLetterPosition: 1,
        expectedGuess: ''
    },
    {
        currentRow: 4,
        currentLetterPosition: 6,
        currentGuess: 'badge',
        rightGuess: 'house',
        expectedRow: 5,
        expectedLetterPosition: 1,
        expectedGuess: ''
    },
    {
        currentRow: 5,
        currentLetterPosition: 6,
        currentGuess: 'candy',
        rightGuess: 'beach',
        expectedRow: 6,
        expectedLetterPosition: 1,
        expectedGuess: ''
    }
]

describe('Checking next guess configuration', () => {
    testCases.forEach(({currentRow, currentLetterPosition, currentGuess, rightGuess, expectedRow, expectedLetterPosition, expectedGuess}) => {
        const game = {
            database,
            currentRow,
            currentLetterPosition,
            currentGuess,
            rightGuess
        }

        test(`should increment game attributes - guess ${currentRow}`, () => {
            app.nextGuess(game)

            expect(game.currentRow).toBe(expectedRow)
            expect(game.currentLetterPosition).toBe(expectedLetterPosition)
            expect(game.currentGuess).toBe(expectedGuess)
            expect(game.rightGuess).toBe(rightGuess)
        })
    })
})
