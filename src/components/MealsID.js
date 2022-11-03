import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function MealsID() {
  const max = 6;
  // const { recomendation } = useContext(Context);
  const [mealID, setMealID] = useState([]);
  const [allDrinks, setDrinks] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);
  const requestMealById = async (id) => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    setMealID(result.meals);
  };
  //
  async function requestDrinks() {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await request.json();
    setDrinks(drinks);
    return drinks;
  }
  console.log(mealID);
  useEffect(() => {
    const split = pathname.split('/');
    const string = split[2].replace(/:/g, '');
    requestMealById(string);
    requestDrinks();
  }, [pathname]);
  return (
    <div>
      {mealID.map((element, index) => {
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
              src={ element.strMealThumb }
              alt="Mealimage"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{element.strMeal}</h2>
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
              {' '}
            </h4>
            <video data-testid="video">
              <track kind="captions" src={ element.strVideo } type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <span className="carousel">
              {allDrinks.length > 0
       && allDrinks
         .filter((e, i) => i < max)
         .map((reco, idx) => (
           <span
             key={ idx }
             data-testid={ `${idx}-recommendation-card` }
           >
             <h1 data-testid={ `${idx}-recommendation-title` }>
               {reco.strDrink}
             </h1>
             <img className="MealsImg" src={ reco.strDrinkThumb } alt="imgMeal" />
           </span>))}
            </span>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe"
              onClick={ () => {
                const URL = `${pathname}/in-progress`;
                console.log(URL);
                history.push(URL);
              } }
            >
              Continue Recipe
            </button>
            <button
              type="button"
              data-testid="share-btn"
            >
              Share
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favorite
            </button>
          </span>
        );
      })}
    </div>
  );
}
export default MealsID;
