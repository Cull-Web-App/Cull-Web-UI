import { Dispatch } from 'redux';
import { chartConstants } from '../constants';
import { ChartParams, IAction, IChartDataAction, ChartData } from '../models';
import { ChartService } from '../services';
import { successAlert, errorAlert } from './alert.actions';
import { dispatch } from 'd3';

export const getData = (params: ChartParams): ((dispatch: Dispatch<any>)  => void) =>
{
    return async (dispatch: Dispatch<any>) =>
    {
        dispatch(<IAction>{
            type: chartConstants.NEW_DATA_REQUEST
        });

        try
        {
            const new_data: ChartData[]  = await ChartService.getNewData(params);
            params.chartData = new_data;
            dispatch(<IAction>{
                type: chartConstants.NEW_DATA_SUCCESS,
                chartParams: params
            });

            dispatch(successAlert('Got Data Successfully'));
        }
        catch(e)
        {
            dispatch(<IAction>{
                type: chartConstants.NEW_DATA_ERROR,
                error: e.toString()
            });
        }
    }
}