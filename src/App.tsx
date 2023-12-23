import React from "react";
import { PureComponent, ReactNode } from "react";
import { connect } from "react-redux";
import { initializeSymbols, initializePreferences } from "./state";
import MenuComponent from "features/menu/Menu.component";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RightPanelComponent from "features/right-panel/RightPanel.component";
import ContentComponent from "features/app-content/Content.component";
import OverviewComponent from "features/overview/Overview.component";
import StockViewComponent from "features/stock-view/StockView.component";
import NewsComponent from "features/news/News.component";
import TradingStrategiesComponent from "features/trading-strategies/TradingStrategies.component";
import ContactComponent from "features/contact/Contact.component";
import AboutComponent from "features/about/About.component";
import TestingStrategiesComponent from "features/testing-strategies/TestingStrategies.component";
import AccountPerformanceComponent from "features/account-performance/AccountPerformance.component";
import MetricsComponent from "features/metrics/Metrics.component";

type AppProps = AppReduxProps & AppDispatchProps;
interface AppDispatchProps
{
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
        const { initializePreferences } = this.props;
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
        const tabMap = new Map<string, [string, JSX.Element]>([
            ['overview', ['Overview', <OverviewComponent></OverviewComponent>]],
            ['stock', ['Stock', <StockViewComponent></StockViewComponent>]],
            ['news', ['News', <NewsComponent></NewsComponent>]],
            ['strategies', ['Trading Strategies', <TradingStrategiesComponent></TradingStrategiesComponent>]],
            ['testing', ['Testing Strategies', <TestingStrategiesComponent></TestingStrategiesComponent>]],
            ['performance', ['Account Performance', <AccountPerformanceComponent></AccountPerformanceComponent>]],
            ['dashboard', ['Metrics', <MetricsComponent></MetricsComponent>]],
            ['contact', ['Contact', <ContactComponent></ContactComponent>]],
            ['about', ['About', <AboutComponent></AboutComponent>]]
        ]);
        return (
            <Container fluid className="p-0">
                <Row>
                    <MenuComponent tabMap={tabMap}></MenuComponent>
                    <Col xs={9}>
                        <ContentComponent tabMap={tabMap}></ContentComponent>
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