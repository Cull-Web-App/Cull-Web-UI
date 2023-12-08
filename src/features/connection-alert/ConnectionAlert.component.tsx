import React from "react";
import Alert from 'react-bootstrap/Alert';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import './ConnectionAlert.component.css';

type ConnectionAlertProps = ConnectionAlertReduxProps;
interface ConnectionAlertReduxProps {
    error: string;
}

const ConnectionAlertComponent = ({ error }: ConnectionAlertProps) => {
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

const mapStateToProps = (state: any): ConnectionAlertReduxProps => {
    const { error: connectionError } = state.bar;
    const { error: symbolError } = state.symbols;
    return {
        error: connectionError || symbolError
    };
}

export default connect<ConnectionAlertReduxProps, {}>(
    mapStateToProps,
    null
)(ConnectionAlertComponent);