import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';
import { requestCocktailById } from '../services/requestApi';

function DrinksProgress() {
  const [drinkData, setDrinkData] = useState({});
  const { id_da_receita: id } = useParams();

  useEffect(() => {
    const requestApi = async () => {
      const response = await requestCocktailById(id);
      setDrinkData(response.drinks[0]);
    };
    requestApi();
  }, [id]);
  return (
    <div>
      <RecipeInProgress
        key={ drinkData.strDrink }
        image={ drinkData.strImageSource }
        title={ drinkData.strDrink }
        category={ drinkData.strCategory }
        instructions={ drinkData.strInstructions }
      />
    </div>
  );
}

export default DrinksProgress;
