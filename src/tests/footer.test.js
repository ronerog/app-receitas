import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import { renderWithContext } from './helper/renderWith';

describe('Verify the footer component', () => {
  it('Verify the drinkIcon', () => {
    renderWithContext(<Footer />);
    const button = screen.getByTestId('drinks-bottom-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });

  it('Verify the mealIcon', () => {
    renderWithContext(<Footer />);
    const button = screen.getByTestId('meals-bottom-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });
});
