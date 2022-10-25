import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';
import {
  requestMealByIngredient,
  requestMealByName,
  requestMealByLetter,
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
    if (radio === 'ingredient') {
      const recipies = await requestMealByIngredient(inputSearch);
      setDataFiltered(recipies.meals);
      console.log(radio);
      console.log(recipies.meals);
    } else if (radio === 'name') {
      const recipies = await requestMealByName(inputSearch);
      setDataFiltered(recipies.meals);
      console.log(recipies.meals);
      console.log(radio);
    } else {
      if (inputSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const recipies = await requestMealByLetter(inputSearch);
      setDataFiltered(recipies);
      console.log(recipies);
      console.log(radio);
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
  children: PropTypes.shape.isRequired,
};

export default AppProvider;
