const baseURL = "https://opentdb.com/api.php";
let sessionToken = null; // Cache du token pour éviter les multiples appels
let cachedQuestions = []; // Cache pour stocker temporairement les questions
let lastFetchTime = 0; // Temps de la dernière requête pour contrôler le délai
const FETCH_INTERVAL = 5000; // Intervalle minimum entre les appels en ms

// Récupère un nouveau token si nécessaire
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

// Rafraîchit le token de session en cas d'expiration
async function refreshSessionToken() {
  const response = await fetch("https://opentdb.com/api_token.php?command=request");
  const data = await response.json();
  if (data.response_code === 0) {
    sessionToken = data.token;
  } else {
    throw new Error("Échec de récupération du token de session.");
  }
}

// Fonction principale de fetch avec contrôle du cache et du délai
async function fetchQuestions(url, retryCount = 0) {
  const currentTime = Date.now();

  // Vérifie si le cache contient encore des questions
  if (cachedQuestions.length > 0) {
    return cachedQuestions; // Renvoie toutes les questions disponibles dans le cache
  }

  // Vérifie si l'intervalle de temps minimum est respecté
  if (currentTime - lastFetchTime < FETCH_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, FETCH_INTERVAL - (currentTime - lastFetchTime)));
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    lastFetchTime = Date.now(); // Met à jour le dernier temps de fetch

    switch (data.response_code) {
      case 0: // Succès
        cachedQuestions = data.results; // Met en cache les questions reçues
        return cachedQuestions; // Retourne toutes les questions

      case 3: // Token manquant ou expiré
      case 4: // Toutes les questions ont été épuisées
        await refreshSessionToken();
        const updatedUrl = `${url.split("&token=")[0]}&token=${sessionToken}`;
        return fetchQuestions(updatedUrl); // Re-fetch avec le nouveau token

      case 5: // Trop de requêtes
        if (retryCount < 3) {
          await new Promise(resolve => setTimeout(resolve, FETCH_INTERVAL));
          return fetchQuestions(url, retryCount + 1);
        } else {
          throw new Error("Trop de requêtes. Veuillez patienter avant de réessayer.");
        }

      default:
        throw new Error("Erreur inconnue lors de la récupération des questions.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des questions:", error);
    throw error;
  }
}

// Fonction pour récupérer les questions en mode Quick Match
export async function fetchQuestionsQMatch(amount = 15, difficulty = "medium") {
  if (!sessionToken) await getSessionToken();
  const url = `${baseURL}?amount=${amount}&difficulty=${difficulty}&token=${sessionToken}`;
  return fetchQuestions(url);
}

// Fonction pour récupérer les questions en mode Custom Match
export async function fetchQuestionsCMatch(amount, category, difficulty, type) {
  if (!sessionToken) await getSessionToken();
  let url = `${baseURL}?amount=${amount}`;
  if (category && category !== "any") url += `&category=${category}`;
  if (difficulty && difficulty !== "any") url += `&difficulty=${difficulty}`;
  if (type && type !== "any") url += `&type=${type}`;
  url += `&token=${sessionToken}`;
  return fetchQuestions(url);
}
