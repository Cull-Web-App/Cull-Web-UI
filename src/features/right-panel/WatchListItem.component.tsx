import React, { memo, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { barConnect, barDisconnect, selectBarsForSymbol, selectConnectionStatus, selectSubscriptionStatusForSymbol, subscribeBar, unsubscribeBar } from '../../state';
import { ConnectionStatus, IBar, SubscriptionStatus } from '../../common';
import Card from 'react-bootstrap/Card';
import SparkChartComponent from './SparkChart.component';
import { IRootPartition } from 'state/partitions';

type WatchListItemProps = WatchListItemComponentProps;
interface WatchListItemComponentProps {
    symbol: string;
}

export const WatchListItemComponent = ({ symbol }: WatchListItemProps) => {
    const dispatch = useDispatch();
    const connect = () => dispatch(barConnect());
    const subscribe = () => dispatch(subscribeBar({ symbol }));
    const unsubscribe = () => dispatch(unsubscribeBar({ symbol }));

    const connectionStatus = useSelector(selectConnectionStatus);
    const bars = useSelector((state: IRootPartition) => selectBarsForSymbol(state, symbol));
    const subscriptionStatus = useSelector((state: IRootPartition) => selectSubscriptionStatusForSymbol(state, symbol));

    useEffect(() => {
        if (connectionStatus === ConnectionStatus.Disconnected) {
            connect();
        }
    }, [connectionStatus]);

    useEffect(() => {
        if (subscriptionStatus === SubscriptionStatus.Unsubscribed) {
            subscribe();
        }

        return () => {
            if (subscriptionStatus === SubscriptionStatus.Subscribed) {
                unsubscribe();
            }
        };
    }, [symbol]);

    return (
        <Card bg='dark' text='white' className='stock-card shadow' data-testid="stock-card">
            <Card.Body>
                <Card.Title data-testid="stock-card-title">{symbol}</Card.Title>
                <SparkChartComponent symbol={symbol} bars={bars}></SparkChartComponent>
            </Card.Body>
        </Card>
    );
};

export default memo(WatchListItemComponent);
