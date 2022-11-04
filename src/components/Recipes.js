import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function Recipes() {
  const twelve = 12;
  const five = 5;
  const history = useHistory();
  const { pathname } = history.location;
  const { drinksApi, mealsApi, requestMeals,
    requestDrinks, mealsCategories, requestMealsCategories,
    drinksCategories, requestDrinksCategories,
    requestMealsRecipesName,
    requestDrinkRecipesName, resetAll } = useContext(Context);
  useEffect(() => {
    if (pathname === '/drinks') {
      requestDrinks();
      requestMealsCategories();
      requestDrinksCategories();
    }
    requestMeals();
    requestMealsCategories();
    requestDrinksCategories();
  }, []);

  const redirectToMeals = (id) => {
    history.push(`/meals/${id}`);
  };
  const redirectToDrinks = (id) => {
    history.push(`/drinks/${id}`);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => resetAll() }
      >
        All
      </button>
      {pathname === '/meals' ? (
        <>
          <div className="card-meal">
            {
              (
                mealsApi.map((element, index) => (
                  index < twelve
                && (
                  <span
                    key={ index }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <button
                      type="button"
                      onClick={ () => redirectToMeals(element.idMeal) }
                    >
                      <img
                        className="imagem"
                        src={ element.strMealThumb }
                        alt="imagem"
                        data-testid={ `${index}-card-img` }
                      />
                      <p
                        data-testid={ `${index}-card-name` }
                      >
                        {element.strMeal}
                      </p>
                    </button>
                  </span>
                ))))
            }
          </div>
          <div>
            {
              mealsCategories.map((element, index) => (
                index < five
                && (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `${element.strCategory}-category-filter` }
                    onClick={ () => requestMealsRecipesName(element.strCategory) }
                  >
                    {element.strCategory}
                  </button>
                )
              ))
            }
          </div>
        </>
      ) : (
        <>
          <div className="card-drink">
            {
              (
                drinksApi.map((element, index) => (
                  index < twelve
                && (
                  <span
                    key={ index }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <button
                      type="button"
                      onClick={ () => redirectToDrinks(element.idDrink) }
                    >
                      <img
                        className="imagem"
                        src={ element.strDrinkThumb }
                        alt="imagem"
                        data-testid={ `${index}-card-img` }
                      />
                      <p
                        data-testid={ `${index}-card-name` }
                      >
                        {element.strDrink}
                      </p>
                    </button>
                  </span>)))
              )
            }
          </div>
          <div>
            {
              drinksCategories.map((el, idx) => (
                idx < five
                && (
                  <button
                    key={ idx }
                    type="button"
                    data-testid={ `${el.strCategory}-category-filter` }
                    onClick={ () => requestDrinkRecipesName(el.strCategory) }
                  >
                    {el.strCategory}
                  </button>
                )
              ))
            }
          </div>
        </>
      )}
    </div>
  );
}
export default Recipes;
