import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
    auth: {
        clientId: "96a42910-ace2-4e54-bcd5-b34e0275cab0",
        authority: "https://login.microsoftonline.com/09c105c2-92b3-4242-aa95-062b36c2534c",
        redirectUri: "http://localhost:3000"
    }
};

export const scopeMap = new Map<string, string[]>([
    ["https://localhost:7221", ["api://70be7cd0-14ac-49ce-a268-6239913d2ba5/User.Read"]],
    ["https://graph.microsoft.com", ["User.Read"]],
]);
