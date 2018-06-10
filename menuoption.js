function MenuOption(title, textOptions, fillColour) {
  this.container = new PIXI.Container();
  this.actionCallback = null;
  this.graphic = new PIXI.Graphics();
  this.graphic.beginFill(fillColour);
  this.graphic.interactive = true;
  var self = this;
  this.graphic.click = function (mouseData) {
    self.performSelect(mouseData);
  };
  this.setPressAction(null);
  this.title = "";
  this.titleGraphic = null;
  this.setTitleText(title, textOptions);
  this.setRect(0, 0, this.titleGraphic.width + 8, this.titleGraphic.height + 8, 0xf7e3c3);
  this.container.addChild(this.graphic);
  this.container.addChild(this.titleGraphic);
  this.graphic.mouseover = function (mouseData) {
    self.setRect(0, 0, self.titleGraphic.width + 8, self.titleGraphic.height + 8, 0xff6f00);
  };
  this.graphic.mouseout = function (mouseData) {
    self.setRect(0, 0, self.titleGraphic.width + 8, self.titleGraphic.height + 8, 0xf7e3c3);
  };  
}

MenuOption.prototype.setPosition = function (x, y) {
  this.container.x = x;
  this.container.y = y;
  this.graphic.x = x;
  this.graphic.y = y;
  this.titleGraphic.x = x + 4;
  this.titleGraphic.y = y + 4;
}

MenuOption.prototype.setRect = function (x, y, width, height, colour) {
  this.graphic.lineStyle(1, colour);
  this.graphic.drawRect(x, y, width, height);
}

MenuOption.prototype.setTitleText = function (text, textOptions) {
  this.titleGraphic = new PIXI.Text(text, textOptions);
}

MenuOption.prototype.setPressAction = function (callback) {
  this.actionCallback = callback;
}

MenuOption.prototype.performSelect = function (mouseData) {
  if (this.actionCallback != null) {
    this.actionCallback();
  }
}

MenuOption.prototype.setGraphic = function (texture) {
  this.graphic.texture = texture;
}