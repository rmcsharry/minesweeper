// the game board (can only be one of these, so a class not really needed)
let Board = {
  board: [],
  reset: function (rows, cols, mines, tileSize) {
    let x, y, row;
    let self = this;
    this.rows = rows;
    this.cols = cols;
    this.mines = mines;
    this.tileSize = tileSize;
    this.revealedTiles = 0;
    mineCountFont.fontSize = 0.75 * tileSize + "px"

    // reset the board and mine locations
    this.board = [];
    this.mineLocations = {};
    this.createMines();

    // build the board's data structure
    for (y = 0; y < this.rows; y++) {
      row = [];
      this.board.push(row);
      for (x = 0; x < this.cols; x++) {
        let isTileMined = this.mineLocations[y] && this.mineLocations[y][x];
        let tile = new Tile(x, y, isTileMined, this.tileSize);
        this.setupTile(tile);
        row.push(tile);
      };
    };

    // build the array of neighbour references for each tile
    this.readBoard(function (tile) {
      let neighbours = self.getNeighbours(tile);
      neighbours.forEach(function (neighbour) {
        tile.addNeighbour(neighbour);
      });
    });

    return this;
  },
  // runs a callback function on each tile on the board
  readBoard: function (fn) {
    let x, y;
    for (y = 0; y < this.rows; y++) {
      for (x = 0; x < this.cols; x++) {
        fn(this.getTile(x, y));
      };
    };
  },
  getTile: function (x, y) {
    return this.board[y][x];
  },
  getNeighbours: function (tile) {
    var i, j, data = [], x = tile.x, y = tile.y;
    for (i = y - 1; i <= y + 1; i++) {
      if (i < 0 || i >= this.rows) continue;
      for (j = x - 1; j <= x + 1; j++) {
        if (j < 0 || j >= this.cols) continue;
        if (x === j && y === i) continue;
        data.push(this.getTile(j, i));
      };
    };
    return data;
  },
  showAllMines: function () {
    this.readBoard(function (tile) {
      if (tile.isMined) tile.setInfoSprite(true, texMine);
    });
  },
  setupTile: function (tile) {
    let self = this;
    tile.setTexture(texTile);
    tile.setRightRelease(function (mouseData) {
      if (!Game.over) {
        tile.isFlagged = !tile.isFlagged;
        tile.setInfoSprite(tile.isFlagged, texFlag);
      };
    });
    tile.setLeftRelease(function (mouseData) {
      // check for lose condition
      if (tile.isMined) Game.complete(false);
      else if (!tile.isRevealed && !Game.over) {
        tile.revealMe();
        // Check for win condition
        if ((self.rows * self.cols) - self.mines === self.revealedTiles) Game.complete(true);
      };
    });
    tile.setMouseEnter(function (mouseData) {
      if (tile.sprite.interactive && !tile.isRevealed && !Game.over) {
        tile.setTexture(texHighlight);
      };
    });
    tile.setMouseLeave(function (mouseData) {
      if (tile.sprite.interactive) {
        tile.setTexture(texTile);
      };
    });
    pixiTiles.addChild(tile.container);
  },
  createMines: function () {
    for (i = 0; i < this.mines; i++) {
      this.createMine();
    };
  },
  createMine: function () {
    let x = Math.floor(Math.random() * this.cols);
    let y = Math.floor(Math.random() * this.rows);
    // prevent duplicates
    if (this.mineLocations[y] && this.mineLocations[y][x]) {
      return this.createMine();
    };
    this.mineLocations[y] = this.mineLocations[y] || {};
    this.mineLocations[y][x] = true;
  },
  save: function() {
    let obj = {rows: this.rows, cols: this.cols, mines: this.mines, mineLocations: this.mineLocations};
    let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    let saver = document.getElementById('save-container');
    
    let a = document.createElement('a');
    a.setAttribute('id', 'saver');
    a.href = 'gamedata:' + data;
    a.download = 'gamedata.txt';
    a.innerHTML = 'Download board';
    saver.appendChild(a);
  }
};
