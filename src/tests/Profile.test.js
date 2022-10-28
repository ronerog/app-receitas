import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import Profile from '../pages/Profile';

describe('test the login page', () => {
  test('The login components', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByTestId('profile-email');
    const doneRecipeBtn = screen.getByRole('button', { name: /done recipe/i });
    const favoriteRecipeBtn = screen.getByRole('button', { name: /favorite recipe/i });
    const logoutBtn = screen.getByRole('button', { name: /logout/i });

    expect(localStorage.getItem).toBeCalled();
    expect(email).toBeInTheDocument();
    expect(doneRecipeBtn).toBeInTheDocument();
    expect(favoriteRecipeBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
});
