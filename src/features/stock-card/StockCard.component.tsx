import React, { MouseEventHandler } from 'react';
import Card from 'react-bootstrap/Card';
import { connect, useDispatch, useSelector } from 'react-redux';
import PriceComponent from './Price.component';
import './StockCard.component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { selectBarMap, unsubscribeBar } from '../../state';
import { IBar } from '../../common';

// Define the Props for this component
type StockCardProps = StockCardComponentProps;
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

const StockCardComponent = ({ symbol }: StockCardProps) => {
    const dispatch = useDispatch();
    const unsubscribe = (symbol: string) => dispatch(unsubscribeBar({ symbol }));

    return (
        <Card bg='dark' text='white' className='stock-card shadow' data-testid="stock-card">
            <StockCardCloseButton onClick={() => unsubscribe(symbol)}></StockCardCloseButton>
            <Card.Body>
                <Card.Title data-testid="stock-card-title">{symbol}</Card.Title>
                <PriceComponent symbol={symbol}></PriceComponent>
            </Card.Body>
        </Card>
    );
};

export default StockCardComponent;
