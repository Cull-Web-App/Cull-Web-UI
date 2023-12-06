import { Component } from "react";
import { connect } from "react-redux";
import React from "react";
import { barConnect, subscribeBar } from "state";

type StockPriceSubscriberProps = StockPriceSubscriberDispatchProps & Props;
type Props = {
};

type StockPriceSubscriberDispatchProps = {
    barConnect: (() => void);
    subscribeBar: (({ symbol }: { symbol: string}) => void);
};

export class StockPriceSubscriberComponent extends Component<StockPriceSubscriberProps> {
    public constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {
        const { barConnect, subscribeBar } = this.props;
        barConnect();

        // wait for a second before subscribing to the bar
        setTimeout(() => {
            subscribeBar({ symbol: 'AAPL' });
        }, 1000);
    }

    public render(): JSX.Element {
        return (<div></div>);
    }
}

const mapDispatchToProps = (dispatch: any): StockPriceSubscriberDispatchProps =>
{
    return {
        barConnect: () => dispatch(barConnect()),
        subscribeBar: ({ symbol }: { symbol: string}) => dispatch(subscribeBar({ symbol })),
    };
}

export default connect<{}, StockPriceSubscriberDispatchProps>(
    null,
    mapDispatchToProps
)(StockPriceSubscriberComponent);