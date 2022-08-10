import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import ValueInputCard from '../components/ValueInputCard';

describe('ValueInputCard component suite tests', () => {
  it('should have a value input rendered', () => {
    renderWithRouterAndRedux(<ValueInputCard />)
    const valueInput = screen.getByText('Perdi quanto?')
    expect(valueInput).toBeInTheDocument();
  });
});