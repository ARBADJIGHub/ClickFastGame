console.log("Le fichier script est bien lié");

// Variables globales
let count = 0;
let timerStarted = false;
let timeLeft = 5;
let timerId;

// Sélection des éléments du DOM
const button = document.getElementById("myButton");
const mainDiv = document.getElementById("main");

// Création des éléments pour afficher le score et le timer
const scoreDisplay = document.createElement("div");
scoreDisplay.className = "number";
scoreDisplay.id = "score-display";
scoreDisplay.textContent = count;

const timerDisplay = document.createElement("div");
timerDisplay.className = "number";
timerDisplay.id = "timer-display";
timerDisplay.textContent = timeLeft;

// Fonction pour gérer le clic sur le bouton
function handleClick() {
    if (!timerStarted) {
        startTimer();
        timerStarted = true;

        // Ajouter les éléments d'affichage au DOM si ce n'est pas déjà fait
        if (!document.getElementById("score-wrapper")) {
            const container = document.getElementById("container");

            // Titre du score
            const scoreTitle = document.createElement("p");
            scoreTitle.textContent = "Score";
            scoreTitle.className = "catchphrase";

            // Titre du timer
            const timerTitle = document.createElement("p");
            timerTitle.textContent = "Temps restant";
            timerTitle.className = "catchphrase";

            // Wrapper pour le score
            const scoreWrapper = document.createElement("div");
            scoreWrapper.className = "flex-center";
            scoreWrapper.id = "score-wrapper";
            scoreWrapper.appendChild(scoreTitle);
            scoreWrapper.appendChild(scoreDisplay);

            // Wrapper pour le timer
            const timerWrapper = document.createElement("div");
            timerWrapper.className = "flex-center";
            timerWrapper.id = "timer-wrapper";
            timerWrapper.appendChild(timerTitle);
            timerWrapper.appendChild(timerDisplay);

            mainDiv.appendChild(scoreWrapper);
            mainDiv.appendChild(timerWrapper);
        }
    }

    // Incrémenter le compteur et mettre à jour l'affichage
    count++;
    scoreDisplay.textContent = count;
}

// Fonction pour démarrer le timer
function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        // Si le temps est écoulé alors arrêter le jeu
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Fonction pour terminer le jeu
function endGame() {
    clearInterval(timerId);
    button.disabled = true;
    button.textContent = "Temps écoulé!";

    // Afficher le message de fin avec le score
    const resultMessage = document.createElement("div");
    resultMessage.className = "catchphrase";
    resultMessage.id = "game-end-message";
    resultMessage.innerHTML = `<h2>Partie terminée!</h2>
                               <p>Ton score final: <strong>${count} clics</strong></p>
                               <p>Vitesse moyenne: <strong>${(count / 5).toFixed(1)} clics/seconde</strong></p>`;

    // Bouton pour rejouer
    const replayButton = document.createElement("button");
    replayButton.id = "replay-button";
    replayButton.textContent = "Rejouer";
    replayButton.addEventListener("click", resetGame);

    mainDiv.appendChild(resultMessage);
    mainDiv.appendChild(replayButton);
}

// Fonction pour réinitialiser le jeu sans recharger la page
function resetGame() {
    // Réinitialiser l'état
    count = 0;
    timeLeft = 5;
    timerStarted = false;

    // Réinitialiser le DOM
    button.disabled = false;
    button.textContent = 'Clicker Ici';
    scoreDisplay.textContent = '0';
    timerDisplay.textContent = '5';

    // Supprimer les éléments de fin de jeu si présents
    const resultMessage = document.getElementById('game-end-message');
    if (resultMessage) resultMessage.remove();
    const replayButton = document.getElementById('replay-button');
    if (replayButton) replayButton.remove();
}

// Ajout de l'écouteur d'événement au bouton (si présent)
if (button) {
    button.addEventListener("click", handleClick);
}

// Export pour les tests
module.exports = {
    handleClick,
    startTimer,
    endGame,
    resetGame,
    // Pour les tests avancés
    scoreDisplay,
    timerDisplay,
    button
};
