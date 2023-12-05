import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';
import { subscribe } from '../../state';

// Define the Props for this component
type StockDropdownProps = StockDropdownDispatchProps & StockDropdownReduxProps;
interface StockDropdownDispatchProps {
    subscribe: ((symbol: string) => void);
}
interface StockDropdownReduxProps {
    subscribedSymbols: Set<string>;
    symbols: string[];
}

const StockDropdownComponent = ({ symbols, subscribedSymbols, subscribe }: StockDropdownProps) => {
    const availableSymbols: string[] = symbols.filter(symbol => !subscribedSymbols.has(symbol));
    return (
        <Dropdown>
            <Dropdown.Toggle data-testid='stock-dropdown-toggle' variant="success" id="subscription-dropdown" disabled={availableSymbols.length === 0}>
                Subscribe To Stock Symbol
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {availableSymbols.map(symbol => <Dropdown.Item data-testid='stock-dropdown-item' key={symbol} onClick={() => subscribe(symbol)}>{symbol}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );
}

const mapDispatchToProps = (dispatch: any): StockDropdownDispatchProps => {
    return {
        subscribe: (symbol: string) => dispatch(subscribe(symbol)),
    };
}

const mapStateToProps = (state: any): StockDropdownReduxProps => {
    const { symbols } = state.symbols;
    const { subscribedSymbols } = state.price;
    return {
        subscribedSymbols: new Set([...subscribedSymbols]),
        symbols
    };
}

export default connect<StockDropdownReduxProps, StockDropdownDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(StockDropdownComponent);
