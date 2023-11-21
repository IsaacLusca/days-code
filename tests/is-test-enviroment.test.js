const testEnvironmentModule = require('../resouces/scripts/app')

describe('Environment Verification', () => {
    let originalProcessEnv = process.env

    beforeEach(() => {
        jest.resetModules()
        process.env = { ...originalProcessEnv } 
    })

    afterEach(() => {
        process.env = originalProcessEnv
    })

    test('should return false when process.env is undefined', () => {
        delete process.env.NODE_ENV 
        expect(testEnvironmentModule.isTestEnviroment()).toBe(false)
    })

    test('should return false when process.env.NODE_ENV is different from "test"', () => {
        process.env.NODE_ENV = 'dev'
        expect(testEnvironmentModule.isTestEnviroment()).toBe(false)
    })

    test('should return true when process.env.NODE_ENV is "test"', () => {
        process.env.NODE_ENV = 'test'
        expect(testEnvironmentModule.isTestEnviroment()).toBe(true)
    })
})
