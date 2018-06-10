function Cover(texture){
  this.sprite = new PIXI.Sprite(texture);
  this.sprite.visible = true;
  this.sprite.scale.x = 1;
  this.sprite.scale.y = 1;
}

Cover.prototype.resize = function (xScale,yScale) {
  this.sprite.scale.x = xScale;
  this.sprite.scale.y = yScale;
};