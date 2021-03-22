class Platform {

  constructor (canvas, lives) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  this.lives = lives;

  this.height = 30;
  this.width = 150;
  this.x = canvas.width / 2;
  this.y = canvas.height * 0.7;

  this.direction = 0;
  this.speed = 10;
  }

  draw() {
      let platformIcon = new Image();
      platformIcon.src = './images/platform.png';
  
      this.ctx.drawImage(platformIcon, this.x, this.y, this.width, this.height);
  }

  setDirection(direction){
  
      if (direction === 'left') this.direction = -1;
      else if (direction === 'right') this.direction = 1;
  
  }

  updatePosition(){
      this.x = this.x + this.direction * this.speed;
  }
  
  handleScreenCollision() {
  
      // this.x = this.x + this.direction * this.speed;
      let screenLeft = 0;
      let screenRight = this.canvas.width;
  
      let platformLeft = this.x;
      let platformRight = this.x + this.width;
  
      if (platformRight >= screenRight) this.x = screenRight-this.width;
      else if (platformLeft <= screenLeft) this.x = 0;
  }
  
  removeLife(){
      this.lives -= 1;
  }
  
  didCollide (comet){
      //collision check with platform
      let platformLeft = this.x;
      let platformRight = this.x + this.width;
      let platformTop = this.y;
      let platformBottom = this.y + this.height;
  
      let cometLeft = comet.x;
      let cometRight = comet.x + comet.size;
      let cometTop = comet.y;
      let cometBottom = comet.y + comet.size;
  
      let crossTop = cometTop <= platformBottom && cometTop >= platformTop;
      let crossLeft = cometLeft <= platformRight && cometLeft >= platformLeft;
      let crossRight = cometRight >= platformLeft && cometRight <= platformRight;
      let crossBottom = cometBottom >= platformTop && cometBottom <= platformBottom;
      
      if ((crossTop || crossBottom) && (crossLeft || crossRight)){
        return true;
      }
      return false;
      
  }

}






  


