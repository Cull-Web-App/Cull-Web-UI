import React, { useEffect, useState } from 'react';
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
import { Route, Routes, Navigate } from 'react-router-dom';
import SearchBarComponent from './SearchBar.component';

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

    useEffect(() => {
        const path = window.location.pathname;
        const key = path.substring(1);
        if (tabMap.has(key)) {
            setKey(key);
        }
    }, []);

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
                                        <Nav.Link href={`/${key}`} eventKey={key}>{title}</Nav.Link>
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
                <Routes>
                    <Route path='/' element={<Navigate to='/overview'></Navigate>}/>
                    {
                        Array.from(tabMap).map(([key, [_, element]]) => <Route key={key} path={`/${key}`} element={element}/> )
                    }
                </Routes>
            </div>
        </div>
    );
}

export default MenuComponent;
