import SearchBarComponent from './SearchBar.component';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { findManyCalendar, initializeWatch, selectCalendars, selectWatches } from '../../state';
import EditWatchListButtonComponent from './EditWatchListButton.component';
import WatchListItemComponent from './WatchListItem.component';

type RightPanelProps = RightPanelComponentProps;
interface RightPanelComponentProps {
}

export const RightPanelComponent = ({ }: RightPanelProps) => {
    const dispatch = useDispatch();
    const findAll = () => dispatch(initializeWatch());
    const findManyCalendars = ({ from, to }: { from: Date, to: Date }) => dispatch(findManyCalendar({ from, to }));

    const calendars = useSelector(selectCalendars);
    const watchList = useSelector(selectWatches);

    useEffect(() => {
        findAll();
    }, []);

    useEffect(() => {
        if (calendars.length === 0) {
            // Find calendars for last 30 days
            findManyCalendars({ from: new Date(new Date().setDate(new Date().getDate() - 30)), to: new Date() });
        }
    }, [calendars]);

    const handleSearch = ({ searchTerm }: { searchTerm: string }) => {
        console.log(searchTerm);
    };

    return (
        <div className='right-panel-content'>
            <div className='d-flex justify-content-end mb-3'>
                <EditWatchListButtonComponent></EditWatchListButtonComponent>
                <SearchBarComponent onSearch={handleSearch} onSearchTermChange={() => {}}></SearchBarComponent>
            </div>
            <Card>
                <Card.Header>
                    <Card.Title>Watch List</Card.Title>
                </Card.Header>
                <Card.Body>
                    {
                        watchList.map((watch) => <WatchListItemComponent key={watch.symbol} symbol={watch.symbol}></WatchListItemComponent>)
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

export default RightPanelComponent;