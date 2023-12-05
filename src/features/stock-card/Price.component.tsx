import React from "react";

const PriceComponent = ({ priceMap, symbol }: { priceMap: Map<string, number>, symbol: string }) => {
    return (
        <div className="price" data-testid="price">
            ${(priceMap.get(symbol) || 0).toFixed(2)}
        </div>
    )
};

export default PriceComponent;