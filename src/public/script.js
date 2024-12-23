document.addEventListener('DOMContentLoaded', async () => {
    const sorteadosDiv = document.querySelector('.sorteados');
    const jogosDiv = document.getElementById('jogos');
    const abrirModalBtn = document.getElementById('abrirModal');
    const fecharModalBtn = document.getElementById('fecharModal');
    const modal = document.getElementById('modal');
    const adicionarNumerosBtn = document.getElementById('adicionarNumeros');
    const inputNumeros = document.querySelectorAll('.input-numero'); // Seleciona os 6 inputs

    let resultados = [];
    let jogos = [];

    const carregarDados = async () => {
        try {
            const response = await fetch('/api/dados');
            const data = await response.json();
            jogos = data.jogos || [];
        } catch (error) {
            console.error('Erro ao carregar dados do servidor:', error);
        }
    };

    const atualizarDados = () => {
        sorteadosDiv.innerHTML = resultados
            .map(numero => `<span class="numero sorteado">${numero}</span>`)
            .join('');

        jogosDiv.innerHTML = jogos
            .map(jogo => `
                <div class="jogo">
                    ${jogo
                        .map(numero => 
                            `<span class="numero ${resultados.includes(numero) ? 'acertou' : ''}">${numero}</span>`
                        ).join('')}
                </div>
            `)
            .join('');
    };

    // Abrir o modal
    abrirModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Fechar o modal
    fecharModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Adicionar números sorteados
    adicionarNumerosBtn.addEventListener('click', () => {
        const numeros = Array.from(inputNumeros)
            .map(input => input.value.trim())
            .filter(num => num && !resultados.includes(num)); // Ignora entradas vazias ou duplicadas

        resultados.push(...numeros); // Adiciona os novos números ao array de resultados
        atualizarDados(); // Atualiza a interface
        modal.style.display = 'none'; // Fecha o modal após adicionar
        inputNumeros.forEach(input => (input.value = '')); // Limpa os inputs
    });

    await carregarDados();
    atualizarDados();
});
