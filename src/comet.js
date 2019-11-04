function Comet(canvas, x, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.size = 20;
    this.x = x;
    this.y = 0;
    this.speed = speed;
}

Comet.prototype.updatePosition = function(){
  this.y = this.y + this.speed;
};

Comet.prototype.isInsideScreen = function(){
  return this.y + this.size / 2 < this.canvas.height;
};

Comet.prototype.draw = function() {
  console.log('new comet');
    this.ctx.fillStyle = '#FF6F27';
    // fillRect(x, y, width, height)
    this.ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size
    );
  };