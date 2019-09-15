import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import { alertConstants } from '../../constants';
import { successAlert, errorAlert, clearAlert } from '../../actions';

describe('Alert actions', () =>
{

    it('should check all alert actions functions', () => 
    {

        expect(successAlert('')).toEqual({
            type: alertConstants.SUCCESS,
            message: ''
        });

        expect(errorAlert('')).toEqual({
            type: alertConstants.ERROR,
            message: ''
        });

        expect(clearAlert('')).toEqual({
            type: alertConstants.CLEAR,
            message: ''
        });
    });
});