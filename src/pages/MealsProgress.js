import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';
import { requestMealById } from '../services/requestApi';

function MealsProgress() {
  const [mealData, setMealData] = useState({});
  const [ingredientsArr, setIngredientsArr] = useState([]);
  const { id_da_receita: id } = useParams();

  const getIngredients = (data) => {
    const arrayIngredients = Object.entries(data)
      .filter(([el]) => el.includes('strIngredient'));
    const ingredients = arrayIngredients.reduce((acc, curr) => {
      if (curr[1] !== '' && curr[1] !== null) {
        return [...acc, curr[1]];
      }
      return acc;
    }, []);
    setIngredientsArr(ingredients);
  };

  useEffect(() => {
    const requestApi = async () => {
      const response = await requestMealById(id);
      setMealData(response.meals[0]);
      getIngredients(response.meals[0]);
    };
    requestApi();
  }, [id]);

  return (
    <div>
      <RecipeInProgress
        key={ mealData.strMeal }
        image={ mealData.strMealThumb }
        title={ mealData.strMeal }
        category={ mealData.strCategory }
        instructions={ mealData.strInstructions }
        ingredients={ ingredientsArr }
      />

    </div>
  );
}

export default MealsProgress;
