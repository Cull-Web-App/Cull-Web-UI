import React, { memo, useEffect } from 'react';
import './AssetChart.component.scss';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { IBar } from '../../../common';

type AssetChartProps = AssetChartComponentProps;
interface AssetChartComponentProps {
    symbol: string;
    bars: IBar[];
}

export const AssetChartComponent = ({ symbol, bars }: AssetChartProps) => {
    const [options, setOptions] = React.useState<Highcharts.Options>({
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // dark mode: dark gray, light mode: white
            height: 600
        },
        rangeSelector: {
            enabled: false
        },
        navigator: {
            series: {
                color: '#7cb5ec',
                lineColor: '#7cb5ec'
            }
        },
        xAxis: {
            labels: {
                style: {
                    color: 'rgba(128, 128, 128, 1)' // light gray
                }
            },
            crosshair: {
                color: '#FFA500', // orange color
                width: 1, // width of the line
                snap: true,
                label: {
                    enabled: true,
                    format: '{value:%H:%M}',
                    backgroundColor: '#FFA500', // background color (orange)
                    padding: 3,
                    shape: 'square',
                    style: {
                        color: '#000000', // text color (black)
                        fontWeight: 'bold'
                    }
                }
            }
        },
        yAxis: [{
            crosshair: {
                color: '#FFA500', // orange color
                width: 1, // width of the line
                snap: false,
                label: {
                    enabled: true,
                    format: '@{value:.2f}',
                    backgroundColor: 'green', // background color (orange)
                    padding: 3,
                    shape: 'square',
                    style: {
                        fontWeight: 'bold'
                    }
                }
            },
            labels: {
                align: 'right',
                x: -3,
                style: {
                    color: 'rgba(128, 128, 128, 1)'
                }
            },
            height: '100%',
            lineWidth: 2,
            resize: {
                enabled: true
            },
            gridLineColor: 'rgba(128, 128, 128, 0.3)',
            color: 'rgba(128, 128, 128, 5)'
        }, {
            labels: {
                align: 'right',
                x: -3,
                style: {
                    color: 'rgba(192, 192, 192, 1)'
                }
            },
            title: {
                text: 'Volume'
            },
            height: '100%',
            lineWidth: 2,
            offset: 0,
            opposite: false,
            visible: false,
        }],
        plotOptions: {
            candlestick: {
                color: 'red',
                upColor: 'green',
                lineColor: 'red',
                upLineColor: 'green',
            }
        },
        series: [{
            type: 'candlestick',
            name: `${symbol} Stock Price`,
            data: [],
            tooltip: {
                valueDecimals: 2
            }
        }, {
            type: 'column',
            name: 'Volume',
            data: [],
            yAxis: 1,
            color: 'rgba(211, 211, 211, 0.1)', // light gray
        }],
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // dark mode: dark gray, light mode: white
            shared: true,
            followPointer: true,
            formatter: function () {
                if (!this.points) return;
                const point = this.points.find(p => p.series.userOptions.type === 'candlestick')!;
                const volumePoint = this.points.find(p  => p.series.name === 'Volume')!;

                if (!point || !point.point || !volumePoint) return;
                const volumeFormatted = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(volumePoint.y as number);

                const values = point.point as unknown as { open: number, high: number, low: number, close: number };
                return `
                    <span style="color:${'#ffffff'}">Open: ${values.open}</span><br/>
                    <span style="color:${'#ffffff'}">High: ${values.high}</span><br/>
                    <span style="color:${'#ffffff'}">Low: ${values.low}</span><br/>
                    <span style="color:${'#ffffff'}">Close: ${values.close}</span><br/>
                    <span style="color:${'#ffffff'}">Volume: ${volumeFormatted}</span><br/>
                `;
            }
        },
        stockTools: {
            gui: {
                enabled: false
            }
        },
        time: {
            useUTC: false
        }
    });

    useEffect(() => {
        const data = bars.map(bar => ([
            new Date(bar.timeUtc).getTime(), // the date
            bar.open, // open
            bar.high, // high
            bar.low, // low
            bar.close, // close
            bar.volume
        ]));

        const dataVolume = bars.map(bar => ([
            new Date(bar.timeUtc).getTime(), // the date
            bar.volume // volume
        ]));

        setOptions((prevOptions: Highcharts.Options) => ({
            ...prevOptions,
            series: [{
                ...prevOptions.series![0],
                data: [...data]
            }, {
                ...prevOptions.series![1],
                data: [...dataVolume]
            }]
        } as Highcharts.Options));
    }, [bars]);

    return (
        <div className="asset-chart-element-container">
            <div className="asset-chart" data-testid="asset-chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={options}
                />
            </div>
        </div>
    );
};

export default memo(AssetChartComponent);