import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { IRootPartition, selectBarsForSymbolSorted } from '../../../state';
import './AssetChart.component.scss';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';

type AssetChartProps = AssetChartComponentProps;
interface AssetChartComponentProps {
    symbol: string;
}

export const AssetChartComponent = ({ symbol }: AssetChartProps) => {
    const bars = useSelector((state: IRootPartition) => selectBarsForSymbolSorted(state, symbol));
    if (!bars || bars.length === 0) {
        return (
            <div className="asset-chart-container">
                <div className="asset-chart" data-testid="asset-chart">--</div>
            </div>
        );
    }

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
    
    const options: Highcharts.Options = {
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // dark mode: dark gray, light mode: white
            height: 600,
        },
        rangeSelector: {
            selected: 1
        },
        xAxis: {
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
                x: -3
            },
            height: '100%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
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
            data: data,
            dataGrouping: {
                units: [
                    ['week', [1]],
                    ['month', [1, 2, 3, 4, 6]]
                ]
            },
            tooltip: {
                valueDecimals: 2
            }
        }, {
            type: 'column',
            name: 'Volume',
            data: dataVolume,
            yAxis: 1,
            color: 'rgba(211, 211, 211, 0.1)', // light gray
        }],
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // dark mode: dark gray, light mode: white
            shared: true,
            followPointer: true,
            formatter: function () {
                if (!this.points) return;
                const point = this.points.find(p => p.series.type === 'candlestick')!;
                const volumePoint = this.points.find(p => p.series.name === 'Volume')!;

                if (!point || !point.point || !volumePoint) return;
                const volumeFormatted = new Intl.NumberFormat('en-US', { style: 'decimal' }).format(volumePoint.y as number);

                return `
                    <span style="color:${'#ffffff'}">Open: ${point.point.options.open}</span><br/>
                    <span style="color:${'#ffffff'}">High: ${point.point.options.high}</span><br/>
                    <span style="color:${'#ffffff'}">Low: ${point.point.options.low}</span><br/>
                    <span style="color:${'#ffffff'}">Close: ${point.point.options.close}</span><br/>
                    <span style="color:${'#ffffff'}">Volume: ${volumeFormatted}</span><br/>
                `;
            }
        },
        stockTools: {
            gui: {
                enabled: false
            }
        }
    };

    return (
        <div className="asset-chart-container">
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