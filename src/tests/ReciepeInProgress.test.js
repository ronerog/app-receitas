import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helper/renderWith';

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
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pathMeals);
    });
  });
});
