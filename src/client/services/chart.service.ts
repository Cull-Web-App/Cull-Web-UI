import { ChartParams, ChartData } from '../models';
import CONFIG from '../config';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export abstract class ChartService 
{
    public static async getNewData(params: ChartParams): Promise<ChartData[]>
    {
        const config: AxiosRequestConfig = {
            baseURL: 'https://inky9i2mm6.execute-api.us-east-1.amazonaws.com/dev/candlestick',
            params: {
                ticker: params.ticker,
                interval: params.interval
            },
            responseType: 'json'
        }

        const resp = await axios.get('',config);
        return resp.data;
    }
}