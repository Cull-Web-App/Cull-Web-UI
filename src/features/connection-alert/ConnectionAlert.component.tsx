import React from "react";
import Alert from 'react-bootstrap/Alert';
import { connect, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import './ConnectionAlert.component.css';
import { selectAssetError, selectBarError } from "../../state";

type ConnectionAlertProps = ConnectionAlertReduxProps;
interface ConnectionAlertReduxProps {
}

const ConnectionAlertComponent = ({}: ConnectionAlertProps) => {
    const barError = useSelector(selectBarError);
    const symbolError = useSelector(selectAssetError);
    const error = barError || symbolError;
    if (error === null) {
        return null;
    }
    return (
        <div className="connection-alert" data-testid="connection-alert">
            <Alert variant="danger">
                <FontAwesomeIcon className="icon" icon={faBan}/>
                The connection to the server has been lost, please refresh and try again
            </Alert>
        </div>
    );
}

export default ConnectionAlertComponent;