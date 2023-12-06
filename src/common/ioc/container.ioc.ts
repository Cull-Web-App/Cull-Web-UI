import { Container } from 'inversify';

import {
    IHttpRepository,
    HttpRepository,
    ISymbolRepository,
    SymbolRepository,
    ISubscriptionRepository,
    SubscriptionRepository,
    ISignalRRepository,
    SignalRRepository
} from '../repositories';
import {
    SymbolService,
    ISymbolService,
    ISubscriptionService,
    SubscriptionService
} from '../services';
import { IDENTIFIERS } from './identifiers.ioc';
import getDecorators from 'inversify-inject-decorators';

const container: Container = new Container();
container.bind<IHttpRepository>(IDENTIFIERS.IHTTP_REPOSITORY).to(HttpRepository);
container.bind<ISymbolRepository>(IDENTIFIERS.ISYMBOL_REPOSITORY).to(SymbolRepository);
container.bind<ISymbolService>(IDENTIFIERS.ISYMBOL_SERVICE).to(SymbolService);
container.bind<ISubscriptionRepository>(IDENTIFIERS.ISUBSCRIPTION_REPOSITORY).to(SubscriptionRepository);
container.bind<ISubscriptionService>(IDENTIFIERS.ISUBSCRIPTION_SERVICE).to(SubscriptionService);
container.bind<ISignalRRepository>(IDENTIFIERS.ISIGNALR_REPOSITORY).to(SignalRRepository);

const { lazyInject } = getDecorators(container, false);

export { container, lazyInject };