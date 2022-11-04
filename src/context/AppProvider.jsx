import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import {
  requestCocktailByIngredient, requestCocktailByLetter, requestCocktailByName,
  requestMealByIngredient, requestMealByLetter,
  requestMealByName,
} from '../services/requestApi';
import AppContext from './Context';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState('');
  const [radioview, setRadioview] = useState(false);
  const [drinksApi, setDrinks] = useState([]);
  const [mealsApi, setMeals] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [toggle, setToggle] = useState(false);
  const alertMsg = 'Sorry, we haven\'t found any recipes for these filters.';

  const handleRadio = ({ target }) => {
    setRadio(target.value);
  };

  const handleRadioview = useCallback(() => {
    setRadioview(!radioview);
  }, [radioview]);

  const handleInputSearch = ({ target }) => {
    setInputSearch(target.value);
  };

  const handleIngredientsSearch = useCallback(async () => {
    const location = window.location.pathname;
    if (location === '/meals') {
      const recipies = await requestMealByIngredient(inputSearch);
      if (recipies.meals === null) {
        global.alert(alertMsg);
      } else {
        setMeals(recipies.meals);
      }
    } else {
      const recipies = await requestCocktailByIngredient(inputSearch);
      if (recipies.drink === null) {
        global.alert(alertMsg);
      } else {
        setDrinks(recipies.drinks);
      }
    }
  }, [inputSearch]);

  const handleNameSearch = useCallback(async () => {
    const location = window.location.pathname;
    if (location === '/meals') {
      const recipies = await requestMealByName(inputSearch);
      if (recipies.meals === null) {
        global.alert(alertMsg);
      } else {
        setMeals(recipies.meals);
        if (recipies.meals.length === 1) {
          window.location.assign(`/meals/${recipies.meals[0].idMeal}`);
        }
      }
    } else {
      const recipies = await requestCocktailByName(inputSearch);
      if (recipies.drinks === null) {
        global.alert(alertMsg);
      } else if (recipies.drinks.length === 1) {
        window.location.assign(`/drinks/${recipies.drinks[0].idDrink}`);
      } else {
        setDrinks(recipies.drinks);
      }
    }
  }, [inputSearch]);

  const handleClickSearch = useCallback(async (e) => {
    e.preventDefault();
    const location = window.location.pathname;
    if (radio === 'ingredient') {
      handleIngredientsSearch();
    } else if (radio === 'name') {
      handleNameSearch();
    } else if (radio === 'letter') {
      if (inputSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else if (location === '/meals') {
        const recipies = await requestMealByLetter(inputSearch);
        setMeals(recipies.meals);
      } else {
        const recipies = await requestCocktailByLetter(inputSearch);
        setDrinks(recipies.drinks);
      }
    }
  }, [radio, inputSearch, handleIngredientsSearch, handleNameSearch]);

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  async function requestDrinks() {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await request.json();
    setDrinks(drinks);
    return drinksApi;
  }
  async function requestMeals() {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await request.json();
    setMeals(meals);
    console.log(meals);
    return mealsApi;
  }
  async function requestMealsCategories() {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { meals } = await request.json();
    setMealsCategories(meals);
    return mealsCategories;
  }
  async function requestDrinksCategories() {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const { drinks } = await request.json();
    setDrinksCategories(drinks);
    return drinksCategories;
  }
  async function requestMealsRecipesName(payload) {
    if (toggle === true) {
      setToggle(false);
      return requestMeals();
    }
    setToggle(true);
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${payload}`);
    const { meals } = await request.json();
    console.log(meals);
    setMeals(meals);
    return mealsApi;
  }

  async function requestDrinkRecipesName(payload) {
    if (toggle === true) {
      setToggle(false);
      return requestDrinks();
    }
    setToggle(true);
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${payload}`);
    const { drinks } = await request.json();
    console.log(drinks);
    setDrinks(drinks);
    return drinksApi;
  }

  function resetAll() {
    requestMeals();
    requestDrinks();
  }

  const contexto = useMemo(() => ({
    email,
    password,
    setPassword,
    setEmail,
    radio,
    handleRadio,
    inputSearch,
    handleInputSearch,
    radioview,
    handleRadioview,
    handleClickSearch,
    handleEmail,
    handlePassword,
    drinksApi,
    mealsApi,
    drinksCategories,
    mealsCategories,
    requestDrinks,
    requestMeals,
    requestMealsCategories,
    requestDrinksCategories,
    setRecomendation,
    requestMealsRecipesName,
    requestDrinkRecipesName,
    resetAll,
  }), [email,
    password,
    inputSearch,
    radio,
    radioview,
    handleRadioview,
    handleClickSearch,
    drinksApi,
    mealsApi,
    drinksCategories,
    mealsCategories,
    requestDrinks,
    requestMeals,
    requestMealsCategories,
    requestDrinksCategories,
    recomendation]);
    requestMealsRecipesName,
    requestDrinkRecipesName,
    resetAll,
  ]);

  return (
    <AppContext.Provider value={ contexto }>{children}</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
