import { useSelector } from "react-redux";
import React, { memo } from "react";
import { IRootPartition, selectBarsForSymbol } from "../../state";
import './Price.component.scss';

type PriceProps = PriceComponentProps;
interface PriceComponentProps {
    symbol: string;
}

const PriceComponent = ({ symbol }: PriceProps) => {
    const bars = useSelector((state: IRootPartition) => selectBarsForSymbol(state, symbol));
    if (!bars || bars.length === 0) {
        return (
            <div className="price-container">
                <div className="price" data-testid="price">$--</div>
            </div>
        );
    }
    return (
        <div className="price-container">
            <div className="price" data-testid="price">
                ${bars[bars.length - 1].close.toFixed(2)}
            </div>
        </div>
    );
};

export default memo(PriceComponent);