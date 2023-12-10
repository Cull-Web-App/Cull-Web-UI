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
    const width = 1600 - margin.left - margin.right;
    const windowWidth = 600;
    const height = 300 - margin.top - margin.bottom;

    const [minTime, setMinTime] = React.useState<Date | null>(null);
    const [maxTime, setMaxTime] = React.useState<Date | null>(null);
    const [minY, setMinY] = React.useState<number | null>(null);
    const [maxY, setMaxY] = React.useState<number | null>(null);
    const [cursorX, setCursorX] = React.useState<number | null>(null);
    const [cursorY, setCursorY] = React.useState<number | null>(null);
    const [showToolTip, setShowToolTip] = React.useState<boolean>(false);
    const [tooltipBar, setTooltipBar] = React.useState<IBar | null>(null);

    useEffect(() => {
        if (bars.length > 0) {
            const allTimes = bars.map(bar => new Date(bar.timeUtc));
            setMinTime(d3.min(allTimes) as Date);
            setMaxTime(d3.max(allTimes) as Date);
            setMinY(d3.min(bars.map(bar => bar.low)) as number);
            setMaxY(d3.max(bars.map(bar => bar.high)) as number);
        }
    }, [bars]);

    useEffect(() => {
        if (minTime && maxTime && minY !== null && maxY !== null) {
            drawAxes();
        }
    }, [minTime, maxTime, minY, maxY]);

    useEffect(() => {
        applyVariant();
    }, [variant, minTime, maxTime, minY, maxY]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const svgRect = (d3.select('#content-container').node() as SVGElement).getBoundingClientRect();
        const mouseX = event.clientX - svgRect.left;
        const mouseY = event.clientY - svgRect.top;

        setCursorX(mouseX);
        setCursorY(mouseY);

        // Find the bar that is closest to the mouse
        if (bars.length > 0 && minTime && maxTime && minY !== null && maxY !== null) {
            const xScale = d3.scaleTime().domain([minTime, maxTime] as Date[]).range([0, width]);
            const hoveredBar = bars.find((bar: IBar) => {
                const x = xScale(new Date(bar.timeUtc));
                return Math.abs(x - mouseX) <= 2; // Adjust the threshold as needed
            });
            if (hoveredBar) {
                setShowToolTip(true);
                setTooltipBar(hoveredBar);
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
        const svg = d3.select('#candlestick-chart');
        const contentContainer = d3.select('#content-container');

        const xScale = d3.scaleTime().domain([minTime, maxTime] as Date[]).range([0, width]);
        const yScale = d3.scaleLinear().domain([minY, maxY] as number[]).range([height, 0]);

        const xAxis = d3.axisBottom(xScale).ticks(d3.timeMinute.every(30));
        const yAxis = d3.axisRight(yScale);

        if (!contentContainer.select('.x-axis').empty()) {
            contentContainer.select<SVGGElement>('.x-axis').remove();
        }
        contentContainer.append<SVGGElement>('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(${0},${height + margin.top})`)
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

    const applyVariant = () => {
        const svg = d3.select('#candlestick-chart');
        const contentContainer = d3.select('#content-container');
        [svg, contentContainer].forEach((selection) => {
            // Apply styles for dark mode using CSS variables
            selection.style('--background-color', 'var(--background-color)');
            selection.selectAll('.x-axis text').style('fill', 'var(--text-color)');
            selection.selectAll('.y-axis text').style('fill', 'var(--text-color)');
            selection.selectAll('.x-axis path').style('stroke', 'var(--text-color)');
            selection.selectAll('.y-axis path').style('stroke', 'var(--text-color)');
        });
    };

    return (
        <div
            style={{ width: windowWidth }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <svg
                id="candlestick-chart"
                style={{ width: '100%', height: height + margin.top + margin.bottom, position: 'absolute', pointerEvents: 'none', zIndex: 1 }}
            >
                <g className='y-axis'></g>
            </svg>
            <div style={{ overflowX: 'scroll', WebkitOverflowScrolling: 'touch', direction: 'rtl' }}>
                <svg id="content-container" width={width} height={height + margin.bottom + margin.top} display="block">
                    <g className='x-axis'></g>
                    <g transform={`translate(${margin.left},${margin.top})`}>
                        {minTime && maxTime && minY !== null && maxY !== null && bars.map((bar: IBar) => (
                            <CandlestickComponent key={`${bar.symbol}-${bar.timeUtc}`} bar={bar} x={d3.scaleTime().domain([minTime, maxTime]).range([0, width])(new Date(bar.timeUtc))} y={d3.scaleLinear().domain([minY, maxY]).range([height, 0])(Math.max(bar.open, bar.close))}/>
                        ))}
                    </g>
                    {cursorX !== null && cursorX >= margin.left && cursorY !== null && cursorY <= height + margin.top && minTime && maxTime && minY !== null && maxY !== null && (
                        <g>
                            {/* Vertical line */}
                            <line
                                x1={cursorX}
                                y1={0 - margin.top}
                                x2={cursorX}
                                y2={height + margin.top}
                                stroke={variant === 'dark' ? '#FFA500' : 'black'}
                                strokeWidth="1"
                                strokeDasharray="5"
                                z={100}
                            />

                            {/* Horizontal line */}
                            <line
                                x1={margin.left}
                                y1={cursorY}
                                x2={windowWidth + margin.left}
                                y2={cursorY}
                                stroke={variant === 'dark' ? '#FFA500' : 'black'}
                                strokeWidth="1"
                                strokeDasharray="5"
                                z={100}
                            />
                            { showToolTip && (
                                <foreignObject x={cursorX + 10} y={cursorY - 40} width="100" height="100">
                                    <CandlestickTooltipComponent bar={tooltipBar as IBar} variant={variant}></CandlestickTooltipComponent>
                                </foreignObject>
                            )}
                        </g>
                    )}
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