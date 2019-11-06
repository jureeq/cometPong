function Comet(canvas, x, directionX, speed, size) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = size;
    this.x = x;
    this.y = 0;
    this.speed = speed;
    this.directionX = directionX;
}

Comet.prototype.updatePosition = function(){
  this.y = this.y + this.speed;
  this.x = this.x + this.directionX;
};

Comet.prototype.isInsideScreen = function(){
  return this.y + this.size / 2 < this.canvas.height;
};

Comet.prototype.draw = function() {
  // // console.log('new comet');
  //   this.ctx.fillStyle = '#FF6F27';
  //   // fillRect(x, y, width, height)
  //   this.ctx.fillRect(
  //     this.x,
  //     this.y,
  //     this.size,
  //     this.size
  //   );

    var cometIcon = new Image();
    cometIcon.src = '../images/comet.png';

    this.ctx.drawImage(cometIcon, this.x, this.y, this.size, this.size);
  };

  Comet.prototype.didCollide = function (){
    // collision check with the surface
    var cometBottom = this.y + this.size;
    var cometCenterX = this.x - this.size/2;

    if (cometBottom >= (this.canvas.height * 0.8) && cometCenterX > 0 && cometCenterX < this.canvas.width - this.size/2)
    {
      return true;
    }
    return false;
  };
  
  Comet.prototype.didCollideToAnother = function (otherComet) {
    
    var cometLeft = this.x;
    var cometRight = this.x + this.size;
    var cometTop = this.y;
    var cometBottom = this.y + this.size;

    var otherCometLeft = otherComet.x;
    var otherCometRight = otherComet.x + otherComet.size;
    var otherCometTop = otherComet.y;
    var otherCometBottom = otherComet.y + otherComet.size;

    var crossTop = otherCometTop <= cometBottom && otherCometTop >= cometTop;
    var crossLeft = otherCometLeft <= cometRight && otherCometLeft >= cometLeft;
    var crossRight = otherCometRight >= cometLeft && otherCometRight <= cometRight;
    var crossBottom = otherCometBottom >= cometTop && otherCometBottom <= cometBottom;
    
    if ((crossTop || crossBottom) && (crossLeft || crossRight)){
      return true;
    }
    return false;
  };