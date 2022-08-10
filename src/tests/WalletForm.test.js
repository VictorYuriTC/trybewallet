import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';

describe('WalletForm component suite test', () => {
  it('should have a save button rendered', () => {
    renderWithRouterAndRedux(<WalletForm />)
    const saveButton = screen.getByLabelText('Tudo bem, põe na minha conta...');
    userEvent.click(saveButton);
  });

  it('should have a currencies select rendered', () => {
    renderWithRouterAndRedux(<WalletForm />)
    const currenciesSelect = screen.getByText('Com qual dinheiro?');
    expect(currenciesSelect).toBeInTheDocument();
  })
});