import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import CandlestickComponent from './Candlestick.component';
import CandlestickTooltipComponent from './CandlestickTooltip.component';
import './CandlestickChart.component.css';

import { IBar } from '../../../common';
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
}

const CandlestickChartComponent = ({ bars, variant, findMany }: CandlestickChartProps) => {
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const totalWidth = 1600;
    const width = totalWidth - margin.left - margin.right;
    const windowWidth = totalWidth / 2;
    const height = 300 - margin.top - margin.bottom;

    const [minTime, setMinTime] = React.useState<Date | null>(null);
    const [maxTime, setMaxTime] = React.useState<Date | null>(null);
    const [minY, setMinY] = React.useState<number | null>(null);
    const [maxY, setMaxY] = React.useState<number | null>(null);
    const [cursorX, setCursorX] = React.useState<number | null>(null);
    const [cursorY, setCursorY] = React.useState<number | null>(null);
    const [cursorBar, setCursorBar] = React.useState<IBar | null>(null); // The bar at the cursor's x-axis position
    const [showToolTip, setShowToolTip] = React.useState<boolean>(false);
    const [tooltipBar, setTooltipBar] = React.useState<IBar | null>(null); // The bar that the cursor is hovering over

    useEffect(() => {
        if (bars.length > 0) {
            const allTimes = bars.map(bar => new Date(bar.timeUtc));
            // Set the mins and maxs rounded to the nearest 30 minutes
            const from = d3.min(allTimes) as Date;
            from.setMinutes(Math.ceil(from.getMinutes() / 30) * 30);
            const to = d3.max(allTimes) as Date;
            to.setMinutes(Math.ceil(to.getMinutes() / 30) * 30);
            setMinTime(from);
            setMaxTime(to);

            const minLow = d3.min(bars.map(bar => bar.low)) as number;
            const maxHigh = d3.max(bars.map(bar => bar.high)) as number;
            setMinY(minLow - (maxHigh - minLow) * 0.1);
            setMaxY(maxHigh + (maxHigh - minLow) * 0.1);
        }
    }, [bars]);

    useEffect(() => {
        if (minTime && maxTime && minY !== null && maxY !== null) {
            drawAxes();
        }
    }, [minTime, maxTime, minY, maxY]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (bars.length > 0 && minTime && maxTime && minY !== null && maxY !== null) {
            const contentContainerRect = (d3.select('#content-container').node() as SVGElement).getBoundingClientRect();
            const chartLinesRect = (d3.select('#chart-lines').node() as SVGElement).getBoundingClientRect();
            const xScale = getXScale();
            const nearestMinute = d3.timeMinute.round(xScale.invert(event.clientX - chartLinesRect.left));
            const trueMousePositionX = d3.timeMinute.round(xScale.invert(event.clientX - contentContainerRect.left));
            const mouseX = xScale(nearestMinute);
            const mouseY = event.clientY - contentContainerRect.top;
    
            setCursorX(mouseX);
            setCursorY(mouseY);
    
            const nearestBar = bars.find(bar => new Date(bar.timeUtc).getTime() === trueMousePositionX.getTime());
    
            if (nearestBar) {
                setShowToolTip(true);
                setTooltipBar(nearestBar);
                setCursorBar(nearestBar);
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

    const drawAxes = () => {
        const svg = d3.select('#y-axis-container');
        const contentContainer = d3.select('#content-container');

        const xScale = getXScale();
        const yScale = getYScale();

        const xAxis = d3.axisBottom(xScale).ticks(d3.timeMinute.every(30));
        const yAxis = d3.axisRight(yScale);

        if (!contentContainer.select('.x-axis').empty()) {
            contentContainer.select<SVGGElement>('.x-axis').remove();
        }
        contentContainer.append<SVGGElement>('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(${margin.right - margin.left},${height + margin.top})`)
            .call(xAxis);

        const yAxisGroup = svg.select<SVGGElement>('.y-axis');
        if (!yAxisGroup.empty()) {
            yAxisGroup.remove();
        }
        svg.append<SVGGElement>('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${windowWidth},${margin.top})`) // Move to the right side
            .call(yAxis)
            .selectAll('.tick line')
            .attr('x2', -windowWidth) // Draw lines to the left (negative x-value) to span the chart area
            .attr('stroke', 'lightgrey')
            .attr('stroke-dasharray', '.3');
    };

    const getXScale = () => {
        return d3.scaleTime().domain([minTime, maxTime] as Date[]).range([0, width - margin.left - margin.right]);
    }

    const getYScale = () => {
        return d3.scaleLinear().domain([minY, maxY] as number[]).range([height, 0]);
    }

    return (
        <div
            style={{ width: windowWidth }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <svg
                id="y-axis-container"
                style={{ width: '100%', height: height + margin.top + margin.bottom, position: 'absolute', pointerEvents: 'none' }}
            >
                {/* Draw the y-axis */}
                <g className='y-axis'></g>
            </svg>
            <div id="chart-view-box" className="chart-view-box">
                <svg id="chart-lines" className="chart-lines" width={width} height={height + margin.bottom + margin.top}>
                {cursorX !== null && cursorX >= margin.left && cursorY !== null && cursorY <= height + margin.top && minTime && maxTime && minY !== null && maxY !== null && (
                        <g>
                            <line
                                x1={cursorX}
                                y1={0 - margin.top}
                                x2={cursorX}
                                y2={height + margin.top}
                                stroke={variant === 'dark' ? '#FFA500' : 'black'}
                                strokeWidth="1"
                            />
                            { /* Box showing x-axis value */ }
                            {cursorBar !== null && (
                            <g>
                                <rect
                                    x={cursorX - 15}
                                    y={height + margin.top + 5}
                                    width={30}
                                    height={15}
                                    fill={variant === 'dark' ? '#FFA500' : 'white'}
                                    stroke="black"
                                />
                                <text
                                    x={cursorX}
                                    y={height + margin.top + 13}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="black"
                                    fontSize="10px"
                                    fontWeight="bold"
                                >
                                    {/* Display x-axis value */}
                                    {d3.timeFormat('%H:%M')(new Date(cursorBar.timeUtc))}
                                </text>
                            </g>
                            )}

                            {/* Horizontal line */}
                            <line
                                x1={width - windowWidth}
                                y1={cursorY}
                                x2={width + margin.left}
                                y2={cursorY}
                                stroke={variant === 'dark' ? '#FFA500' : 'black'}
                                strokeWidth="1"
                            />
                            { /* Box showing y-axis value */ }
                            <rect
                                x={width + margin.right - 15}
                                y={cursorY - 10}
                                z={999}
                                width={35}
                                height={20}
                                fill={variant === 'dark' ? '#FFA500' : 'white'}
                                stroke="black"
                            />
                            <text
                                x={width + margin.right - 2.5}
                                y={cursorY + 1}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="black"
                                fontSize="10px"
                                fontWeight="bold"
                            >
                                {/* Display y-axis value */}
                                {(getYScale().invert(cursorY))}
                            </text>

                            {/* Tooltip */}
                            { showToolTip && (
                                <foreignObject x={cursorX + 10} y={cursorY - 40} width="150" height="200">
                                    <CandlestickTooltipComponent bar={tooltipBar as IBar} variant={variant}></CandlestickTooltipComponent>
                                </foreignObject>
                            )}
                        </g>
                    )}
                </svg>
                <svg id="content-container" className="content-container" width={width} height={height + margin.bottom + margin.top}>
                    {/* Draw the x-axis */}
                    <g className='x-axis'></g>

                    {/* Draw the bars */}
                    <g transform={`translate(${margin.left},${margin.top})`}>
                        {minTime && maxTime && minY !== null && maxY !== null && bars.map((bar: IBar) => (
                            <CandlestickComponent key={`${bar.symbol}-${bar.timeUtc}`} bar={bar} x={getXScale()(new Date(bar.timeUtc))} y={getYScale()(Math.max(bar.open, bar.close))}/>
                        ))}
                    </g>
                </svg>
            </div>
        </div>
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
)(CandlestickChartComponent);