import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeInProgress from '../components/RecipeInProgress';
import { requestCocktailById } from '../services/requestApi';

function DrinksProgress() {
  const [drinkData, setDrinkData] = useState({});
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
      const response = await requestCocktailById(id);
      setDrinkData(response.drinks[0]);
      getIngredients(response.drinks[0]);
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
        ingredients={ ingredientsArr }
      />
    </div>
  );
}

export default DrinksProgress;
