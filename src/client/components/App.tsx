import * as React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { history } from '../services';

import '../assets/App.scss';

export class App extends React.Component<{}, {}>
{
    public render(): React.ReactNode
    {
        return (
            <div className="page-container">
                <Router history={history}>
                    <div>
                        <div style={{ height: '100%', textAlign: 'center'}}>
                            <Route exact path="/login" component={LoginPage}/>
                            <Route exact path="/register" component={RegisterPage}/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}