class TextRenderer {
  
  paint() {
    if(gamestate.isPrintingState()) {
      textFont(font);
      strokeWeight(0.5);
      fill(255);
      textSize(20);
      textAlign(LEFT, CENTER);
      text("Score: " + score, 20, 20);
      textAlign(RIGHT, CENTER);
      text("Level: " + level, GAME_SIZE_X - 20, 20);
      textAlign(LEFT,CENTER);
      text("Lives: " + lives, 20, GAME_SIZE_Y - 40);
    }
    if(gamestate.getState() == STATE_WAITING) {
      textFont(font);
      strokeWeight(0);
      fill(255);
      textSize(36);
      textStyle(NORMAL);
      textAlign(CENTER, TOP);
      text("Hall of fame", GAME_SIZE_X/2, 10);
      for(let i = 0; i < leaderboard.getLength(); i++) {
        textAlign(LEFT, CENTER);
        text(leaderboard.names[leaderboard.getLength() - i - 1], width/2 - 200, 70+i*40); 
        textAlign(RIGHT, CENTER);
        text(leaderboard.scores[leaderboard.getLength() - i - 1], width/2 + 200, 70+i*40);
      }
      textAlign(CENTER, CENTER);
      text("Press SPACE to start", GAME_SIZE_X/2, GAME_SIZE_Y - 40);
    }
    else if(gamestate.getState() == STATE_GAME_OVER) {
      textFont(font);
      strokeWeight(0);
      fill(255);
      textSize(36);
      textStyle(NORMAL);
      textAlign(CENTER, CENTER);
      text("Game Over", GAME_SIZE_X/2, GAME_SIZE_Y/2);
    }
    else if(gamestate.getState() == STATE_ENTER_NAME) {
      textFont(font);
      strokeWeight(0);
      fill(255);
      textSize(36);
      textAlign(CENTER, CENTER);
      text("New highscore!", GAME_SIZE_X/2, GAME_SIZE_Y/2 - 100);
      text("Enter name", GAME_SIZE_X/2, GAME_SIZE_Y/2 - 60);
      text(newname + "_", GAME_SIZE_X/2, GAME_SIZE_Y/2);
      text("time: " + round(gamestate.getTimer(NAME_TIMER)/10), GAME_SIZE_X/2, GAME_SIZE_Y/2 + 80);
    }
  }
  
}