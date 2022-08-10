import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import CurrenciesSelectCard from '../components/CurrenciesSelectCard';

describe('CurrenciesSelectCard component test suite', () => {
  it('should have a currencies select', () => {
    renderWithRouterAndRedux(<CurrenciesSelectCard />)
    const currenciesSelect = screen.getByText('Com qual dinheiro?');
    expect(currenciesSelect).toBeInTheDocument();
  });
});