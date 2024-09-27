
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', ws => {
    console.log('Cliente conectado.');
    ws.send('Bem-vindo ao WebSocket servidor!');

    ws.on('message', message => {
        console.log(`Mensagem: ${message}`);
        wss.clients.forEach(client => client.readyState === WebSocket.OPEN && client.send(`Cliente: ${message}`));
    });

    ws.on('close', () => console.log('Cliente desconectado.'));
});

console.log('Servidor WebSocket na porta 3000');
