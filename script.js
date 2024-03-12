const LEFT_START = 0;
const LEFT_END = 34.5;
const TOP_START = 0;
const TOP_END = 34.5;
const FOOD_RADIUS = 0.5;
const SNAKE_SPEED = 100;
const SPECIAL_FOOD = 2;

let score;
let foodEatean;
let speed;
let isSpecialFood;

const snake = document.querySelector(".game_snake");
const game_container = document.querySelector(".game_box");
const score_count = document.querySelector("#score_count");
let food;

let snakeMoveInterval;
let snakeDirection = null;
let foodCoordinates = {
  top: null,
  left: null,
};

snake.style.top = 0;
snake.style.left = 0;

window.addEventListener("keydown", (event) => {
  if (isDirectionAllowed(snakeDirection, event.key)) {
    snakeDirection = event.key;
    clearInterval(snakeMoveInterval);
    snakeMoveInterval = setInterval(() => {
      moveSnake(event.key);
    }, SNAKE_SPEED / speed);
  }
});

function createSnakeFood() {
  if (food) {
    game_container.removeChild(food);
  }
  if (foodEatean > 0 && foodEatean % SPECIAL_FOOD === 0) {
    isSpecialFood = true;
  } else {
    isSpecialFood = false;
  }

  const [randomTop, randomLeft] = getRandomPosition();
  const newDiv = document.createElement("div");
  newDiv.style.top = `${randomTop}rem`;
  newDiv.style.left = `${randomLeft}rem`;
  newDiv.style.width = `${2 * FOOD_RADIUS}rem`;
  newDiv.style.height = `${2 * FOOD_RADIUS}rem`;
  newDiv.style.backgroundColor = isSpecialFood ? "red" : "yellowgreen";
  newDiv.classList.add("game_snake_food");
  game_container.appendChild(newDiv);
  food = newDiv;
}

function willCollide(newTop, newLeft) {
  if (
    newTop < TOP_START ||
    newLeft < LEFT_START ||
    newLeft > LEFT_END ||
    newTop > TOP_END
  ) {
    return true;
  }
  return false;
}

function moveSnake(arrowDirection) {
  let newTop = parseFloat(snake.style.top);
  let newLeft = parseFloat(snake.style.left);
  switch (arrowDirection) {
    case "ArrowUp":
      newTop -= 0.625;
      break;
    case "ArrowDown":
      newTop += 0.625;
      break;
    case "ArrowLeft":
      newLeft -= 0.625;
      break;
    case "ArrowRight":
      newLeft += 0.625;
      break;
  }

  if (willCollide(newTop, newLeft)) {
    alert("Game Over");
    startSnakeGame();
  } else {
    snakeReachedFood();
    snake.style.top = `${newTop}rem`;
    snake.style.left = `${newLeft}rem`;
  }
}

function isDirectionAllowed(prevDirection, newDirection) {
  if (
    (prevDirection === "ArrowUp" && newDirection === "ArrowDown") ||
    (prevDirection === "ArrowDown" && newDirection === "ArrowUp") ||
    (prevDirection === "ArrowLeft" && newDirection === "ArrowRight") ||
    (prevDirection === "ArrowRight" && newDirection === "ArrowLeft")
  ) {
    return false;
  }
  return true;
}

function startSnakeGame() {
  snake.style.top = `0rem`;
  snake.style.left = `0rem`;
  snake.style.transition = "top 100ms linear, left 100ms linear";
  snakeDirection = null;
  score = 0;
  score_count.innerText = score;
  speed = 1;
  foodEatean = 0;
  isSpecialFood = false;
  createSnakeFood();
  clearInterval(snakeMoveInterval);
}

function snakeReachedFood() {
  if (
    Math.abs(parseFloat(snake.style.top) - parseFloat(food.style.top)) <=
      1.25 * FOOD_RADIUS &&
    Math.abs(parseFloat(snake.style.left) - parseFloat(food.style.left)) <=
      1.25 * FOOD_RADIUS
  ) {
    foodEatean++;
    score += isSpecialFood ? 10 : 1;
    speed += isSpecialFood ? 0.2 : 0.1;
    const newSpeed = SNAKE_SPEED / speed;
    snake.style.transition = `top ${newSpeed}ms linear, left ${newSpeed}ms linear`;

    score_count.innerText = score;
    createSnakeFood();
    return true;
  }
  return false;
}

function getRandomPosition() {
  const randomTop = Math.floor(Math.random() * TOP_END);
  const randomLeft = Math.floor(Math.random() * LEFT_END);
  return [randomTop, randomLeft];
}

startSnakeGame();
