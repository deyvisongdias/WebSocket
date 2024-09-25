const WebSocket = require('ws');

// Cria um servidor WebSocket rodando na porta 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
    console.log('Cliente conectado.');

    // Quando o servidor recebe uma mensagem de um cliente
    ws.on('message', function incoming(message) {
        console.log(`Mensagem recebida: ${message}`);

        // Envia a mensagem de volta a todos os clientes conectados
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Cliente: ${message}`);
            }
        });
    });


    // Evento de desconexão do cliente
    ws.on('close', function () {
        console.log('Cliente desconectado.');
    });

    // Envia uma mensagem ao cliente quando ele se conecta
    ws.send('Bem-vindo ao WebSocket servidor!');
});

console.log('Servidor WebSocket rodando na porta 3000');