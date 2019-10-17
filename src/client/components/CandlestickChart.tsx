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

import '../assets/Chart.scss';
import { element } from 'prop-types';

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

export class CandlestickChart extends Component<ChartProps & DispatchProp<any>, ChartState>
{
    constructor(props: ChartProps & DispatchProp<any> )
    {
        super(props);

        this.state = {
            ticker: '',
            interval: '1m',
            selected: false
        };

        this.testMethod = this.testMethod.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(event: any) : void
    {
        const { name, value } = event.target;

        this.setState({ticker: event.target.value});
    }

    private testMethod(event: any): void
    {
        this.setState({
            selected: true
        });

        const { ticker, interval} = this.state;
        const { dispatch } = this.props;

        dispatch(getData({
            ticker,
            interval
        }));
    }

    public render(): ReactNode
    {
        const { dataCurrent, dataLoading, chartParams } = this.props;
        return(
            <div className="page-canvas">
                <label>
                    Symbol:
                    <input type="text" name="name" value={this.state.ticker} onChange={this.handleChange} />
                </label>
                <button onClick={this.testMethod}>Test</button>
                
            </div>);
    }
}

class ChartVisual extends Component<ChartProps, {}> {
    
    constructor(props: ChartProps){
        super(props)
    }

    formatData(){
        
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

const mapStateToProps = (state: any): ChartProps => 
{
    const { dataCurrent, dataLoading, chartParams } = state.chart;
    return {
        dataCurrent,
        dataLoading,
        chartParams
    };
}

// Connect store and set up redux form
export default connect(mapStateToProps)(CandlestickChart)

