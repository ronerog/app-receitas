import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithContext, renderWithRouter } from './helper/renderWith';

const pathMeals = '/meals/52771/in-progress';
const pathDrinks = '/drinks/178319/in-progress';
const mealObj = [{
  alcoholicOrNot: '',
  category: 'Vegetarian',
  id: '52771',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  name: 'Spicy Arrabiata Penne',
  nationality: 'Italian',
  type: 'meal',
}];

const mealObjWrong = [{
  alcoholicOrNot: '',
  category: 'Vegetarian',
  id: '232421',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  name: 'Spicy Arrabiata Penne',
  nationality: 'Italian',
  type: 'meal',
}];
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
    const getH1 = await screen.findByRole('heading', { name: /spicy arrabiata penne/i });
    userEvent.click(getH1);
    const dataLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(dataLocalStorage);
    expect(dataLocalStorage).toHaveLength(1);
  });

  test('Verify favorite button Branch 2', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mealObj));
    const { history } = renderWithContext(<App />);
    act(() => {
      history.push(pathMeals);
    });
    const favoriteBtn = await screen.findByRole('button', { name: /favoritar/i });
    const getCheckbox = await screen.findByText(/penne rigate/i);
    userEvent.click(getCheckbox);
    userEvent.click(favoriteBtn);
    const dataLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(dataLocalStorage);
    expect(dataLocalStorage).toHaveLength(1);
  });

  test('Verify favorite button Branch 2', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mealObjWrong));
    const { history } = renderWithContext(<App />);
    act(() => {
      history.push(pathMeals);
    });
    const favoriteBtn = await screen.findByRole('button', { name: /favoritar/i });
    const getCheckbox = await screen.findByText(/penne rigate/i);
    userEvent.click(getCheckbox);
    userEvent.click(favoriteBtn);
    const dataLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(dataLocalStorage).toHaveLength(1);
  });

  test('Verify favorite button Branch 3', async () => {
    const { history } = renderWithContext(<App />);
    act(() => {
      history.push(pathMeals);
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(mealObjWrong));
    const dataLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(dataLocalStorage);
    const favoriteBtn = await screen.findByRole('button', { name: /favoritar/i });
    const getCheckbox = await screen.findByText(/penne rigate/i);
    userEvent.click(getCheckbox);
    userEvent.click(favoriteBtn);
    expect(dataLocalStorage).toHaveLength(1);
    const favoriteh1 = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    expect(favoriteh1).toBeInTheDocument();
    const dataLocalStorage2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(dataLocalStorage2);
  });

  test('Verify Finished button', async () => {
    const { history } = renderWithContext(<App />);
    act(() => {
      history.push(pathDrinks);
    });
    const checkbox1 = await screen.findByRole('checkbox', { name: /hpnotiq/i });
    const checkbox2 = await screen.findByRole('checkbox', { name: /pineapple juice/i });
    const checkbox3 = await screen.findByRole('checkbox', { name: /banana liqueur/i });
    userEvent.click(checkbox1);
    userEvent.click(checkbox2);
    userEvent.click(checkbox3);
    const getBtnFinish = await screen.findByRole('button', { name: /finalizar/i });
    // const dataLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(getBtnFinish).not.toBeDisabled();
    userEvent.click(getBtnFinish);
  });

  test('Verify Finished button Brach 2', async () => {
    const dataSaved = [{
      id: '178319',
      ingredient: [
        'Hpnotiq',
        'Pineapple Juice',
        'Banana Liqueur',
      ],
      favorite: false,
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(dataSaved));
    const { history } = renderWithContext(<App />);
    act(() => {
      history.push(pathDrinks);
    });
    const checkbox1 = await screen.findByRole('checkbox', { name: /hpnotiq/i });
    const checkbox2 = await screen.findByRole('checkbox', { name: /pineapple juice/i });
    const checkbox3 = await screen.findByRole('checkbox', { name: /banana liqueur/i });
    userEvent.click(checkbox1);
    userEvent.click(checkbox2);
    userEvent.click(checkbox3);
    const getBtnFinish = await screen.findByRole('button', { name: /finalizar/i });
    // const dataLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(getBtnFinish).not.toBeDisabled();
    userEvent.click(getBtnFinish);
  });

  test('Verify Finished button Brach 2', async () => {
    const dataSaved = [{
      id: '543442',
      ingredient: [
        'Hpnotiq',
        'Pineapple Juice',
        'Banana Liqueur',
      ],
      favorite: false,
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(dataSaved));
    const { history } = renderWithContext(<App />);
    act(() => {
      history.push(pathDrinks);
    });
    const checkbox1 = await screen.findByRole('checkbox', { name: /hpnotiq/i });
    const checkbox2 = await screen.findByRole('checkbox', { name: /pineapple juice/i });
    const checkbox3 = await screen.findByRole('checkbox', { name: /banana liqueur/i });
    userEvent.click(checkbox1);
    userEvent.click(checkbox2);
    userEvent.click(checkbox3);
    const getBtnFinish = await screen.findByRole('button', { name: /finalizar/i });
    expect(getBtnFinish).not.toBeDisabled();
    userEvent.click(getBtnFinish);
  });

  test('Verify favorite button Branch 4', async () => {
    const dataSaved = [{
      alcoholicOrNot: 'Alcoholic',
      category: 'Cocktail',
      id: '178319',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      name: 'Aquamarine',
      nationality: '',
      type: 'drink',
    }];
    localStorage.setItem('favoriteRecipes', JSON.stringify(dataSaved));

    const { history } = renderWithContext(<App />);
    act(() => {
      history.push(pathDrinks);
    });
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favoriteBtn);
    expect(favoriteBtn).toHaveAttribute('src');
  });
});

// http://localhost:3000/drinks/178319/in-progress
