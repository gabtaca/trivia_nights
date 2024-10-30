const baseURL = "https://opentdb.com/api.php";

export async function getSessionToken() {
  const response = await fetch("https://opentdb.com/api_token.php?command=request");
  const data = await response.json();
  if (data.response_code === 0) {
    return data.token;
  } else {
    throw new Error("Failed to retrieve session token.");
  }
}

export async function fetchQuestions(amount = 10, category = "any", difficulty = "any", type = "any", encode = "default", token = null) {
  let url = `${baseURL}?amount=${amount}`;
  
  if (category !== "any") url += `&category=${category}`;
  if (difficulty !== "any") url += `&difficulty=${difficulty}`;
  if (type !== "any") url += `&type=${type}`;
  if (encode !== "default") url += `&encode=${encode}`;
  if (token) url += `&token=${token}`;

  const response = await fetch(url);
  const data = await response.json();

  switch (data.response_code) {
    case 0:
      return data.results;
    case 1:
      throw new Error("No results available for the given query.");
    case 2:
      throw new Error("Invalid parameters provided.");
    case 3:
      throw new Error("Session token not found. Please request a new token.");
    case 4:
      throw new Error("All questions exhausted. Please reset the token.");
    case 5:
      throw new Error("Too many requests. Please wait before retrying.");
    default:
      throw new Error("An unknown error occurred.");
  }
}