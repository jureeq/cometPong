# cometPong

## Live demo
[Link Deploy](https://jureeq.github.io/meteorPong/)

## Description
meteorPong is a simple game where you must defend planet Earth from a dangerous meteor shower. The longer you protect the Earth the better score you get. There are 3 levels of difficulty, switching automatically after a specific period of time. You can only let 5 meteors pass through or your planet will be doomed.


## MVP (DOM - CANVAS)
MVP definition, deliverables.

Create start screen with 'Start' button. Create a game screen consisting of a planet, a defending platform (shield), and meteorites. The platform moves only to the left and right. The player has 5 lives. When these are lost, an end game window appears, allowing the player to play again.

## Backlog


## Data structure

### main.js

```js
// splash screen

createSplashScreen() {};
removeSplashScreen() {};

    
// game screen

createGameScreen() {};
removeGameScreen() {};

// game over screen

createGameOverScreen(score, bonus) {};
removeGameOverScreen() {};

// Setting the game state 

startGame() {};
gameOver() {};

```

### game.js

```js
Game(){
  this.canvas;
  this.ctx;
  this.enemies;
  this.platform;
}

Game.prototype.start = function() {};

Game.prototype.startLoop = function() {};

Game.prototype.checkCollisions = function() {};

Game.prototype.updateGameStats = function() {};

Game.prototype.gameOver = function() {};

```


### platform.js

```js
Platform() {
  this.canvas;
  this.ctx;
  this.x;
  this.y;
  this.direction;
  this.speed;
  this.lives;
}

Player.prototype.setDirection() = function() {};

Player.prototype.draw() = function() {};

Player.prototype.updatePostion() = function() {};

Player.prototype.handleScreenCollision() = function() {};

Player.prototype.removeLife = function() {}; // inside removeLife (collision) --> resetPosition

Player.prototype.didCollide(comet) = function() {};

```


### comet.js

```js
Comet() {
  this.canvas;
  this.ctx;
  this.size;
  this.x;
  this.y;
  this.speed;
  this.directionX;
  // this.numTackles; // 1 tackle = 5 points
}

Defender.prototype.updatePosition = function() {};

Defender.prototype.isInsideScreen = function() {};

Defender.prototype.didCollide = function() {};

Defender.prototype.didCollideeToAnother = function() {};

Defender.prototype.draw = function() {};
```


## States & States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen

### Git
URls for the project repo and deploy
[Link Repo](https://github.com/jureeq/meteorPong)
