import { useMsal } from '@azure/msal-react';
import React, { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { connect } from 'react-redux';
import { initializeUserAvatar } from '../../state';

type UserDropdownProps = UserDropdownReduxProps & UserDropdownDispatchProps & UserDropdownComponentProps;
interface UserDropdownReduxProps {
    avatar: Blob;
}

interface UserDropdownDispatchProps {
    initializeUserAvatar: () => void;
}

interface UserDropdownComponentProps {
}


export const UserDropdownComponent = ({ initializeUserAvatar, avatar }: UserDropdownProps) => {
    const { instance } = useMsal();

    useEffect(() => {
        initializeUserAvatar();
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

const mapDispatchToProps = (dispatch: any): UserDropdownDispatchProps =>
{
    return {
        initializeUserAvatar: () => dispatch(initializeUserAvatar())
    };
}

const mapStateToProps = (state: any): UserDropdownReduxProps => {
    const { avatar } = state.user;
    return {
        avatar
    };
}

export default connect<UserDropdownReduxProps, UserDropdownDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserDropdownComponent);