class Game {

    constructor(){
      this.canvas = null;
      this.ctx = null;
      this.enemies = [];
      this.platform = null;
      this.gameIsOver = false;
      this.gameScreen = null;
      this.score = 0;
      this.bonus = 0;
      this.gameIsOver = false;
      this.comets = [];
      this.level = 1;

      this.gameMusic = new Audio('sounds/game.mp3');
      this.gameOverSound = new Audio('sounds/game-over.wav');
      this.levelUpSound = new Audio('sounds/wow.wav');
      this.boomSound = new Audio('sounds/boom.mp3');
    }
    
    start () {

      // Get the canvas element, create ctx, save canvas and ctx in the game object
      this.canvasContainer = document.querySelector('.canvas-container');
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
  
      //Save reference to the score
      this.scoreElement = this.gameScreen.querySelector('.game #score');
      this.livesElement = this.gameScreen.querySelector('.game #lives');
      this.bonusElement = this.gameScreen.querySelector('.game #bonus');
    
      // Set the canvas to be same as the viewport size
      this.containerWidth = this.canvasContainer.offsetWidth;
      this.containerHeight = this.canvasContainer.offsetHeight;
      this.canvas.setAttribute('width', this.containerWidth);
      this.canvas.setAttribute('height', this.containerHeight);
    
      // Sounds
      
      // this.gameOverSound.src = "../sounds/game-over.wav";
      // this.leveUpSound.src = "../sounds/levelup.wav";
  
      this.gameMusic.play();
      this.gameMusic.loop = true;
      
      // Create new player
      this.platform = new Platform(this.canvas, 5);
  
    
      // Add event listener for keydown movements
  
      this.handleKeyDown = (event) => {
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
    }

    startLoop() {
      let loop = function() {
        // console.log('in loop');
    
        let randomX = 0;
        let randomDirectionX = 0;
        let randomSpeed = 0;
        let randomSize = 0;
        let newComet;
        
        switch (this.level) {
          case 1:
            if (Math.random() > 0.98) {
              randomX = (this.canvas.width-40) * Math.random();
              randomDirectionX = Math.floor(Math.random()*3)-1;
              randomSpeed = Math.floor(Math.random()*2+2);
              randomSize = Math.floor(Math.random() * (60 - 40 + 1)) + 40;
              newComet = new Comet(this.canvas, randomX, randomDirectionX, randomSpeed, randomSize);
              this.comets.push(newComet);
            }
            break;
  
          case 2:
            if (Math.random() > 0.97) {
              randomX = (this.canvas.width-40) * Math.random();
              randomDirectionX = Math.floor(Math.random()*3)-1;
              randomSpeed = Math.floor(Math.random()*3+2);
              randomSize = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
              newComet = new Comet(this.canvas, randomX, randomDirectionX, randomSpeed, randomSize);
              this.comets.push(newComet);
            }
            break;
          case 3:
            if (Math.random() > 0.96) {
              randomX = (this.canvas.width-40) * Math.random();
              randomDirectionX = Math.floor(Math.random()*3)-1;
              randomSpeed = Math.floor(Math.random()*4+3);
              randomSize = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
              newComet = new Comet(this.canvas, randomX, randomDirectionX, randomSpeed, randomSize);
              this.comets.push(newComet);
            }
            break;
  
          default:
            break;
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
  
        this.showLevel();
        
        this.levelUp();
        
        if (!this.gameIsOver){
          window.requestAnimationFrame(loop);
        }
  
  
  
        this.updateGameStats();
  
    
      }.bind(this);
    
      window.requestAnimationFrame(loop);
    }

    checkCollisions(){
      this.comets.forEach( function(comet, idx) {
  
        this.comets.forEach (function (otherComet, otherIdx) {
          if (idx === otherIdx){
            return;
          }
          if (comet.didCollideToAnother(otherComet)){
    
            comet.y = this.canvas.height + comet.size;
            otherComet.y = this.canvas.height + otherComet.size;
  
            //probably should find a different way
            comet.x += this.canvas.width;
            otherComet.x += this.canvas.width; 
  
            this.bonus += 2;
          }
        }, this);
      
        if (this.platform.didCollide(comet) ) {
    
          // comet.y = this.canvas.height + comet.size;
        
          comet.speed = -comet.speed-1;
    
        } else if (comet.didCollide()){
          this.platform.removeLife();
          // console.log(this.platform.lives);
          this.boomSound.play();
          comet.y = this.canvas.height + comet.size;
  
          if (this.platform.lives === 0){
            this.gameMusic.pause();
            this.gameOver(this.score);
          }
        } 
      }, this);
    }

    updateGameStats(){
      this.score += (1/60);
      this.scoreElement.innerHTML = this.score.toFixed(2) + ' ' + 'sec.';
      this.livesElement.innerHTML = this.platform.lives;
      this.bonusElement.innerHTML = this.bonus;
    }

    showLevel() {
      if (this.level === 1){
        this.ctx.font = '40px monospace';
        this.ctx.fillStyle = '#FFF4F4';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('.easy.', this.canvas.width*(1/2), 100);
      } else if (this.level === 2){
        this.ctx.font = '40px monospace';
        this.ctx.fillStyle = '#7a7a7a';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('.not.so.easy.', this.canvas.width*(1/2), 100);
      } else if (this.level === 3){
        this.ctx.font = '40px monospace';
        this.ctx.fillStyle = '#8b0000';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('.NOT.easy.', this.canvas.width*(1/2), 100);
      }
        
    }

    levelUp(){
      if ((this.level < 2 && this.score > 25) || (this.level < 3 && this.score > 50)){
        this.level += 1;
        this.levelUpSound.play();
      }
    }

    gameOver(score){
      
      this.gameIsOver = true;
      this.gameOverSound.play();
      // console.log('GAME OVER'+this.level);
      this.onGameOverCallback();
    }

    passGameOverCallback(gameOver){
      this.onGameOverCallback = gameOver;
    }

    removeGameScreen(){
      this.gameScreen.remove();
    }



  }
  
  








