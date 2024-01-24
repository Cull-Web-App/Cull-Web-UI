import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { IRootPartition, selectBarsForSymbolFromTime } from '../../../state';
import AssetChartComponent from './AssetChart.component';

type AssetChartWrapperProps = AssetChartWrapperComponentProps;
interface AssetChartWrapperComponentProps {
    symbol: string;
    start: Date;
    granularity: string;
}

export const AssetChartWrapperComponent = ({ symbol, start, granularity }: AssetChartWrapperProps) => {
    const bars = useSelector((state: IRootPartition) => selectBarsForSymbolFromTime(state, symbol, start.toISOString()));
    return (
        <AssetChartComponent symbol={symbol} bars={bars} />
    )
};

export default memo(AssetChartWrapperComponent);