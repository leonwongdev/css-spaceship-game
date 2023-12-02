window.onload = function () {
  let score = 0;
  const startScreen = document.getElementById("game-screen");
  const gameOverScreen = document.getElementById("gameOverScreen");
  const gameOverMsg = document.getElementById("gameOverMsg");
  const gameOverTitle = document.getElementById("gameOverTitle");
  const playBtn = document.getElementById("playBtn");
  const gameBoard = document.getElementById("game-board");
  const rocks = document.getElementsByClassName("rock");
  const coins = document.getElementsByClassName("coin");
  const scoreboard = document.getElementById("scoreboard");
  const gridItems = document.getElementsByClassName("grid-item");
  const spaceship = document.getElementById("spaceship");

  // When clicking the play button
  // Hide the introductory screen
  // display the game board
  playBtn.onclick = function () {
    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    score = 0;
    scoreboard.innerHTML = "Score: 0";
    gameBoard.style.display = "grid";
    // location.reload();
  };

  const squarePositionArray = [];

  // When hover over a grid item
  // Update the position of the spaceship
  for (let index = 0; index < gridItems.length; index++) {
    const square = gridItems[index];
    const squareIndex = index + 1;
    square.classList.add(`square-${squareIndex}`);

    const row = Math.floor(squareIndex / 8);
    const col = squareIndex % 8 === 0 ? 7 : (squareIndex % 8) - 1;
    const pos = {
      left: 12.5 * col,
      top: 20 * row,
    };
    squarePositionArray.push(pos);
    square.dataset.index = index;
    // square.dataset.left = 12.5 * col;
    // square.dataset.top = 20 * row;
    square.onmouseover = function () {
      const eventIndex = square.dataset.index;
      //   spaceship.style.left = `${12.5 * square.dataset.col}%`;
      //   spaceship.style.top = `${20 * square.dataset.row}%`;
      spaceship.style.left = `${squarePositionArray[eventIndex].left}%`;
      spaceship.style.top = `${squarePositionArray[eventIndex].top}%`;
    };
  }

  // When hit a rock
  // Display game over screen
  for (let index = 0; index < rocks.length; index++) {
    const rock = rocks[index];
    rock.onmouseover = function (e) {
      startScreen.style.display = "block";
      gameOverScreen.style.display = "block";
      gameOverScreen.style.color = "red";
      gameOverMsg.innerHTML = `Game Over! You spaceship crashed into an asteroid. You score is ${score}`;
      //   console.log("hit rock");
    };
  }

  // When hit a coin
  // increase the score
  // hide the coin temporarily
  // make it visible after few seconds
  for (let index = 0; index < coins.length; index++) {
    const coin = coins[index];
    coin.onmouseover = function (e) {
      //   console.log("hit coin");
      score++;
      scoreboard.innerHTML = `Scores: ${score}`;
      e.target.style.display = "none";
      setTimeout(() => {
        e.target.style.display = "block";
      }, getRandomValue(4000, 10000, 1000));
      //   setTimeout(() => {
      //     e.target.style.display = "block";
      //   }, 6000);
    };
  }

  // Generate the background star fields
  function createStars() {
    const numStars = 500;
    const container = document.body;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "star";

      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      const xPos = Math.random() * window.innerWidth;
      const yPos = Math.random() * window.innerHeight;
      star.style.left = `${xPos}px`;
      star.style.top = `${yPos}px`;

      container.appendChild(star);
    }
  }

  createStars();
};

function getRandomValue(min, max, step) {
  // Calculate the range of possible values
  const range = (max - min) / step;

  // Generate a random index within the range
  const randomIndex = Math.floor(Math.random() * range);

  // Calculate the random value based on the index and step
  const randomValue = min + randomIndex * step;

  return randomValue;
}
