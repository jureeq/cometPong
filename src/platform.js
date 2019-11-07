function Platform(canvas, lives) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.lives = lives;
  
    this.height = 15;
    this.width = 150;
    this.x = canvas.width / 2;
    this.y = canvas.height * 0.7;

    this.direction = 0;
    this.speed = 10;
  }
  
  Platform.prototype.draw = function() {
    this.ctx.fillStyle = '#66D3FA';
    // fillRect(x, y, width, height)
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  Platform.prototype.setDirection = function(direction){
    
    
    if (direction === 'left') this.direction = -1;
    else if (direction === 'right') this.direction = 1;

    // 
  };

  Platform.prototype.updatePosition = function (){
    this.x = this.x + this.direction * this.speed;
  };

  Platform.prototype.handleScreenCollision = function() {

    // this.x = this.x + this.direction * this.speed;

    var screenLeft = 0;
    var screenRight = this.canvas.width;

    var platformLeft = this.x;
    var platformRight = this.x + this.width;

    if (platformRight >= screenRight) this.x = screenRight-this.width;
    else if (platformLeft <= screenLeft) this.x = 0;

  };


  Platform.prototype.removeLife = function (){
    this.lives -= 1;
  };

  Platform.prototype.didCollide = function (comet){
    //collision check with platform
    var platformLeft = this.x;
    var platformRight = this.x + this.width;
    var platformTop = this.y;
    var platformBottom = this.y + this.height;

    var cometLeft = comet.x;
    var cometRight = comet.x + comet.size;
    var cometTop = comet.y;
    var cometBottom = comet.y + comet.size;

    var crossTop = cometTop <= platformBottom && cometTop >= platformTop;
    var crossLeft = cometLeft <= platformRight && cometLeft >= platformLeft;
    var crossRight = cometRight >= platformLeft && cometRight <= platformRight;
    var crossBottom = cometBottom >= platformTop && cometBottom <= platformBottom;
    
    if ((crossTop || crossBottom) && (crossLeft || crossRight)){
      return true;
    }
    return false;
    
  };
    

  
