import { Container } from 'inversify';

import {
    IHttpRepository,
    HttpRepository,
    IAssetRepository,
    AssetRepository,
    ISignalRRepository,
    SignalRRepository,
    IBarRepository,
    BarRepository,
    IWatchRepository,
    WatchRepository,
    UserAvatarRepository,
    IUserAvatarRepository,
    ICalendarRepository,
    CalendarRepository
} from '../repositories';
import {
    AssetService,
    IAssetService,
    IBarService,
    BarService,
    PreferenceService,
    IPreferenceService,
    WatchService,
    IWatchService,
    IUserAvatarService,
    UserAvatarService,
    CalendarService,
    ICalendarService
} from '../services';
import { IDENTIFIERS } from './identifiers.ioc';
import getDecorators from 'inversify-inject-decorators';
import { msalConfig } from '../config';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

const container: Container = new Container();
container.bind<IHttpRepository>(IDENTIFIERS.IHTTP_REPOSITORY).to(HttpRepository);
container.bind<IAssetRepository>(IDENTIFIERS.IASSET_REPOSITORY).to(AssetRepository);
container.bind<IAssetService>(IDENTIFIERS.IASSET_SERVICE).to(AssetService);
container.bind<ISignalRRepository>(IDENTIFIERS.ISIGNALR_REPOSITORY).to(SignalRRepository);
container.bind<IBarRepository>(IDENTIFIERS.IBAR_REPOSITORY).to(BarRepository);
container.bind<IBarService>(IDENTIFIERS.IBAR_SERVICE).to(BarService);
container.bind<IPreferenceService>(IDENTIFIERS.IPREFERENCE_SERVICE).to(PreferenceService);
container.bind<IWatchRepository>(IDENTIFIERS.IWATCH_REPOSITORY).to(WatchRepository);
container.bind<IWatchService>(IDENTIFIERS.IWATCH_SERVICE).to(WatchService);
container.bind<IUserAvatarRepository>(IDENTIFIERS.IUSERAVATAR_REPOSITORY).to(UserAvatarRepository);
container.bind<IUserAvatarService>(IDENTIFIERS.IUSERAVATAR_SERVICE).to(UserAvatarService);
container.bind<IPublicClientApplication>(IDENTIFIERS.IMSAL_INSTANCE).toConstantValue(new PublicClientApplication(msalConfig));
container.bind<ICalendarRepository>(IDENTIFIERS.ICALENDAR_REPOSITORY).to(CalendarRepository);
container.bind<ICalendarService>(IDENTIFIERS.ICALENDAR_SERVICE).to(CalendarService);

const { lazyInject } = getDecorators(container, false);

export { container, lazyInject };