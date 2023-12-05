import React from "react";
import { PureComponent, ReactNode } from "react";
import { connect } from "react-redux";
import ConnectionAlertComponent from "./features/connection-alert/ConnectionAlert.component";
import StockCardListComponent from "./features/stock-card/StockCardList.component";
import StockDropdownComponent from "./features/stock-dropdown/StockDropdown.component";
import StockPriceSubscriberComponent from "./features/stock-price-subscriber/StockPriceSubscriber.component";
import { initializeSymbols } from "./state";


interface AppDispatchProps
{
    initializeSymbols: (() => void);
}

export class App extends PureComponent<AppDispatchProps, {}>
{
    public componentDidMount(): void
    {
        const { initializeSymbols } = this.props;
        initializeSymbols();
    }

    public render(): ReactNode {
        return (
            <div className="container-md py-3">
                <ConnectionAlertComponent></ConnectionAlertComponent>
                <StockDropdownComponent></StockDropdownComponent>
                <StockCardListComponent></StockCardListComponent>
                <StockPriceSubscriberComponent url="https://localhost:7221/bar"></StockPriceSubscriberComponent>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: any): AppDispatchProps =>
{
    return {
        initializeSymbols: () => dispatch(initializeSymbols())
    };
}

export default connect<{}, AppDispatchProps>(
    null,
    mapDispatchToProps
)(App);