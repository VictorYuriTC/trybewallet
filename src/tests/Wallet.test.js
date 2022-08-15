import React from 'react';
import userEvent from "@testing-library/user-event";
import { screen } from '@testing-library/react'
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import App from '../App';
import mockData from './helpers/mockData'
import WalletForm from '../components/WalletForm';

describe('Wallet page suite tests', () => {
  it('should allow the user to change inputs and save the expense', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'victor@test.com');
    userEvent.type(passwordInput, 'teste123');

    const loginButton = screen.getByRole('button', { name: /entrar/i});
    
    userEvent.click(loginButton);

    renderWithRouterAndRedux(<WalletForm />);

    console.log(history.location.pathname);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData), }));

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '3');
    userEvent.type(valueInput, '-3');

    userEvent.type(descriptionInput, 'Hot-dog');
    userEvent.type(currencyInput, 'USD');
    userEvent.type(methodInput, 'Dinheiro');
    userEvent.type(tagInput, 'Alimentação');

    const saveNewExpenseButton = screen.getByLabelText('Tudo bem, põe na minha conta...');
    userEvent.click(saveNewExpenseButton);
  });

});