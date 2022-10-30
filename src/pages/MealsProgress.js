import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';
import { requestMealById } from '../services/requestApi';

function MealsProgress() {
  const [mealData, setMealData] = useState({});
  const { id_da_receita: id } = useParams();

  useEffect(() => {
    const requestApi = async () => {
      const response = await requestMealById(id);
      setMealData(response.meals[0]);
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
      />
    </div>
  );
}

export default MealsProgress;
