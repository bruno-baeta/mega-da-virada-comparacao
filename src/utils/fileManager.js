const fs = require('fs');
const path = require('path');

const jogosFilePath = path.join(__dirname, '../data/jogos.txt');
const resultadosFilePath = path.join(__dirname, '../data/resultados.txt');

// Carregar jogos do arquivo
function carregarJogos() {
    const data = fs.readFileSync(jogosFilePath, 'utf-8'); // Lê o arquivo
    return data
        .split('\n') // Divide por linhas
        .map(line => line.trim().split(' ')) // Separa os números de cada linha
        .filter(jogo => jogo.length > 0); // Remove linhas vazias
}

// Carregar resultados do arquivo
function carregarResultados() {
    const data = fs.readFileSync(resultadosFilePath, 'utf-8'); // Lê o arquivo
    return data.split(' ').filter(num => num.trim() !== ''); // Divide os números sorteados
}

module.exports = { carregarJogos, carregarResultados };
