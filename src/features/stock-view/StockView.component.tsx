import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { IRootPartition, selectAssetBySymbol } from '../../state';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import PriceComponent from 'features/stock-card/Price.component';
import PriceDifferentialComponent from 'features/right-panel/PriceDifferential.component';
import MarketMakerMovesComponent from 'features/right-panel/MarketMakerMoves.component';
import './StockView.component.scss';
import AssetChartContainerComponent from './asset-chart/AssetChartContainer.component';

type StockViewProps = StockViewComponentProps;
interface StockViewComponentProps {
}

export const StockViewComponent = ({ }: StockViewProps) => {
    const [searchParams] = useSearchParams();

    // Get the symbol from the search params
    const symbol = searchParams.get('symbol') ?? '';
    // Get the asset from the symbol
    const asset = useSelector((state: IRootPartition) => selectAssetBySymbol(state, symbol));
    if (symbol === '' || !asset) {
        return (
            <div>
                <h1>Stock View</h1>
            </div>
        );
    }

    return (
        <div className="stock-view-container">
            <Row>
                <Col>
                    <h1>{asset.symbol}</h1>
                    <h2>{asset.name}</h2>
                </Col>
                <Col>
                    <Row>
                        <PriceComponent symbol={asset.symbol}></PriceComponent>
                    </Row>
                    <Row>
                        <PriceDifferentialComponent symbol={asset.symbol} displayPercent={true} displayAmount={true}></PriceDifferentialComponent>
                    </Row>
                    <Row>
                        <MarketMakerMovesComponent symbol={asset.symbol}></MarketMakerMovesComponent>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Tabs defaultActiveKey="chart" id="stock-view-tabs" className="stock-view-tabs">
                    <Tab eventKey="chart" title="Chart">
                        <AssetChartContainerComponent symbol={asset.symbol}></AssetChartContainerComponent>
                    </Tab>
                    <Tab eventKey="news" title="News">
                        <div className="panel-content" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
                            {/* Replace this with the component or elements you want to display for Running Strategies */}
                            <div>News</div>
                        </div>
                    </Tab>
                </Tabs>
            </Row>
        </div>
    );
}


export default memo(StockViewComponent);