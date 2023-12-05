import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { InversifyProvider } from './common';
import { container } from './common/ioc/container.ioc';
import { connection, price, initializeSymbols$, symbols, subscribe$, unsubscribe$ } from './state';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const epicMiddleWare = createEpicMiddleware();

// Create the store using the combined reducers
const store = configureStore(
    {
        reducer: combineReducers({
            symbols,
            connection,
            price
        }),
        middleware: [epicMiddleWare]
    }
);

epicMiddleWare.run(
    combineEpics(
        initializeSymbols$,
        subscribe$,
        unsubscribe$
    )
);
root.render(
    <React.StrictMode>
        <InversifyProvider container={container}>
            <Provider store={store}>
                <App />
            </Provider>
        </InversifyProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
