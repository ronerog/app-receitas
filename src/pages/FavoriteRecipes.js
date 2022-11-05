import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareButton from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const getDataLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(data);
    console.log(data);
  };

  const handleClick = (id) => {
    const favoritesFiltered = favoriteRecipes.filter((element) => element.id !== id);
    setFavoriteRecipes(favoritesFiltered);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesFiltered));
    console.log(favoritesFiltered);
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
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      <div>
        {favoriteRecipes?.map((recipe, index) => (
          <div key={ recipe.id }>
            {recipe.alcoholicOrNot.includes('Alcoholic')
              || recipe.alcoholicOrNot.includes('alcoholic')
              ? <Badge bg="danger">{recipe.alcoholicOrNot}</Badge>
              : <Badge bg="danger">{recipe.nationality}</Badge> }

            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '100%' } }
            />
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
            {/* <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p> */}

            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareButton }
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
