import React from 'react';
import { useHistory } from 'react-router-dom';

function ProfileComponent() {
  const history = useHistory();
  const email = localStorage.getItem('user');
  const logoutBtn = () => {
    localStorage.clear();
    history.push('/');
  };
  console.log(email);
  return (
    <div>
      <p data-testid="profile-email">{email}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logoutBtn }
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileComponent;
