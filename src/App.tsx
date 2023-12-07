import React from "react";
import { PureComponent, ReactNode } from "react";
import { connect } from "react-redux";
import ConnectionAlertComponent from "./features/connection-alert/ConnectionAlert.component";
import StockPriceSubscriberComponent from "./features/stock-price-subscriber/StockPriceSubscriber.component";
import { initializeSymbols, initializePreferences } from "./state";
import { MenuComponent } from "features/menu/Menu.component";

type AppProps = AppReduxProps & AppDispatchProps;
interface AppDispatchProps
{
    initializeSymbols: (() => void);
    initializePreferences: (() => void);
}

interface AppReduxProps
{
    darkMode: boolean;
}

export class App extends PureComponent<AppProps, {}>
{
    public componentDidMount(): void
    {
        const { initializeSymbols, initializePreferences } = this.props;
        initializeSymbols();
        initializePreferences();
    }

    public componentDidUpdate(): void
    {
        const { darkMode } = this.props;
        if (darkMode)
        {
            document.body.classList.add("dark-mode");
        }
        else
        {
            document.body.classList.remove("dark-mode");
        }
    }

    public render(): ReactNode
    {
        return (
            <div className="container-md py-3">
                <MenuComponent></MenuComponent>
                <ConnectionAlertComponent></ConnectionAlertComponent>
                <StockPriceSubscriberComponent></StockPriceSubscriberComponent>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any): AppDispatchProps =>
{
    return {
        initializeSymbols: () => dispatch(initializeSymbols()),
        initializePreferences: () => dispatch(initializePreferences())
    };
}

const mapStateToProps = (state: any): AppReduxProps => {
    const { darkMode } = state.preference;
    return {
        darkMode
    };
}

export default connect<AppReduxProps, AppDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(App);