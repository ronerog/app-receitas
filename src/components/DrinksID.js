import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareButton from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinksID() {
  const max = 6;
  const [drinksID, setDrinksID] = useState([]);
  const [allMeals, setMeals] = useState([]);
  const [copied, setCopied] = useState(false);
  // const [newLocalStorage, setLocalStorage] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);
  const requestCocktailById = async (id) => {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    setDrinksID(result.drinks);
  };
  async function requestMeals() {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const { meals } = await request.json();
    setMeals(meals);
    console.log(meals);
    return meals;
  }

  function handleShare() {
    copy(`http://localhost:3000${pathname}`);
    setCopied(true);
  }

  const handleLocalStorage = (obj) => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorite, obj]));
  };

  useEffect(() => {
    const split = pathname.split('/');
    const string = split[2].replace(/:/g, '');
    requestCocktailById(string);
    requestMeals();
  }, [pathname]);
  return (
    <span>
      {drinksID.map((element, index) => {
        const arrayMeasure = Object.entries(element)
          .filter(([el]) => el.includes('strMeasure'));
        const arrayIngredient = Object.entries(element)
          .filter(([el]) => el.includes('strIngredient'));
        const reducerIngredient = arrayIngredient.reduce((actual, array) => {
          if (array[1] !== ' ') {
            return [...actual, array[1]];
          }
          return actual;
        }, []);
        const reducerMeasure = arrayMeasure.reduce((acc, el) => {
          if (el[1] !== ' ') {
            console.log(el);
            return [...acc, el[1]];
          }
          return acc;
        }, []);
        return (
          <span
            key={ index }
          >
            <img
              src={ element.strDrinkThumb }
              alt="Mealimage"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{element.strDrink}</h2>
            <h4 data-testid="recipe-category">{element.strCategory}</h4>
            {reducerIngredient.map((ingredient, i) => (
              <h4
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {ingredient}
              </h4>))}
            {reducerMeasure.map((measure, idx) => (
              <h4
                key={ idx }
                data-testid={ `${idx}-ingredient-name-and-measure` }
              >
                {measure}
              </h4>))}
            <h4 data-testid="instructions">
              {element.strInstructions}
              <h4 data-testid="recipe-category">{element.strAlcoholic}</h4>
              {' '}
            </h4>
            <video data-testid="video">
              <track kind="captions" src={ element.strVideo } type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <span className="carousel">
              {allMeals.length > 0
       && allMeals
         .filter((e, i) => i < max)
         .map((reco, idx) => (
           <span
             key={ idx }
             data-testid={ `${idx}-recommendation-card` }
           >
             <h1 data-testid={ `${idx}-recommendation-title` }>
               {reco.strMeal}
             </h1>
             <img className="MealsImg" src={ reco.strMealThumb } alt="imgMeal" />
           </span>))}
            </span>

            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe"
              onClick={ () => {
                const URL = `${pathname}/in-progress`;
                history.push(URL);
              } }
            >
              Continue Recipe
            </button>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleShare }
            >
              {
                copied
                  && <p>Link copied!</p>
              }
              <img src={ shareButton } alt="share" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ () => {
                const obj = {
                  alcoholicOrNot: element.strAlcoholic,
                  category: element.strCategory,
                  id: element.idDrink,
                  image: element.strDrinkThumb,
                  name: element.strDrink,
                  nationality: '',
                  type: 'drink' };
                handleLocalStorage(obj);
              } }
            >
              <img src={ whiteHeartIcon } alt="Favorite Icon" />
            </button>
          </span>
        );
      })}
    </span>
  );
}
export default DrinksID;
