const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const cron = require('node-cron');
const { carregarJogos, carregarResultados } = require('./utils/fileManager');

const app = express();
const PORT = 3000;

// Configurar o servidor WebSocket
const server = require('http').createServer(app);

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar o servidor HTTP e WebSocket
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Endpoint para API
app.get('/api/dados', (req, res) => {
    const jogos = carregarJogos();
    res.json({ jogos });
});
