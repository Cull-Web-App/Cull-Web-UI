import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { App } from './components';
import { login, registration, tokens } from './reducers';

import './assets/Utilities.scss';

// Create the store using the combined reducers
const store = createStore(combineReducers({
        login,
        registration,
        tokens,
        form
    }),
    compose(applyMiddleware(thunk))
);

// Render the top level app component -- provide the store
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);