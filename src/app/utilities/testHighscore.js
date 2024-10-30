// testHighscore.js

export function testHighScore(handleGameOver) {
  // Fetche le meilleur score du local storage et ajoute 10,000 points pour tester les fonctions de high score
  const scores = JSON.parse(localStorage.getItem("quickMatch")) || [];
  const highestScore = scores.length > 0 ? scores[0].score : 0;
  const newScore = highestScore + 10000;

  // active un match avec un updated score
  handleGameOver(newScore); // simule la fin de la partie
}

export function clearScores() {
  // Efface les scores du local storage
  localStorage.removeItem("quickMatch");
  localStorage.removeItem("customMatch");
}