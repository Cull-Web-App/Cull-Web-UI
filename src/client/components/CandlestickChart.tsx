import * as React from 'react';
import { Component, ReactNode, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { reduxForm, Field, Form, InjectedFormProps } from 'redux-form';
import * as d3 from 'd3';
import { getData } from '../actions';
import {ChartState as ChartProps, ChartData} from '../models';
import { CustomInput } from './CustomInput';
import { svg } from 'd3';
import * as d3time from 'd3-time';

import '../assets/Chart.scss';
import { element, number, string } from 'prop-types';
import moment = require('moment');

interface ChartState
{
    ticker: string,
    interval: string,
    startDate: Date,
    span: number,
    selected: boolean,
    width: number,
    height: number
}

interface ChartOptions
{
    width: number,
    height: number
}

interface formattedData
{
    open: number,
    close: number,
    date: Date,
    high: number,
    low: number
}

interface winDimension
{
    width: number,
    height: number
}

export class CandlestickChart extends Component<ChartProps & DispatchProp<any>, ChartState>
{
    chartRef: React.RefObject<HTMLDivElement>;
    constructor(props: ChartProps & DispatchProp<any> )
    {
        super(props);
        this.state = {
            ticker: 'APL',
            interval: 'h',
            startDate: new Date(),
            selected: false,
            span: 31,
            width: 0,
            height: 0
        }

        this.chartRef = React.createRef();
        this.testMethod = this.testMethod.bind(this);
        this.drawChart = this.drawChart.bind(this);
    }

    getContainerDimensions(): winDimension
    {
        if (this.chartRef.current ){
            return {width: this.chartRef.current.offsetWidth, height: this.chartRef.current.offsetWidth > 1200 ? 600 : this.chartRef.current.offsetWidth / 2 }
        }
        else{
            return {width: 0, height:0}
        }
    }
    


    testMethod = async(event: any): Promise<void> =>
    {
        this.setState({
            selected: true
        });

        const { ticker, interval, startDate, span} = this.state;
        const { dispatch } = this.props;
        const stopDate: Date = (moment(startDate).subtract(span, 'days')).toDate();

        await dispatch(getData({
            ticker: '',
            startDate: startDate,
            stopDate: stopDate,
            interval: interval,
            chartData: []
        }));
    }

    async componentDidMount(): Promise<void>
    {
        await this.testMethod('');
        const {width, height} = this.getContainerDimensions();
        this.setState({
            width: width,
            height:height
        }, () => {
            this.drawChart();
        });
    }

    drawChart = () => 
    {
        const {width, height, ticker} = this.state;
        const svg = d3.select(".svg-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const chartData = this.props.chartParams.chartData;

        const formatTime = d3.timeFormat("%m/%d");

        const x = d3.scaleBand()
                    .domain(chartData.map(d => {return d.dateTime.toISOString()}))
                    .range([40, width-10])
                    .padding(0.2);

        const y = d3.scaleLog()
                    .domain([d3.min(chartData, d => d.low) as number, d3.max(chartData, d => d.high) as number])
                    .rangeRound([height-20, 10]);

        const xAxis = (g: any) => g    
                    .attr("transform", `translate(0,${height - 20})`)
                    .call(d3.axisBottom(x)
                        .tickValues(this.setXAxis(chartData))
                        .tickFormat(function (d){return moment(d).format("M/D")}))
                    .call((g: any) => g.select(".domain").remove());
        
        const yAxis = (g: any) => g
                    .attr("transform", `translate(35,0)`)
                    .call(d3.axisLeft(y)
                        .tickFormat(d3.format("$~f"))
                        .tickValues(d3.scaleLinear().domain(y.domain()).ticks()))
                    .call((g: any) => g.selectAll(".tick line").clone()
                        .attr("stroke-opacity", 0.2)
                        .attr("stroke", "#8c8c8c")
                        .attr("x2", width-55))
                    .call((g: any) => g.select(".domain").remove());

        svg.append("g")
            .attr("class","dateAxis")
            .call(xAxis);
        
        svg.append("g")
            .attr("class","valueAxis")
            .call(yAxis);

        const g = svg.append("g")
            .attr("stroke-linecap", "round")
            .attr("stroke", "black")
            .selectAll("g")
            .data(chartData)
            .join("g")
            .attr("transform", d => `translate(${x(d.dateTime.toISOString())},0)`);
        
        g.append("line")
            .attr("y1", d => y(d.low))
            .attr("y2", d => y(d.high))
            .attr("stroke-opacity", 0.8)
            .attr("stroke", "#8c8c8c");

        g.append("line")
            .attr("y1", d => y(d.open))
            .attr("y2", d => y(d.close))
            .style("stroke", d => d.open > d.close ? "#5fec8f" : d.close > d.open ? "#e3655b" : "#e3655b")
            .attr("stroke-width", x.bandwidth());

        g.append("title")
            .text(d => `${moment(d.dateTime).format("M/D H")}
            Open: ${d.open}
            Close: ${d.close}
            Low: ${d.low}
            High: ${d.high}`);

        return svg.node();      
    }


    setXAxis = (data: ChartData[]): string[] => {
        if (this.state.span == 7 || this.state.span == 31){
            return data.map(d => d.dateTime.toISOString()).filter(d => 
                {
                    const currTime = moment(d);
                    return currTime.hour() == 9
                    
                })
            
        }
        else{
            return []
        }
    }
    

    public render(): ReactNode
    {
        const { dataLoading, chartParams } = this.props;
        const selectionRange = {
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
        };

        return(
                <div className="svg-container" id="svg-container" ref={this.chartRef}>
                </div>);
    }
}

const mapStateToProps = (state: any): ChartProps => 
{
    const { dataLoading, chartParams } = state.chart;
    return {
        dataLoading,
        chartParams
    };
}

// Connect store and set up redux form
export default connect(mapStateToProps)(CandlestickChart)

