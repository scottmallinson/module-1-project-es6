'use strict';

const main = () => {

  const mainElement = document.querySelector('main');

  const buildDom = (html) => {
    mainElement.innerHTML = html;
    return mainElement;
  }

  const buildSplashScreen = () => {
    const splashScreen = buildDom(`
      <section>
        <h1>Iron Hero</h1>
        <p>Using the <kbd>←</kbd> and <kbd>→</kbd> keys, try to hit the notes in time.</p>
        <button class="start-button">Start</button>
      </section>
    `);

    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', buildGameScreen);
  }

  const buildGameScreen = () => {
    const gameScreen = buildDom(`
      <section class="game-container">
      <audio src="./audio/track.m4a" preload="auto"></audio>
        <canvas width="720" height="576"></canvas>
      </section>
    `);

    const gameContainerElement = document.querySelector('.game-container');
    const audioElement = document.querySelector('audio');
    const width = gameContainerElement.offsetWidth;
    const height = gameContainerElement.offsetHeight;
    const canvasElement = document.querySelector('canvas');
    canvasElement.setAttribute('width', width);
    canvasElement.setAttribute('height', height);

    const game = new Game(canvasElement, audioElement);
    
    game.startLoop();
    game.setGameOverCallback(buildGameOverScreen);

    document.addEventListener('keydown', (event) => {
        game.checkKeyPressCollisions(event);
    });
  }

  function buildGameOverScreen(player1score, player2score) {
    let winningPlayer = '';
    let winningScore;
    if (player1score > player2score){
      winningPlayer = 'Player 1 wins!';
      winningScore = player1score;
    }
    else if (player1score < player2score) {
      winningPlayer = 'Player 2 wins!';
      winningScore = player2score;
    }
    else {
      winningPlayer = 'A draw!'
      winningScore = player1score;
    }
    let highScore = this.getHighScore(winningScore);
    const gameOverScreen = buildDom(`
      <section>
        <h1>${winningPlayer}</h1>
        <h2><blink>High score: ${highScore}</blink></h2>
        <p>Player 1 scored ${player1score}
        <br>Player 2 scored ${player2score}</p>
      </section>
      <button class="restart-button">Play again</button>
    `);

    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', buildGameScreen);
  }

  buildSplashScreen();

}

window.addEventListener('load', main);