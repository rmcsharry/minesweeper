function Tile(x, y, isMined, tileSize) {
  this.x = x;
  this.y = y;
  this.isMined = isMined;
  this.isFlagged = false;
  this.isRevealed = false;
  this.tileSize = tileSize;
  this.neighbours = [];
  this.minedNeighbours = 0;
  this.container = new PIXI.Container();
  this.container.interactive = false;
  this.sprite = new PIXI.Sprite(null);
  this.mineCount = new PIXI.Text("", mineCountFont);
  this.infoSprite = new PIXI.Sprite(null);
  this.setPosition(x, y);
  // this.resetMineCount();
  this.mineCount.visible = false;
  this.infoSprite.visible = false;
  this.sprite.interactive = true;
  this.sprite.visible = true;
  this.sprite.width = this.tileSize;
  this.sprite.height = this.tileSize;
  this.mineCount.interactive = false;
  this.container.addChild(this.sprite);
  this.container.addChild(this.mineCount);
  this.container.addChild(this.infoSprite);
};

// Tile.prototype.isRevealed = function(neighbour){
//   return this.revealed || this.isBomb;
// };

Tile.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;
  this.container.x = x * this.tileSize;
  this.container.y = y * this.tileSize;
  this.mineCount.x = Math.floor(this.tileSize / 4);
  this.mineCount.y = Math.floor(this.tileSize / 8);
  this.infoSprite.x = 0;
  this.infoSprite.y = 0;
  this.infoSprite.width = this.tileSize;
  this.infoSprite.height = this.tileSize;  
};

// Tile.prototype.resetMineCount = function () {
//   this.mineCount.text = 'F';
//   this.mineCount.style.fill = "#ff0000";
// };

Tile.prototype.setInfoSprite = function (isVisible, texture) {
  this.infoSprite.visible = isVisible;
  this.infoSprite.texture = texture;
};

Tile.prototype.setTexture = function (texture) {
  this.sprite.texture = texture;
};

Tile.prototype.setLeftRelease = function (fn) {
  let tile = this;
  this.sprite.pointertap = function (mouseData) {
    fn(tile, mouseData);
  };
};

Tile.prototype.setRightRelease = function (fn) {
  let tile = this;
  this.sprite.rightclick = function (mouseData) {
    fn(tile, mouseData);
  };
};

Tile.prototype.setMouseEnter = function (fn) {
  let tile = this;
  this.sprite.mouseover = function (mouseData) {
    fn(tile, mouseData);
  };
};

Tile.prototype.setMouseLeave = function (fn) {
  let tile = this;
  this.sprite.mouseout = function (mouseData) {
    fn(tile, mouseData);
  };
};

Tile.prototype.enableInteraction = function (canInteract) {
  this.sprite.interactive = canInteract;
};

Tile.prototype.addNeighbour = function (neighbourTile) {
  this.neighbours.push(neighbourTile);
  this.minedNeighbours += (neighbourTile.isMined ? 1 : 0);
  return this;
};

Tile.prototype.revealMe = function () {
  if (!this.isRevealed) {
    this.isRevealed = true;
    Board.revealedTiles += 1;
    this.setInfoSprite(false, null);
    this.enableInteraction(false);
    this.setTexture(texTile);
    this.mineCount.text = this.minedNeighbours;
    this.mineCount.visible = true;
    // if there are no adjacent mines, recursively reveal the neighbours
    if (this.minedNeighbours === 0) {
      this.neighbours.forEach(function (neighbour) {
        neighbour.revealMe();
      });
    };
  };
};
