console.log("Le fichier script est bie lié");

// 1 Faire une variable count pour stocker le nombre de clics
// 2 Mettre un EventListener sur le bouton

// Variable globale
let count = 0;
let timerStarted = false;
let timeLeft = 5;
let timerId;

// Elements DOM
const button = document.getElementById("myButton");
const mainDiv = document.getElementById("main");

// Création des éléments pour afficher le score
const scoreDisplay = document.createElement("div");
scoreDisplay.className = "number";
scoreDisplay.textContent = count;

// Création des éléments pour affichier le timer
const timerDisplay = document.createElement("div");
timerDisplay.className = "number";
timerDisplay.textContent = timeLeft;

// Fonction pour gérer le clic sur le bouton
function handleClick() {
    // Si le timer n'est pas démarrer, on le démarre
    if (!timerStarted) {
        startTimer();
        timerStarted = true;

    // Ajouter les éléments d'affichage au DOM
    const container = document.getElementById("container");

    // Créer les titres pour le score
    const scoreTitle = document.createElement("p");
    scoreTitle.textContent = "Score";
    scoreTitle.className = "catchphrase";

    // Créer les titres pour le timer
    const timerTitle = document.createElement("p");
    timerTitle.textContent = "Temps restant";
    timerTitle.className = "catchphrase";

    // Wrapper pour les éléments de score
    const scoreWrapper = document.createElement("div");
    scoreWrapper.className = "flex-center";
    scoreWrapper.appendChild(scoreTitle);
    scoreWrapper.appendChild(scoreDisplay);

    // Wrapper pour les éléments de tiemer
    const timerWrapper = document.createElement("div");
    timerWrapper.className = "flex-center";
    timerWrapper.appendChild(timerTitle);
    timerWrapper.appendChild(timerDisplay);

    mainDiv.appendChild(scoreWrapper);
    mainDiv.appendChild(timerWrapper);

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

// Affichier le message de fin avec le score
const resultMessage = document.createElement("div");
resultMessage.className = "catchphrase";
resultMessage.innerHTML = `<h2>Partie terminée!</h2>
                           <p>Ton score final: <strong>${count} clics</strong></p>
                           <p>Vitesse moyenne: <strong>${(count / 10).toFixed(
                            1
                        )} clics/seconde</strong></p>`;

// Bouton pour rejouer
const replayButton = document.createElement("button");
replayButton.id = "button-clicker";
replayButton.textContent = "Rejouer";
replayButton.addEventListener("click", resetGame);

mainDiv.appendChild(resultMessage);
mainDiv.appendChild(replayButton);
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    location.reload();
}

// Ajout de l'écouteur d'événement au bouton
button.addEventListener("click", handleClick);

module.exports = {
    handleClick,
    startTimer,
    endGame,
    resetGame,
};