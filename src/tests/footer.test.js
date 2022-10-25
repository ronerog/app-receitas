import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/footer';

describe('Verify the footer component', () => {
  it('Verify the drinkIcon', () => {
    render(<Footer />);
    const button = screen.getByTestId('drinks-bottom-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    // REDIRECT?
  });

  it('Verify the mealIcon', () => {
    render(<Footer />);
    const button = screen.getByTestId('meals-bottom-btn');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    // REDIRECT?
  });
});
