import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import { Col, Tab } from 'react-bootstrap';
import WatchListComponent from './WatchList.component';
import './RightPanel.component.scss';

type RightPanelProps = RightPanelComponentProps;
interface RightPanelComponentProps {
}

export const RightPanelComponent = ({ }: RightPanelProps) => {
    return (
        <Col className='right-panel-container'>
            <Tabs defaultActiveKey="watchList" id="right-panel-tabs" className="right-panel-tabs">
                <Tab eventKey="watchList" title="Watch List">
                    <WatchListComponent></WatchListComponent>
                </Tab>
                <Tab eventKey="runningStrategies" title="Running Strategies">
                    <div className="panel-content" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
                        {/* Replace this with the component or elements you want to display for Running Strategies */}
                        <div>Running Strategies Content</div>
                    </div>
                </Tab>
            </Tabs>
        </Col>
    );
};

export default RightPanelComponent;