class GameContainer {
  static LEFT_START = 0;
  static LEFT_END = 34.5;
  static TOP_START = 0;
  static TOP_END = 34.5;

  constructor() {
    this.game_container = document.querySelector(".game_box");
    this.score_count = document.querySelector("#score_count");
    this.startGame();
  }

  startGame() {
    this.score = 0;
    this.snakes = new Snake(this.game_container);
    this.food = new Food(this.game_container);
  }
}

new GameContainer();
