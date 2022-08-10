import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ExpenseTableRowCard from '../components/ExpenseTableRowCard';

describe('ExpenseTableRowCard component suite tests', () => {
  it('should have a delete button rendered', () => {
    renderWithRouterAndRedux(<App />, { initialState: { wallet: { expenses: [{
      description: 'hot-dog',
      tag: 'Alimentação',
      value: '5',
      method: 'Dinheiro',
      currency: 'USD' }] }}});

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'victor@test.com');
    userEvent.type(passwordInput, 'teste123');

    const loginButton = screen.getByRole('button', { name: /entrar/i});
    
    userEvent.click(loginButton);

    const { history } = renderWithRouterAndRedux(<App />)


    const deleteButton = screen.getByTestId('delete-btn')
    const editButton = screen.getByTestId('edit-btn');

    userEvent.click(deleteButton);
    userEvent.click(editButton);
    userEvent.click(editButton);
  });
});