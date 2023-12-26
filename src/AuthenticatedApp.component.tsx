import React from "react";
import { IPublicClientApplication, InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import AppComponent from "./App.component";
import { IDENTIFIERS, scopeMap, useInjection } from "./common";

export const AuthenticatedAppComponent = () => {
    const msalInstance = useInjection<IPublicClientApplication>(IDENTIFIERS.IMSAL_INSTANCE);

    return (
        <MsalProvider instance={msalInstance!}>
            <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect}
                authenticationRequest={{
                    scopes: [...scopeMap.values()].flat()
                }}
                >
                <AppComponent/>
            </MsalAuthenticationTemplate>
        </MsalProvider>
    );
};

export default AuthenticatedAppComponent;