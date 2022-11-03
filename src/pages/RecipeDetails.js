import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DrinksID from '../components/DrinksID';
import MealsID from '../components/MealsID';

function RecipeDetails() {
  const history = useHistory();
  const { pathname } = history.location;
  return (
    (pathname.includes('meals'))
      ? (
        <>
          <Header />
          Recipe Details
          <MealsID />
          <Footer />
        </>
      )
      : (
        <>
          <Header />
          Recipe Details
          <DrinksID />
          <Footer />
        </>)
  );
}
export default RecipeDetails;
