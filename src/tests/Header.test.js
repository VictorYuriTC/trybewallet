import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';

describe('Header component suite tests', () => {
  it('should have an h1 rendering the user email', () => {
    renderWithRouterAndRedux(<Header />);
    const h1Email = screen.getByTestId('email-field');
    expect(h1Email).toBeInTheDocument();
  });

  it('should have an h3 rendering total value', () => {
    renderWithRouterAndRedux(<Header />);
    const h3TotalField = screen.getByTestId('total-field');
    expect(h3TotalField).toBeInTheDocument();
  });

  it('should have an h3 rendering the user currency', () => {
    renderWithRouterAndRedux(<Header />);
    const h3HeaderCurrencyField = screen.getByTestId('header-currency-field');
    expect(h3HeaderCurrencyField).toBeInTheDocument();
  });
});