import React from 'react';
import { IBar } from '../../../common';
import './CandlestickTooltip.component.css';

export const CandlestickTooltipComponent = ({ bar, variant }: { bar: IBar, variant: string }) => {
    return (
        <div className={`${variant}-candlestick-tooltip`}>
            <div>Open: {bar.open}</div>
            <div>Close: {bar.close}</div>
            <div>High: {bar.high}</div>
            <div>Low: {bar.low}</div>
        </div>
    );
};

export default CandlestickTooltipComponent;