import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import MethodSelectCard from '../components/MethodSelectCard';

describe('MethodSelectCard component suite test', () => {
  it('should have a method select rendered', async () => {
    renderWithRouterAndRedux(<MethodSelectCard />)
    const methodSelect = screen.getByText('Paguei de que jeito?')
    expect(methodSelect).toBeInTheDocument();
  });
});