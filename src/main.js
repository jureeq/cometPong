function buildDom(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
  
    return div.children[0];
  }
  
  function main() {
    var game;
    var splashScreen;
    var gameOverScreen;
    var finalScore;
  
    function createSplashScreen() {
      splashScreen = buildDom(`
       <main class="splash-screen">
        <div>
        <h1>.meteorPong.</h1>
        <h2>defend the planet!</h2>
        </div>
        <div id="planet-box">
          <button>Start</button>
        </div>
       </main>
      `);
  
      document.body.appendChild(splashScreen);
  
      var startButton = splashScreen.querySelector('button');
      startButton.addEventListener('click', function() {
        startGame();
      });
    }
  
    function removeSplashScreen() {
      splashScreen.remove();
    }
  
    function createGameScreen() {
      var gameScreen = buildDom(`
        <main class="game">
          <div class="lives">
            <span id="lives">0</span></br><span>Lives</span>
          </div>
          <section class="canvas-container">
            <canvas></canvas>
          </section>
          <div class="score">
            <span>Score </span></br><span id="score">0</span>
          </div>
        </main>
     `);
  
      document.body.appendChild(gameScreen);
  
      return gameScreen;
    }

    function removeGameScreen() {
      game.removeGameScreen();
    }
  
    function startGame() {
      removeSplashScreen();
      removeGameOverScreen();
  
      game = new Game();
      game.gameScreen = createGameScreen();
  
      game.start();
      game.passGameOverCallback(function() {
        gameOver(game.score.toFixed(2));
      });
    }
  
    createSplashScreen();

    function gameOver(score){
      removeGameScreen();
      createGameOverScreen(score);
    }

    function createGameOverScreen(score) {
      gameOverScreen = buildDom(`
      <main class="game-over">
        <div class="stats-contatiner">
          <h1>GAME OVER</h1>
          <p>You heroically defended the planet for <span></span> seconds!</p>
          <p>Unfortunately, the Earth was burned to the ground. There are no signs of life anywhere...</p>
        </div>
        <div class="button-container">
            <button>Try again</button>
        </div>
      </main>
    ` );

    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);
  
    var span = gameOverScreen.querySelector('span');
    span.innerText = score;
  
    document.body.appendChild(gameOverScreen);
    }

    function removeGameOverScreen() {
      if (gameOverScreen !== undefined) {
        gameOverScreen.remove();
      }
    }

    
  }
  
  window.onload = main;