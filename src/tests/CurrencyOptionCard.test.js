import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('CurrencyOptionCard component suite tests', () => {
  it('should ', () => {
    const USD = screen.getByDisplayValue('USD');
    expect(USD).toBeInTheDocument();
  });
});