import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    barConnect,
    mmmConnect,
    mmmSubscribe,
    mmmUnsubscribe,
    selectBarsForSymbol,
    selectConnectionStatusBar,
    selectMarketMakerMovesForSymbol,
    selectSubscriptionStatusForSymbolBar,
    selectSubscriptionStatusForSymbolMMM,
    subscribeBar,
    unsubscribeBar
} from '../../state';
import { ConnectionStatus, SubscriptionStatus } from '../../common';
import Card from 'react-bootstrap/Card';
import SparkChartComponent from './SparkChart.component';
import { IRootPartition } from '../../state';
import PriceComponent from 'features/stock-card/Price.component';
import PriceDifferentialComponent from './PriceDifferential.component';
import { Col, Container, Row } from 'react-bootstrap';
import MarketMakerMovesComponent from './MarketMakerMoves.component';

type WatchListItemProps = WatchListItemComponentProps;
interface WatchListItemComponentProps {
    symbol: string;
}

export const WatchListItemComponent = ({ symbol }: WatchListItemProps) => {
    const dispatch = useDispatch();
    const connectBar = () => dispatch(barConnect());
    const connectMarketMakerMoves = () => dispatch(mmmConnect());
    const barSubscribe = () => dispatch(subscribeBar({ symbol }));
    const subscribeMarketMakerMoves = () => dispatch(mmmSubscribe({ symbol }));
    const barUnsubscribe = () => dispatch(unsubscribeBar({ symbol }));
    const unsubscribeMarketMakerMoves = () => dispatch(mmmUnsubscribe({ symbol }));

    const connectionStatus = useSelector(selectConnectionStatusBar);
    const bars = useSelector((state: IRootPartition) => selectBarsForSymbol(state, symbol));
    const mmm = useSelector((state: IRootPartition) => selectMarketMakerMovesForSymbol(state, symbol));
    const subscriptionStatusBar = useSelector((state: IRootPartition) => selectSubscriptionStatusForSymbolBar(state, symbol));
    const subscriptionStatusMMM = useSelector((state: IRootPartition) => selectSubscriptionStatusForSymbolMMM(state, symbol));

    useEffect(() => {
        if (connectionStatus === ConnectionStatus.Disconnected) {
            connectBar();
        }

        if (connectionStatus === ConnectionStatus.Disconnected) {
            connectMarketMakerMoves();
        }
    }, [connectionStatus]);

    useEffect(() => {
        if (subscriptionStatusBar === SubscriptionStatus.Unsubscribed) {
            barSubscribe();
        }

        if (subscriptionStatusMMM === SubscriptionStatus.Unsubscribed) {
            subscribeMarketMakerMoves();
        }

        return () => {
            if (subscriptionStatusBar === SubscriptionStatus.Subscribed) {
                barUnsubscribe();
            }

            if (subscriptionStatusMMM === SubscriptionStatus.Subscribed) {
                unsubscribeMarketMakerMoves();
            }
        };
    }, [symbol]);

    return (
        <div className='stock-card-container'>
            <Card bg='dark' text='white' className='stock-card shadow' data-testid="stock-card">
                <Card.Body>
                    <Card.Title>
                        {symbol}
                    </Card.Title>
                    <Row>
                        <Col xs={8}>
                            <SparkChartComponent symbol={symbol} bars={bars}></SparkChartComponent>
                        </Col>
                        <Col xs={4}>
                            <Row>
                                <PriceComponent symbol={symbol}></PriceComponent>
                            </Row>
                            <Row>
                                <PriceDifferentialComponent symbol={symbol}></PriceDifferentialComponent>
                            </Row>
                            <Row>
                                <MarketMakerMovesComponent symbol={symbol} mmm={mmm}></MarketMakerMovesComponent>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default memo(WatchListItemComponent);
