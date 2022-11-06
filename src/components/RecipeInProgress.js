import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress(props) {
  const { image, title, category, instructions, ingredients, id, object } = props;
  const [elementsChecked, setElementsChecked] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const history = useHistory();

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
    let objById;
    if (data === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(dataToSave));
    } else {
      objById = data?.find((element) => element.id === id);
      if (!objById) {
        localStorage.setItem('inProgressRecipes', JSON.stringify(dataToSave));
      } else {
        objById.ingredient.push(ingredient);
        localStorage.setItem('inProgressRecipes', JSON.stringify(data));
      }
    }
    if (objById?.ingredient.length >= ingredients.length) {
      setBtnDisabled(!btnDisabled);
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
      id: id || 0,
      type: reciepeType,
      nationality: object.strArea || '',
      category,
      alcoholicOrNot: object.strAlcoholic || '',
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
      }
      setFavorite(false);
    }
  };

  const handleFinished = (e) => {
    e.preventDefault();
    const NEGATIVE = -1;
    const location = window.location.pathname;
    let reciepeType = location.split('/');
    reciepeType = reciepeType[1].slice(0, NEGATIVE);
    const dateNow = new Date();
    const path = '/done-recipes';
    const dataToSave = [{
      id,
      nationality: object.strArea || '',
      name: title,
      category,
      image,
      tags: object?.strTags?.split(',') || [],
      alcoholicOrNot: object?.strAlcoholic || '',
      type: reciepeType,
      doneDate: dateNow.toISOString(),
    }];
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify(dataToSave));
      history.push(path);
    } else {
      const objById = doneRecipes.find((element) => element.id === id);
      if (!objById) {
        localStorage.setItem('doneRecipes', JSON.stringify(dataToSave));
        history.push(path);
      }
      history.push(path);
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
        const getFavorites = await getElementsFavorites
          .find((element) => element.id === id);
        if (getFavorites) {
          setFavorite(true);
        }
      }
    };
    mountElements();
  }, []);

  return (
    <div>
      <img
        src={ image }
        alt={ title }
        data-testid="recipe-photo"
        style={ { width: '100%' } }
      />
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
        // src={ favorite ? blackHeartIcon : whiteHeartIcon }
        onClick={ (e) => handleFavorite(e) }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite Icon"
        />
        Favoritar
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ btnDisabled }
        onClick={ (e) => handleFinished(e) }
      >
        Finalizar
      </button>
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
                  checked={ elementsChecked.includes(ingredient) }
                />
              )
              : (
                <input
                  type="checkbox"
                  id={ ingredient }
                  name={ ingredient }
                  value={ ingredient }
                  onClick={ (e) => handleClickCheckBox(e, ingredient) }
                />)}
            {ingredient}
          </label>
        </div>
      ))}
    </div>
  );
}

RecipeInProgress.propTypes = {
  category: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  ingredients: PropTypes.shape({
    length: PropTypes.number.isRequired,
    map: PropTypes.func.isRequired,
  }).isRequired,
  instructions: PropTypes.arrayOf.isRequired,
  object: PropTypes.shape({
    strAlcoholic: PropTypes.string.isRequired,
    strArea: PropTypes.string.isRequired,
    strTags: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipeInProgress;
