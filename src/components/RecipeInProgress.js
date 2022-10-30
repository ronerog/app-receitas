import PropTypes from 'prop-types';
import React from 'react';

function RecipeInProgress(props) {
  const { image, title, category, instructions } = props;

  return (
    <div>
      <img src={ image } alt={ title } data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{title}</h1>
      <span data-testid="recipe-category">{category}</span>
      <span data-testid="instructions">{instructions}</span>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipeInProgress;
