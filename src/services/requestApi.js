export const requestMealByIngredient = async (ingredient) => {
  try {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const requestMealByName = async (name) => {
  try {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const requestMealByLetter = async (letter) => {
  try {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const requestMealById = async (id) => {
  try {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const requestCocktailByIngredient = async (ingredient) => {
  try {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const requestCocktailByName = async (name) => {
  try {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const requestCocktailByLetter = async (letter) => {
  try {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const requestMealById = async (id) => {
  try {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const requestCocktailById = async (id) => {
  try {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

export async function requestDrinks() {
  const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await request.json();
  return drinks;
}

export async function requestMeals() {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await request.json();
  return meals;
}
