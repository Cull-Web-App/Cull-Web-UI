import { userConstants } from '../constants';
import { RegistrationState, IAction } from '../models';

const initialRegistrationState: RegistrationState = {
    registering: false,
    registered: false
};

export const registration = (state: RegistrationState = initialRegistrationState, action: IAction): RegistrationState =>
{
    switch (action.type)
    {
        case userConstants.REGISTER_REQUEST:
            return <RegistrationState> {
                registering: true
            };
        case userConstants.REGISTER_SUCCESS:
            return <RegistrationState> {
                registering: false,
                registered: true
            };
        case userConstants.REGISTER_ERROR:
            return <RegistrationState> {
                registering: false,
                registered: false
            };
        default:
            return state;
    }
}