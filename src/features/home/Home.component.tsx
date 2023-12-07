import React from "react";
import StockCardListComponent from "features/stock-card/StockCardList.component";
import StockDropdownComponent from "features/stock-dropdown/StockDropdown.component";

export const HomeComponent = () => {
    return (
        <div>
            <StockDropdownComponent></StockDropdownComponent>
            <StockCardListComponent></StockCardListComponent>
        </div>
    );
}

export default HomeComponent;
