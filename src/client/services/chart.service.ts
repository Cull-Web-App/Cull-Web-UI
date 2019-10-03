import { ChartParams, ChartData } from '../models';
import CONFIG from '../config';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export abstract class ChartService 
{
    public static async getNewData(params: ChartParams): Promise<any>
    {
        const config: AxiosRequestConfig = {
            baseURL: 'https://inky9i2mm6.execute-api.us-east-1.amazonaws.com/dev/',
            url: 'candlestick',
            params: {
                ticker: params.ticker,
                interval: params.interval
            },
            responseType: 'json'
        }

        const resp = await axios.get('',config);
        params.chartData = resp.data;
        return params;
        
    }
}