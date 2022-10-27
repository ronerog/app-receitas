import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helper/renderWith';

// AJEITAR TESTES

describe('Testando recipes component', () => {
  test('Verify if the cards and categories buttons still working in meals path', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');

    const img = await screen.findByTestId('0-card-img', undefined, { timeout: 3000 });
    const categorieButton = await screen.findByRole('button', { name: /beef/i }, { timeout: 2000 });
    const cardButton = await screen.findByRole('button', { name: /Big Mac/i }, { timeout: 2000 });
    const buttons = await screen.findAllByRole('button', undefined, { timeout: 2000 });

    expect(img).toBeInTheDocument();
    expect(categorieButton).toBeInTheDocument();
    expect(buttons.length).toBe(Number(18));

    userEvent.click(cardButton);
    expect(history.location.pathname).toBe('meals/:id_da_receita');
  });
  test('Verify if the cards and categories buttons still working in drinks path', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    const img = await screen.findByTestId('0-card-img', undefined, { timeout: 3000 });
    const categorieButton = await screen.findByRole('button', { name: /ordinary drink/i }, { timeout: 2000 });
    const cardButton = await screen.findByRole('button', { name: /GG/i }, { timeout: 2000 });
    const buttons = await screen.findAllByRole('button', undefined, { timeout: 2000 });

    expect(img).toBeInTheDocument();
    expect(categorieButton).toBeInTheDocument();
    expect(buttons.length).toBe(Number(18));

    userEvent.click(cardButton);
    expect(history.location.pathname).toBe('drinks/:id_da_receita');
  });
});
