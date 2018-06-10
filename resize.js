function resizeBoard(renderer, rows, cols, tileSize) {
  let gameWidth = cols * tileSize;
  let gameHeight = rows * tileSize;

  // resize the dom game area, so it stays centered
  document.getElementById("game").style.maxWidth = gameWidth + "px";

  // resize the board (the pixi canvas)
  renderer.resize(gameWidth, gameHeight);

  // resize the cover title graphic (but only upto 600px, otherwise starts to look odd)
  let defaultSize = 288;
  let change = gameWidth / defaultSize;
  if (gameWidth < 600) 
    cover.resize(change, change);
  else
    cover.resize(change * 0.75, change * 0.75)
}