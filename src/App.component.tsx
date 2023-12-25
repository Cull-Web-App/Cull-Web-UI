import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { initializePreferences } from "./state";
import MenuComponent from "features/menu/Menu.component";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
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
import AuthenticationContainerComponent from "features/authentication/AuthenticationContainer.component";
import RequestAuthenticationInterceptorComponent from "features/authentication/RequestAuthenticationInterceptor.component";

type AppProps = AppReduxProps & AppDispatchProps;
interface AppDispatchProps
{
    initializePreferences: (() => void);
}

interface AppReduxProps
{
    darkMode: boolean;
}

const config: Configuration = {
    auth: {
        clientId: "96a42910-ace2-4e54-bcd5-b34e0275cab0",
        authority: "https://login.microsoftonline.com/09c105c2-92b3-4242-aa95-062b36c2534c",
        redirectUri: "http://localhost:3000"
    }
};

const msalInstance = new PublicClientApplication(config);

export const AppComponent = ({ darkMode, initializePreferences }: AppProps) => {
    const [tabMap, setTabMap] = useState<Map<string, [string, JSX.Element]>>(new Map<string, [string, JSX.Element]>());

    useEffect(() => {
        initializePreferences();
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
        <MsalProvider instance={msalInstance!}>
            <AuthenticationContainerComponent>
                <RequestAuthenticationInterceptorComponent>
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
                </RequestAuthenticationInterceptorComponent>
            </AuthenticationContainerComponent>
        </MsalProvider>
    );
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
)(AppComponent);