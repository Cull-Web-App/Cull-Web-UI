import React from 'react';
import { IBar } from '../../../common';

const CandlestickComponent = ({ bar, x, y }: { bar: IBar, x: number, y: number }) => {
    const candleHeight = Math.abs(bar.open - bar.close) * 50;
    const candleWidth = 10;
    const candleX = x - candleWidth / 2;
    const candleY = y - (bar.open > bar.close ? candleHeight : 0);

    const lineY = y - (bar.high - Math.max(bar.open, bar.close)) * 50;
    const fill = bar.open > bar.close ? 'red' : 'green';

    return (
        <g>
            <rect x={candleX} y={candleY} width={candleWidth} height={candleHeight} fill={fill} />
            <line x1={x} y1={lineY} x2={x} y2={lineY + (bar.high - bar.low) * 50} stroke={fill} strokeWidth="1" />
        </g>
    );
};

export default CandlestickComponent;
