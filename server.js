const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
    console.log('Novo cliente conectado!');

    socket.on('message', (message) => {
        console.log(`Recebido: ${message}`);
        // Envia a mensagem de volta para todos os clientes conectados
        server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Cliente desconectado!');
    });
});

console.log('Servidor WebSocket rodando na porta 8080');
