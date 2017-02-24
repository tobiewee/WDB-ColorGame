var squares = document.querySelectorAll(".square");
var colorDisp = document.querySelector(".colorDisp");
var feedbackMsg = document.getElementById("message");
var resetBtn = document.getElementById("resetBtn");
var h1Background = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");

const hard = 6;
const easy = 3;
var currentMode;
var colors;
var ansColor;

init();

function init(){
  currentMode = hard;

  for(var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function(){
      if(ansColor == this.style.background){
        feedbackMsg.textContent = "Correct!";
        resetBtn.textContent = "Play Again?";
        changeToCorrectColors(ansColor);
      }
      else {
        this.style.background="#232323";
        feedbackMsg.textContent = "Try Again!"
      }
    });
  };

  resetBtn.addEventListener("click", function(){
    resetGame(currentMode);
  });

  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      if(this.textContent === "Easy"){
        currentMode = easy;
      }
      else {
        currentMode = hard;
      }

      resetGame(currentMode);
    });
  }

  resetGame(currentMode);
}

function initSquareColors(colArr){
  for(var i = 0; i < squares.length; i++) {
    if(colArr[i] === undefined) {
      squares[i].style.display="none";
    } else {
      squares[i].style.display="block";
      squares[i].style.background = colArr[i];
    }
  }
}

function changeToCorrectColors(color) {
  h1Background.style.background = color;
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}

function pickAColor(){
  var ansIndex = Math.floor(Math.random()*colors.length);
  return colors[ansIndex];
}

function generateColors(num) {
  var arr = [];
  for(var i=0; i<num; i++) {
    arr[i] = randomColor();
  }
  return arr;
}

function randomColor(){
  var red = Math.floor(Math.random()*256);
  var green = Math.floor(Math.random()*256);
  var blue = Math.floor(Math.random()*256);

  return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function resetGame(num){
  resetBtn.textContent = "New Colors";
  h1Background.style.background = "#5F8DDA";

  colors = generateColors(num);

  ansColor = pickAColor();
  colorDisp.textContent = ansColor;

  initSquareColors(colors);

  feedbackMsg.textContent="";
}
