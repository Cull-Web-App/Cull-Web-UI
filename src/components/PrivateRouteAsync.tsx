import * as React from 'react'
import { PureComponent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute';
import { authenticate } from '../actions';

// Define the Props for this component
type PrivateRouteAsyncProps = PrivateRouteAsyncDispatchProps & PrivateRouteAsyncReduxProps & PrivateRouteAsyncInputProps;
interface PrivateRouteAsyncDispatchProps
{
    authenticate: (() => void);
}
interface PrivateRouteAsyncReduxProps
{
    isAuthenticated: boolean;
    isLoading: boolean;
}
interface PrivateRouteAsyncInputProps
{
    component: typeof PureComponent;
    path: string;
}

// Create route that either creates component in render or redirects to the login page
export class PrivateRouteAsync extends PureComponent<PrivateRouteAsyncProps, {}>
{
    public constructor(props: PrivateRouteAsyncProps)
    {
        super(props);
    }

    public componentDidMount(): void
    {
        const { authenticate } = this.props;
        authenticate();
    }

    public render(): ReactNode
    {
        const { component, isAuthenticated, isLoading, ...rest } = this.props;
        return (
            <div>
                {
                    !isLoading ? 
                        <PrivateRoute {...rest} component={component} isAuthenticated={isAuthenticated}/>
                        : "Loading"
                }
            </div>
        );
    }
}

// Map any dispatch functions to the props of the component -- how to get rid of tthe any?
const mapDispatchToProps = (dispatch: any): PrivateRouteAsyncDispatchProps =>
{
    return {
        authenticate: () => dispatch(authenticate())
    };
}

// Map from the store to the props
const mapStateToProps = (state: any, ownProps: PrivateRouteAsyncInputProps): PrivateRouteAsyncReduxProps & PrivateRouteAsyncInputProps =>
{
    // Extract the action!
    const { isAuthenticated, isLoading } = state.tokens;
    return {
        ...ownProps,
        isAuthenticated,
        isLoading
    };
}

// Connect the register page to the store and export -- autoinjects dispatch
export default connect<PrivateRouteAsyncReduxProps, PrivateRouteAsyncDispatchProps, PrivateRouteAsyncInputProps>(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRouteAsync);