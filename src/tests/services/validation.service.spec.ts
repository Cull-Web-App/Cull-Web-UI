import { required, validateEmail, validatePassword } from '../../services';

describe('Validation service', () =>
{
    it('should return required', () =>
    {
        expect(required(undefined)).toEqual("Required");
    });

    it('should validate email', () =>
    {
        expect(validateEmail('c.h')).toEqual("Invalid Email");
    });

    it('should validate password', () =>
    {
        expect(validatePassword('pass')).toEqual("Must be at least 10 characters");
    });
})