import { Component } from "react";
import { connect } from "react-redux";
import { connectionClosed, connectionError, connectionOpened, updatePrice } from "../../state";
import React from "react";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

type StockPriceSubscriberProps = StockPriceSubscriberDispatchProps & Props;
type Props = {
    url: string;
};

type StockPriceSubscriberDispatchProps = {
    connectionOpened: ((connection: HubConnection) => void);
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

        // Modify the following code to use SignalR instead of WebSocket
        const connection: HubConnection = new HubConnectionBuilder().withUrl(url, {
            accessTokenFactory: () => sessionStorage.getItem('accessToken') || ''
        }).withAutomaticReconnect().build();

        connection.start().then(() => {
            console.log('Connected!');
            connectionOpened(connection);
        }).catch(err => {
            console.log('SignalR connection error: ' + err.toString())
            connectionError(err);
        });

        connection.onclose(() => {
            connectionClosed();
        });

        connection.on('ReceiveBar', (messageData) => {
            updatePrice({ symbol: messageData.symbol, price: Number(messageData.open) });
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