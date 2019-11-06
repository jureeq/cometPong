function Game() {
    this.canvas = null;
    this.ctx = null;
    this.enemies = [];
    this.platform = null;
    this.gameIsOver = false;
    this.gameScreen = null;
    this.score = 0;
    this.gameIsOver = false;
    this.comets = [];
  }
  
  Game.prototype.start = function() {

    // Get the canvas element, create ctx, save canvas and ctx in the game object
    this.canvasContainer = document.querySelector('.canvas-container');
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');

    //Save reference to the score
    this.scoreElement = this.gameScreen.querySelector('.game #score');
    this.livesElement = this.gameScreen.querySelector('.game #lives');

  
    // Set the canvas to be same as the viewport size
    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute('width', this.containerWidth);
    this.canvas.setAttribute('height', this.containerHeight);
  
    // Sounds
    // var myAudio = document.createElement("audio");
    // myAudio.src = "../sounds/game.mp3";
    // myAudio.play();
    // myAudio.loop = true;
    // myAudio.pause();

  
    // Create new player
    this.platform = new Platform(this.canvas, 5);

  
    // Add event listener for keydown movements

    this.handleKeyDown = function(event) {
        if (event.key === 'ArrowLeft'){
            this.platform.setDirection('left');
        }
        else if (event.key === 'ArrowRight'){
            this.platform.setDirection('right');
        }
    };

    document.body.addEventListener(
        'keydown',
        this.handleKeyDown.bind(this)
    );
     // Any function provided to eventListener 
    // is always called by window (this === window)!
    // So, we have to bind `this` to the `game` object,
    // to prevent it from pointing to the `window` object
  

    // Start the game loop
  
    this.startLoop();
  };
  
  Game.prototype.startLoop = function() {
    var loop = function() {
      console.log('in loop');
  
      if (Math.random() > 0.98) {
        var randomX = (this.canvas.width-40) * Math.random();
        var randomDirectionX = Math.floor(Math.random()*3)-1;
        var randomSpeed = Math.floor(Math.random()*3+2);
        var randomSize = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
        var newComet = new Comet(this.canvas, randomX, randomDirectionX, randomSpeed, randomSize);
        this.comets.push(newComet);
      }

      this.checkCollisions();

      this.platform.handleScreenCollision();

      this.comets = this.comets.filter(function(comet) {
        comet.updatePosition();
        return comet.isInsideScreen();
      });

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.platform.updatePosition();
      this.platform.draw();

      this.comets.forEach(function (comet) {
        comet.draw();
      });

      

      if (!this.gameIsOver){
        window.requestAnimationFrame(loop);
      }

      this.updateGameStats();

  
    }.bind(this);
  
    window.requestAnimationFrame(loop);
  };

  Game.prototype.checkCollisions = function (){
    this.comets.forEach( function(comet, idx) {

      this.comets.forEach (function (otherComet, otherIdx) {
        if (idx === otherIdx){
          return;
        }
        if (comet.didCollideToAnother(otherComet)){
          console.log('collision');
          comet.y = this.canvas.height + comet.size;
          
          otherComet.y = this.canvas.height + otherComet.size;

          //should find a different way
          comet.x += this.canvas.width;
          otherComet.x += this.canvas.width; 
        }
      }, this);
    
      if (this.platform.didCollide(comet) ) {
  
        // comet.y = this.canvas.height + comet.size;
      
        comet.speed = -comet.speed-1;
  
      } else if (comet.didCollide()){
        this.platform.removeLife();
        console.log(this.platform.lives);

        comet.y = this.canvas.height + comet.size;
        console.log('surface');

        if (this.platform.lives === 0){
          this.gameOver(this.score);
        }
      } 
    }, this);
  };

  Game.prototype.updateGameStats = function (){
    this.score += (1/60);
    this.scoreElement.innerHTML = this.score.toFixed(2) + ' ' + 'sec.';
    this.livesElement.innerHTML = this.platform.lives;
    
  };

  Game.prototype.gameOver = function(score){
    this.gameIsOver = true;
    console.log('GAME OVER');
    this.onGameOverCallback();
  };

  Game.prototype.passGameOverCallback = function(gameOver){
    this.onGameOverCallback = gameOver;
  };

  Game.prototype.removeGameScreen = function (){
    this.gameScreen.remove();
  };





