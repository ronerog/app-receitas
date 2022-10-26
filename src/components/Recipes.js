import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import Footer from './Footer';

function Recipes() {
  const twelve = 12;
  const five = 5;
  const history = useHistory();
  const { pathname } = history.location;
  const { drinksApi, mealsApi, requestMeals,
    requestDrinks, mealsCategories, requestMealsCategories,
    drinksCategories, requestDrinksCategories } = useContext(Context);
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
  return (
    <div>
      {pathname === '/meals' ? (
        <>
          <div className="card-meal">
            {
              (
                mealsApi.map((element, index) => (
                  index < twelve
                && (
                  <div
                    key={ index }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      src={ element.strMealThumb }
                      alt="imagem"
                      data-testid={ `${index}-card-img` }
                    />
                    <p
                      data-testid={ `${index}-card-name` }
                    >
                      {element.strMeal}
                    </p>
                  </div>
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
                  <div
                    key={ index }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      src={ element.strDrinkThumb }
                      alt="imagem"
                      data-testid={ `${index}-card-img` }
                    />
                    <p
                      data-testid={ `${index}-card-name` }
                    >
                      {element.strDrink}
                    </p>
                  </div>)))
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
                  >
                    {el.strCategory}
                  </button>
                )
              ))
            }
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
export default Recipes;
