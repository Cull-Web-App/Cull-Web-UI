import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import PrivateRouteAsync from './PrivateRouteAsync';
import { history } from '../services';

import '../assets/App.scss';

export class App extends PureComponent<{}, {}>
{
    // Use this lifecycle method to asynchronously load the app config data
    public componentDidMount(): void {

    }

    public render(): ReactNode {
        return (
            <div className="page-container">
                <Router history={history}>
                    <div>
                        <div style={{ height: '100%', textAlign: 'center' }}>
                            <Route exact path="/login" component={LoginPage} />
                            <Route exact path="/register" component={RegisterPage} />
                        </div>
                        <div>
                            <Route exact path="/" render={() => <Redirect to="/home" />} />
                            <PrivateRouteAsync path="/home" component={HomePage} />
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}