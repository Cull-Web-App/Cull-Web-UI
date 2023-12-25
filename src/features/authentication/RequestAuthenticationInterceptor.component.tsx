import { useAccount, useMsal } from "@azure/msal-react";
import axios from "axios";
import React from "react";

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

        const response = await instance.acquireTokenSilent({
            scopes: ["api://70be7cd0-14ac-49ce-a268-6239913d2ba5/User.Read"],
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