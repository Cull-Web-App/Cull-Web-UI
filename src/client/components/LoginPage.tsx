import * as React from 'react';
import { Component, ReactNode, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { reduxForm, Field, Form, InjectedFormProps } from 'redux-form';
import { login } from '../actions';
import { LoginState as LoginProps } from '../models';
import { CustomInput } from './CustomInput';
import { required, validateEmail, validatePassword } from '../services';

import '../assets/Register.scss';
import '../assets/Login.scss';
import '../assets/Utilities.scss';

interface LoginState
{
    email: string,
    password: string,
    submitted: boolean,
    checked: boolean
}

export class LoginPage extends Component<LoginProps & DispatchProp<any> & InjectedFormProps, LoginState>
{
    constructor(props: LoginProps & DispatchProp<any> & InjectedFormProps)
    {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false,
            checked: true
        };

        // Bind methods
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChecked = this.onChecked.bind(this);
    }

    private handleChange(event: ChangeEvent<HTMLInputElement>): void
    {
        const { name, value } = event.target;

        // Update state -- why does this method not work?
        this.setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    private handleSubmit(event: FormEvent<HTMLFormElement>): void
    {
        // Why do we need to prevent the default form submit??
        event.preventDefault();

        this.setState({
            submitted: true
        });

        const { email, password, checked } = this.state;
        const { dispatch } = this.props;
        
        // Dispatch the user login -- create user object -- no need for phone or email on login
        dispatch(login({
            email,
            email_verified: false,
            password
        }, checked));
    }

    private onChecked(event: ChangeEvent<HTMLInputElement>): void
    {
        const { checked } = this.state;

        this.setState((prevState) => ({
            ...prevState,
            checked: !checked
        }));
    }

    public render(): ReactNode
    {
        const { loggingIn, invalid } = this.props;
        const { checked } = this.state;

        return (
            <div className="page-canvas">
                <div className="form-wrapper">
                    <h1 className="white-header"> Log in to Cull </h1>
                    <Form onSubmit={this.handleSubmit}>
                        <div>
                            <Field name="email" type="text" label="Email" component={CustomInput} validate={[required, validateEmail]} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <Field name="password" type="password" label="Password" component={CustomInput} validate={[required, validatePassword]} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <button type="submit" disabled={loggingIn || invalid}> Log in </button>
                            <div style={{display: "inline-block", marginLeft: "20px"}}>
                                <label className="white-header" style={{lineHeight: "30px"}}>
                                    <input className="checkbox" type="checkbox" name="remember_me" checked={checked} onChange={this.onChecked}/>
                                    Remember me
                                </label>
                                {
                                    loggingIn &&
                                        <img style={{width: "40px", height: "40px"}}/>
                                }
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="registerDiv">
                    <p> No account? <Link to="/register" className="link-style"> Sign up now </Link> </p>
                    <p><Link to="/chart" className="link-style">Test</Link></p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any): LoginProps =>
{
    const { loggingIn } = state.login;
    return {
        loggingIn
    };
}

// Connect store and set up redux form
export default connect<LoginProps>(
    mapStateToProps
)(reduxForm({
    form: 'loginPage'
})(LoginPage as any));