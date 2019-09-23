import { registration } from '../../reducers';
import { userConstants } from '../../constants';
import { RegistrationState, IAction, User } from '../../models';

describe('Registration reducer', () =>
{
    it('should work', () =>
    {
        const state: RegistrationState = {};

        expect(registration(state, <IAction> {
            type: userConstants.REGISTER_REQUEST,
        })).toEqual(<RegistrationState> {
            registering: true
        });

        expect(registration(state, <IAction> {
            type: userConstants.REGISTER_SUCCESS,
        })).toEqual(<RegistrationState> {
            registered: true,
            registering: false
        });

        expect(registration(state, <IAction> {
            type: userConstants.REGISTER_ERROR,
        })).toEqual(<RegistrationState> {
            registered: false,
            registering: false
        });

        expect(registration(state, <IAction> {})).toEqual(state);
    });
});