import WebSocket from 'ws';

export interface IWebSocketRepository {
    connect(
        onOpen: () => void,
        onClose: () => void,
        onMessage: (data: WebSocket.Data) => void): void;
    send(message: string): void;
}