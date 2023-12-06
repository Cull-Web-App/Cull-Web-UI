import { Container } from 'inversify';

import {
    IHttpRepository,
    HttpRepository,
    ISymbolRepository,
    SymbolRepository,
    ISignalRRepository,
    SignalRRepository,
    IBarRepository,
    BarRepository
} from '../repositories';
import {
    SymbolService,
    ISymbolService,
    IBarService,
    BarService
} from '../services';
import { IDENTIFIERS } from './identifiers.ioc';
import getDecorators from 'inversify-inject-decorators';

const container: Container = new Container();
container.bind<IHttpRepository>(IDENTIFIERS.IHTTP_REPOSITORY).to(HttpRepository);
container.bind<ISymbolRepository>(IDENTIFIERS.ISYMBOL_REPOSITORY).to(SymbolRepository);
container.bind<ISymbolService>(IDENTIFIERS.ISYMBOL_SERVICE).to(SymbolService);
container.bind<ISignalRRepository>(IDENTIFIERS.ISIGNALR_REPOSITORY).to(SignalRRepository);
container.bind<IBarRepository>(IDENTIFIERS.IBAR_REPOSITORY).to(BarRepository);
container.bind<IBarService>(IDENTIFIERS.IBAR_SERVICE).to(BarService);

const { lazyInject } = getDecorators(container, false);

export { container, lazyInject };