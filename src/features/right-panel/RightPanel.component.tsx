import SearchBarComponent from 'features/menu/SearchBar.component';
import StockCardComponent from 'features/stock-card/StockCard.component';
import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';

type RightPanelProps = RightPanelDispatchProps & RightPanelComponentProps & RightPanelReduxProps;
interface RightPanelDispatchProps {
}

interface RightPanelReduxProps {
    watchList: string[];
}

interface RightPanelComponentProps {
}

export const RightPanelComponent = ({ watchList }: RightPanelProps) => {
    return (
        <div className='right-panel-content'>
            <div className='d-flex justify-content-end mb-3'>
                <SearchBarComponent></SearchBarComponent>
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
    };
}

export default connect<RightPanelReduxProps, RightPanelDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(RightPanelComponent);