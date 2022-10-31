import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function RecipeInProgress(props) {
  const { image, title, category, instructions, ingredients, id } = props;
  const [elementsChecked, setElementsChecked] = useState([]);

  const handleClick = (event, ingredient) => {
    const current = event.target;
    const nextSibling = current.parentNode;
    nextSibling.style = 'text-decoration: line-through solid rgb(0, 0, 0)';

    const dataToSave = [{
      id,
      ingredient: [ingredient],
    }];
    const data = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (data === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(dataToSave));
    } else {
      const objById = data?.find((element) => element.id === id);
      if (!objById) {
        localStorage.setItem('inProgressRecipes', JSON.stringify(dataToSave));
      } else {
        objById.ingredient.push(ingredient);
        localStorage.setItem('inProgressRecipes', JSON.stringify(data));
      }
    }
  };

  useEffect(() => {
    const getElementsSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mountElements = async () => {
      if (getElementsSaved) {
        const getIngredients = getElementsSaved
          .find((element) => element.id === id);
        console.log(id);
        setElementsChecked(getIngredients.ingredient);
      }
    };
    mountElements();
  }, []);

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
        <div
          key={ ingredient }
        >
          <label
            htmlFor={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            style={ { textDecoration: elementsChecked.includes(ingredient)
              ? 'line-through solid rgb(0, 0, 0)'
              : '',
            } }
          >
            <input
              type="checkbox"
              id={ ingredient }
              name={ ingredient }
              value={ ingredient }
              onClick={ (e) => handleClick(e, ingredient) }
              checked={ elementsChecked.includes(ingredient) }
            />
            {ingredient}
          </label>
        </div>
      ))}
    </div>
  );
}

RecipeInProgress.propTypes = {
  id: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf.isRequired,
};

export default RecipeInProgress;
