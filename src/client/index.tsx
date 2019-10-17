import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { reducer as form } from 'redux-form';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { App } from './components';
import { login, registration, tokens, chart } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import './assets/Utilities.scss';

// Create the store using the combined reducers
const store = createStore(combineReducers({
        login,
        registration,
        tokens,
        form,
        chart
    }),
    composeWithDevTools(applyMiddleware(thunk))
);

// Render the top level app component -- provide the store
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);