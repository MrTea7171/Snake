class Snake {
  static SNAKE_SPEED = 100;
  constructor(game_container) {
    this.game_container = game_container;
    this.snakeBoxs = [];
    this.snakeBoxs[0] = this.makeSnakeBox();
    this.snakeBoxs[0].style.top = "0rem";
    this.snakeBoxs[0].style.left = "0rem";
    this.snakeBoxs[0].style.transition = "top 100ms linear, left 100ms linear";
    this.snakeDirection = null;
    this.speed = 1;
  }

  makeSnakeBox() {
    const newDiv = document.createElement("div");
    newDiv.classList.add("game_snake_box");
    this.game_container.appendChild(newDiv);
    return newDiv;
  }
}
