const randomWordModule = require('../resouces/scripts/app')

describe('Random word selection', () => {
    test('should prioritize first word with 0.1 probability', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
        expect(randomWordModule.getOneRandomWord(['allow', 'agree'])).toBe('allow')
    })

    test('should prioritize first word with 0.4 probability', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.4);
        expect(randomWordModule.getOneRandomWord(['allow', 'agree'])).toBe('allow')
    })

    test('should prioritize second word with 0.5 probability', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
        expect(randomWordModule.getOneRandomWord(['allow', 'agree'])).toBe('agree')
    })

    test('should prioritize second word in a 2-item list with 0.6 probability', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.6);
        expect(randomWordModule.getOneRandomWord(['allow', 'agree'])).toBe('agree')
    })

    test('should prioritize last word in a 4-item list with 0.6 probability', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.6);
        expect(randomWordModule.getOneRandomWord(['allow', 'agree', 'candy', 'sorry'])).toBe('candy')
    })

    test('should prioritize last word in a 4-item list with 0.7 probability', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.7);
        expect(randomWordModule.getOneRandomWord(['allow', 'agree', 'candy', 'sorry'])).toBe('candy')
    })

    test('should prioritize last word in a 4-item list with 0.8 probability', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.8);
        expect(randomWordModule.getOneRandomWord(['allow', 'agree', 'candy', 'sorry'])).toBe('sorry')
    })

    test('should prioritize first word in a 4-item list with 0.1 probability', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
        expect(randomWordModule.getOneRandomWord(['allow', 'agree', 'candy', 'sorry'])).toBe('allow')
    })
})
