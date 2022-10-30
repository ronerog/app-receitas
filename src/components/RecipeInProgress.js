import PropTypes from 'prop-types';
import React from 'react';

function RecipeInProgress(props) {
  const { image, title, category, instructions, ingredients } = props;

  return (
    <div>
      <img src={ image } alt={ title } data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{title}</h1>
      <span data-testid="recipe-category">{category}</span>
      <span data-testid="instructions">{instructions}</span>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>
      {ingredients?.map((ingredient, index) => (
        <label
          key={ ingredient }
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          {ingredient}
          <input
            type="checkbox"
            id={ ingredient }
            name={ ingredient }
            value={ ingredient }
          />
        </label>
      ))}
    </div>
  );
}

RecipeInProgress.propTypes = {
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf.isRequired,
};

export default RecipeInProgress;
