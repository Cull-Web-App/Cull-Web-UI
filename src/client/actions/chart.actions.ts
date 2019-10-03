import { Dispatch } from 'redux';
import { chartConstants } from '../constants';
import { ChartParams, IAction, IChartDataAction } from '../models';
import { ChartService } from '../services';
import { successAlert, errorAlert } from './alert.actions';
import { dispatch } from 'd3';

export const getData = (params: ChartParams): any  =>
{
    return async (dispatch: any) =>
    {
        dispatch(<IChartDataAction>{
            type: chartConstants.NEW_DATA_REQUEST
        });

        try
        {
            params = await ChartService.getNewData(params);
            dispatch(<IChartDataAction>{
                type: chartConstants.NEW_DATA_SUCCESS,
                chartParams: params
            });
        }
        catch(e)
        {
            dispatch(<IChartDataAction>{
                type: chartConstants.NEW_DATA_ERROR
            });
        }
    }
}