import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findManyBar, findManyCalendar, selectCalendars } from '../../state';
import { IBar, ICalendar } from '../../common';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type SparkChartProps = SparkChartComponentProps;
interface SparkChartComponentProps {
    symbol: string;
    bars: IBar[];
}

export const SparkChartComponent = ({ bars, symbol }: SparkChartProps) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);

    const dispatch = useDispatch();
    const findManyBars = ({ symbol, from, to }: { symbol: string, from: Date, to: Date }) => dispatch(findManyBar({ symbol, from, to }));

    const calendars = useSelector(selectCalendars);

    const [options, setOptions] = useState<HighchartsReact.Props>({
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: 'transparent', // Dark background color
            type: 'area',
            margin: [2, 0, 2, 0],
            width: 160, // Increase width
            height: 80, // Increase height
            style: {
                overflow: 'visible'
            },
            skipClone: true
        },
        colors: ['#F3E796'],
        xAxis: {
            labels: {
                style: {
                    color: '#F0F0F3' // Light label color for contrast
                },
                enabled: false
            },
            lineColor: '#707073', // Dark line color
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            labels: {
                style: {
                    color: '#F0F0F3' // Light label color for contrast
                },
                enabled: false
            },
            lineColor: '#707073', // Dark line color
            endOnTick: false,
            startOnTick: false,
            title: {
                text: null
            },
            tickPositions: [0]
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            }
        },
        series: [
            {
                data: [],
                color: '#1f8ef1',
                fillOpacity: 0.3,
                threshold: null
            }
        ],
    });

    useEffect(() => {
        setOptions(prevOptions => ({
            ...prevOptions,
            series: [
                {
                    ...prevOptions.series[0],
                    data: bars.map(bar => [bar.timeUtc.getTime(), bar.close])
                }
            ]
        }));
    }, [bars]);

    useEffect(() => {
        if (calendars.length > 0) {
            // Find the full set of bars for the last day in the calendar
            // should this be a day or just an hour?
            const lastCalendar = calendars[calendars.length - 1];
            const todayMinusFifteenMinutes = new Date();
            todayMinusFifteenMinutes.setMinutes(todayMinusFifteenMinutes.getMinutes() - 15);
            findManyBars({ symbol, from: lastCalendar.sessionOpen, to: lastCalendar.sessionClose > todayMinusFifteenMinutes ? todayMinusFifteenMinutes : lastCalendar.sessionClose });
        }
    }, [symbol, calendars]);

    return (
        <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            options={options}
        />
    );
};

export default memo(SparkChartComponent);