import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helper/renderWith';

const favoriteRecipes = '/favorite-recipes';
const favoriteObj = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    id: '17225',
    image: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
    name: 'Ace',
    nationality: '',
    type: 'drink',
  },
  {
    alcoholicOrNot: 'Non alcoholic',
    category: 'Cocoa',
    id: '12730',
    image: 'https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg',
    name: 'Castillian Hot Chocolate',
    nationality: '',
    type: 'drink',
  },
];
describe('Testando tela de Receitas Favoritas', () => {
  test('Testando remoção de elemento', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteObj));
    act(() => {
      history.push(favoriteRecipes);
    });

    const getFavBtn = await screen.findByTestId('0-horizontal-favorite-btn');
    const getBtn = screen.getByRole('button', { name: /all/i });
    expect(getBtn).toBeInTheDocument();
    const getImg = await screen.findByRole('img', { name: /spicy arrabiata penne/i });
    userEvent.click(getFavBtn);
    expect(getImg).not.toBeInTheDocument();
  });
});
