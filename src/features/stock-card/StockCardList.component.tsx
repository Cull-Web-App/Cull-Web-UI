import React from 'react';
import { connect } from 'react-redux';
import StockCardComponent from './StockCard.component';

// Define the Props for this component
type StockCardListProps = StockCardListReduxProps;
interface StockCardListReduxProps {
    symbols: string[];
}

const StockCardListComponent = ({ symbols }: StockCardListProps) => {
    return (
        <div className='d-flex flex-wrap gap-2 py-2'>
            {symbols.map((symbol: string) => <StockCardComponent key={symbol} symbol={symbol}></StockCardComponent>)}
        </div>
    );
}

const mapStateToProps = (state: any): StockCardListReduxProps => {
    const { subscribedSymbols } = state.price;
    return {
        symbols: subscribedSymbols
    };
}

export default connect<StockCardListReduxProps, {}>(
    mapStateToProps,
    null
)(StockCardListComponent);
