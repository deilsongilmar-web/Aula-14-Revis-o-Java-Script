// Variáveis Globais
const minNumber = 1;
const maxNumber = 10;
let secretNumber;
let gameActive = true;

// Elementos do DOM
const gameGrid = document.getElementById('gameGrid');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

/**
 * 1. Inicializa um novo jogo:
 * - Gera o número secreto aleatório.
 * - Limpa a interface e cria os botões.
 */
function initializeGame() {
    // Gera o número secreto entre 1 e 10
    secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    
    // Configura o estado do jogo
    gameActive = true;
    messageElement.textContent = 'Escolha um número!';
    resetButton.style.display = 'none';
    gameGrid.innerHTML = ''; // Limpa botões antigos

    // Cria e insere os 10 botões
    for (let i = minNumber; i <= maxNumber; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('number-button');
        button.dataset.number = i; // Armazena o valor do número no dataset
        button.addEventListener('click', handleGuess);
        gameGrid.appendChild(button);
    }
    
    // Opcional: Logar o número secreto no console para testes
    console.log("Número Secreto:", secretNumber);
}

/**
 * 2. Manipula o palpite do usuário.
 */
function handleGuess(event) {
    if (!gameActive) return;

    const chosenButton = event.target;
    const guess = parseInt(chosenButton.dataset.number);

    if (guess === secretNumber) {
        // Acertou
        chosenButton.classList.add('correct');
        chosenButton.classList.add('disabled');
        messageElement.textContent = `🥳 Parabéns! Você acertou o número secreto: ${secretNumber}!`;
        endGame();
    } else {
        // Errou
        chosenButton.classList.add('incorrect');
        chosenButton.classList.add('disabled');
        messageElement.textContent = `❌ O número ${guess} está incorreto. Tente de novo!`;
    }
}

/**
 * 3. Finaliza a rodada do jogo.
 */
function endGame() {
    gameActive = false;
    resetButton.style.display = 'block';

    // Desabilita todos os botões que não foram clicados
    const allButtons = document.querySelectorAll('.number-button');
    allButtons.forEach(button => {
        if (!button.classList.contains('correct') && !button.classList.contains('incorrect')) {
            button.classList.add('disabled');
        }
    });

    // Destaca o botão correto se ele não foi o escolhido
    const correctButton = document.querySelector(`[data-number="${secretNumber}"]`);
    if (correctButton && !correctButton.classList.contains('correct')) {
        correctButton.classList.add('correct');
    }
}

// 4. Listener para o botão de Novo Jogo
resetButton.addEventListener('click', initializeGame);

// 5. Inicia o jogo quando a página carrega
initializeGame();
