import React, { MouseEventHandler } from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';
import PriceComponent from './Price.component';
import './StockCard.component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { barDisconnect, unsubscribeBar } from 'state';
import { IBar } from '../../common';

// Define the Props for this component
type StockCardProps = StockCardReduxProps & StockCardComponentProps & StockCardDispatchProps;
interface StockCardReduxProps {
    barMap: Map<string, IBar[]>;
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

const StockCardComponent = ({ symbol, barMap, unsubscribe }: StockCardProps) => {
    return (
        <Card bg='dark' text='white' className='stock-card shadow' data-testid="stock-card">
            <StockCardCloseButton onClick={() => unsubscribe(symbol)}></StockCardCloseButton>
            <Card.Body>
                <Card.Title data-testid="stock-card-title">{symbol}</Card.Title>
                <PriceComponent barMap={barMap} symbol={symbol}></PriceComponent>
            </Card.Body>
        </Card>
    );
}

const mapDispatchToProps = (dispatch: any): StockCardDispatchProps => {
    return {
        unsubscribe: (symbol: string) => dispatch(unsubscribeBar({ symbol }))
    };
}

const mapStateToProps = (state: any): StockCardReduxProps => {
    const { barMap } = state.bar;
    return {
        barMap: new Map(Object.entries(barMap))
    };
}

export default connect<StockCardReduxProps, StockCardDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(StockCardComponent);
