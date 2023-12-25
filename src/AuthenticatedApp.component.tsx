import React from "react";
import { Configuration, InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import AppComponent from "./App.component";

const config: Configuration = {
    auth: {
        clientId: "96a42910-ace2-4e54-bcd5-b34e0275cab0",
        authority: "https://login.microsoftonline.com/09c105c2-92b3-4242-aa95-062b36c2534c",
        redirectUri: "http://localhost:3000"
    }
};

const msalInstance = new PublicClientApplication(config);

export const AuthenticatedAppComponent = () => {
    return (
        <MsalProvider instance={msalInstance!}>
            <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect}
                authenticationRequest={{
                    scopes: ["api://70be7cd0-14ac-49ce-a268-6239913d2ba5/User.Read"]
                }}
                >
                <AppComponent/>
            </MsalAuthenticationTemplate>
        </MsalProvider>
    );
};

export default AuthenticatedAppComponent;