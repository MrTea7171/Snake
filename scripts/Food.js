class Food {
  static LEFT_MAX = 34.5;
  static TOP_MAX = 34.5;
  static FOOD_RADIUS = 0.5;
  static SPECIAL_FOOD = 2;

  constructor(game_container) {
    this.game_container = game_container;
    this.food = null;
    this.foodEatean = 0;
    this.isSpecialFood = false;
    this.createSnakeFood();
  }

  createSnakeFood() {
    if (this.food) {
      game_container.removeChild(food);
    }
    if (this.foodEatean > 0 && this.foodEatean % SPECIAL_FOOD === 0) {
      this.isSpecialFood = true;
    } else {
      this.isSpecialFood = false;
    }
    const [randomTop, randomLeft] = Food.getRandomPosition();
    const newDiv = document.createElement("div");
    newDiv.style.top = `${randomTop}rem`;
    newDiv.style.left = `${randomLeft}rem`;
    newDiv.style.width = `${2 * Food.FOOD_RADIUS}rem`;
    newDiv.style.height = `${2 * Food.FOOD_RADIUS}rem`;
    newDiv.style.backgroundColor = this.isSpecialFood ? "red" : "yellowgreen";
    newDiv.classList.add("game_snake_food");
    this.game_container.appendChild(newDiv);
    this.food = newDiv;
  }

  static getRandomPosition() {
    const randomTop = Math.floor(Math.random() * Food.TOP_MAX);
    const randomLeft = Math.floor(Math.random() * Food.LEFT_MAX);
    return [randomTop, randomLeft];
  }
}
