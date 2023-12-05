import React, { MouseEventHandler } from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import PriceComponent from './Price.component';
import { unsubscribe } from '../../state';
import './StockCard.component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

// Define the Props for this component
type StockCardProps = StockCardReduxProps & StockCardComponentProps & StockCardDispatchProps;
interface StockCardReduxProps {
    priceMap: Map<string, number>;
}

interface StockCardDispatchProps {
    unsubscribe: ((symbol: string) => void);
}

interface StockCardComponentProps {
    symbol: string;
}

const StockCardCloseButton = ({ onClick }: { onClick: MouseEventHandler<HTMLDivElement>}) => {
    return (
        <div className='close-button' onClick={onClick}>
            <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
        </div>
    );
}

const StockCardComponent = ({ symbol, priceMap, unsubscribe }: StockCardProps) => {
    return (
        <Card className='stock-card shadow' data-testid="stock-card">
            <StockCardCloseButton onClick={() => unsubscribe(symbol)}></StockCardCloseButton>
            <Card.Body>
                <Card.Title data-testid="stock-card-title">{symbol}</Card.Title>
                <PriceComponent priceMap={priceMap} symbol={symbol}></PriceComponent>
            </Card.Body>
        </Card>
    );
}

const mapDispatchToProps = (dispatch: any): StockCardDispatchProps => {
    return {
        unsubscribe: (symbol: string) => dispatch(unsubscribe(symbol))
    };
}

const mapStateToProps = (state: any): StockCardReduxProps => {
    const { priceMap } = state.price;
    return {
        priceMap: new Map(Object.entries(priceMap))
    };
}

export default connect<StockCardReduxProps, StockCardDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(StockCardComponent);
