import React, { useContext } from 'react';
import SearchBar from './SearchBar';
import iconSearch from '../images/searchIcon.svg';
import AppContext from '../context/Context';

function Header() {
  const { radioview, handleRadioview } = useContext(AppContext);
  return (
    <div>
      <div
        onClick={ handleRadioview }
        onKeyPress={ handleRadioview }
        role="button"
        tabIndex={ 0 }
      >
        <img
          src={ iconSearch }
          alt="Profile Icon"
          data-testid="search-top-btn"

        />
      </div>
      {radioview && <SearchBar />}

      Header
    </div>
  );
}

export default Header;
