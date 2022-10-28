import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function MealsID() {
  const [mealID, setMealID] = useState([]);

  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);

  const requestMealById = async (id) => {
    const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    setMealID(result.meals);
  };

  console.log(mealID);

  useEffect(() => {
    const split = pathname.split('/');
    const string = split[2].replace(/:/g, '');
    requestMealById(string);
  }, []);

  return (
    <div>
      { mealID.map((element, index) => (
        <span
          key={ index }
        >
          <img
            src={ element.strMealThumb }
            alt="Mealimage"
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{element.strMeal}</h2>
          <h3 data-testid="recipe-category">{element.strCategory}</h3>
          <h3 data-testid={ `${index}-ingredient-name-and-measure` }>{}</h3>

        </span>
      )) }
    </div>
  );
}

export default MealsID;
