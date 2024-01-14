import React, { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { barConnect, barDisconnect, findManyBar, subscribeBar, unsubscribeBar } from '../../state';
import { ConnectionStatus, IBar, SubscriptionStatus } from '../../common';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type SparkChartProps = SparkChartComponentProps & SparkChartReduxProps & SparkChartDispatchProps;
interface SparkChartReduxProps {
}
interface SparkChartDispatchProps {
    findMany: ({ symbol, from, to }: { symbol: string, from: Date, to: Date }) => void;
}

interface SparkChartComponentProps {
    symbol: string;
    bars: IBar[];
}

export const SparkChartComponent = ({ bars, symbol, findMany }: SparkChartProps) => {
    const chartRef = useRef<HighchartsReact.RefObject>(null);
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
            height: 50, // Increase height
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
        // Ensure that the from and to are on the nearest market day -- from is yesterday, to is today
        // Market days are Monday through Friday -- no weekends
        let to = new Date();
        let from = new Date();

        // If today is Sunday (getDay() returns 0), set to and from to the previous Friday
        if (to.getDay() === 0) {
            to.setDate(to.getDate() - 2);
            from.setDate(to.getDate() - 1);
        } 
        // If today is Saturday (getDay() returns 6), set to and from to the previous Friday
        else if (to.getDay() === 6) {
            to.setDate(to.getDate() - 1);
            from.setDate(to.getDate() - 1);
        } 
        // If today is Monday (getDay() returns 1), set from to the previous Friday
        else if (to.getDay() === 1) {
            from.setDate(to.getDate() - 3);
        } 
        // Otherwise, set from to the previous day
        else {
            from.setDate(to.getDate() - 1);
        }

        findMany({ symbol, from, to });
    }, [symbol]);

    return (
        <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            options={options}
        />
    );
};

const mapStateToProps = (state: any): SparkChartReduxProps => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any): SparkChartDispatchProps => {
    return {
        findMany: ({ symbol, from, to }: { symbol: string, from: Date, to: Date }) => dispatch(findManyBar({ symbol, from, to }))
    };
};

export default connect<SparkChartReduxProps, SparkChartDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(memo(SparkChartComponent));