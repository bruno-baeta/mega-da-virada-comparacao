document.addEventListener('DOMContentLoaded', async () => {
    const { jogos, resultados } = await fetch('/api/dados').then(res => res.json());
    const sorteadosDiv = document.querySelector('.sorteados');
    const jogosDiv = document.getElementById('jogos');

    const atualizarDados = (jogos, resultados) => {
        // Exibe os números sorteados
        sorteadosDiv.innerHTML = '';
        resultados.forEach(num => {
            const span = document.createElement('span');
            span.classList.add('numero', 'sorteado');
            span.textContent = num;
            sorteadosDiv.appendChild(span);
        });

        // Exibe os jogos
        jogosDiv.innerHTML = '';
        jogos.forEach(jogo => {
            const div = document.createElement('div');
            div.classList.add('jogo');
            jogo.forEach(num => {
                const span = document.createElement('span');
                span.classList.add('numero');
                span.textContent = num;
                if (resultados.includes(num)) {
                    span.classList.add('acertou'); // Bolinha verde para números acertados
                }
                div.appendChild(span);
            });
            jogosDiv.appendChild(div);
        });
    };

    atualizarDados(jogos, resultados);

    // Conectar ao WebSocket para atualizações em tempo real
    const ws = new WebSocket(`ws://${window.location.host}`);
    ws.onmessage = event => {
        const data = JSON.parse(event.data);
        atualizarDados(data.jogos, data.resultados);
    };
});
