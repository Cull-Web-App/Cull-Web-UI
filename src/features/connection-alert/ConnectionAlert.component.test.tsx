// Write tests for ConnectionAlert component here
import React from 'react';
import { render, screen } from '@testing-library/react';
import ConnectionAlertComponent from './ConnectionAlert.component';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([]);

test('renders the alert when error present', () => {
    const store = mockStore({
        connection: {
            error: 'error'
        },
        symbols: {
            error: 'error'
        }
    });
    render(
        <Provider store={store}>
            <ConnectionAlertComponent />
        </Provider>
    )
    const alert = screen.queryByTestId('connection-alert');
    expect(alert).toBeInTheDocument();
});

test('does not render the alert when no error present', () => {
    const store = mockStore({
        connection: {
            error: null
        },
        symbols: {
            error: null
        }
    });
    render(
        <Provider store={store}>
            <ConnectionAlertComponent />
        </Provider>
    );
    const alert = screen.queryByTestId('connection-alert');
    expect(alert).toBeNull();
});
