import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', function connection(ws) {

    ws.on('connect', (event) => {
        console.log('New connection!')
    })

    ws.on('open', (event) => {
        console.log('New connection')
    })

    ws.on('message', function incoming(message) {
        console.log('received (from ws): %s', message);
    });

    ws.on('error', function incoming(error) {
        console.log('received an error: %s', error);
    });
});

const subject = new WebSocket("ws://localhost:8081");

export function sendMessage(text: string) {
    subject.send(text);
}