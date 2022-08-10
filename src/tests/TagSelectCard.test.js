import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import TagSelectCard from '../components/TagSelectCard';

describe('TagSelectCard component test suit', () => {
  it('should have a tag select rendered', () => {
    renderWithRouterAndRedux(<TagSelectCard />)
    const tagSelect = screen.getByText('Comprei por quê?');
    expect(tagSelect).toBeInTheDocument;
  });
});