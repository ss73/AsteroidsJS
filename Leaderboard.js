class Leaderboard {

  /* Members
  scores;
  names;
  */
 
  constructor() {
    this.scores = [1000, 5000, 10000, 20000, 40000, 80000, 100000, 150000];
    this.names = ["Linnea", "Isak", "Arvid", "Edvin", "Signe", "Hugo", "Maria", "Stellan"];
  }

  getLength() {
    return this.scores.length;
  }

  qualifies(score) {
    return this.scores[0] <= score;
  }
  
  setScore(score, name) { 
    let i = 0;
    let current = this.scores[i];
    if(score < current) {
      return;
    }
    while(score >= current && i < this.scores.length - 1) {
      i++;      
      current = this.scores[i]; 
    }
    if(score < this.scores[this.scores.length - 1]) {
      i--;
    }
    // Shift out lower scores
    for(let j = 0; j < i; j++) {
      this.scores[j] = this.scores[j+1];
      this.names[j] = this.names[j+1];
    }
    this.scores[i] = score;
    this.names[i] = name;
  }
  
  
}