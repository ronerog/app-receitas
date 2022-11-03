import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helper/renderWith';

describe('Verifying the DrinksID page', () => {
  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/15997');
    });
    expect(history.location.pathname).toBe('/drinks/15997');
    const img = await screen.findByTestId('recipe-photo', undefined, { timeout: 3000 });
    const button = await screen.findByTestId('start-recipe-btn', undefined, { timeout: 2000 });
    const ingredient = await screen.findByRole('heading', { name: /Galliano/i }, { timeout: 2000 });
    const allIngredients = await screen.findAllByRole('heading', { level: 4 }, { timeout: 2000 });
    expect(img).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(ingredient).includes('Galliano');
    expect(allIngredients.length).toBe(Number(31));
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals/53026/in-progress');
  });
});
describe('Verifying the MealsID page', () => {
  test('', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/53026');
    });
    expect(history.location.pathname).toBe('/meals/53026');
    const img = await screen.findByTestId('recipe-photo', undefined, { timeout: 3000 });
    const button = await screen.findByTestId('start-recipe-btn', undefined, { timeout: 2000 });
    const ingredient = await screen.findByRole('heading', { name: /Broad Beans/i }, { timeout: 2000 });
    const allIngredients = await screen.findAllByRole('heading', { level: 4 }, { timeout: 2000 });
    expect(img).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(ingredient).incluedes('Broad Beans');
    expect(allIngredients.length).toBe(Number(31));
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals/53026/in-progress');
  });
});
