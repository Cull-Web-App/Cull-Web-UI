import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { barConnect, selectBarsForSymbol, selectConnectionStatus, selectSubscriptionStatusForSymbol, subscribeBar, unsubscribeBar } from '../../state';
import { ConnectionStatus, IBar, SubscriptionStatus } from '../../common';
import Card from 'react-bootstrap/Card';
import SparkChartComponent from './SparkChart.component';
import { IRootPartition } from '../../state';
import PriceComponent from 'features/stock-card/Price.component';
import PriceDifferentialComponent from './PriceDifferential.component';
import { Col, Container, Row } from 'react-bootstrap';

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
        <Container fluid className='stock-card-container'>
            <Card bg='dark' text='white' className='stock-card shadow' data-testid="stock-card">
                <Card.Body>
                    <Card.Title>
                        {symbol}
                    </Card.Title>
                    <Row>
                        <Col xs={10}>
                            <SparkChartComponent symbol={symbol} bars={bars}></SparkChartComponent>
                        </Col>
                        <Col xs={2}>
                            <PriceComponent symbol={symbol}></PriceComponent>
                            <PriceDifferentialComponent symbol={symbol}></PriceDifferentialComponent>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default memo(WatchListItemComponent);
