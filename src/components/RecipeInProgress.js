import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress(props) {
  const { image, title, category, instructions, ingredients, id, object } = props;
  const [elementsChecked, setElementsChecked] = useState([]);
  const [favorite, setFavorite] = useState(false);

  const handleClickCheckBox = (event, ingredient) => {
    const current = event.target;
    const nextSibling = current.parentNode;
    nextSibling.style = 'text-decoration: line-through solid rgb(0, 0, 0)';

    const dataToSave = [{
      id,
      ingredient: [ingredient],
      favorite: false,
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

  const handleShare = (event) => {
    event.preventDefault();
    const { href } = window.location;
    event.target.innerText = 'Link copied!';
    let getPath = href.split('/');
    getPath.pop();
    getPath = getPath.join('/');
    copy(getPath);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    const NEGATIVE = -1;
    const location = window.location.pathname;
    let reciepeType = location.split('/');
    reciepeType = reciepeType[1].slice(0, NEGATIVE);
    const dataToSave = [{
      id,
      type: reciepeType,
      nationality: object.strArea ? object.strArea : '',
      category,
      alcoholicOrNot: object.strAlcoholic ? object.strAlcoholic : '',
      name: title,
      image,
    }];
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (data === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(dataToSave));
      setFavorite(true);
    } else {
      const objById = data.find((element) => element.id === id);
      if (!objById) {
        localStorage.setItem('favoriteRecipes', JSON.stringify(dataToSave));
        setFavorite(true);
      } else {
        const objFiltered = data.filter((element) => element.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(objFiltered));
        setFavorite(false);
      }
    }
  };

  useEffect(() => {
    const getElementsSaved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getElementsFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const mountElements = async () => {
      if (getElementsSaved) {
        try {
          const getIngredients = await getElementsSaved
            .find((element) => element.id === id);
          setElementsChecked(getIngredients.ingredient);
        } catch (e) {
          console.log(e.message);
        }
      }
      if (getElementsFavorites) {
        try {
          const getFavorites = await getElementsFavorites
            .find((element) => element.id === id);
          if (getFavorites) {
            console.log(getFavorites);
            setFavorite(true);
          }
        } catch (e) {
          console.log(e.message);
        }
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
      <button
        type="button"
        onClick={ (e) => handleShare(e) }
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ favorite ? blackHeartIcon : whiteHeartIcon }
        onClick={ (e) => handleFavorite(e) }
      >
        Favoritar
      </button>
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
            {elementsChecked.includes(ingredient)
              ? (
                <input
                  type="checkbox"
                  id={ ingredient }
                  name={ ingredient }
                  value={ ingredient }
                  onClick={ (e) => handleClickCheckBox(e, ingredient) }
                  checked={ elementsChecked.includes(ingredient) ? true : '' }
                />
              )
              : (
                <input
                  type="checkbox"
                  id={ ingredient }
                  name={ ingredient }
                  value={ ingredient }
                  onClick={ (e) => handleClick(e, ingredient) }
                />)}
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
  object: PropTypes.shape({
    strArea: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeInProgress;
