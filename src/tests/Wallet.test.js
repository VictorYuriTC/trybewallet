import React from 'react';
import userEvent from "@testing-library/user-event";
import { screen } from '@testing-library/react'
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import App from '../App';
import mockData from './helpers/mockData'
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import Table from '../components/Table';
import CurrencyOptionCard from '../components/CurrencyOptionCard';
import ExpenseTableRowCard from '../components/ExpenseTableRowCard';

describe('Wallet page suite tests', () => {
  it('should allow the user to change inputs and save the expense', async () => {
    const currenciesResponse = mockData;
    const currenciesAcronyms = Object.keys(currenciesResponse);
    currenciesAcronyms.splice(1, 1);

    renderWithRouterAndRedux(<App />);
    
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'victor@test.com');
    userEvent.type(passwordInput, 'teste123');

    const loginButton = screen.getByRole('button', { name: /entrar/i});
    
    userEvent.click(loginButton);

    renderWithRouterAndRedux(<WalletForm />);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData), }));

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '3');
    userEvent.type(currencyInput, 'USD')
    userEvent.type(descriptionInput, 'Hot-dog');
    userEvent.type(methodInput, 'Dinheiro');
    userEvent.type(tagInput, 'Alimentação');

    const saveNewExpenseButton = screen.getByLabelText('Tudo bem, põe na minha conta...');
    userEvent.click(saveNewExpenseButton);

    const descriptionTyped = await screen.findByText(/hot-dog/i);
    expect(descriptionTyped).toBeInTheDocument();
  });

  it('should render a header with the expected informations', () => {
    renderWithRouterAndRedux(<App />);
    
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'victor@test.com');
    userEvent.type(passwordInput, 'teste123');

    const loginButton = screen.getByRole('button', { name: /entrar/i});
    
    userEvent.click(loginButton);

    renderWithRouterAndRedux(<WalletForm />);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData), }));

    renderWithRouterAndRedux(<Header />);

    const emailH1 = screen.getByTestId('email-field');
    expect(emailH1).toBeInTheDocument();
  })

  it('should render a table with all saved expenses', () => {
    renderWithRouterAndRedux(<App />);
    
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'victor@test.com');
    userEvent.type(passwordInput, 'teste123');

    const loginButton = screen.getByRole('button', { name: /entrar/i});
    
    userEvent.click(loginButton);

    renderWithRouterAndRedux(<WalletForm />);

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData), }));

    renderWithRouterAndRedux(<Table />);
    renderWithRouterAndRedux(
    <ExpenseTableRowCard
      expense={ {
        value: '3',
        description: 'Hot-dog',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData
      }}
    />
    );

    const deleteExpenseButton = screen.getByTestId('delete-btn');
    const editExpenseButton = screen.getByTestId('edit-btn');

    userEvent.click(deleteExpenseButton);
    userEvent.click(editExpenseButton);
  });

  it('should fetch all the currency names', () => {
    renderWithRouterAndRedux(<App />);
    
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'victor@test.com');
    userEvent.type(passwordInput, 'teste123');

    const loginButton = screen.getByRole('button', { name: /entrar/i});
    
    userEvent.click(loginButton);

    renderWithRouterAndRedux(<WalletForm />);

    const allCurrencies = Object.keys(mockData);
    allCurrencies.splice(1, 1);
  
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(allCurrencies), }));

    allCurrencies.forEach((currencyName) => (
      renderWithRouterAndRedux(<CurrencyOptionCard
        key={ currencyName }
        value={ currencyName }
        name={ currencyName }
      />)
    ));

    const currencyInput = screen.getByTestId('currency-input');

    userEvent.type(currencyInput, 'USD');

  });
});