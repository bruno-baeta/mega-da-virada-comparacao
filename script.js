// script.js
document.addEventListener('DOMContentLoaded', function() {
    carregarJogosSalvos();
});

document.getElementById('add-jogo').addEventListener('click', function(e) {
    e.preventDefault();
    let jogo = document.getElementById('numeros-jogo').value;
    adicionarJogo(jogo);
    document.getElementById('numeros-jogo').value = '';
    salvarJogos();
});

document.getElementById('limpar-jogos').addEventListener('click', function() {
    limparJogosSalvos();
});

function limparJogosSalvos() {
    localStorage.removeItem('jogosMega'); // Remove os jogos do Local Storage
    document.getElementById('jogos').innerHTML = ''; // Limpa a exibição na página
}

document.getElementById('verificar-jogos').addEventListener('click', function() {
    let sorteados = document.getElementById('entrada-numeros-sorteados').value.split(' ');
    verificarJogos(sorteados);
    exibirSorteados(sorteados);
});

function adicionarJogo(numeros) {
    let div = document.createElement('div');
    div.classList.add('jogo');
    div.innerHTML = numeros.split(' ').map(num => `<span class="numero">${num}</span>`).join(' ');
    document.getElementById('jogos').appendChild(div);
}

function salvarJogos() {
    let jogos = [];
    document.querySelectorAll('.jogo').forEach(jogo => {
        jogos.push(jogo.textContent);
    });
    localStorage.setItem('jogosMega', JSON.stringify(jogos));
}

function carregarJogosSalvos() {
    let jogosSalvos = JSON.parse(localStorage.getItem('jogosMega'));
    if (jogosSalvos) {
        jogosSalvos.forEach(jogo => adicionarJogo(jogo));
    }
}

function verificarJogos(sorteados) {
    let jogos = document.querySelectorAll('.jogo');
    jogos.forEach(jogo => {
        jogo.querySelectorAll('.numero').forEach(numeroEl => {
            if (sorteados.includes(numeroEl.textContent)) {
                numeroEl.classList.add('acertou');
            } else {
                numeroEl.classList.remove('acertou');
            }
        });
    });
}

function exibirSorteados(sorteados) {
    let divSorteados = document.getElementById('sorteados-exibicao');
    divSorteados.innerHTML = ''; // Limpa a exibição anterior
    sorteados.forEach(num => {
        let span = document.createElement('span');
        span.classList.add('bolinha');
        span.textContent = num;
        divSorteados.appendChild(span);
    });
}
