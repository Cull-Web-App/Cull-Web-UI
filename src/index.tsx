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

const epicMiddleWare = createEpicMiddleware();

// Create the store using the combined reducers
const store = createStore(
    combineReducers({
        login,
        registration,
        tokens,
        form
    }),
    applyMiddleware(epicMiddleWare)
);

epicMiddleWare.run(
    combineEpics(
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
