var highScoresEl = document.querySelector("#highscores");
var clearHighScoresBtn = document.querySelector("#clear");

function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  // (optional) sort highscores by score property in descending order
  highScores.sort(function (a, b) {
    return b.time - a.time;
  });

  // for each score
  highScores.forEach(element => {
    // create li tag for each high score
    var highScoreEl = document.createElement("li");
    highScoreEl.textContent = element.myInitials + " - " + element.time;
    // display on page
    highScoresEl.appendChild(highScoreEl);

  });



}

function clearHighscores() {
  localStorage.clear();
  // (and reload)
  location.reload();
}

// attache clear event to clear score button
clearHighScoresBtn.addEventListener("click", clearHighscores);
// run printhighscore when page loads
printHighscores();