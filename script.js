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

const game_container = document.querySelector(".game_box");
const score_count = document.querySelector("#score_count");
let food;
let snake;

let snakeMoveInterval;
let snakeDirection = null;

window.addEventListener("keydown", (event) => {
  if (isDirectionAllowed(snakeDirection, event.key)) {
    snakeDirection = event.key;
    clearInterval(snakeMoveInterval);
    snakeMoveInterval = setInterval(() => {
      moveFirstSnake(event.key);
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

function moveFirstSnake(arrowDirection) {
  let newTop = parseFloat(snake[0].style.top);
  let newLeft = parseFloat(snake[0].style.left);
  switch (arrowDirection) {
    case "ArrowUp":
      newTop -= 0.625;
      if (newTop < TOP_START) {
        newTop = TOP_END;
      }
      break;
    case "ArrowDown":
      newTop += 0.625;
      if (newTop > TOP_END) {
        newTop = TOP_START;
      }
      break;
    case "ArrowLeft":
      newLeft -= 0.625;
      if (newLeft < LEFT_START) {
        newLeft = LEFT_END;
      }
      break;
    case "ArrowRight":
      newLeft += 0.625;
      if (newLeft > LEFT_END) {
        newLeft = LEFT_START;
      }
      break;
  }

  if (willCollide(newTop, newLeft)) {
    alert("Game Over");
    startSnakeGame();
  } else {
    snakeReachedFood();
    moveAllSnakes();
    snake[0].style.top = `${newTop}rem`;
    snake[0].style.left = `${newLeft}rem`;
  }
}

function moveAllSnakes() {
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].style.top = snake[i - 1].style.top;
    snake[i].style.left = snake[i - 1].style.left;
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
  if (snake) {
    for (let box of snake) {
      game_container.removeChild(box);
    }
  }
  snake = [makeSnakeBox()];
  snake[0].style.top = `0rem`;
  snake[0].style.left = `0rem`;
  snake[0].style.transition = "top 100ms linear, left 100ms linear";
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
    Math.abs(parseFloat(snake[0].style.top) - parseFloat(food.style.top)) <=
      1.25 * FOOD_RADIUS &&
    Math.abs(parseFloat(snake[0].style.left) - parseFloat(food.style.left)) <=
      1.25 * FOOD_RADIUS
  ) {
    foodEatean++;
    score += isSpecialFood ? 10 : 1;
    speed += isSpecialFood ? 0.2 : 0.1;
    const newSpeed = SNAKE_SPEED / speed;

    score_count.innerText = score;
    createSnakeFood();
    snake = [...snake, makeSnakeBox()];
    snake.forEach((box) => {
      box.style.transition = `top ${newSpeed}ms linear, left ${newSpeed}ms linear`;
    });
    return true;
  }
  return false;
}

function getRandomPosition() {
  const randomTop = Math.floor(Math.random() * TOP_END);
  const randomLeft = Math.floor(Math.random() * LEFT_END);
  return [randomTop, randomLeft];
}

function makeSnakeBox() {
  const newDiv = document.createElement("div");
  newDiv.classList.add("game_snake_box");
  game_container.appendChild(newDiv);
  return newDiv;
}
startSnakeGame();
