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
  
    // Set the canvas to be same as the viewport size
    this.containerWidth = this.canvasContainer.offsetWidth;
    this.containerHeight = this.canvasContainer.offsetHeight;
    this.canvas.setAttribute('width', this.containerWidth);
    this.canvas.setAttribute('height', this.containerHeight);
  
    // Create new player
    this.platform = new Platform(this.canvas, 3);
  
    // Add event listener for keydown movements

    this.handleKeyDown = function(event) {
        if (event.key === 'ArrowLeft'){
            console.log('LEFT');
            this.platform.setDirection('left');
        }
        else if (event.key === 'ArrowRight'){
            console.log('RIGHT');
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
  
      if (Math.random() > 0.95) {
        var randomX = this.canvas.width * Math.random();
        var newComet = new Comet(this.canvas, randomX, 5);
        this.comets.push(newComet);
      }

      this.checkCollisions();

      this.platform.handleScreenCollision();

      this.comets = this.comets.filter(function(comet) {
        comet.updatePosition();
        return comet.isInsideScreen();
      });

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.platform.draw();

      this.comets.forEach(function (comet) {
        comet.draw();
      });

      

      if (!this.gameIsOver){
        window.requestAnimationFrame(loop);
      }

  
    }.bind(this);
  
    window.requestAnimationFrame(loop);
  };

  Game.prototype.checkCollisions = function (){
    this.comets.forEach( function(comet) {
    
      if ( this.platform.didCollide(comet) ) {
  

        // this.platform.removeLife();
        // console.log('lives', this.platform.lives);
        
        // Move the enemy off screen to the left
        comet.y = this.canvas.height + comet.size;
  
        // if (this.player.lives === 0) {
        //   this.gameOver();
        // }
      }
    }, this);
  };

  Game.prototype.updateGameStats = function (){};

  Game.prototype.gameOver = function(){};



