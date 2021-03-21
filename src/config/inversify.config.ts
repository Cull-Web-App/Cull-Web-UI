import 'reflect-metadata';
import { Container, AsyncContainerModule, interfaces } from 'inversify';

import {
    IAuthService,
    IConfigService,
    IHTTPService
} from '../interfaces';
import {
    CognitoAuthService,
    ConfigService,
    HTTPService
} from '../services';
import { SERVICE_IDENTIFIERS } from '../constants';

// Bind the data to the interfaces for injection -- use singletons for the services since they don't need multiple instances
const asyncContainerModule: AsyncContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
    bind<IAuthService>(SERVICE_IDENTIFIERS.IAUTH_SERVICE).to(CognitoAuthService).inTransientScope();
    bind<IConfigService>(SERVICE_IDENTIFIERS.ICONFIG_SERVICE).to(ConfigService).inSingletonScope();
    bind<IHTTPService>(SERVICE_IDENTIFIERS.IHTTP_SERVICE).to(HTTPService).inSingletonScope();
});

// Create the DI Container and export -- runs async for perf and possible async injection purposes
export const container: Container = new Container();
(async () => {
    await container.loadAsync(asyncContainerModule);
})();
