// Write tests for ConnectionAlert component here
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import StockCardListComponent from './StockCardList.component';

const mockStore = configureMockStore([]);

afterEach(() => {
    cleanup();
});

test('renders multiple cards with appropriate price', async () => {
    const symbols = ['AAPL', 'GOOG'];
    const barMap = {
        [symbols[0]]: 100,
        [symbols[1]]: 200
    };
    const store = mockStore({
        price: {
            subscribedSymbols: symbols,
            barMap
        }
    });
    render(
        <Provider store={store}>
            <StockCardListComponent />
        </Provider>
    );
    const cards = await screen.findAllByTestId('stock-card');
    expect(cards[0]).toBeInTheDocument();
    expect(cards[0]).toHaveTextContent(symbols[0]);
    expect(cards[0]).toHaveTextContent(`$${barMap[symbols[0]]?.toFixed(2)}`);
    expect(cards[1]).toBeInTheDocument();
    expect(cards[1]).toHaveTextContent(symbols[1]);
    expect(cards[1]).toHaveTextContent(`$${barMap[symbols[1]]?.toFixed(2)}`);
});
