import sayHello from '../sayHello'

describe('sayHello funcction', () => {
    it('should return hello', () => {
        expect(sayHello('hello')).toContain('hello')
    })
});




