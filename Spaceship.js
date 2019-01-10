class Spaceship {


  constructor() {
    // Ship coordinates
    this.x = GAME_SIZE_X / 2;
    this.y = GAME_SIZE_Y / 2;

    // Configurable acceleration
    this.speed_scaler = 1; 

    // Ship angle of rotation
    this.angle = 0;

    // Set when accelerationg to trigger 'flame' rendering
    this.draw_thruster = false;

    // Velocity is a vector
    this.velocity = new Point2D(0, 0);

    // The points in the space ship
    this.model =  [
      new Point2D(-10, 10),
      new Point2D(10, 0),
      new Point2D(-10, -10),
      new Point2D(-5, 0)
    ];

    // Connecting the dots to draw the full space ship
    this.lines = [
      [0,1],
      [1,2],
      [2,3],
      [3,0]
    ];

    // The points for the flame
    this.flame =  [
      new Point2D(-5, 0),
      new Point2D(-10, -5),
      new Point2D(-30, 0),
      new Point2D(-10, 5)
    ];

    // Connecting the dots to draw the flame
    this.flame_lines = [
      [0,1],
      [1,2],
      [2,3],
      [3,0]
    ];
    
    // The rendered ship - repeted transformation of the same
    // vectors result in rounding errors, thus a cloned copy
    // is transformed rather than the original model.
    this.points = this.model.slice(0);
    this.flame_points = this.flame.slice(0);
  }
  
  // Burn the thruster!
  accelerate() {
    let dx = this.speed_scaler * cos(this.angle);
    let dy = this.speed_scaler * sin(this.angle);
    this.velocity.add(new Point2D(dx, dy));
    this.draw_thruster = true;
  }

  decelerate() {
    dx = this.speed_scaler * cos(this.angle);
    dy = this.speed_scaler * sin(this.angle);
    this.velocity.add(new Point2D(-dx, -dy));
  }
 
  fire() {
    if(gamestate.isActiveState()) {
      bullettracker.addSprite(new Bullet(this.x, this.y, this.angle));
    }
  }
  
  rot(degrees) {
    this.angle+=degrees/(2*PI);
    if(this.angle < -2*PI || this.angle > 2*PI)
      this.angle = this.angle % (2*PI);
    for(let i = 0; i < this.model.length; i++) {
      let p = this.model[i].clone();
      p.rot(this.angle); 
      this.points[i] = p;
    }
    //System.out.println("Theta: " + round(angle * 360 / (2 * PI)));
  }
  
  updatePosition() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    // Warp around when hitting the playfield edges
    if(this.x > GAME_SIZE_X)
      this.x = this.x - GAME_SIZE_X;
    else if (this.x < 0) 
      this.x = this.x + GAME_SIZE_X;
    if (this.y > GAME_SIZE_Y) 
      this.y = this.y - GAME_SIZE_Y;
    else if (this.y < 0) 
      this.y = this.y + GAME_SIZE_Y;
    // Check collision
    if(gamestate.isVulnerable() && bouldertracker.getFirstIntersecting(this.x, this.y, 5) != null) {
      // Explode
      gamestate.setState(STATE_EXPLODING);
    }
  }

  explodeShip() {
    shattertracker = new SpriteTracker(10);
    for(let i = 0; i < 10; i++) {
      shattertracker.addSprite(new Shatter(new Point2D(this.x, this.y), this.velocity));
    }
  }
  
  paint() {
    if(gamestate.isActiveState()) {
      if(gamestate.isInvincible() && gamestate.ticktock) {
        // Don't draw the ship every other frame when invincible
      }
      else {
        for(let i = 0; i < this.lines.length; i++) {
          let l = this.lines[i];
          line(this.x+this.points[l[0]].x, this.y+this.points[l[0]].y, 
            this.x+this.points[l[1]].x, this.y+this.points[l[1]].y);
        }
      }
      if(this.draw_thruster) {
        this.draw_thruster = false;
        // Rotate the flame
        for(let i = 0; i < this.flame.length; i++) {
          let p = this.flame[i].clone();
          p.rot(this.angle); 
          this.flame_points[i] = p;
       }
       for(let i = 0; i < this.flame_lines.length; i++) {
          let l = this.flame_lines[i];
          line(this.x+this.flame_points[l[0]].x, this.y+this.flame_points[l[0]].y, 
            this.x+this.flame_points[l[1]].x, this.y+this.flame_points[l[1]].y);
        }
      }
    }
    else if(gamestate.getState() == STATE_EXPLODING) {
      shattertracker.paintSprites();
    }
  }
}