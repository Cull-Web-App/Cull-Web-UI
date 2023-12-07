import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';

export const UserDropdownComponent = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle
                variant='transparent'
                id="dropdown-custom-components"
                className="p-0 caret"
            >
                <Image
                    src="user-avatar.jpg"
                    roundedCircle
                    style={{ cursor: 'pointer', width: '30px', height: '30px' }}
                />
            </Dropdown.Toggle>
            <Dropdown.Menu variant='dark'>
                <Dropdown.Item>Preferences</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UserDropdownComponent;