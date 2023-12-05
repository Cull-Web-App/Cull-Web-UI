import { Observable, of } from 'rxjs';
import { CONFIG } from '../config';
import { IConfigService, IHTTPService } from '../interfaces';
import { injectable, inject } from 'inversify';
import { Configuration, ApiConfiguration, EnvConfiguration } from '../models';
import { SERVICE_IDENTIFIERS } from '../constants';
import { map } from 'rxjs/operators';

@injectable()
export class ConfigService implements IConfigService {
    private env: string = process.env.NODE_ENV?.toUpperCase() || 'LOCAL'; // This should be the assigned env at runtime -- will this work without dev server??
    private configuration: Configuration = <Configuration>{};

    public constructor(
        @inject(SERVICE_IDENTIFIERS.IHTTP_SERVICE) private readonly httpService: IHTTPService)
    {
    }

    public getApiConfiguration(): Observable<ApiConfiguration>
    {
        if (!this.configuration.apiConfig) {
            return this.httpService.sendGet(`${CONFIG[this.env].CONFIG_API_URL}/getApiConfigForEnv`).pipe(
                map(response => {
                    this.configuration.apiConfig = JSON.parse(response.data as string).config as ApiConfiguration;
                    return this.configuration.apiConfig;
                })
            );
        }

        return of(this.configuration.apiConfig);
    }

    public getEnvConfiguration(): Observable<EnvConfiguration>
    {
        if (!this.configuration.envConfig) {
            return this.httpService.sendGet(`${CONFIG[this.env].CONFIG_API_URL}/getEnvConfigForEnv`).pipe(
                map(response => {
                    this.configuration.envConfig = JSON.parse(response.data as string).config as EnvConfiguration;
                    return this.configuration.envConfig;
                })
            );
        }
        return of(this.configuration.envConfig);
    }

    public getAllConfiguration(): Observable<Configuration>
    {
        if (!this.configuration.apiConfig || !this.configuration.envConfig)
        {
            return this.httpService.sendGet(`${CONFIG[this.env].CONFIG_API_URL}/getAllConfigsForEnv`).pipe(
                map(response => {
                    this.configuration = JSON.parse(JSON.parse(response.data as string).body) as Configuration;
                    return this.configuration;
                })
            );
        }

        // Return the cached configuration -- in context this should be quick and avoid circular DI issue
        return of(this.configuration);
    }
}
