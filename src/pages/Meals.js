import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div>
      <Header title="Meals" />
      Comidas
      <Recipes />
      <Footer />

    </div>
  );
}

export default Meals;
