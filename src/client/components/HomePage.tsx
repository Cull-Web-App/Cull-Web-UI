import * as React from 'react';

export default class HomePage extends React.Component<{}, {}>
{
    public render(): React.ReactNode
    {
        // Render the props on the combobox -- Make sure there is no issue with map on empty array
        return (
            <div id="outer-container" style={{ height: '100%'}}>
                HomePage
            </div>
        );
    }
}