import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithContext } from './renderWith';
import Header from '../../components/Header';

describe('test', () => {
  it('test', () => {
    renderWithContext(<Header />);
    const profile = screen.getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();
  });
  it('test', () => {
    renderWithContext(<Header />);
    const icon = screen.getByRole('img', { name: /search-icon/i });
    expect(icon).toBeInTheDocument();
    act(() => { userEvent.click(icon); });
    const search = screen.getByTestId('search-input');
    expect(search).toBeInTheDocument();
  });
  it('test', () => {
    renderWithContext(<Header />);
    const btn = screen.getByRole('button');
    userEvent.click(btn);
    expect(btn).toBeInTheDocument();
  });
  // it('test',  () => {
  //     renderWithRouter(<Header />);
  //     // const btn = screen.getByRole('button');
  //     const searchBar = screen.getByTestId('search-input');
  //      userEvent.click(btn);
  //     // expect(btn).toBeInTheDocument();
  //     expect(searchBar).toBeInTheDocument()
  // })
});
