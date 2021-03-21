import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import CONFIG from '../config';
import { Tokens, User } from '../models';

const authConfigurationOptions = {
    mandatorySignIn: true,
    region: CONFIG.AUTH_API.REGION,
    userPoolId: CONFIG.AUTH_API.USER_POOL_ID,
    userPoolWebClientId: CONFIG.AUTH_API.APP_CLIENT_ID
};

Amplify.configure({
    Auth: authConfigurationOptions
});

// Abstract since totally static class
export abstract class UserService
{
    // Static async method to register a user (Put in DB) given info (should be validated)
    public static async register(user: User): Promise<any>
    {
        // Sign up with the cognito user pool
        return await Auth.signUp({
            username: user.email,
            password: user.password as string
        });
    }

    // Static async method to login with user and password -- should probably have better return type here
    public static async login(user: User, checked: boolean): Promise<User>
    {
        // Reconfigure the Auth to use a different storage source if "remember me" isn't checked
        if (!checked)
        {
            Amplify.configure({
                Auth: {
                    ...authConfigurationOptions,
                    storage: sessionStorage
                }
            });
        }

        // Await the response -- Call Cognito instead?
        const response = await Auth.signIn(user.email, user.password);

        // Check for the response token -- this proves authentication
        return {
            email: response.attributes.email,
            email_verified: response.attributes.email_verified
        };
    }

    public static async currentTokens(): Promise<Tokens>
    {
        const sessionTokens = await Auth.currentSession();
        return {
            idToken: sessionTokens.getIdToken().getJwtToken(),
            accessToken: sessionTokens.getAccessToken().getJwtToken()
        }
    }

    public static async logout(): Promise<void>
    {
        // Invalidate the Auth token from cognito
        await Auth.signOut();
    }
}