const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado.');

    ws.on('message', (message) => {
        console.log('Mensagem recebida: ', message);

        setTimeout(() => {
            const response = JSON.stringify({ status: 'approved', message: 'Pagamento aprovado!' });
            ws.send(response);
        }, 10000);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });
});

server.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
});
