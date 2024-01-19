import { IMarketMakerMove } from 'common';
import React, { memo } from 'react';
import './MarketMakerMoves.component.scss';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

type MarketMakerMovesProps = MarketMakerMovesComponentProps;
interface MarketMakerMovesComponentProps {
    symbol: string;
    mmm: IMarketMakerMove[];
}

export const MarketMakerMovesComponent = ({ symbol, mmm }: MarketMakerMovesProps) => {
    if (!mmm || mmm.length === 0) {
        return null;
    }

    return (
        <div className="mmm-container">
            <Col>
                <svg width="25" height="30" className="mmm-icon">
                    <text x="5" y="17.5" fontSize="10" fill="#FFAA00">M</text>
                    <text x="15" y="17.5" fontSize="10" fill="#FFAA00">M</text>
                    <text x="10" y="27.5" fontSize="10" fill="#FFAA00">M</text>
                </svg>
            </Col>
            <Col>
                <div className="mmm-text" data-testid="mmm">
                    ±{Math.abs(mmm[mmm.length - 1].marketMakerMove).toFixed(2)}
                </div>
            </Col>
        </div>
    );
};

export default memo(MarketMakerMovesComponent);