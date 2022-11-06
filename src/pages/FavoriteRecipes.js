import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareButton from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const history = useHistory();

  const getDataLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(data);
  };

  const handleClick = (id) => {
    const favoritesFiltered = favoriteRecipes.filter((element) => element.id !== id);
    setFavoriteRecipes(favoritesFiltered);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesFiltered));
  };

  const handleShare = (event, id, path) => {
    event.preventDefault();
    try {
      const { href } = window.location;
      event.target.innerText = 'Link copied!';
      let getPath = href.split('/');
      getPath.pop();
      getPath = getPath.join('/');
      if (path === 'drink') {
        getPath = `${getPath}/drinks/${id}`;
      } else {
        getPath = `${getPath}/meals/${id}`;
      }
      copy(getPath);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleFilter = (event) => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { target } = event;
    const NEGATIVE = -1;
    const path = target.innerText?.toLowerCase();
    const newPath = path?.slice(0, NEGATIVE);
    const favoritesFiltered = data
      .filter((element) => element.type === newPath);
    setFavoriteRecipes(favoritesFiltered);
  };

  const handleRedirect = (id, path) => {
    history.push(`/${path}s/${id}`);
  };

  useEffect(() => {
    getDataLocalStorage();
  }, []);

  return (
    <div>
      <Header
        title="Favorite Recipes"
        IconSearch={ false }
      />
      Receitas Favoritas
      <br />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getDataLocalStorage }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleFilter }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilter }
      >
        Drinks
      </button>
      <div>
        {favoriteRecipes?.map((recipe, index) => (
          <div key={ recipe.id }>
            <button
              type="button"
              onClick={ () => handleRedirect(recipe.id, recipe.type) }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                style={ { width: '100%' } }
              />
            </button>
            {recipe.alcoholicOrNot.includes('Alcoholic')
              || recipe.alcoholicOrNot.includes('alcoholic')
              ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}
                </p>)
              : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.nationality}
                  {' '}
                  -
                  {' '}
                  {recipe.category}
                </p>)}
            <button
              type="button"
              onClick={ () => handleRedirect(recipe.id, recipe.type) }
            >
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareButton }
              onClick={ (event) => handleShare(event, recipe.id, recipe.type) }
            >
              <img
                data-testid="favorite-btn"
                src={ shareButton }
                alt="Share Icon"
              />
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => handleClick(recipe.id) }
              src={ blackHeartIcon }
            >
              <img
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                alt="Favorite Icon"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
