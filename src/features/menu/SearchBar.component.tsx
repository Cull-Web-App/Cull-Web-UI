import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.component.css';

export const SearchBarComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (searchTerm === '') {
            return;
        }

        navigate(`/stock/${searchTerm}`);
        setSearchTerm('');
        setIsExpanded(false);
    };

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleKeyDown = (e: { key: string, preventDefault: () => void; }) => {
        if (e.key !== 'Escape' && e.key !== 'Enter') {
            return;
        }

        if (e.key === 'Escape') {
            setIsExpanded(false);
            setSearchTerm('');
        } else if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <Form.Group controlId="searchForm" className='d-flex align-items-center' onSubmit={handleSearch}>
            <div className={`search-icon ${isExpanded ? 'expanded': ''}`} onClick={handleExpand}>
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </div>
            {isExpanded && (
                <Form.Control
                    type="text"
                    placeholder="Search"
                    className="search-box ml-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    
                />
            )}
        </Form.Group>
    );
};

export default SearchBarComponent;