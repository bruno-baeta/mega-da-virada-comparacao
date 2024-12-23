const fs = require('fs');
const path = require('path');

const jogosFilePath = path.join(__dirname, '../data/jogos.txt');

// Carregar jogos do arquivo
function carregarJogos() {
    const data = fs.readFileSync(jogosFilePath, 'utf-8'); // Lê o arquivo
    return data
        .split('\n') // Divide por linhas
        .map(line => line.trim().split(' ')) // Separa os números de cada linha
        .filter(jogo => jogo.length > 0); // Remove linhas vazias
}

module.exports = { carregarJogos };
