import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import meals from './pages/Meals';
import drinks from './pages/Drinks';
import mealsId from './pages/MealsID';
import drinksId from './pages/DrinksID';
import mealsProgress from './pages/MealsProgress';
import drinksProgress from './pages/DrinksProgress';
import profile from './pages/Profile';
import doneRecipes from './pages/DoneRecipes';
import favoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <AppProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/meals" component={ meals } />
          <Route path="/drinks" component={ drinks } />
          <Route path="/meals/:id-da-receita" component={ mealsId } />
          <Route path="/drinks/:id-da-receita" component={ drinksId } />
          <Route path="/meals/:id-da-receita/in-progress" component={ mealsProgress } />
          <Route path="/drinks/:id-da-receita/in-progress" component={ drinksProgress } />
          <Route path="/profile" component={ profile } />
          <Route path="/done-recipes" component={ doneRecipes } />
          <Route path="/favorite-recipes" component={ favoriteRecipes } />
        </Switch>
      </AppProvider>
    </div>
  );
}

export default App;
