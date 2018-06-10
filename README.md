![Screenshot](https://github.com/rmcsharry/minesweeper/blob/master/img/screenshots/screenshot.jpg)

# Introduction

This repo only contains client code. Simple javascript, no css frameworks or jquery used. Just plain HTML, CSS and JS.
The only dependency is [PIXI.js](http://www.pixijs.com/).

# Setup
Download the repo into a folder, eg into /minesweeper

Change into that folder and run:

`npm install http-server`

`http-server`

This will start the game on http://127.0.0.1:8080/

# Play

The game defaults to 9x9 grid, with 10 mines.

You can set the grid to any size between 5 and 30 rows/cols. Mines can be from 2 to 40.

The only rule is that mines must be 1/3 of the total grid size, and no more. You will get an alert if you set it too high.

The board resizes automatically to your chosen settings when you click "Start Sweeping".

The board will fit any screen size from 300px wide up.

However if you set a high number of rows/cols (eg. 30) on a small screen, you might not be able to see the squars. For example, on 160 pixels wide it would look like this:

![small screen](https://github.com/rmcsharry/minesweeper/blob/master/img/screenshots/smallscreen.jpg)

