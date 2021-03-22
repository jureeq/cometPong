class Comet {
  
  constructor (canvas, x, directionX, speed, size) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = size;
    this.x = x;
    this.y = 0;
    this.speed = speed;
    this.directionX = directionX;
}

updatePosition(){
  this.y = this.y + this.speed;
  this.x = this.x + this.directionX;
}

isInsideScreen(){
  return this.y + this.size / 2 < this.canvas.height;
}

draw() {

    let cometIcon = new Image();
    cometIcon.src = './images/comet.png';

    this.ctx.drawImage(cometIcon, this.x, this.y, this.size, this.size);
  }

didCollide(){
    // collision check with the surface
    let cometBottom = this.y + this.size;
    let cometCenterX = this.x - this.size/2;

    if (cometBottom >= (this.canvas.height * 0.8) && cometCenterX > 0 && cometCenterX < this.canvas.width - this.size/2)
    {
      return true;
    }
    return false;
  }
  
  didCollideToAnother(otherComet) {
    
    let cometLeft = this.x;
    let cometRight = this.x + this.size;
    let cometTop = this.y;
    let cometBottom = this.y + this.size;

    let otherCometLeft = otherComet.x;
    let otherCometRight = otherComet.x + otherComet.size;
    let otherCometTop = otherComet.y;
    let otherCometBottom = otherComet.y + otherComet.size;

    let crossTop = otherCometTop <= cometBottom && otherCometTop >= cometTop;
    let crossLeft = otherCometLeft <= cometRight && otherCometLeft >= cometLeft;
    let crossRight = otherCometRight >= cometLeft && otherCometRight <= cometRight;
    let crossBottom = otherCometBottom >= cometTop && otherCometBottom <= cometBottom;
    
    if ((crossTop || crossBottom) && (crossLeft || crossRight)){
      return true;
    }
    return false;
  }
}