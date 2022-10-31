import React from 'react';
import { act, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helper/renderWith';

describe('Testando recipes component', () => {
  test('Verify if the cards and categories buttons still working in meals path', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52771/in-progress');
    });
    expect(history.location.pathname).toBe('/meals/52771/in-progress');

    const checkbox = await screen.findByTestId('0-ingredient-step', undefined, { timeout: 3000 });
    expect(checkbox).toBeInTheDocument();
  });
});
