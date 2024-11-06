// src/app/utilities/fetch.js

import { saveScore } from './scores';

const baseURL = "https://opentdb.com/api.php";
let sessionToken = null;
let cachedQuestions = {
  quickMatch: null,
  customMatch: null,
};
let lastFetchTime = 0;
const FETCH_INTERVAL = 5000;
let isFetching = {
  quickMatch: false,
  customMatch: false,
};
let ongoingFetchPromises = {
  quickMatch: null,
  customMatch: null,
};

// Fonction pour sauvegarder l'état du jeu
export function saveGameState(questions, currentIndex, score, matchType) {
  const keyPrefix = matchType === "quickMatch" ? "quickMatch" : "customMatch";
  console.log("Sauvegarde de l'état du jeu :", { questions, currentIndex, score });
  if (!Array.isArray(questions) || questions.length === 0) {
    console.error("Tentative de sauvegarde avec un tableau de questions vide.");
    return; // Empêche la sauvegarde
  }
  localStorage.setItem(`${keyPrefix}_savedQuestions`, JSON.stringify(questions));
  localStorage.setItem(`${keyPrefix}_currentQuestionIndex`, currentIndex);
  localStorage.setItem(`${keyPrefix}_currentScore`, score);
}

// Fonction pour charger l'état du jeu
export function loadGameState(matchType) {
  const keyPrefix = matchType === "quickMatch" ? "quickMatch" : "customMatch";
  const savedQuestions = JSON.parse(localStorage.getItem(`${keyPrefix}_savedQuestions`));
  const currentQuestionIndex = parseInt(localStorage.getItem(`${keyPrefix}_currentQuestionIndex`), 10);
  const currentScore = parseInt(localStorage.getItem(`${keyPrefix}_currentScore`), 10);
  console.log("Chargement de l'état du jeu :", { savedQuestions, currentQuestionIndex, currentScore });

  return {
    savedQuestions: Array.isArray(savedQuestions) ? savedQuestions : [],
    currentQuestionIndex: isNaN(currentQuestionIndex) ? 0 : currentQuestionIndex,
    currentScore: isNaN(currentScore) ? 0 : currentScore,
  };
}

// Fonction pour effacer l'état du jeu
export function clearGameState(matchType) {
  const keyPrefix = matchType === "quickMatch" ? "quickMatch" : "customMatch";
  localStorage.removeItem(`${keyPrefix}_savedQuestions`);
  localStorage.removeItem(`${keyPrefix}_currentQuestionIndex`);
  localStorage.removeItem(`${keyPrefix}_currentScore`);
}

// Fonction pour obtenir un token de session
export async function getSessionToken() {
  if (!sessionToken) {
    const response = await fetch("https://opentdb.com/api_token.php?command=request");
    const data = await response.json();
    if (data.response_code === 0) {
      sessionToken = data.token;
    } else {
      throw new Error("Échec de la récupération du token de session.");
    }
  }
  return sessionToken;
}

// Fonction pour rafraîchir le token de session
async function refreshSessionToken() {
  sessionToken = null;
  await getSessionToken();
}

// Fonction pour récupérer toutes les questions
async function fetchAllQuestions(amount, category, difficulty, type, matchType) {
  if (!sessionToken) await getSessionToken();

  // Vérifie si une autre requête est en cours
  if (isFetching[matchType]) {
    console.warn(`Une requête est déjà en cours pour ${matchType}`);
    // Retourner la promesse en cours
    return ongoingFetchPromises[matchType];
  }

  // Active le verrou de requête
  isFetching[matchType] = true;

  // Crée une nouvelle promesse pour la requête en cours
  ongoingFetchPromises[matchType] = (async () => {
    let url = `${baseURL}?amount=${amount}&token=${sessionToken}`;
    if (category && category !== 'any') url += `&category=${category}`;
    if (difficulty && difficulty !== 'any') url += `&difficulty=${difficulty}`;
    if (type && type !== 'any') url += `&type=${type}`;

    // Ajoutez des logs pour le débogage
    console.log("URL de la requête :", url);
    console.log("Paramètres de la requête :", { amount, category, difficulty, type, matchType });

    try {
      const response = await fetch(url);
      const data = await response.json();
      lastFetchTime = Date.now();

      console.log("Réponse de l'API :", data);

      if (data.response_code === 0) {
        cachedQuestions[matchType] = data.results;
        console.log(`Questions récupérées pour ${matchType} :`, cachedQuestions[matchType]);
        saveGameState(cachedQuestions[matchType], 0, 0, matchType);
        return { questions: cachedQuestions[matchType], currentQuestionIndex: 0 };
      } else if (data.response_code === 1) {
        throw new Error("Aucun résultat trouvé pour les paramètres donnés.");
      } else if (data.response_code === 2) {
        throw new Error("Paramètres de requête invalides.");
      } else if (data.response_code === 3 || data.response_code === 4) {
        await refreshSessionToken();
        return fetchAllQuestions(amount, category, difficulty, type, matchType);
      } else {
        throw new Error("Erreur inconnue lors de la récupération des questions.");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des questions:", error);
      throw error;
    } finally {
      // Désactive le verrou de requête
      isFetching[matchType] = false;
      ongoingFetchPromises[matchType] = null;
    }
  })();

  // Retourner la promesse en cours
  return ongoingFetchPromises[matchType];
}

// Fonction pour récupérer les questions en mode Custom Match
export async function fetchQuestionsCMatch(amount, category, difficulty, type) {
  const savedGameState = loadGameState("customMatch");

  if (Array.isArray(savedGameState.savedQuestions) && savedGameState.savedQuestions.length > 0) {
    return {
      questions: savedGameState.savedQuestions,
      currentQuestionIndex: savedGameState.currentQuestionIndex,
    };
  }

  // Si aucune question sauvegardée, faire un fetch
  try {
    const result = await fetchAllQuestions(amount, category, difficulty, type, "customMatch");
    saveGameState(result.questions, 0, 0, "customMatch");
    return result;
  } catch (error) {
    console.error("Erreur de chargement des questions en mode Custom Match:", error);
    return { questions: [], currentQuestionIndex: 0 };
  }
}

// Fonction pour récupérer les questions en mode Quick Match
export async function fetchQuestionsQMatch(amount = 15, difficulty = "medium") {
  const savedGameState = loadGameState("quickMatch");

  if (Array.isArray(savedGameState.savedQuestions) && savedGameState.savedQuestions.length > 0) {
    return {
      questions: savedGameState.savedQuestions,
      currentQuestionIndex: savedGameState.currentQuestionIndex,
    };
  }

  try {
    const result = await fetchAllQuestions(amount, null, difficulty, null, "quickMatch");
    saveGameState(result.questions, 0, 0, "quickMatch");
    return result;
  } catch (error) {
    console.error("Erreur de chargement des questions en mode Quick Match:", error);
    return { questions: [], currentQuestionIndex: 0 };
  }
}
