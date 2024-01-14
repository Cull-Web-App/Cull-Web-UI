import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { barConnect, barDisconnect, subscribeBar, unsubscribeBar } from '../../state';
import { ConnectionStatus, IBar, SubscriptionStatus } from '../../common';
import Card from 'react-bootstrap/Card';
import SparkChartComponent from './SparkChart.component';

type WatchListItemProps = WatchListItemComponentProps & WatchListItemReduxProps & WatchListItemDispatchProps;
interface WatchListItemReduxProps {
    connectionStatus: ConnectionStatus;
    subscriptionStatusMap: Map<string, SubscriptionStatus>;
    barMap: Map<string, IBar[]>;
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

export const WatchListItemComponent = ({ symbol, barMap, connectionStatus, subscriptionStatusMap, connect, disconnect, subscribe, unsubscribe }: WatchListItemProps) => {
    useEffect(() => {
        if (connectionStatus === ConnectionStatus.Disconnected) {
            connect();
        }
    }, [connectionStatus]);

    useEffect(() => {
        if ((subscriptionStatusMap.get(symbol) ?? SubscriptionStatus.Unsubscribed) === SubscriptionStatus.Unsubscribed) {
            subscribe(symbol);
        }

        return () => {
            if ((subscriptionStatusMap.get(symbol) ?? SubscriptionStatus.Unsubscribed) === SubscriptionStatus.Subscribed) {
                unsubscribe(symbol);
            }
        };
    }, [symbol, subscribe, unsubscribe]);

    return (
        <Card bg='dark' text='white' className='stock-card shadow' data-testid="stock-card">
            <Card.Body>
                <Card.Title data-testid="stock-card-title">{symbol}</Card.Title>
                <SparkChartComponent symbol={symbol} bars={barMap.get(symbol) ?? []}></SparkChartComponent>
            </Card.Body>
        </Card>
    );
}

const mapStateToProps = (state: any): WatchListItemReduxProps => {
    return {
        connectionStatus: state.bar.connectionStatus,
        subscriptionStatusMap: state.bar.subscriptionStatusPerSymbol,
        barMap: new Map<string, IBar[]>(Object.entries(state.bar.barMap))
    };
};

const mapDispatchToProps = (dispatch: any): WatchListItemDispatchProps => {
    return {
        connect: () => dispatch(barConnect()),
        disconnect: () => dispatch(barDisconnect()),
        subscribe: (symbol: string) => dispatch(subscribeBar({ symbol })),
        unsubscribe: (symbol: string) => dispatch(unsubscribeBar({ symbol })),
    };
};

export default connect<WatchListItemReduxProps, WatchListItemDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(memo(WatchListItemComponent));
