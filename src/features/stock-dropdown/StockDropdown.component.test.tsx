// Write tests for ConnectionAlert component here
import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import StockDropdownComponent from './StockDropdown.component';

const mockStore = configureMockStore([]);

afterEach(() => {
    cleanup();
});

test('renders the dropdown list when there are unsubscribed symbols', async () => {
    const symbols = ['AAPL', 'GOOG', 'MSFT'];
    const store = mockStore({
        price: {
            subscribedSymbols: []
        },
        symbols: {
            symbols
        }
    });
    render(
        <Provider store={store}>
            <StockDropdownComponent/>
        </Provider>
    );
    const dropdown = screen.queryByTestId('stock-dropdown-toggle');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toBeEnabled();
    fireEvent.click(dropdown as HTMLElement);

    const dropdownItems = await screen.findAllByTestId('stock-dropdown-item');
    expect(dropdownItems[0]).toHaveTextContent(symbols[0]);
    expect(dropdownItems[1]).toHaveTextContent(symbols[1]);
    expect(dropdownItems[2]).toHaveTextContent(symbols[2]);
});

test('renders nothing when there are no unsubscribed symbols', () => {
    const symbols = ['AAPL', 'GOOG', 'MSFT'];
    const store = mockStore({
        price: {
            subscribedSymbols: symbols
        },
        symbols: {
            symbols
        }
    });
    render(
        <Provider store={store}>
            <StockDropdownComponent/>
        </Provider>
    );
    const dropdown = screen.queryByTestId('stock-dropdown-toggle');
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toBeDisabled();
});
