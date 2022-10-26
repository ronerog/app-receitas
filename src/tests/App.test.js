import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('test the login page', () => {
  test('The login components', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /enter/i });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('disabled');

    userEvent.type(email, 'xablau@xablau.com');
    userEvent.type(password, 'xablau1');
    userEvent.click(btn);
    expect(localStorage.setItem).toBeCalled();
    screen.logTestingPlaygroundURL();
  });
});
