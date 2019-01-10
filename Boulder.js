// Bulder sizes
const LARGE = 3;
const MEDIUM = 2;
const SMALL = 1;

const large_points =  [
  new Point2D(-30, 0),
  new Point2D(-25, 20),
  new Point2D(-10, 30),
  new Point2D(20, 25),
  new Point2D(25, 15),
  new Point2D(30, 5),
  new Point2D(30, -10),
  new Point2D(15, -25),
  new Point2D(-15, -30),
  new Point2D(-25, -15)];

const large_lines = [
  [0,1],
  [1,2],
  [2,3],
  [3,4],
  [4,5],
  [5,6],
  [6,7],
  [7,8],
  [8,9],
  [9,0]];

const medium_points =  [
  new Point2D(-20, 0),
  new Point2D(-15, 10),
  new Point2D(-5, 20),
  new Point2D(15, 10),
  new Point2D(15, 5),
  new Point2D(20, 5),
  new Point2D(20, -10),
  new Point2D(15, -15),
  new Point2D(-15, -20),
  new Point2D(-15, -5)];

const small_points =  [
  new Point2D(-10, 0),
  new Point2D(-5, 5),
  new Point2D(0, 10),
  new Point2D(5, 10),
  new Point2D(5, 0),
  new Point2D(10, 5),
  new Point2D(10, -5),
  new Point2D(5, -10),
  new Point2D(-5, -10),
  new Point2D(-5, -5)];


class Boulder /*implements Sprite*/ {
  
  constructor(x, y) {
    if(x && y) {
      this.x = x;
      this.y = y;
    }
    else {
      // Loop until far enough from the center
      var done = false;
      while(!done) {
        this.x = random(GAME_SIZE_X);
        this.y = random(GAME_SIZE_Y);
        var center = new Point2D(GAME_SIZE_X / 2, GAME_SIZE_Y / 2);
        var pos = new Point2D(this.x, this.y);
        center.sub(pos);
        if(center.getSize() > 300) {
          done = true;
        }
      }
    }
    this.angle = 0;
    this.speed = 3;
    this.rotation_speed = random(1.0, 3.0);
    this.size = LARGE;
    this.velocity = new Point2D(random(-this.speed, this.speed), random(-this.speed, this.speed));
    this.points = large_points;
    this.proj = this.points.slice(0);
    this.lines = large_lines;
  }

  setSize(size) {
    this.size = size;
    switch(size) {
      case 3  :  this.points = large_points;
                 this.velocity.scaleSize(0.8);
                 break;
      case 2  :  this.points = medium_points;
                 this.velocity.scaleSize(1.25);
                 break;
      case 1  :  this.points = small_points;
                 this.velocity.scaleSize(1.25);
                 break;
      default :  // no action
                 break;
    }
  }

  // points and dest instanceof Point2D[]
  rot(points, dest) {
     for(let i = 0; i < points.length; i++) {
        let p = points[i].clone();
        p.rot(this.angle); 
        dest[i] = p;
     }
  }
  
  isInside(x1, y1, r1) {
    r1 = r1 ? r1 : 0;
    let radius = this.size * 10.0;
    let distance = sqrt((this.x-x1)*(this.x-x1) + (this.y-y1)*(this.y-y1)) - r1;
    return distance < radius;
    // This would be checking a sqare
    //
    // int min_x = (int)x - 30;
    // int max_x = (int)x + 30;
    // int min_y = (int)y - 30;
    // int max_y = (int)y + 30;
    // return x1 > min_x && x1 < max_x && y1 > min_y && y1 < max_y;
  }
   
  clone() {
    let b = new Boulder();
    b.x = this.x;
    b.y = this.y;
    b.size = this.size;
    b.velocity = this.velocity.clone();
    b.angle = this.angle;
    b.setSize(this.size);
    return b;
  }
  
  splitOrSeize() {
    this.setSize(this.size-1);
    //angle =- 15*2*PI/360;
    if(this.size > 0) {
      let b = this.clone();
      b.velocity.rot(-30*2*PI/360);
      this.velocity.rot(30*2*PI/360);
      bouldertracker.addSprite(b);
    }
    else {
      bouldertracker.removeSprite(this);
    }
  }
    
  paint() {
    this.angle += this.rotation_speed*6*PI/(360*this.size+1);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    // Warp around when hitting the playfield edges
    if(this.x > GAME_SIZE_X + 20)
      this.x = this.x - GAME_SIZE_X - 40;
    else if (this.x < 0 - 20) 
      this.x = this.x + GAME_SIZE_X + 40;
    if (this.y > GAME_SIZE_Y + 20) 
      this.y = this.y - GAME_SIZE_Y - 40;
    else if (this.y < 0 - 20) 
      this.y = this.y + GAME_SIZE_Y + 40;

    this.rot(this.points, this.proj);
    for(let i = 0; i < this.lines.length; i++) {
      let l = this.lines[i];
      line(this.x+this.proj[l[0]].x, this.y+this.proj[l[0]].y, 
        this.x+this.proj[l[1]].x, this.y+this.proj[l[1]].y);
    }
  }
}