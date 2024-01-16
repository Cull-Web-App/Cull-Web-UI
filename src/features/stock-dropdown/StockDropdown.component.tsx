import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { selectAssets, selectSubscribedSymbols, subscribeBar } from '../../state';

// Define the Props for this component
type StockDropdownProps = {};

const StockDropdownComponent = ({}: StockDropdownProps) => {
    const dispatch = useDispatch();
    const subscribe = (symbol: string) => dispatch(subscribeBar({ symbol }));

    const symbols = Object.keys(useSelector(selectAssets));
    const subscribedSymbols = new Set(...useSelector(selectSubscribedSymbols));

    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const filteredSymbols = symbols.filter(symbol => !subscribedSymbols.has(symbol) && symbol.toLowerCase().includes(searchTerm.toLowerCase()));
    const itemsPerPage = 20;
    const totalItems = filteredSymbols.length;

    const handleItemClick = (symbol: string) => {
        subscribe(symbol);
    };

    const renderItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        return filteredSymbols.slice(startIndex, endIndex).map((symbol) => (
            <ListGroup.Item
                variant='dark'
                key={symbol}
                action
                onClick={() => handleItemClick(symbol)}
                data-testid='stock-dropdown-item'
            >
                {symbol}
            </ListGroup.Item>
        ));
    };

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const leftArrow = '\u2190';
    const rightArrow = '\u2192';

    return (
        <Dropdown show={showDropdown} onToggle={show => setShowDropdown(show)}>
            <Dropdown.Toggle data-testid='stock-dropdown-toggle' variant="success" id="subscription-dropdown" disabled={symbols.length === 0}>
                Subscribe To Stock Symbol
            </Dropdown.Toggle>

            <Dropdown.Menu variant='dark'>
                <Form.Group controlId="searchForm">
                    <Form.Control
                        type="text"
                        placeholder="Search symbols..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>
                <ListGroup>
                    {renderItems()}
                </ListGroup>
                {totalItems > itemsPerPage && (
                    <div>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1}>{leftArrow}</button>
                        <button onClick={handleNextPage} disabled={currentPage * itemsPerPage >= totalItems}>{rightArrow}</button>
                    </div>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default StockDropdownComponent;
