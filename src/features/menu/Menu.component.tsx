import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserDropdownComponent from './UserDropdown.component';

type MenuProps = MenuComponentProps;
interface MenuComponentProps {
    tabMap: Map<string, [string, JSX.Element]>;
}

export const MenuComponent = ({ tabMap }: MenuProps) => {
    const [key, setKey] = useState('overview');

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
        </div>
    );
}

export default MenuComponent;
