// Write tests for ConnectionAlert component here
import React from 'react';
import { render, screen } from '@testing-library/react';
import PriceComponent from './Price.component';
import { IBar } from '../../common';

test('renders the price if it exists in the map', () => {
    const symbol = 'AAPL';
    const barMap = new Map<string, IBar[]>();
    barMap.set(symbol, [{ close: 100 } as IBar]);
    barMap.set('GOOG', [{ close: 200 } as IBar]);
    render(
        <PriceComponent symbol={symbol}></PriceComponent>
    )

    const price = screen.queryByText('$100.00');
    expect(price).toBeInTheDocument();
});

test('renders $-- if the price does not exist in the map', () => {
    const symbol = 'AAPL';
    const barMap = new Map<string, IBar[]>();
    barMap.set('GOOG', [{ close: 200 } as IBar]);
    render(
        <PriceComponent symbol={symbol}></PriceComponent>
    )
    const price = screen.queryByText('$0.00');
    expect(price).toBeInTheDocument();
});
