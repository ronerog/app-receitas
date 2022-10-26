import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      Receitas Favoritas
      <Header
        title="Favorite Recipes"
        IconSearch={ false }
      />
    </div>
  );
}

export default FavoriteRecipes;
