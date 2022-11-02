import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithContext, renderWithRouter } from './helper/renderWith';

const pathMeals = '/meals/52771/in-progress';
describe('Testando recipes component', () => {
  test('Verify if the cards and categories buttons still working in meals path', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pathMeals);
    });
    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    const checkbox = await screen.findByTestId('0-ingredient-step', undefined, { timeout: 3000 });
    expect(checkbox).toBeInTheDocument();
  });

  test('Verify Checkbox interaction with localStorage', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pathMeals);
    });

    const checkbox = await screen.findByTestId('0-ingredient-step', undefined, { timeout: 3000 });
    const checkbox2 = await screen.findByTestId('1-ingredient-step', undefined, { timeout: 3000 });
    userEvent.click(checkbox);
    const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(data).not.toBeNull();
    userEvent.click(checkbox2);
    const data2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(data2[0].ingredient).toHaveLength(2);
    const getBtnFinish = screen.getByRole('button', { name: /finalizar/i });
    expect(getBtnFinish).toBeDisabled();
  });

  test('Verify Share button', async () => {
    const { history } = renderWithContext(<App />);
    act(() => {
      history.push(pathMeals);
    });
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');
    const shareBtn = await screen.findByRole('button', { name: /compartilhar/i });
    userEvent.click(shareBtn);
    expect(shareBtn).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost');
  });

  test('Verify favorite button', async () => {
    const { history } = renderWithContext(<App />);
    act(() => {
      history.push(pathMeals);
    });
    const favoriteBtn = await screen.findByRole('button', { name: /favoritar/i });
    userEvent.click(favoriteBtn);
    const dataLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(dataLocalStorage).toHaveLength(1);
  });
  test('Verify favorite button Branch 2', async () => {
    const dataSaved = [{
      alcoholicOrNot: '',
      category: 'Vegetarian',
      id: '52771',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      name: 'Spicy Arrabiata Penne',
      nationality: 'Italian',
      type: 'meal',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(dataSaved));
    const { history } = renderWithContext(<App />);
    act(() => {
      history.push(pathMeals);
    });
    const favoriteBtn = await screen.findByRole('button', { name: /favoritar/i });
    userEvent.click(favoriteBtn);
    const dataLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(dataLocalStorage).toHaveLength(1);
  });
});
