import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import meals from './pages/Meals';
import drinks from './pages/Drinks';
import profile from './pages/Profile';
import doneRecipes from './pages/DoneRecipes';
import favoriteRecipes from './pages/FavoriteRecipes';
import MealsProgress from './pages/MealsProgress';
import DrinksProgress from './pages/DrinksProgress';
import RecipesDetails from './pages/RecipeDetails';

function App() {
  return (
    <div className="meals">
      <AppProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ meals } />
          <Route exact path="/drinks" component={ drinks } />
          <Route
            exact
            path="/meals/:id_da_receita"
            render={ (props) => <RecipesDetails { ...props } /> }
          />
          <Route
            exact
            path="/drinks/:id_da_receita"
            render={ (props) => <RecipesDetails { ...props } /> }
          />
          <Route
            exact
            path="/meals/:id-da-receita/in-progress"
            render={ (props) => <MealsProgress { ...props } /> }
          />
          <Route
            exact
            path="/drinks/:id-da-receita/in-progress"
            render={ (props) => <DrinksProgress { ...props } /> }
          />
          <Route exact path="/profile" component={ profile } />
          <Route exact path="/done-recipes" component={ doneRecipes } />
          <Route exact path="/favorite-recipes" component={ favoriteRecipes } />
        </Switch>
      </AppProvider>
    </div>
  );
}
export default App;
