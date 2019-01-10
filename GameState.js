// Game states
const STATE_PLAYING = 0;
const STATE_EXPLODING = 1;
const STATE_WAITING = 2;
const STATE_GAME_OVER = 3;
const STATE_INVINCIBLE = 4;
const STATE_LEVELUP = 5;
const STATE_ENTER_NAME = 6;

// Timers
const EXPLOSION_TIMER = 0;
const INVINCIBLE_TIMER = 1;
const LEVELUP_TIMER = 2;
const GAMEOVER_TIMER = 3;
const WAITING_TIMER = 4;
const NAME_TIMER = 5;

class GameState {
  
  constructor() {
    this.gstate = STATE_WAITING;
    this.timers = new Array(6);
    for(let i = 0; i < this.timers.length; i++) {
      this.timers[i] = -1;
    }
    
    // Flip-flop
    this.ticktock = false;

    //setState(STATE_WAITING);
    //resetTimers();
  }

  resetTimers() {
    for(let i = 0; i < this.timers.length; i++) {
      this.timers[i] = -1;
    }
  }
  
  getTimer(timer) {
    return this.timers[timer];
  }
  
  getState() {
    return this.gstate;
  }
  
  isPrintingState() {
    return this.gstate == STATE_PLAYING || 
      this.gstate == STATE_EXPLODING || 
      this.gstate == STATE_INVINCIBLE || 
      this.gstate == STATE_LEVELUP  || 
      this.gstate == STATE_GAME_OVER;
  }
  
  isActiveState() {
    return this.gstate == STATE_PLAYING || 
      this.gstate == STATE_INVINCIBLE || 
      this.gstate == STATE_LEVELUP;
  }

  isVulnerable() {
    return this.gstate == STATE_PLAYING;
  }

  isInvincible() {
    return this.gstate == STATE_INVINCIBLE;
  }
  
  updateTimers() {
    this.ticktock = !this.ticktock;
    for(let i = 0; i < this.timers.length; i++) {
      if(this.timers[i] > 0) {
        this.timers[i]--;
      }
      else if(this.timers[i] == 0) {
        this.timers[i] = -1;
        this.triggerTimer(i);
      }
    }
  }

  triggerTimer(timer) {
    //System.out.println("Timer: " + timer);
    switch(timer) {
      case EXPLOSION_TIMER:
        if(lives > 0) {
          this.setState(STATE_INVINCIBLE);
        }
        else {
          this.setState(STATE_GAME_OVER);
        }
        break;
      case INVINCIBLE_TIMER:
        this.setState(STATE_PLAYING);
        break;
      case LEVELUP_TIMER:
        levelUp();
        this.setState(STATE_PLAYING);
        break;
      case GAMEOVER_TIMER:
        this.setState(STATE_WAITING);
        break;
      case WAITING_TIMER:
        this.timers[WAITING_TIMER] = 50 + (int)(100 * random(1));
        if(bouldertracker.getSpriteCount() < 5) {
          bouldertracker.addSprite(new Boulder());
        }
        else if(bouldertracker.getSpriteCount() > 0) {
          let boulders = bouldertracker.getSprites();
          let i = Math.floor(boulders.length * random(1));
          boulders[i].splitOrSeize();
        }
        break;
      case NAME_TIMER:
        this.resetTimers();
        leaderboard.setScore(score, newname);
        this.setState(STATE_WAITING);
        break;
      default:
        // Do nothing
        break;
    }
  }
  
  setState(newstate) {
    switch(newstate) {
      case STATE_EXPLODING:
        lives--;
        this.gstate = STATE_EXPLODING;
        this.timers[EXPLOSION_TIMER] = 100;
        ship.explodeShip();
        break;
      case STATE_PLAYING:
        this.resetTimers();
        this.gstate = STATE_PLAYING;
        break;
      case STATE_WAITING:
        this.timers[WAITING_TIMER] = 100;
        this.gstate = STATE_WAITING;
        break;
      case STATE_INVINCIBLE:
        this.timers[INVINCIBLE_TIMER] = 100;
        this.gstate = STATE_INVINCIBLE;
        ship = new Spaceship();
        break;
      case STATE_LEVELUP:
        this.gstate = STATE_LEVELUP;
        this.timers[LEVELUP_TIMER] = 50;
        break;
      case STATE_GAME_OVER:
        if(leaderboard.qualifies(score)) {
          this.timers[NAME_TIMER] = 300;
          this.gstate = STATE_ENTER_NAME;
          newname = "";
        }
        else {
          this.timers[GAMEOVER_TIMER] = 200;
          this.gstate = STATE_GAME_OVER;
        }
        break;
      default:
        this.gstate = newstate;
        break;
    }
  }
 
}