import { useAccount, useMsal } from "@azure/msal-react";
import axios from "axios";
import React from "react";
import { scopeMap } from "../../common";

type RequestAuthenticationInterceptorProps = RequestAuthenticationInterceptorComponentProps;
interface RequestAuthenticationInterceptorComponentProps {
    children: JSX.Element;
}

export const RequestAuthenticationInterceptorComponent = ({ children }: RequestAuthenticationInterceptorProps) => {
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0]);

    /* eslint-disable no-param-reassign */
    axios.interceptors.request.use(async (config) => {
        if (!account) {
            throw Error('No active account! Verify a user has been signed in.');
        }

        if (!config.url) {
            throw Error('No url configured for the request!');
        }

        const baseUrl = new URL(config.url).origin;
        const scopes = scopeMap.get(baseUrl);
        if (!scopes) {
            throw Error('No scopes configured for the request!');
        }

        const response = await instance.acquireTokenSilent({
            scopes,
            account,
        });

        const bearer = `Bearer ${response.accessToken}`;
        config.headers.Authorization = bearer;

        return config;
    });
    /* eslint-enable no-param-reassign */

    return (
        <>
            {children}
        </>
    );
};

export default RequestAuthenticationInterceptorComponent;