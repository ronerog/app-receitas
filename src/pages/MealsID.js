import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function MealsID() {
  const { mealsApi, requestMeals } = useContext(Context);
  const [mealID, setMealID] = useState([]);
  const max = 6;

  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);

  const requestMealById = async (id) => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    setMealID(result.meals);
    console.log(mealID);
  };
  //
  async function requestDrinks() {
    const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const { drinks } = await request.json();
    return drinks;
  }

  console.log(mealID);

  useEffect(() => {
    const split = pathname.split('/');
    const string = split[2].replace(/:/g, '');
    requestMealById(string);
    requestDrinks();
    requestMeals();
  }, []);

  return (
    <div className="container">
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
            // console.log(el);
            return [...acc, el[1]];
          }
          return acc;
        }, []);
        return (
          <span
            key={ index }
          >
            <button
              className="start-recipe"
              type="submit"
              data-testid="start-recipe-btn"
            >
              Start Recipe
            </button>
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
            <div className="carousel">
              {mealsApi.length > 0
         && mealsApi
           .filter((x, i) => i < max)
           .map((recomendation, idx) => (
             <div
               key={ idx }
               data-testid={ `${idx}-recommendation-card` }
             >

               <h1 data-testid={ `${idx}-recommendation-title` }>
                 test
               </h1>
             </div>
           ))}
            </div>
          </span>
        );
      })}
    </div>
  );
}

export default MealsID;
