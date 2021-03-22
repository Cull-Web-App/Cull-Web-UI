
import * as React from 'react';
import { PureComponent, ReactNode, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect, DispatchProp } from 'react-redux';
import { Form, Field, reduxForm, InjectedFormProps } from 'redux-form';
import { CustomInput } from './CustomInput';
import { register } from '../actions';
import { User, RegistrationState as RegisterProps } from '../models';
import { required, validateEmail, validatePassword } from '../services';

interface RegisterState
{
    user: User,
    submitted: boolean
}

// Register page should have both props and state
export class RegisterPage extends PureComponent<RegisterProps & DispatchProp<any> & InjectedFormProps, RegisterState>
{
    constructor(props: RegisterProps & DispatchProp<any> & InjectedFormProps)
    {
        super(props);

        // Set initial state
        this.state = {
            user: {
                email: '',
                email_verified: false,
                password: ''
            },
            submitted: false
        };
        
        // Bind functions to component
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(event: ChangeEvent<HTMLInputElement>): void
    {
        const { name, value } = event.target;

        // Update the state of the user -- only merges so don't have to worry about previous state
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }));
    }

    private handleSubmit(event: FormEvent<HTMLFormElement>): void
    {
        // Why do I want to prevent the default action?
        event.preventDefault();

        this.setState({
            submitted: true
        });

        // Need to verify input is correct -- should try redux forms
        const { user } = this.state;
        const { dispatch } = this.props;
        // Dispatch the registration action
        dispatch(register(user));
    }

    public render(): ReactNode
    {
        const { registering, invalid } = this.props;

        // Create the react node -- this is the page markup -- add validators for fields
        return (
            <div className="page-canvas">
                <div className="form-wrapper">
                    <h1 className="white-header"> Sign up for Cull </h1>
                    <Form onSubmit={this.handleSubmit}>
                        <div>
                            <Field name="email" label="Email" type="email" validate={[required, validateEmail]} component={CustomInput} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <Field name="password" label="Password" type="password" validate={[required, validatePassword]} component={CustomInput} onChange={this.handleChange}/>
                        </div>
                        <div>
                            <button type="submit" disabled={registering || invalid}> Submit </button>
                            <Link to="/login" className="link-style"> Cancel </Link>
                        </div>
                        {
                            registering && <img style={{width: "40px", height: "40px"}}/>
                        }
                    </Form>
                </div>
            </div>
        );
    }
}

// Map from the store to the props
const mapStateToProps = (state: any): RegisterProps =>
{
    // Extract the action!
    const { registering } = state.registration;
    return {
        registering
    };
}

// Connect the register page to the store and export -- autoinjects dispatch
export default connect<RegisterProps>(
    mapStateToProps
)(reduxForm({
    form: 'registerPage'
})(RegisterPage as any));