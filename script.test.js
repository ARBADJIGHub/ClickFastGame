/**
 * @jest-environment jsdom
 */

describe('ClickFast Game', () => {
    beforeEach(() => {
        // Réinitialiser les modules et le DOM avant chaque test
        jest.resetModules();
        document.body.innerHTML = `
            <div id="main">
                <div id="container"></div>
                <button id="myButton">Clicker Ici</button>
            </div>
        `;
        require('./script');
    });

    test('handleClick incrémente le compteur', () => {
        const button = document.getElementById('myButton');
        
        // Premier clic crée les éléments d'affichage
        button.click(); 
        
        const scoreDisplay = document.getElementById('score-display');
        expect(scoreDisplay.textContent).toBe('1');
    });

    test('startTimer décrémente le temps chaque seconde', () => {
        jest.useFakeTimers();
        const button = document.getElementById('myButton');
        
        button.click(); // Démarre le timer
        
        // Avancer de 3 secondes
        jest.advanceTimersByTime(3000);
        
        const timerDisplay = document.getElementById('timer-display');
        expect(timerDisplay.textContent).toBe('2'); // 5 - 3 = 2
        
        jest.useRealTimers();
    });

    test("Le score ne s'incrémente pas après la fin du timer", () => {
        jest.useFakeTimers();
        const button = document.getElementById('myButton');
        
        // Lancer le jeu et faire 3 clics
        button.click(); 
        button.click(); // count=2
        button.click(); // count=3
        
        // Laisser le timer s'écouler
        jest.advanceTimersByTime(5000);
        
        // Tenter un clic supplémentaire
        button.click();
        
        const scoreDisplay = document.getElementById('score-display');
        expect(button.disabled).toBe(true);
        expect(scoreDisplay.textContent).toBe('3');
        
        jest.useRealTimers();
    });

    test("Le bouton de réinitialisation réinitialise correctement le jeu", () => {
        // Activer les fake timers AVANT de commencer
        jest.useFakeTimers();
        
        const button = document.getElementById('myButton');
        button.click(); // Démarre le timer (score=1)
        button.click(); // score=2
        
        // Laisser le timer s'écouler complètement
        jest.advanceTimersByTime(5000); // Déclenche endGame()
        
        // Désactiver les fake timers
        jest.useRealTimers();
        
        // Récupérer le bouton Rejouer
        const replayButton = document.getElementById('replay-button');
        expect(replayButton).not.toBeNull(); // Vérification cruciale
        
        // Simuler le clic sur Rejouer
        replayButton.click();
        
        // Vérifications post-réinitialisation
        const newScoreDisplay = document.getElementById('score-display');
        const endMessage = document.getElementById('game-end-message');
        
        expect(newScoreDisplay.textContent).toBe('0');
        expect(endMessage).toBeNull();
    });
    
});
