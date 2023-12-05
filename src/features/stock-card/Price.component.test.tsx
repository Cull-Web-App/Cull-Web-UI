// Write tests for ConnectionAlert component here
import React from 'react';
import { render, screen } from '@testing-library/react';
import PriceComponent from './Price.component';

test('renders the price if it exists in the map', () => {
    const symbol = 'AAPL';
    const priceMap = new Map<string, number>();
    priceMap.set(symbol, 100);
    priceMap.set('GOOG', 200);
    render(
        <PriceComponent priceMap={priceMap} symbol={symbol}></PriceComponent>
    )

    const price = screen.queryByText('$100.00');
    expect(price).toBeInTheDocument();
});

test('renders $0.00 if the price does not exist in the map', () => {
    const symbol = 'AAPL';
    const priceMap = new Map<string, number>();
    priceMap.set('GOOG', 200);
    render(
        <PriceComponent priceMap={priceMap} symbol={symbol}></PriceComponent>
    )
    const price = screen.queryByText('$0.00');
    expect(price).toBeInTheDocument();
});
