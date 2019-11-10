import { ChartParams, ChartData } from '../models';
import CONFIG from '../config';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import * as d3 from 'd3';

export abstract class ChartService 
{
    public static async getNewData(params: ChartParams): Promise<ChartData[]>
    {
        const config: AxiosRequestConfig = {
            baseURL: 'https://inky9i2mm6.execute-api.us-east-1.amazonaws.com/dev/candlestick',
            params: {
                symbol: params.ticker,
                interval: params.interval,
                startDate: params.stopDate.toJSON(),
                stopDate: params.startDate.toJSON()
            },
            responseType: 'json'
        }

        const resp = await axios.get('',config);
        //resp.data.map((d:any) => {console.log(new Date(d.dateTime).toLocaleString())});

        const formatData = resp.data.map((d: any) => {

            var tempDate = new Date(d.dateTime);
            tempDate.setHours(tempDate.getHours() + 5);
            const currDate = 
            {
                dateTime: tempDate,
                open: d.open,
                close: d.close,
                high: d.high,
                low: d.low,
                volume: d.volume,
                change: d.change,
                changePercent:d.changePercent
            }
            return currDate;
        });

        return formatData;
    }
}


