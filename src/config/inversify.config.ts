import 'reflect-metadata';
import { Container, AsyncContainerModule, interfaces } from 'inversify';

import {
    IAuthService,
    IConfigService,
    IHTTPService,
    IUserService
} from '../interfaces';
import {
    CognitoAuthService,
    ConfigService,
    HTTPService,
    UserService
} from '../services';
import { SERVICE_IDENTIFIERS } from '../constants';

// Bind the data to the interfaces for injection
const asyncContainerModule: AsyncContainerModule = new AsyncContainerModule(async (bind: interfaces.Bind) => {
    bind<IAuthService>(SERVICE_IDENTIFIERS.IAUTH_SERVICE).to(CognitoAuthService).inTransientScope();
    bind<IConfigService>(SERVICE_IDENTIFIERS.ICONFIG_SERVICE).to(ConfigService).inSingletonScope();
    bind<IHTTPService>(SERVICE_IDENTIFIERS.IHTTP_SERVICE).to(HTTPService).inSingletonScope();
    bind<IUserService>(SERVICE_IDENTIFIERS.IUSER_SERVICE).to(UserService).inTransientScope();
});

// Create the DI Container and export -- runs async for perf and possible async injection purposes
export const container: Container = new Container();
(async () => {
    await container.loadAsync(asyncContainerModule);
})();
