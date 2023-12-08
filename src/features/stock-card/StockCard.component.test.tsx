// Write tests for ConnectionAlert component here
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import StockCardComponent from './StockCard.component';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([]);

afterEach(() => {
    cleanup();
});

test('renders the card with the appropriate symbol', () => {
    const barMap = new Map<string, number>();
    const symbol = 'AAPL';
    barMap.set(symbol, 100);
    const store = mockStore({
        price: {
            barMap: barMap
        }
    });
    render(
        <Provider store={store}>
            <StockCardComponent symbol={symbol} />
        </Provider>
    );
    const card = screen.queryByTestId('stock-card');
    expect(card).toBeInTheDocument();
    const symbolElement = screen.queryByTestId('stock-card-title');
    expect(symbolElement).toHaveTextContent(symbol);
});

test('renders the card with a price component', () => {
    const barMap = new Map<string, number>();
    const symbol = 'AAPL';
    barMap.set(symbol, 100);
    const store = mockStore({
        price: {
            barMap: barMap
        }
    });
    render(
        <Provider store={store}>
            <StockCardComponent symbol={symbol} />
        </Provider>
    )
    const priceElement = screen.getByTestId('price');
    expect(priceElement).toBeInTheDocument();
});
