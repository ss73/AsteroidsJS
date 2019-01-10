const FORCE = 2;

class Shatter /*implements Sprite*/ {
  
  // position, velocity instanceof Point2D
  constructor(position, velocity) {
    this.points = [
      new Point2D(2.0, 0.0),
      new Point2D(2.0, 0.0),
      new Point2D(2.0, 0.0),
      new Point2D(2.0, 0.0)
    ];

    this.lines = [
      [0,1],
      [1,2],
      [2,3],
      [3,0]
    ];
  
    this.position = position.clone();
    this.velocity = velocity.clone();
    velocity.scaleSize(0.8);
    
    // Randomize a pushing force (explosion)
    let push = new Point2D(0, FORCE);
    push.rot(2*PI*random(1.0));
    velocity.add(push);
    
    // Randomize shatter shape
    for(let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      p.scaleSize(1 + random(1.0));
      p.rot(i * (2*PI/(this.points.length+1)) + random(1.0) * (this.points.length+1));
    }
  }

  isInside(x, y, radius) {
    return false;
  }

  paint() {
    this.position.add(this.velocity);
    for(let i = 0; i < this.lines.length; i++) {
      let l = this.lines[i];
      line(this.position.x+this.points[l[0]].x, this.position.y+this.points[l[0]].y, 
        this.position.x+this.points[l[1]].x, this.position.y+this.points[l[1]].y);
    }
    if(this.position.x < 0 || this.position.x > GAME_SIZE_X || 
      this.position.y < 0 || this.position.y > GAME_SIZE_Y) {
      shattertracker.removeSprite(this);
    }
  }
}