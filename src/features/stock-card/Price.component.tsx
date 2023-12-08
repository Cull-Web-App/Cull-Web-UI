import { IBar } from "../../common";
import React from "react";

const PriceComponent = ({ barMap, symbol }: { barMap: Map<string, IBar[]>, symbol: string }) => {
    const bars = barMap.get(symbol);
    if (!bars || bars.length === 0) {
        return (<div className="price" data-testid="price">$--</div>);
    }
    return (
        <div className="price" data-testid="price">
            ${bars[bars.length - 1].close.toFixed(2)}
        </div>
    )
};

export default PriceComponent;