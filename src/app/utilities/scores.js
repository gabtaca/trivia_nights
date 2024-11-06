// scores.js

export function getScores(matchType) {
  const scoresKey = matchType;
  const scores = JSON.parse(localStorage.getItem(scoresKey)) || [];

  //les listes de scores sont initialisées ailleurs dans le StartScreen
  return scores;
}

export function saveScore(name, score, matchType) {
  const scoresKey = matchType;
  const scores = JSON.parse(localStorage.getItem(scoresKey)) || [];
  scores.push({ name, score, date: new Date().toISOString().split("T")[0] });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(scoresKey, JSON.stringify(scores.slice(0, 11)));
}