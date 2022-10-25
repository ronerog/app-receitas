import React, { useContext } from 'react';
import AppContext from '../context/Context';

function SearchBar() {
  const { handleRadio } = useContext(AppContext);
  return (
    <div>
      <form>
        <input type="search" data-testid="search-input" />
        <br />
        <label htmlFor="ingredients">
          Ingredient
          <input
            type="radio"
            value="ingredient"
            name="radioFilter"
            data-testid="ingredient-search-radio"
            onChange={ handleRadio }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            value="name"
            name="radioFilter"
            data-testid="name-search-radio"
            onChange={ handleRadio }
          />
        </label>
        <label htmlFor="letter">
          First Letter
          <input
            type="radio"
            value="letter"
            name="radioFilter"
            data-testid="first-letter-search-radio"
            onChange={ handleRadio }
          />
        </label>
        <br />
        <button type="button" data-testid="exec-search-btn">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
