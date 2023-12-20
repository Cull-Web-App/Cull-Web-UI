import React from 'react';
import { IBar } from '../../../common';
import './CandlestickTooltip.component.css';

type CandlestickTooltipComponentProps = {
    bar: IBar,
    cursorX: number | null,
    cursorY: number | null,
    variant: string,
    padding: { x: number, y: number }
};

export const CandlestickTooltipComponent = ({ bar, cursorX, cursorY, variant, padding }: CandlestickTooltipComponentProps) => {
    return (
        <div className={`${variant}-candlestick-tooltip`}>
            <div>Time: {bar.timeUtc.toLocaleTimeString()}</div>
            <div>Open: {bar.open}</div>
            <div>Close: {bar.close}</div>
            <div>High: {bar.high}</div>
            <div>Low: {bar.low}</div>
        </div>
    );
};

export default CandlestickTooltipComponent;