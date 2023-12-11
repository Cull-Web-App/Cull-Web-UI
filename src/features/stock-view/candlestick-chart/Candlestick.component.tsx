import React from 'react';
import { IBar } from '../../../common';

const CandlestickComponent = ({ bar, x, y }: { bar: IBar, x: number, y: number }) => {
    const candleHeight = Math.abs(bar.open - bar.close) * 50;
    const candleWidth = 10;

    // Calculate the y position of the candlestick's top based on the open and close values
    const candleY = bar.open > bar.close ? y - candleHeight : y;

    // Calculate the line's starting y position based on high and max of open/close
    const lineY = y - (bar.high - Math.max(bar.open, bar.close)) * 50;

    const fill = bar.open > bar.close ? 'red' : 'green';

    return (
        <g>
            <rect x={x - candleWidth / 2} y={candleY} width={candleWidth} height={candleHeight} fill={fill} />
            <line x1={x} y1={lineY} x2={x} y2={lineY + (bar.high - bar.low) * 50} stroke={fill} strokeWidth="1" />
        </g>
    );
};

export default CandlestickComponent;

