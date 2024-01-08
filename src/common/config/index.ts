import { Configuration } from '@azure/msal-browser';
import { msalConfig as devMsalConfig, scopeMap as devScopeMap } from './msalConfig.dev';
import { msalConfig as localMsalConfig, scopeMap as localScopeMap } from './msalConfig.local';

const configs: Record<string, Configuration> = {
    local: localMsalConfig,
    development: devMsalConfig,
    production: devMsalConfig
};

const scopeMaps: Record<string, Map<string, string[]>> = {
    local: localScopeMap,
    development: devScopeMap,
    production: devScopeMap
};

const env: string = process.env.NODE_ENV || 'development';

export const msalConfig: Configuration = configs[env];
export const scopeMap: Map<string, string[]> = scopeMaps[env];