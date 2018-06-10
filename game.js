let Game = {
  over: false,
  setup: function () {
    // show default settings
    document.getElementById('rows').setAttribute('value', defaults.rows)
    document.getElementById('cols').setAttribute('value', defaults.cols)
    document.getElementById('mines').setAttribute('value', defaults.mines)

    // setup pixi stages
    app.stage.addChild(pixiTitleScreen);
    app.stage.addChild(pixiGameScreen)

    // show title screen
    pixiGameScreen.visible = false;
    pixiTitleScreen.visible = true;

    // Initialize board/tile container
    pixiBoard = new PIXI.Container();
    pixiTiles = new PIXI.Container();
    pixiBoard.addChild(pixiTiles);
    pixiGameScreen.addChild(pixiBoard);
    pixiBoard.x = 0;
    pixiBoard.y = 0;

    // Title screen
    titleMenu = new Menu(3, 40, "Title Menu");
    cover = new Cover(texCover);
    pixiTitleScreen.addChild(cover.sprite);
    pixiTitleScreen.addChild(titleMenu.container);

    // Setup start menu button
    let startBtn = new MenuOption("Start Sweeping!", menuFont, 0x927751);
    startBtn.setPressAction(function () {
      Game.setupBoard();
    });
    titleMenu.addMenuOption(startBtn, defaults.tileSize);

    // add end menu & message
    endMenu = new Menu(3, 3, "End Menu");
    pixiGameScreen.addChild(endMenu.container);
    resultMessage = new PIXI.Text("", resultFont);
    pixiGameScreen.addChild(resultMessage);
    
    // ensure correct starting size
    resizeBoard(app.renderer, defaults.rows, defaults.cols, defaults.tileSize);
  },
  setupBoard: function () {
    // get settings from user inputs & validate maximum mine rule
    let rows = Number(document.getElementById('rows').value);
    let cols = Number(document.getElementById('cols').value);
    let mines = Number(document.getElementById('mines').value);
    if (mines > maxMines(rows, cols)) {
      return (alert("Maximum mines is " + maxMines(rows, cols) + " (1/3 the number of squares)"))
    };
    if (rows < 5 || cols < 5) {
      return (alert("Minimum rows and minimum cols is 5"));
    };

    // hide title screen, show game screen
    pixiTitleScreen.visible = false;
    pixiGameScreen.visible = true;

    // calculate size of each tile based on screen width
    let tileSize = (() => {
      if (cols * defaults.tileSize > window.innerWidth)
        return Math.floor(window.innerWidth / cols);
      else
        return defaults.tileSize;
    })();
    
    // resize game board
    resizeBoard(app.renderer, rows, cols, tileSize);

    // disable inputs now game is starting
    document.getElementById('rows').disabled = true;
    document.getElementById('cols').disabled = true;
    document.getElementById('mines').disabled = true;

    // set board to start state
    Board.reset(rows, cols, mines, tileSize);

    // set end game message position
    resultMessage.x = (pixiGameScreen.width / 2) - 45;
    resultMessage.y = (pixiGameScreen.height / 2) - 15;
    resultMessage.visible = false;
    Board.save();    
  },
  complete: function (result) {
    // Show all the mines and set flag
    Board.showAllMines();
    Game.over = true;

    // Set end game message
    if (result)
      resultMessage.text = "You won!"
    else
      resultMessage.text = "You lost!"
    resultMessage.visible = true;

    // Set up and display end game button
    endBtn = new MenuOption("Restart", menuFont, 0x000000);
    endBtn.setPressAction(function () {
      Game.restart();
    });
    endMenu.addMenuOption(endBtn, Board.tileSize);
    endMenu.container.visible = true;
  },
  restart: function () {
    this.over = false;
    endMenu.container.visible = false;
    endMenu.container.removeChildren();
    
    // re-enable inputs now game is restarting
    document.getElementById('rows').disabled = false;
    document.getElementById('cols').disabled = false;
    document.getElementById('mines').disabled = false;

    // hide game screen, show title screen
    pixiTitleScreen.visible = true;
    pixiGameScreen.visible = false;
  }
}