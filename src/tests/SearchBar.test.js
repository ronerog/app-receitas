import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { renderWithContext } from './helper/renderWith';

describe('Testa Cobertura da Barra de Busca', () => {
  test('Testa os elementos sendo renderizados', async () => {
    renderWithContext(<SearchBar />);
    const getBtn = screen.getByRole('searchbox');
    userEvent.click(getBtn);
    expect(getBtn).toBeInTheDocument();
  });

  test('Testa elementos da Header', async () => {
    renderWithContext(<Header />);

    const getIcon = screen.getByRole('img', { name: /search-icon/i });
    expect(getIcon).toBeInTheDocument();
    act(() => { userEvent.click(getIcon); });
    const searchBtn = await screen.findByTestId('exec-search-btn', {}, { timeout: 3000 });
    expect(searchBtn).toBeInTheDocument();
    act(() => { userEvent.click(searchBtn); });
  });
});
