import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import React from 'react';

type AuthenticationContainerProps = AuthenticationContainerComponentProps;
interface AuthenticationContainerComponentProps {
    children: JSX.Element;
}

export const AuthenticationContainerComponent = ({ children }: AuthenticationContainerProps) => {
    const { error, result } = useMsalAuthentication(InteractionType.Redirect, {
        scopes: ["api://70be7cd0-14ac-49ce-a268-6239913d2ba5/User.Read"]
    });

    if (error) {
        console.error(error);
        return <div>An error occurred during login</div>;
    }

    if (!result) {
        return <div>Authentication in progress...</div>;
    }

    return <>{children}</>;
};

export default AuthenticationContainerComponent;