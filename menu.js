
function Menu(x, y, title) {
  this.container = new PIXI.Container();
  this.setPosition(x, y);
  this.menuList = new Array();
  this.title = title;
}

Menu.prototype.setPosition = function (x, y) {
  this.container.x = x;
  this.container.y = y;
}

Menu.prototype.addMenuOption = function (menuOption, tileSize) {
  this.menuList.push(menuOption);
  this.container.addChild(menuOption.container);
  menuOption.setPosition(this.container.x, this.container.y + (tileSize * (this.container.children.length - 1)));
}

Menu.prototype.setVisibility = function (expression) {
  this.container.visible = expression;
}