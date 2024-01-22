import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { initializePreferences, selectDarkMode } from "./state";
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
import RequestAuthenticationInterceptorComponent from "features/authentication/RequestAuthenticationInterceptor.component";
import { AuthenticatedTemplate } from "@azure/msal-react";

type AppProps = {};

export const AppComponent = ({}: AppProps) => {
    const dispatch = useDispatch();
    const initializeUserPreferences = () => dispatch(initializePreferences());

    const darkMode = useSelector(selectDarkMode);

    const [tabMap, setTabMap] = useState<Map<string, [string, JSX.Element]>>(new Map<string, [string, JSX.Element]>());

    useEffect(() => {
        initializeUserPreferences();

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
        setTabMap(tabMap);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);

    return (
        <AuthenticatedTemplate>
            <RequestAuthenticationInterceptorComponent>
                <Container fluid>
                    <MenuComponent tabMap={tabMap}></MenuComponent>
                    <Row className="page-content">
                        <Col xs={10}>
                            <ContentComponent tabMap={tabMap}></ContentComponent>
                        </Col>
                        <Col xs={2}>
                            <RightPanelComponent></RightPanelComponent>
                        </Col>
                    </Row>
                </Container>
            </RequestAuthenticationInterceptorComponent>
        </AuthenticatedTemplate>
    );
}

export default AppComponent;