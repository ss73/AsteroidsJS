class Point2D {
  //x;
  //y;
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getSize() {
    return sqrt(this.x*this.x + this.y*this.y);
  }

  scaleSize(amount) {
    this.x = amount * this.x;
    this.y = amount * this.y;
  }
  
  setSize(size) {
    theta = getAngle();
    this.x = size * cos(theta);
    this.y = size * sin(theta);
  }
  
  getAngle() {
    return getAngle(getSize());
  }
  
  getAngle(size) {
    let theta = acos(this.x / size);
    if(this.y < 0) {
      theta = 2*PI - theta;
    }
    return theta;
  }
  
  rot(angle) {
    let r = this.getSize();
    let theta = this.getAngle(r);
    theta += angle;
    this.x = r * cos(theta);
    this.y = r * sin(theta);
  }

  add(p2d) {
    this.x+=p2d.x;
    this.y+=p2d.y;
  }
  
  sub(p2d) {
    this.x-=p2d.x;
    this.y-=p2d.y;
  }

  clone() {
    return new Point2D(this.x, this.y);
  }
  
  toString() {
    return "Point2D(" + this.x + ", " + this.y + ")";
  }
}