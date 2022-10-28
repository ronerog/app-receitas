import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function DrinksID() {
  const [drinksID, setDrinksID] = useState([]);

  const history = useHistory();
  const { pathname } = history.location;
  console.log(pathname);

  const requestCocktailById = async (id) => {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(endPoint);
    const result = await response.json();
    setDrinksID(result.drinks);
  };

  console.log(drinksID);

  useEffect(() => {
    const split = pathname.split('/');
    const string = split[2].replace(/:/g, '');
    requestCocktailById(string);
  }, []);

  return (
    <div>
      DrinksID
    </div>
  );
}

export default DrinksID;
