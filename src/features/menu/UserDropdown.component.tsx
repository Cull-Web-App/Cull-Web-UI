import { useMsal } from '@azure/msal-react';
import React, { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUserAvatar, selectAvatar } from '../../state';

type UserDropdownProps = UserDropdownComponentProps;
interface UserDropdownComponentProps {
}


export const UserDropdownComponent = ({}: UserDropdownProps) => {
    const { instance } = useMsal();

    const dispatch = useDispatch();
    const initializeAvatar = () => dispatch(initializeUserAvatar());

    const avatar = useSelector(selectAvatar);

    useEffect(() => {
        initializeAvatar();
    }, []);

    const handleLogout = () => {
        instance.logoutRedirect();
    };

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant='transparent'
                id="dropdown-custom-components"
                className="p-0 caret"
            >
                {avatar && (
                    <Image
                        src={URL.createObjectURL(avatar)}
                        roundedCircle
                        style={{ cursor: 'pointer', width: '30px', height: '30px' }}
                    />
                )}
            </Dropdown.Toggle>
            <Dropdown.Menu variant='dark' align='end'>
                <Dropdown.Item>Preferences</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UserDropdownComponent;