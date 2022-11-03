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
    history.push(`/meals/${id}`);// nao passou coverage, mas passa no cypress
  };
  const redirectToDrinks = (id) => {
    history.push(`/drinks/${id}`); // nao passou coverage, mas passsa no cypress
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
                      onClick={ () => redirectToMeals(element.idMeal) } // nao passou coverage
                    >
                      <img
                        id="imagem"
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
            {/* {
              mealsRecipesName.map((e, i) => (
                i < twelve
              && (
                <section>
                  {e.strMeal}
                  <img
                    id="imagem"
                    src={ e.strMealThumb }
                    alt={ e }
                  />
                </section>
              )
              ))
            } */}
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
                      onClick={ () => redirectToDrinks(element.idDrink) } // verificar teste de redirecionamento
                    >
                      <img
                        id="imagem"
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
            {/* {
              drinkRecipesName.map((e, i) => (
                i < twelve
              && (
                <section>
                  {e.strDrink}
                  <img
                    id="imagem"
                    src={ e.strDrinkThumb }
                    alt={ e }
                    data-testid={ `${i}-category-filter` }
                  />
                </section>
              )
              ))
            } */}
          </div>
        </>
      )}
    </div>
  );
}
export default Recipes;
