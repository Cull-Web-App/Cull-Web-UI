import SearchBarComponent from './SearchBar.component';
import StockCardComponent from 'features/stock-card/StockCard.component';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { initializeWatch } from 'state';
import EditWatchListButtonComponent from './EditWatchListButton.component';

type RightPanelProps = RightPanelDispatchProps & RightPanelComponentProps & RightPanelReduxProps;
interface RightPanelDispatchProps {
    findAll: (() => void);
}

interface RightPanelReduxProps {
    watchList: string[];
}

interface RightPanelComponentProps {
}

export const RightPanelComponent = ({ watchList, findAll }: RightPanelProps) => {
    useEffect(() => {
        findAll();
    }, []);

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
                        watchList.map((symbol) => <StockCardComponent key={symbol} symbol={symbol}></StockCardComponent>)
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

const mapStateToProps = (state: any): RightPanelReduxProps => {
    return {
        watchList: state.watch.assets
    };
}

const mapDispatchToProps = (dispatch: any): RightPanelDispatchProps => {
    return {
        findAll: () => dispatch(initializeWatch()),
    };
}

export default connect<RightPanelReduxProps, RightPanelDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(RightPanelComponent);