window.onload = function () {
  let score = 0;
  let highestScore = 0;
  const startScreen = document.getElementById("game-screen");
  const gameOverScreen = document.getElementById("gameOverScreen");
  const gameOverMsg = document.getElementById("gameOverMsg");
  const gameOverTitle = document.getElementById("gameOverTitle");
  const playBtn = document.getElementById("playBtn");
  const gameBoard = document.getElementById("game-board");
  const rocks = document.getElementsByClassName("rock");
  const coins = document.getElementsByClassName("coin");
  const scoreboard = document.getElementById("scoreboard");
  const timerEle = document.getElementById("timer");
  let timer = null;
  let gameTime = 30;
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

    // Reset the timer if timer already set
    if (timer) {
      clearInterval(timer);
    }
    gameTime = 30;
    // Start a new timer when the game begins
    timer = setInterval(() => {
      timerEle.innerHTML = `Time Remain: ${gameTime}s`;
      gameTime -= 1;
      // Ends game when 30s is passed
      if (gameTime <= 0) {
        highestScore = checkEndGame(score, highestScore, true, timer);
      }
    }, 1000);
  };

  const squarePositionArray = [];

  // When hover over a grid item
  // Update the position of the spaceship
  for (let index = 0; index < gridItems.length; index++) {
    const square = gridItems[index];
    const squareIndex = index + 1;
    square.classList.add(`square-${squareIndex}`);

    // Pre-calculate the position of the spaceship to see if performance can be improved
    const row = Math.floor(squareIndex / 8);
    const col = squareIndex % 8 === 0 ? 7 : (squareIndex % 8) - 1;
    const pos = {
      left: 12.5 * col,
      top: 20 * row,
    };
    squarePositionArray.push(pos);
    square.dataset.index = index;
    square.onmouseover = function () {
      const eventIndex = square.dataset.index;
      spaceship.style.left = `${squarePositionArray[eventIndex].left}%`;
      spaceship.style.top = `${squarePositionArray[eventIndex].top}%`;
    };
  }

  // When hit a rock
  // Display game over screen
  for (let index = 0; index < rocks.length; index++) {
    const rock = rocks[index];
    rock.onmouseover = function (e) {
      highestScore = checkEndGame(score, highestScore, false, timer);
    };
  }

  // When hit a coin
  // increase the score
  // hide the coin temporarily
  // make it visible after few seconds
  for (let index = 0; index < coins.length; index++) {
    const coin = coins[index];
    coin.onmouseover = function (e) {
      score++;
      scoreboard.innerHTML = `Scores: ${score}`;
      e.target.style.display = "none";
      setTimeout(() => {
        e.target.style.display = "block";
      }, getRandomValue(4000, 10000, 1000));
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

  function checkEndGame(score, highestScore, isWinner, timer) {
    // display tutorial screen
    // hides the gameboard
    clearInterval(timer);

    startScreen.style.display = "block";
    gameOverScreen.style.display = "block";
    gameBoard.style.display = "none";
    gameOverScreen.style.color = isWinner ? "lightgreen" : "orangered";
    highestScore = Math.max(score, highestScore);
    gameOverMsg.innerHTML = isWinner
      ? `Times Up! Congrats! You spaceship safely finished the trip. You score is ${score}. Your highest score is ${highestScore}.`
      : `Oh No! You crashed! Game Over! You scored ${score} points. Your highest score is ${highestScore}.`;
    return highestScore;
  }
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
