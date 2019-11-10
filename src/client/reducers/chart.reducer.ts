import { chartConstants } from '../constants';
import { ChartState, IChartDataAction, ChartParams } from '../models';

// Create the initial state -- async to get the user info
const initialState: ChartState = {
    dataLoading: false,
    chartParams:{
        ticker:'',
        startDate: new Date(),
        stopDate: new Date(),
        chartData:[],
        interval:'h'
    }
};

export const chart = (state: ChartState = initialState, action: IChartDataAction): ChartState =>
{
    switch (action.type)
    {
        case chartConstants.NEW_DATA_REQUEST:
            return <ChartState> {
                dataLoading: true
            };
        case chartConstants.NEW_DATA_SUCCESS:
            return <ChartState> {
                dataLoading: false,
                chartParams: action.chartParams
            };
        case chartConstants.NEW_DATA_ERROR:
            return <ChartState> {};
        default:
            return state;
    }
}