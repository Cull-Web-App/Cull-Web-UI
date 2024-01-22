import React, { memo, useEffect } from "react";
import EditWatchListButtonComponent from "./EditWatchListButton.component";
import SearchBarComponent from "./SearchBar.component";
import { useDispatch, useSelector } from "react-redux";
import { findManyCalendar, initializeWatch, selectCalendars, selectWatches } from "../../state";
import { Col, Row } from "react-bootstrap";
import WatchListItemComponent from "./WatchListItem.component";
import "./WatchList.component.scss";

type WatchListProps = WatchListComponentProps;
interface WatchListComponentProps {
}

export const WatchListComponent = ({}: WatchListProps) => {
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
        <Col className="watch-list-content">
            <Row className='d-flex justify-content-end mb-3'>
                <Col xs="auto">
                    <EditWatchListButtonComponent></EditWatchListButtonComponent>
                </Col>
                <Col xs="auto">
                    <SearchBarComponent onSearch={handleSearch} onSearchTermChange={() => {}}></SearchBarComponent>
                </Col>
            </Row>
            <Row className="watch-list-items">
                {
                    watchList.map((watch) => <WatchListItemComponent key={watch.symbol} symbol={watch.symbol}></WatchListItemComponent>)
                }
            </Row>
        </Col>
    );
};

export default memo(WatchListComponent);