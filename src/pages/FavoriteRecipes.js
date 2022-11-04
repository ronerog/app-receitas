import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const getDataLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(data);
    console.log(data);
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
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Compartilhar
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              Favoritar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
