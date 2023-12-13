import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { 
    select as d3Select,
    scaleTime as d3ScaleTime,
    scaleLinear as d3ScaleLinear,
    axisBottom as d3AxisBottom,
    axisRight as d3AxisRight,
    zoom as d3Zoom,
    min as d3Min,
    max as d3Max,
    timeMinute as d3TimeMinute,
    timeFormat as d3TimeFormat,
} from 'd3';
import CandlestickComponent from './Candlestick.component';
import CursorComponent from './Cursor.component';
import CandlestickTooltipComponent from './CandlestickTooltip.component';
import './CandlestickChart.component.css';

import { IBar, IScaledBar } from '../../../common';
import { findManyBar } from '../../../state';

type CandlestickChartProps = CandlestickChartDispatchProps & CandlestickChartComponentProps & CandlestickChartReduxProps;
interface CandlestickChartDispatchProps {
    findMany: (({ symbol, from, to }: { symbol: string, from: Date, to: Date }) => void);
}

interface CandlestickChartReduxProps {
}

interface CandlestickChartComponentProps {
    bars: IBar[];
    variant: string;
    maxHeight: number;
    maxWidth: number;
    margin: { top: number, right: number, bottom: number, left: number };
}

const CandlestickChartComponent = ({ bars, variant, maxHeight, maxWidth, margin, findMany }: CandlestickChartProps) => {
    const xTicksMinutes = 30;

    const containerRef = React.useRef<SVGSVGElement>(null);
    const xAxisRef = React.useRef<SVGGElement>(null);
    const yAxisRef = React.useRef<SVGGElement>(null);
    const [scaledBars, setScaledBars] = React.useState<IScaledBar[]>([]);
    const [cursorX, setCursorX] = React.useState<number | null>(null);
    const [cursorY, setCursorY] = React.useState<number | null>(null);
    const [cursorYScaled, setCursorYScaled] = React.useState<number | null>(null); // The y-axis value at the cursor's x-axis position
    const [cursorBar, setCursorBar] = React.useState<IBar | null>(null); // The bar at the cursor's x-axis position
    const [showToolTip, setShowToolTip] = React.useState<boolean>(false);
    const [tooltipBar, setTooltipBar] = React.useState<IBar | null>(null); // The bar that the cursor is hovering over
    const [defaultScales, setDefaultScales] = React.useState<{ xScale: d3.ScaleTime<number, number> | null, yScale: d3.ScaleLinear<number, number> | null}>({ xScale: null, yScale: null });
    const [rescaledScales, setRescaledScales] = React.useState<{ xScale: d3.ScaleTime<number, number> | null, yScale: d3.ScaleLinear<number, number> | null}>({ xScale: null, yScale: null });
    const [axis, setAxis] = React.useState<{ xAxis: d3.Axis<Date | d3.NumberValue> | null, yAxis: d3.Axis<d3.NumberValue> | null}>({ xAxis: null, yAxis: null });

    useEffect(() => {
        if (bars.length > 0) {
            // Set the mins and maxs rounded to the nearest tick minutes
            const allTimes = bars.map(bar => bar.timeUtc);
            const from = d3Min(allTimes) as Date;
            from.setMinutes(Math.floor(from.getMinutes() / xTicksMinutes) * xTicksMinutes);
            const to = d3Max(allTimes) as Date;
            to.setMinutes(Math.ceil(to.getMinutes() / xTicksMinutes) * xTicksMinutes);

            const minLow = d3Min(bars.map(bar => bar.low)) as number;
            const maxHigh = d3Max(bars.map(bar => bar.high)) as number;

            // Scale the bars
            const xScale = d3ScaleTime().domain([from, to] as Date[]).range([margin.left, maxWidth - margin.right]);
            const yScale = d3ScaleLinear().domain([minLow - (maxHigh - minLow) * 0.1, maxHigh + (maxHigh - minLow) * 0.1] as number[]).range([maxHeight - margin.top, margin.bottom]);
            const scaledBars: IScaledBar[] = bars.map(bar => ({
                ...bar,
                scaledOpen: yScale(bar.open),
                scaledClose: yScale(bar.close),
                scaledHigh: yScale(bar.high),
                scaledLow: yScale(bar.low),
                scaledTimeUtc: xScale(bar.timeUtc),
                scaledVolume: yScale(bar.volume),
                scaledVwap: yScale(bar.vwap),
                x: xScale(bar.timeUtc),
                y: yScale(Math.max(bar.open, bar.close))
            }));
            setScaledBars(scaledBars);

            // Create the axis
            const xAxis: d3.Axis<Date | d3.NumberValue> = d3AxisBottom(xScale).ticks(d3TimeMinute.every(xTicksMinutes));
            const yAxis: d3.Axis<d3.NumberValue> = d3AxisRight(yScale);
            d3Select(xAxisRef.current!).call(xAxis);
            d3Select(yAxisRef.current!)
                .call(yAxis)
                .selectAll('.tick line')
                .attr('x2', -maxWidth) // Draw lines to the left (negative x-value) to span the chart area
                .attr('stroke', 'lightgrey')
                .attr('stroke-dasharray', '.3');;
            setDefaultScales({ xScale, yScale });
            setRescaledScales({ xScale, yScale });
            setAxis({ xAxis, yAxis });
        }
    }, [bars, xTicksMinutes]);

    useEffect(() => {
        if (!!defaultScales.xScale && !!defaultScales.yScale && !!axis.xAxis && !!axis.yAxis) {
            applyZoom();
        }
    }, [defaultScales]);

    const handleMouseMove = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        const { xScale, yScale } = rescaledScales;
        if (bars.length > 0 && xScale && yScale) {
            const contentContainerRect = d3Select(containerRef.current!).node()!.getBoundingClientRect();

            const nearestMinute = d3TimeMinute.round(xScale.invert(event.clientX - contentContainerRect.left));
            const mouseX = xScale(nearestMinute);
            const mouseY = event.clientY - contentContainerRect.top;
            const mouseYScaled = yScale.invert(event.clientY - contentContainerRect.top);
    
            setCursorX(mouseX);
            setCursorY(mouseY);
            setCursorYScaled(mouseYScaled);
    
            const nearestBar = bars.find(bar => bar.timeUtc.getTime() === nearestMinute.getTime());
    
            if (nearestBar) {
                setShowToolTip(true);
                setTooltipBar(scaleBar(nearestBar, xScale, yScale));
                setCursorBar(scaleBar(nearestBar, xScale, yScale));
            } else {
                setShowToolTip(false);
                setTooltipBar(null);
                setCursorBar(null);
            }
        }
    };

    const handleMouseLeave = () => {
        setCursorX(null);
        setCursorY(null);
        setShowToolTip(false);
        setTooltipBar(null);
    };
    
    const applyZoom = () => {
        const zoomHandler = d3Zoom<SVGSVGElement, unknown>()
            .scaleExtent([.5, 10]) // Restrict the zoom levels
            .translateExtent([[0, 0], [maxWidth, maxHeight]]) // Restrict the panning
            .on('zoom', zoomed);

        d3Select(containerRef.current!).call(zoomHandler);
    };

    const zoomed = (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        const { transform } = event;
        const { xScale, yScale } = defaultScales;
        const newXScale = transform.rescaleX(xScale!);
        const scaledBars: IScaledBar[] = getScaledBars(newXScale, yScale!);
        setScaledBars(scaledBars);
        setRescaledScales({ xScale: newXScale, yScale });
        d3Select(xAxisRef.current!).call(axis.xAxis!.scale(newXScale));
    };

    const getScaledBars = (xScale: d3.ScaleTime<number, number>, yScale: d3.ScaleLinear<number, number>) => {
        return bars.map(bar => scaleBar(bar, xScale, yScale));
    }

    const scaleBar = (bar: IBar, xScale: d3.ScaleTime<number, number>, yScale: d3.ScaleLinear<number, number>) => {
        return {
            ...bar,
            scaledOpen: yScale(bar.open),
            scaledClose: yScale(bar.close),
            scaledHigh: yScale(bar.high),
            scaledLow: yScale(bar.low),
            scaledTimeUtc: xScale(bar.timeUtc),
            scaledVolume: yScale(bar.volume),
            scaledVwap: yScale(bar.vwap),
            x: xScale(bar.timeUtc),
            y: yScale(Math.max(bar.open, bar.close))
        };
    };

    return (
        <svg
            id="chart-container"
            width={maxWidth + margin.left + margin.right}
            height={maxHeight + margin.top + margin.bottom}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <g id="bars-container">
                {
                    scaledBars.map((scaledBar) => (<CandlestickComponent key={`${scaledBar.symbol}-${scaledBar.timeUtc.toISOString()}`} scaledBar={scaledBar} width={10}/>))
                }
            </g>
            <g>
                <g id="x-axis-container" className="x-axis" ref={xAxisRef} transform={`translate(${margin.right - margin.left},${maxHeight})`}></g>
                <g id="y-axis-container" className="y-axis" ref={yAxisRef} transform={`translate(${maxWidth - margin.right},${margin.top})`}></g>
            </g>
            <CursorComponent cursorX={cursorX} cursorY={cursorY} cursorYScaled={cursorYScaled} maxWidth={maxWidth} maxHeight={maxHeight} variant={variant} margin={margin} cursorBar={cursorBar}></CursorComponent>
        </svg>
    );
};

const mapStateToProps = (state: any): CandlestickChartReduxProps => {
    return {
    };
}

const mapDispatchToProps = (dispatch: any): CandlestickChartDispatchProps => {
    return {
        findMany: ({ symbol, from, to }: { symbol: string, from: Date, to: Date }) => dispatch(findManyBar({ symbol, from, to })),
    };
}

export default connect<CandlestickChartReduxProps, CandlestickChartDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(memo(CandlestickChartComponent));