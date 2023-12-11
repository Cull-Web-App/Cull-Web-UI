import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import OverviewComponent from 'features/overview/Overview.component';
import StockViewComponent from 'features/stock-view/StockView.component';
import NewsComponent from 'features/news/News.component';
import TradingStrategiesComponent from 'features/trading-strategies/TradingStrategies.component';
import TestingStrategiesComponent from 'features/testing-strategies/TestingStrategies.component';
import AccountPerformanceComponent from 'features/account-performance/AccountPerformance.component';
import MetricsComponent from 'features/metrics/Metrics.component';
import ContactComponent from 'features/contact/Contact.component';
import AboutComponent from 'features/about/About.component';
import UserDropdownComponent from './UserDropdown.component';

export const MenuComponent = () => {
    const [key, setKey] = useState('overview');
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
        <div>
            <Navbar bg="dark" variant='dark' expand="lg">
                <Navbar.Brand>Cull</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                        activeKey={key}
                        onSelect={(k: any) => setKey(k)}
                    >
                        {
                            Array.from(tabMap).map(([key, [title, _]]) => {
                                return (
                                    <Nav.Item key={key}>
                                        <Nav.Link eventKey={key}>{title}</Nav.Link>
                                    </Nav.Item>
                                );
                            })
                        }
                    </Nav>
                </Navbar.Collapse>
                <Nav>
                    <UserDropdownComponent></UserDropdownComponent>
                </Nav>
            </Navbar>
            <div className="content">
                {
                    tabMap.get(key)?.[1]
                }
            </div>
        </div>
    );
}

export default MenuComponent;
