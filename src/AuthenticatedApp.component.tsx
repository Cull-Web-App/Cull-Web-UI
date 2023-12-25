import React from "react";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import AppComponent from "./App.component";
import { msalConfig, scopeMap } from "./common";

const msalInstance = new PublicClientApplication(msalConfig);

export const AuthenticatedAppComponent = () => {
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