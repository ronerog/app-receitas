import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import {
  requestCocktailByIngredient, requestCocktailByLetter, requestCocktailByName,
  requestMealByIngredient, requestMealByLetter,
  requestMealByName,
} from '../services/requestApi';
import AppContext from './Context';

function AppProvider({ children }) {
  const [dataFiltered, setDataFiltered] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState('');
  const [radioview, setRadioview] = useState(false);
  const [drinksApi, setDrinks] = useState([]);
  const [mealsApi, setMeals] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

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
      setDataFiltered(recipies.meals);
    } else {
      const recipies = await requestCocktailByIngredient(inputSearch);
      setDataFiltered(recipies.drinks);
    }
  }, [inputSearch]);

  const handleNameSearch = useCallback(async () => {
    const location = window.location.pathname;
    if (location === '/meals') {
      const recipies = await requestMealByName(inputSearch);
      setDataFiltered(recipies.meals);
      if (recipies.meals.length === 1) {
        window.location.assign(`/meals/${recipies.meals[0].idMeal}`);
      }
    } else {
      const recipies = await requestCocktailByName(inputSearch);
      setDataFiltered(recipies.drinks);
      if (recipies.drinks.length === 1) {
        window.location.assign(`/drinks/${recipies.drinks[0].idDrink}`);
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
        setDataFiltered(recipies);
      } else {
        const recipies = await requestCocktailByLetter(inputSearch);
        setDataFiltered(recipies.drinks);
      }
    }

    // else if (inputSearch.length > 1) {
    //   global.alert('Your search must have only 1 (one) character');
    // } else if (location === '/meals') {
    //   const recipies = await requestMealByLetter(inputSearch);
    //   setDataFiltered(recipies);
    // } else {
    //   const recipies = await requestCocktailByLetter(inputSearch);
    //   setDataFiltered(recipies.drinks);
    // }
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
    console.log(meals);
    setMeals(meals);
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
    dataFiltered,
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
  }), [email,
    password,
    inputSearch,
    radio,
    radioview,
    handleRadioview,
    dataFiltered,
    handleClickSearch,
    drinksApi,
    mealsApi,
    drinksCategories,
    mealsCategories,
    requestDrinks,
    requestMeals,
    requestMealsCategories,
    requestDrinksCategories]);

  return (
    <AppContext.Provider value={ contexto }>{children}</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
