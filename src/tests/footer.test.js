import React from 'react';
import { screen, render } from '@testing-library/react';
// import renderWithRouter from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';

describe('Verify the footer component', () => {
  it('Verify the drinkIcon', () => {
    render(<Footer />);
    const button = screen.getByTestId('drinks-bottom-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });

  it('Verify the mealIcon', () => {
    render(<Footer />);
    const button = screen.getByTestId('meals-bottom-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
  });
});
