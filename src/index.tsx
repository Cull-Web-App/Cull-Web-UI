<<<<<<< HEAD
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
=======
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { reducer as form } from 'redux-form';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { App, InversifyProvider } from './components';
import { login, registration, tokens } from './reducers';
import { register$, login$, logout$, auth$ } from './epics';
import { container } from './config';

import './assets/Utilities.scss';
>>>>>>> master

const epicMiddleWare = createEpicMiddleware();

// Create the store using the combined reducers
<<<<<<< HEAD
const store = configureStore(
    {
        reducer: combineReducers({
            symbols,
            connection,
            price
        }),
        middleware: [epicMiddleWare]
    }
=======
const store = createStore(
    combineReducers({
        login,
        registration,
        tokens,
        form
    }),
    applyMiddleware(epicMiddleWare)
>>>>>>> master
);

epicMiddleWare.run(
    combineEpics(
<<<<<<< HEAD
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
=======
        register$,
        login$,
        logout$,
        auth$
    )
);

// Render the top level app component -- provide the store and the inversify DI container
render(
    <InversifyProvider container={container}>
        <Provider store={store}>
            <App/>
        </Provider>
    </InversifyProvider>,
    document.getElementById('app')
);
>>>>>>> master
