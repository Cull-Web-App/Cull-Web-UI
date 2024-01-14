import React, { memo, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { barConnect, barDisconnect, subscribeBar, unsubscribeBar } from '../../state';
import { ConnectionStatus } from '../../common';
import Card from 'react-bootstrap/Card';
import { Subject, takeUntil, timer } from 'rxjs';

type WatchListItemProps = WatchListItemComponentProps & WatchListItemReduxProps & WatchListItemDispatchProps;
interface WatchListItemReduxProps {
    connectionStatus: ConnectionStatus;
}
interface WatchListItemDispatchProps {
    connect: (() => void);
    disconnect: (() => void);
    subscribe: ((symbol: string) => void);
    unsubscribe: ((symbol: string) => void);
}
interface WatchListItemComponentProps {
    symbol: string;
}

export const WatchListItemComponent = ({ symbol, connectionStatus, connect, disconnect, subscribe, unsubscribe }: WatchListItemProps) => {

    useEffect(() => {
        if (connectionStatus === ConnectionStatus.Disconnected) {
            connect();
        }
    }, [connectionStatus]);

    useEffect(() => {
        subscribe(symbol);

        return () => {
            unsubscribe(symbol);
        };
    }, [symbol]);

    return (
        <Card bg='dark' text='white' className='stock-card shadow' data-testid="stock-card">
            <Card.Body>
                <Card.Title data-testid="stock-card-title">{symbol}</Card.Title>
            </Card.Body>
        </Card>
    );
}

const mapStateToProps = (state: any): WatchListItemReduxProps => {
    return {
        connectionStatus: state.bar.connectionStatus
    };
};

const mapDispatchToProps = (dispatch: any): WatchListItemDispatchProps => {
    return {
        connect: () => dispatch(barConnect()),
        disconnect: () => dispatch(barDisconnect()),
        subscribe: (symbol: string) => dispatch(subscribeBar({ symbol })),
        unsubscribe: (symbol: string) => dispatch(unsubscribeBar({ symbol }))
    };
};

export default connect<WatchListItemReduxProps, WatchListItemDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(memo(WatchListItemComponent));
