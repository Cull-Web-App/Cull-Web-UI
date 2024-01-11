import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.component.scss';

type SearchBarProps = SearchBarComponentProps;
interface SearchBarComponentProps {
    expandEnabled?: boolean;
    onSearchTermChange: (({ searchTerm }: { searchTerm: string }) => void);
    onSearch: (({ searchTerm }: { searchTerm: string }) => void);
}

export const SearchBarComponent = ({ expandEnabled, onSearch, onSearchTermChange }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (!isExpanded) {
            setSearchTerm('');
        }
    }, [isExpanded]);

    const handleSearch = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (searchTerm === '') {
            return;
        }

        onSearch({ searchTerm });
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

        if (e.key === 'Escape' && !expandEnabled) {
            setIsExpanded(false);
            setSearchTerm('');
        } else if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    const handleBlur = () => {
        if (!expandEnabled) {
            setIsExpanded(false);
            setSearchTerm('');
        }
    };

    const handleSearchTermChange = (e: { target: { value: string; }; }) => {
        const upperSearchTerm = e.target.value.toUpperCase();
        setSearchTerm(upperSearchTerm);
        onSearchTermChange({ searchTerm: upperSearchTerm });
    };

    return (
        <Form.Group controlId="searchForm" className='d-flex align-items-center search-container' onSubmit={handleSearch}>
            <div className={`search-icon ${(isExpanded || expandEnabled) ? 'expanded': ''}`} onClick={handleExpand}>
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </div>
            {(isExpanded || expandEnabled) && (
                <Form.Control
                    type="text"
                    placeholder="Search"
                    className="search-box ml-2"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus={!expandEnabled}
                />
            )}
        </Form.Group>
    );
};

export default SearchBarComponent;