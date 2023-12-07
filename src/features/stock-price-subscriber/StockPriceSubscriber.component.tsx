import { Component } from "react";
import { connect } from "react-redux";
import React from "react";
import { barConnect } from "state";

type StockPriceSubscriberProps = StockPriceSubscriberDispatchProps & Props;
type Props = {
};

type StockPriceSubscriberDispatchProps = {
    barConnect: (() => void);
};

export class StockPriceSubscriberComponent extends Component<StockPriceSubscriberProps> {
    public constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {
        const { barConnect } = this.props;
        barConnect();
    }

    public render(): JSX.Element {
        return (<div></div>);
    }
}

const mapDispatchToProps = (dispatch: any): StockPriceSubscriberDispatchProps =>
{
    return {
        barConnect: () => dispatch(barConnect()),
    };
}

export default connect<{}, StockPriceSubscriberDispatchProps>(
    null,
    mapDispatchToProps
)(StockPriceSubscriberComponent);