import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function DrinksID() {
  const [drinksID, setDrinksID] = useState([]);

  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);

  const requestCocktailById = async (id) => {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    setDrinksID(result.drinks);
  };

  console.log(drinksID);

  useEffect(() => {
    const split = pathname.split('/');
    const string = split[2].replace(/:/g, '');
    requestCocktailById(string);
  }, []);

  return (
    <div>
      { drinksID.map((element, index) => {
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
            { reducerIngredient.map((ingredient, i) => (
              <h4
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {ingredient}

              </h4>))}
            { reducerMeasure.map((measure, idx) => (
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
          </span>
        );
      }) }
    </div>
  );
}

export default DrinksID;
