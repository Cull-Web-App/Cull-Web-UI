import * as React from 'react';
import { Component, ReactNode, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { reduxForm, Field, Form, InjectedFormProps } from 'redux-form';
import * as d3 from 'd3';
import { getData } from '../actions';
import {ChartState as ChartProps} from '../models';
import { svg } from 'd3';

interface ChartState
{
    ticker: string,
    interval: string,
    selected: boolean
}

interface ChartOptions
{
    width: number,
    height: number
}

export class CandlestickChart extends Component<ChartProps & DispatchProp<any> & InjectedFormProps, ChartState>
{
    constructor(props: ChartProps & DispatchProp<any> & InjectedFormProps)
    {
        super(props);

        this.state = {
            ticker: '',
            interval: '',
            selected: false
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    private handleSelect(event: React.FormEvent<HTMLFormElement>): void
    {
        this.setState({
            selected: true
        });

        const { ticker, interval} = this.state;
        const { dispatch } = this.props;

        dispatch(getData({
            ticker,
            interval,
            chartData: []
        }));
    }

    private handleChange(event: ChangeEvent<HTMLInputElement>): void
    {
        const { name, value } = event.currentTarget;

        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    public render(): ReactNode
    {
        const { dataLoading, chartParams } = this.props;
        const {ticker, interval } = this.state;

        return(<div></div>);
    }
}

class ChartVisual extends Component<ChartOptions, {}> {
    ref!: SVGSVGElement;

    createChart() 
    {
        const svg: any = d3.select(this.ref)
            .append("svg:svg")
            .attr("class", "chart")
            .attr("width", this.props.width)
            .attr("height", this.props.height)
        const x: any = d3.scaleLinear().domain([])

    }
    render(): ReactNode
    {
        return 
        {
            <svg className="chart" ref={(ref: SVGSVGElement) => this.ref = ref} width={this.props.width} height={this.props.height}>

            </svg>
        }
    }
}

const mapStatetoProps = (state: any): ChartProps => 
{
    const { chartParams } = state.chart;

    return {
        chartParams
    };
}

export default connect<ChartProps>
    (mapStatetoProps)
    (reduxForm({
        form: 'candlestickChart'
    })(CandlestickChart as any));
