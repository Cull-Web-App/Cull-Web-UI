import React from "react";
import { PureComponent, ReactNode } from "react";
import { connect } from "react-redux";
import ConnectionAlertComponent from "./features/connection-alert/ConnectionAlert.component";
import StockCardListComponent from "./features/stock-card/StockCardList.component";
import StockDropdownComponent from "./features/stock-dropdown/StockDropdown.component";
import StockPriceSubscriberComponent from "./features/stock-price-subscriber/StockPriceSubscriber.component";
import { initializeSymbols } from "./state";
import { MenuComponent } from "features/menu/Menu.component";


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

        // Add default dark mode
        document.body.classList.add('dark-mode');
    }

    public render(): ReactNode {
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
        initializeSymbols: () => dispatch(initializeSymbols())
    };
}

export default connect<{}, AppDispatchProps>(
    null,
    mapDispatchToProps
)(App);