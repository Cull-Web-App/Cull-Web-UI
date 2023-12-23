import React from "react";
import { PureComponent, ReactNode } from "react";
import { connect } from "react-redux";
import ConnectionAlertComponent from "./features/connection-alert/ConnectionAlert.component";
import StockPriceSubscriberComponent from "./features/stock-price-subscriber/StockPriceSubscriber.component";
import { initializeSymbols, initializePreferences } from "./state";
import MenuComponent from "features/menu/Menu.component";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RightPanelComponent from "features/right-panel/RightPanel.component";

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
            <Container fluid className="p-0">
                <Row>
                    <Col xs={9}>
                        <MenuComponent></MenuComponent>
                    </Col>
                    <Col xs={3}>
                        <RightPanelComponent></RightPanelComponent>
                    </Col>
                </Row>
            </Container>
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