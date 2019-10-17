import { chartConstants } from '../constants';
import { ChartState, IChartDataAction } from '../models';

// Create the initial state -- async to get the user info
const initialState: ChartState = {
    dataCurrent: false
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
                dataCurrent: true,
                dataLoading: false,
                chartParams: action.chartParams
            };
        case chartConstants.NEW_DATA_ERROR:
            return <ChartState> {};
        default:
            return state;
    }
}