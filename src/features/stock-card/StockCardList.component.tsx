import React from 'react';
import { useSelector } from 'react-redux';
import StockCardComponent from './StockCard.component';
import { selectSubscribedSymbols } from 'state';

// Define the Props for this component
type StockCardListProps = {};

const StockCardListComponent = ({}: StockCardListProps) => {
    const symbols = useSelector(selectSubscribedSymbols);
    return (
        <div className='d-flex flex-wrap gap-2 py-2'>
            {symbols.map((symbol: string) => <StockCardComponent key={symbol} symbol={symbol}></StockCardComponent>)}
        </div>
    );
};

export default StockCardListComponent;
