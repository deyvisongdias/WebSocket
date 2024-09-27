//Codigo de criarção de configuração do servidor Websocket

const WebSocket = require('ws'); // Importa o módulo 'ws'
const wss = new WebSocket.Server({ port: 8080 }); // Cria um servidor WebSocket que escuta na porta 8080

let clientId = 1; // Inicializa o contador de clientes

wss.on('connection', ws => { // Função acionada sempre que possui uma nova conecxão no sistema
    const currentClientId = clientId++; // Atribui um ID único ao cliente atual e incrementa o contador
    const clientName = `Cliente ${currentClientId}`; // Define o nome do cliente

    console.log(`${clientName} conectado.`); // Exibe no console o nome do cliente que se conectou
    ws.send(`Bem-vindo ao servidor WebSocket, ${clientName}!`); // Envia uma mensagem personalizada ao cliente

    ws.on('message', message => {
        console.log(`Mensagem de ${clientName}: ${message}`); // Exibe a mensagem recebida do cliente no console
        wss.clients.forEach(client => 
            client.readyState === WebSocket.OPEN && client.send(`${clientName}: ${message}`) // Envia a mensagem para todos os clientes conectados
        );
    });

    ws.on('close', () => console.log(`${clientName} desconectado.`)); // Exibe no console quando o cliente se desconectar
});

console.log('Servidor WebSocket na porta 8080');
