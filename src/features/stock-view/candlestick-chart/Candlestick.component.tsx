import React from 'react';
import { IScaledBar } from '../../../common';

const CandlestickComponent = ({ scaledBar, width }: { scaledBar: IScaledBar, width: number }) => {
    const candleHeight = Math.abs(scaledBar.scaledOpen - scaledBar.scaledClose);
    const x = scaledBar.x;

    // Calculate the y position of the candlestick's top based on the open and close values
    const candleY = scaledBar.scaledOpen > scaledBar.scaledClose ? scaledBar.scaledOpen - candleHeight : scaledBar.scaledClose - candleHeight;

    // Calculate the line y1 and y2 based on the high and low values
    const lineY1 = scaledBar.scaledHigh;
    const lineY2 = scaledBar.scaledLow;

    const fill = scaledBar.scaledOpen > scaledBar.scaledClose ? 'red' : 'green';

    return (
        <g>
            <rect x={x - width / 2} y={candleY} width={width} height={candleHeight} fill={fill} />
            <line x1={x} y1={lineY1} x2={x} y2={lineY2} stroke={fill} strokeWidth="1" />
        </g>
    );
};

export default CandlestickComponent;

