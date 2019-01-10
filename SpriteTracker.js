class SpriteTracker {
  
  /* Members
  sprites;
  */
 
  constructor(count) {
    this.sprites = new Array(count);
  }

  addSprite(s) {
    for(let i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i] == null) {
        this.sprites[i] = s;
        break;
      }
    }
  }
  
  removeSprite(s) {
    for(let i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i] == s) {
        this.sprites[i] = null;
        break;
      }
    }
  }
  
  getSprites() {
    let result = new Array(this.getSpriteCount());
    let n = 0;
    for(let i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i] != null) {
        result[n] = this.sprites[i];
        n++;
      }
    }
    return result;
  }
  
  getSpriteCount() {
    let result = 0;
    for(let i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i] != null) {
        result++;
      }
    }
    return result;
  }

  getFirstIntersecting(x, y) {
    return this.getFirstIntersecting(x, y, 0);
  }
  
  getFirstIntersecting(x, y, radius) {
    for(let i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i] != null && this.sprites[i].isInside(x, y, radius)) {
        return this.sprites[i];
      }
    }
    return null;
  }

  
  paintSprites() {
    for(let i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i] != null) {
        this.sprites[i].paint();
      }
    }
  }
}