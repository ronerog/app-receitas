export const requestMealByIngredient = async (ingredient) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};

export const requestMealByName = async (name) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};

export const requestMealByLetter = async (letter) => {
  const endPoint = `www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};

export const requestCocktailByIngredient = async (ingredient) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};

export const requestCocktailByName = async (name) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};

export const requestCocktailByLetter = async (letter) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${letter}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};
