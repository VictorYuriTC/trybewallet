import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import mockData from './helpers/mockData';

describe('inputs suite tests', () => {
  it('should have all inputs rendered with router and redux', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<WalletForm />, { initialState: { wallet } });

    const valueInput = screen.getByLabelText(/perdi quanto?/i);
    const descriptionInput = screen.getByLabelText(/gastei no quê?/i);
    const currencySelect = screen.getByLabelText(/com qual dinheiro?/i);
    const methodSelect = screen.getByLabelText(/paguei de que jeito/i);
    const tagSelect = screen.getByLabelText(/comprei por quê?/i)

    userEvent.type(valueInput, '4')
    userEvent.type(descriptionInput, 'Hot-dog')
    expect(valueInput).toBeInTheDocument();

  });
});