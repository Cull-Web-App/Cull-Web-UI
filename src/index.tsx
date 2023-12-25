import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AuthenticatedAppComponent from './AuthenticatedApp.component';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { InversifyProvider } from './common';
import { container } from './common/ioc/container.ioc';
import { bar, SymbolEpic, symbols, preference, BarEpic, IBaseEpic, PreferenceEpic, WatchEpic, watch, UserEpic, user } from './state';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const epicMiddleWare = createEpicMiddleware({
    dependencies: {
        get store() {
                return store
        }
    }
});

// Create the store using the combined reducers
const store = configureStore(
    {
        reducer: combineReducers({
            symbols,
            bar,
            preference,
            watch,
            user
        }),
        middleware: [epicMiddleWare]
    }
);

// Construct the epics
const epics: IBaseEpic[] = [
    new SymbolEpic(),
    new BarEpic(),
    new PreferenceEpic(),
    new WatchEpic(),
    new UserEpic()
];

epicMiddleWare.run(
    combineEpics(
        ...epics.flatMap(epic => epic.epics)
    )
);

// Render the app
root.render(
    <React.StrictMode>
        <InversifyProvider container={container}>
            <Provider store={store}>
                <Router>
                    <AuthenticatedAppComponent />
                </Router>
            </Provider>
        </InversifyProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
