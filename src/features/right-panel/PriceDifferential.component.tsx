import React, { memo } from "react";
import { useSelector } from "react-redux";
import { IRootPartition, selectBarsForSymbol } from "../../state";
import './PriceDifferential.component.scss';

type PriceDifferentialProps = PriceDifferentialComponentProps;
interface PriceDifferentialComponentProps {
    symbol: string;
    displayPercent: boolean;
    displayAmount: boolean;
}

export const PriceDifferentialComponent = ({ symbol, displayPercent, displayAmount }: PriceDifferentialProps) => {
    const bars = useSelector((state: IRootPartition) => selectBarsForSymbol(state, symbol));

    if (!bars || bars.length === 0) {
        return (
            <div className="price-differential-container">
                <div className="price-differential" data-testid="price">--</div>
            </div>
        );
    }

    const openPrice = bars[0].open;
    const closePrice = bars[bars.length - 1].close;

    const priceDifferential = (closePrice - openPrice);
    const plusMinus = priceDifferential > 0 ? '+' : '-';
    const absPriceDifferential = Math.abs(priceDifferential);

    const getClassName = () => {
        if (priceDifferential < 0) {
            return 'price-differential-negative';
        }
        if (priceDifferential > 0) {
            return 'price-differential-positive';
        }
        return 'price-differential';
    };

    return (
        <div className="price-differential-container">
            <div className={getClassName()} data-testid="price">
                {displayAmount ? `${plusMinus}${absPriceDifferential.toFixed(2)}` : ''} {displayPercent ? `(${plusMinus}${(absPriceDifferential / openPrice * 100).toFixed(2)}%)` : ''}
            </div>
        </div>
    )
};

export default memo(PriceDifferentialComponent);