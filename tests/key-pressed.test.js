const app = require('../resouces/scripts/app')

const testCases = [
    {
        description: 'Testing Enter key pressed',
        func: app.isEnterKeyPressed,
        trueCases: ['Enter'],
        falseCases: ['A', '*', '3', 'Meta', 'Backspace', 'Delete']
    },
    {
        description: 'Testing Backspace/Delete key pressed',
        func: app.isBackspaceKeyPressed,
        trueCases: ['Backspace', 'Delete'],
        falseCases: ['A', '*', '3', 'Meta', 'Enter']
    },
    {
        description: 'Testing Valid key pressed',
        func: app.isValidKeyPressed,
        trueCases: ['Backspace', 'Delete', 'Enter', 'A', 'H', 'Z', 'c', 'o', 'x'],
        falseCases: ['Meta', '1', 2, '&', '*', 6, '4', '/', 'Shift']
    }
]

testCases.forEach(({description, func, trueCases, falseCases}) => {
    describe(description, () => {
        trueCases.forEach(key => {
            test(`should return true when key pressed is ${key}`, () => {
                expect(func(key)).toBe(true)
            })
        })

        falseCases.forEach(key => {
            test(`should return false when key pressed is ${key}`, () => {
                expect(func(key)).toBe(false)
            })
        })
    })
})
