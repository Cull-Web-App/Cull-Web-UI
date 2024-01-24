import React, { memo, useEffect, useState } from 'react';
import { TimeSetting } from '../../../common';
import { Dropdown, Row } from 'react-bootstrap';
import AssetChartWrapperComponent from './AssetChartWrapper.component';

type AssetChartContainerProps = AssetChartContainerComponentProps;
interface AssetChartContainerComponentProps {
    symbol: string;
}

export const AssetChartContainerComponent = ({ symbol }: AssetChartContainerProps) => {
    const [timeSetting, setTimeSetting] = useState<TimeSetting>(TimeSetting.OneDayByOneMinute);
    const [granularity, setGranularity] = useState<string>('min'); // 1 minute
    const [startDate, setStartDate] = useState<Date>(new Date());

    useEffect(() => {
        // convert the time setting to start and end
        // parse the string from the time setting
        const [timeSettingString, gran] = timeSetting.split(':');
        // First value is the RANGE the second is the GRANULARITY

        // set the start and end based on the range
        // grab the numeric value from the time setting string -- first characters until not a number
        const range = parseInt(timeSettingString.match(/^\d+/)![0]);

        // grab the rest of the string after the number -- this is "day", "week", "month", "year"
        const rangeType = timeSettingString.substring(range.toString().length);

        // set the start and end dates based on the range
        const newStartDate = new Date();
        switch (rangeType.toLowerCase()) {
            case 'day':
                newStartDate.setDate(newStartDate.getDate() - range);
                break;
            case 'week':
                newStartDate.setDate(newStartDate.getDate() - range * 7);
                break;
            case 'month':
                newStartDate.setMonth(newStartDate.getMonth() - range);
                break;
            case 'year':
                newStartDate.setFullYear(newStartDate.getFullYear() - range);
                break;
        }

        setStartDate(newStartDate);
        setGranularity(gran);
    }, [timeSetting]);

    const handleSelect = (eventKey: string | null) => {
        if (!eventKey) {
            return;
        }
        setTimeSetting(eventKey as TimeSetting);
    };

    return (
        <div className="asset-chart-container">
            <Row>
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Time Setting
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {[
                            TimeSetting.OneDayByOneMinute,
                            TimeSetting.OneDayByFiveMinutes,
                            TimeSetting.FiveDaysByFiveMinutes,
                            TimeSetting.FiveDaysByFifteenMinutes,
                            TimeSetting.TenDaysByThirtyMinutes,
                            TimeSetting.TwentyDaysByOneHour,
                            TimeSetting.SixMonthsByFourHours,
                            TimeSetting.OneYearByOneDay,
                            TimeSetting.FiveYearsByOneWeek,
                            TimeSetting.TenYearsByOneMonth,
                            TimeSetting.FifteenYearsByOneMonth,
                            TimeSetting.TwentyYearsByOneMonth
                        ].map((timeSetting) => (
                            <Dropdown.Item eventKey={timeSetting} key={timeSetting}>
                                {timeSetting}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Row>
                <AssetChartWrapperComponent symbol={symbol} start={startDate} granularity={granularity}></AssetChartWrapperComponent>
            </Row>
        </div>
    );
};

export default memo(AssetChartContainerComponent);