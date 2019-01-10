class Bullet /*implements Sprite*/ {

  /* Members
  x = 0;
  y = 0;
  angle = 0;
  dx = 0;
  dy = 0;
  */

  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.dx = 10 * cos(angle);
    this.dy = 10 * sin(angle);
  }

  isInside(x, y, radius) {
    return false;
  }
  
  paint() {
    this.x += this.dx;
    this.y += this.dy;
    ellipse(this.x, this.y, 1, 1);
    if(this.x < 0 || this.x > GAME_SIZE_X || 
      this.y < 0 || this.y > GAME_SIZE_Y) {
      bullettracker.removeSprite(this);
    }
    let b = bouldertracker.getFirstIntersecting(this.x, this.y);
    if(b != null) {
      if(b.size == LARGE) {
        score += 500;
      }
      else if(b.size == MEDIUM) {
        score += 700;
      }
      else if(b.size == SMALL) {
        score += 1000;
      }
      b.splitOrSeize();
      bullettracker.removeSprite(this);
      if(bouldertracker.getSpriteCount() == 0) {
        gamestate.setState(STATE_LEVELUP);
      }
    }
  }
}