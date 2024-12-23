const fs = require('fs');
const path = require('path');
const axios = require('axios');

const ENDPOINT = 'https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/2809';
const RESULT_FILE = path.join(__dirname, '../data/resultados.txt');

// Configuração do cabeçalho com User-Agent
const HttpsProxyAgent = require('https-proxy-agent');

const proxyAgent = new HttpsProxyAgent('http://proxy_host:proxy_port'); // Substitua proxy_host e proxy_port

const axiosConfig = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    },
    httpsAgent: proxyAgent,
};

// Função para buscar os resultados da API
async function fetchResults() {
    try {
        const response = await axios.get(ENDPOINT, axiosConfig); // Inclui o User-Agent na requisição
        const data = response.data;

        // Verificar se os números sorteados já estão disponíveis
        if (data && data.listaDezenas) {
            const numeros = data.listaDezenas;

            // Escrever os números no arquivo
            fs.writeFile(RESULT_FILE, numeros.join(' '), 'utf-8', (err) => {
                if (err) {
                    console.error('Erro ao salvar resultados:', err.message);
                } else {
                    console.log(`Resultado salvo: ${numeros.join(', ')}`);
                }
            });
        } else {
            console.log('Números ainda não disponíveis.');
        }
    } catch (error) {
        console.error('Erro ao buscar os dados:', error.toString());
    }
}

module.exports = fetchResults;
