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
            <span>Score </span></br><span id="score">0</span></br></br>
            <span>Bonus</span></br><span id="bonus">0</span><span> meteors destroyed</span>
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
        gameOver(game.score.toFixed(2), game.bonus);
      });
    }
  
    createSplashScreen();

    function gameOver(score, bonus){
      removeGameScreen();
      createGameOverScreen(score, bonus);
    }

    function createGameOverScreen(score, bonus) {
      gameOverScreen = buildDom(`
      <main class="game-over">
        <div class="stats-contatiner">
          <h1>.GAME OVER.</h1>
          <p id="bonus-container">You heroically defended the planet for </br>
          <span id="score"></span> seconds </br></br>
          and managed to destroy </br>
          <span id="bonus"></span> meteors!</br></br>
          what gives you a total score</br>
          <span id="score2"></span> x 100 + <span id="bonus2"></span> x 50 = </br></br></br>
          <span id="totalScore"></span></p>
          
          
          <p>Unfortunately, the Earth was burned to the ground. <br>There are no signs of life anywhere...</p>
        </div>
        <div class="button-container">
            <button>Try again</button>
        </div>
      </main>
    ` );

    var button = gameOverScreen.querySelector('button');
    button.addEventListener('click', startGame);
  
    var scoreCont = gameOverScreen.querySelector('#score');
    scoreCont.innerText = score;

    var bonusCont = gameOverScreen.querySelector('#bonus');
    bonusCont.innerText = bonus;

    var scoreCont2 = gameOverScreen.querySelector('#score2');
    scoreCont2.innerText = score;

    var bonusCont2 = gameOverScreen.querySelector('#bonus2');
    bonusCont2.innerText = bonus;
    
    var totalScoreCont = gameOverScreen.querySelector('#totalScore');
    totalScoreCont.innerText = score * 100 + bonus * 50;
  
    document.body.appendChild(gameOverScreen);
    }

    function removeGameOverScreen() {
      if (gameOverScreen !== undefined) {
        gameOverScreen.remove();
      }
    }  
  }
  
  window.onload = main;