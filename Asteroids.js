// Constants
const GAME_SIZE_X = 640;
const GAME_SIZE_Y = 480;

ship = null;
bouldertracker = new SpriteTracker(30);
bullettracker = new SpriteTracker(30);
shattertracker = new SpriteTracker(10);
leaderboard = new Leaderboard();
textrenderer = new TextRenderer();
gamestate = new GameState();

var score = 0;
var level = 1;
var lives = 3;
var font = null;
var ship_rotation = 0;
var newname;

function preload() {
  font = loadFont("data/Hyperspace.otf");
}

function setup() {
  var canvas = createCanvas(640, 480);
  canvas.parent("sketch");
  frameRate(25);
  ship = new Spaceship();
  for(let i = 0; i < 6; i++) {
    bouldertracker.addSprite(new Boulder());
  }
  gamestate.setState(STATE_WAITING);
}

function draw() {
  background(25, 25, 25); // Set background to black
  stroke(255);
  strokeWeight(1);
  noFill();
  ship.rot(ship_rotation);
  ship.updatePosition();
  ship.paint();
  bullettracker.paintSprites();
  bouldertracker.paintSprites();
  textrenderer.paint();
  gamestate.updateTimers();
}

function initGame() {
  gamestate.setState(STATE_PLAYING);
  score = 0;
  level = 0;
  lives = 3;
  levelUp();
}

function levelUp() {
  level++;
  bouldertracker = new SpriteTracker((5+level)*4);
  ship = new Spaceship();
  for(let i = 0; i < 5+level; i++) {
    bouldertracker.addSprite(new Boulder());
  }
}

function keyPressed() {
  if(gamestate.getState() == STATE_ENTER_NAME) {
    if(keyCode == BACKSPACE && newname.length > 0) {
      newname = newname.substring(0, newname.length - 1);
    }
    else if(keyCode == ENTER) {
      leaderboard.setScore(score, newname);
      gamestate.resetTimers();
      gamestate.setState(STATE_WAITING);
    }
    else if(newname.length <= 8) {
      newname += key;
    }
    return;
  }
  switch(key) {
    case ' '   :  if(gamestate.getState() == STATE_WAITING)
                    initGame();
                  else if (gamestate.isActiveState())
                    ship.fire();
                  else if (gamestate.getState() == STATE_GAME_OVER)
                    gamestate.setState(STATE_WAITING);
                  break;
    default    :
      switch(keyCode) {
        case UP_ARROW : 
          ship.accelerate();
          break;
        case DOWN_ARROW :
          //ship.decelerate();
          break;
        case LEFT_ARROW :
          ship_rotation = -1;
          break;
        case RIGHT_ARROW :
          ship_rotation = 1;
          break;
        default :
          // No action
          break;
      }
  }
}

function keyReleased() {
      switch(keyCode) {
        case LEFT_ARROW :
          ship_rotation = 0;
          break;
        case RIGHT_ARROW :
          ship_rotation = 0;
          break;
        default :
          // No action
          break;
      }
}