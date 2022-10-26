import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, IconSearch = true,
  IconProfile = true }) {
  const [inputSearc, setSearch] = useState(false);
  return (
    <header>
      {((IconProfile) && (
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt={ profileIcon }
            data-testid="profile-top-btn"
          />
        </Link>
      ))}
      {((IconSearch) && (
        <button
          type="button"
          onClick={ () => setSearch((prevState) => !prevState) }
        >
          <img src={ searchIcon } alt={ searchIcon } data-testid="search-top-btn" />
        </button>
      ))}
      {
        (inputSearc)
        && (<input type="text" placeholder="Search" data-testid="search-input" />)
      }
      {((title) && (
        <h1 data-testid="page-title">{title}</h1>
      ))}
    </header>
  );
}

Header.propTypes = {
  IconProfile: PropTypes.bool,
  IconSearch: PropTypes.bool,
  title: PropTypes.string,
}.isRequired;
