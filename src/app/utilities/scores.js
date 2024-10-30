// scores.js
export function getScores(gameType) {
  const scores = JSON.parse(localStorage.getItem(gameType) || "[]");
  return scores;
}

export function saveScore(name, score, gameType) {
  const scores = getScores(gameType);
  const newScore = { name, score, date: new Date().toLocaleDateString() };
  scores.push(newScore);
  localStorage.setItem(gameType, JSON.stringify(scores));
}