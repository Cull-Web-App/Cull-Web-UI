import { Component } from "react";
import { connect } from "react-redux";
import { connectionClosed, connectionError, connectionOpened, updatePrice } from "../../state";
import React from "react";

type StockPriceSubscriberProps = StockPriceSubscriberDispatchProps & Props;
type Props = {
    url: string;
};

type StockPriceSubscriberDispatchProps = {
    connectionOpened: (() => void);
    updatePrice: (({ symbol, price }: { symbol: string, price: number}) => void);
    connectionClosed: (() => void);
    connectionError: ((err: any) => void);
};

export class StockPriceSubscriberComponent extends Component<StockPriceSubscriberProps> {
    public constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {
        const { url, connectionOpened, updatePrice, connectionClosed, connectionError } = this.props;
        const socket = new WebSocket(url);

        socket.addEventListener('open', () => {
            connectionOpened();
        });

        socket.addEventListener('message', ({ data }) => {
            const messageData = JSON.parse(data.toString());
            if (messageData.type === 'CLIENT_ID') {
                sessionStorage.setItem('clientId', messageData.clientId);
            } else if (messageData.type === 'PRICE_UPDATE') {
                updatePrice({ symbol: messageData.symbol, price: Number(messageData.price) });
            } else if (messageData.type === 'BULK_PRICE_UPDATE') {
                for (const [symbol, price] of Object.entries(messageData.prices)) {
                    updatePrice({ symbol, price: Number(price) });
                }
            }
        });

        socket.addEventListener('close', () => {
            connectionClosed();
        });

        socket.addEventListener('error', (err) => {
            connectionError(err);
        });
    }

    public render(): JSX.Element {
        return (<div></div>);
    }
}

const mapDispatchToProps = (dispatch: any): StockPriceSubscriberDispatchProps =>
{
    return {
        connectionOpened: () => dispatch(connectionOpened()),
        updatePrice: ({ symbol, price }: { symbol: string, price: number }) => dispatch(updatePrice({ symbol, price })),
        connectionClosed: () => dispatch(connectionClosed()),
        connectionError: (err: any) => dispatch(connectionError(err))
    };
}

export default connect<{}, StockPriceSubscriberDispatchProps>(
    null,
    mapDispatchToProps
)(StockPriceSubscriberComponent);