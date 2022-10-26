import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';
import {
  requestMealByIngredient,
  requestMealByName,
  requestMealByLetter,
  requestCocktailByIngredient,
  requestCocktailByName,
  requestCocktailByLetter,
} from '../services/requestApi';

function AppProvider({ children }) {
  const [dataFiltered, setDataFiltered] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [radio, setRadio] = useState('');
  const [radioview, setRadioview] = useState(false);

  const handleRadio = ({ target }) => {
    setRadio(target.value);
  };

  const handleRadioview = useCallback(() => {
    setRadioview(!radioview);
  }, [radioview]);

  const handleInputSearch = ({ target }) => {
    setInputSearch(target.value);
  };

  const handleClickSearch = useCallback(async (e) => {
    e.preventDefault();
    const location = window.location.pathname;
    if (radio === 'ingredient') {
      if (location === '/meals') {
        const recipies = await requestMealByIngredient(inputSearch);
        setDataFiltered(recipies.meals);
      } else {
        const recipies = await requestCocktailByIngredient(inputSearch);
        setDataFiltered(recipies.drinks);
        console.log(recipies.drinks);
      }
    } else if (radio === 'name') {
      if (location === '/meals') {
        const recipies = await requestMealByName(inputSearch);
        setDataFiltered(recipies.meals);
      } else {
        const recipies = await requestCocktailByName(inputSearch);
        setDataFiltered(recipies.drinks);
      }
    } else {
      if (inputSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      if (location === '/meals') {
        const recipies = await requestMealByLetter(inputSearch);
        setDataFiltered(recipies);
      } else {
        const recipies = await requestCocktailByLetter(inputSearch);
        setDataFiltered(recipies.drinks);
      }
    }
  }, [radio, inputSearch]);

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
  }), [email,
    password,
    inputSearch,
    radio,
    radioview,
    handleRadioview,
    dataFiltered,
    handleClickSearch]);

  return (
    <AppContext.Provider value={ contexto }>{children}</AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default AppProvider;
