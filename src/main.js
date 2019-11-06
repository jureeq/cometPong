function buildDom(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
  
    return div.children[0];
  }
  
  function main() {
    var game;
    var splashScreen;
    var gameOverScreen;
  
    function createSplashScreen() {
      splashScreen = buildDom(`
       <main class="splash-screen">
        <div>
        <h1>.cometPong.</h1>
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
        <div class="score">
          <span>Score: </span></br><span id="score">0</span>
        </div>
          <section class="canvas-container">
            <canvas></canvas>
          </section>
        <div class="lives">
          <span>Lives: </span></br><span id="lives">0</span>
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
      game.passGameOverCallback(gameOver);

    }
  
    createSplashScreen();

    function gameOver(score){
      removeGameScreen();
      createGameOverScreen(score);
    }

    function createGameOverScreen(score) {
      gameOverScreen = buildDom(`
      <main>
        <h1>Game over</h1>
        <p>Your score: <span></span></p>
        <button>Restart</button>
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