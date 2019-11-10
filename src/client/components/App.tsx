import * as React from 'react';
import { Component, ReactNode } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import CandlestickChart from './CandlestickChart';
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
                    <div style={{paddingTop: '40px'}}>
                        <div style={{ height: '100%', textAlign: 'center'}}>
                            <Route exact path="/login" component={LoginPage}/>
                            <Route exact path="/register" component={RegisterPage}/>
                            <Route exact path="/chart" component={CandlestickChart}/>
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