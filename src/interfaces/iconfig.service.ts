import { Observable } from "rxjs";
import { ApiConfiguration, Configuration, EnvConfiguration } from "../models";

export interface IConfigService
{
    getApiConfiguration(): Observable<ApiConfiguration>;
    getEnvConfiguration(): Observable<EnvConfiguration>;
    getAllConfiguration(): Observable<Configuration>
}
