const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const cron = require('node-cron');
const fetchResults = require('./utils/scrapper'); // Importa o scrapper para uso no cron
const { carregarJogos, carregarResultados } = require('./utils/fileManager');

const app = express();
const PORT = 3000;

// Configurar o servidor WebSocket
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware para interpretar JSON no body das requisições
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Agendar o cron job no servidor para rodar no dia 31/12/2024 às 20h e repetir a cada 5 minutos
app.get('/api/cron', async (req, res) => {
    console.log('Executando busca de resultados...');
    await fetchResults(); // Aguarda salvar os dados no arquivo
});

// Iniciar o servidor HTTP e WebSocket
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Endpoint para API
app.get('/api/dados', (req, res) => {
    const jogos = carregarJogos();
    const resultados = carregarResultados();
    res.json({ jogos, resultados });
});
