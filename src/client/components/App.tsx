import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import PrivateRouteAsync from './PrivateRouteAsync';
import { history } from '../services';

import '../assets/App.scss';

export class App extends Component<{}, {}>
{
    public render(): ReactNode
    {
        return (
            <div className="page-container">
                <Router history={history}>
                    <div>
                        <div style={{ height: '100%', textAlign: 'center'}}>
                            <Route exact path="/login" component={LoginPage}/>
                            <Route exact path="/register" component={RegisterPage}/>
                        </div>
                        <div>
                            <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                            <PrivateRouteAsync path="/home" component={HomePage}/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}