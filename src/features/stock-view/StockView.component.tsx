import React from 'react';
import { findManyBar } from '../../state';
import { connect } from 'react-redux';
import { IBar } from '../../common';
import CandleStickChartComponent from './candlestick-chart/CandlestickChart.component';

type StockViewProps = StockViewDispatchProps & StockViewReduxProps;
interface StockViewDispatchProps {
    findMany: (({ symbol, from, to }: { symbol: string, from: Date, to: Date }) => void);
}
interface StockViewReduxProps {
    barMap: Map<string, IBar[]>;
}

export const StockViewComponent = ({ barMap, findMany }: StockViewProps) => {
    // set from to market open on 2023-12-02
    // and to to market close on 2023-12-02
    const from = new Date('2023-12-01T09:30:00.000Z');
    const to = new Date('2023-12-01T16:00:00.000Z');
    return (
        <div>
            <h1>Stock View</h1>
            <button onClick={() => findMany({ symbol: "AAPL", from, to })}>Find Many</button>
            <CandleStickChartComponent bars={barMap.get("AAPL") ?? []} variant='dark'></CandleStickChartComponent>
        </div>
    );
}

const mapStateToProps = (state: any): StockViewReduxProps => {
    const { barMap } = state.bar;
    return {
        barMap: new Map<string, IBar[]>([...Object.entries(barMap as Record<string, IBar[]>)]),
    };
}

const mapDispatchToProps = (dispatch: any): StockViewDispatchProps => {
    return {
        findMany: ({ symbol, from, to }: { symbol: string, from: Date, to: Date }) => dispatch(findManyBar({ symbol, from, to })),
    };
}

export default connect<StockViewReduxProps, StockViewDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(StockViewComponent);