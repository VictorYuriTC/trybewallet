import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter, renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import App from '../App';
import mockData from './helpers/mockData';

describe('WalletForm component suite test', () => {
  it('should have a save button rendered', () => {
    renderWithRouterAndRedux(<WalletForm />)
    const saveButton = screen.getByRole('button', { name: /adicionar despesa/i});
    userEvent.click(saveButton);
  });

  it('should have a currencies select rendered', () => {
    renderWithRouterAndRedux(<WalletForm />)
    const currenciesSelect = screen.getByText('Com qual dinheiro?');
    expect(currenciesSelect).toBeInTheDocument();
  })
  
  it('should call API after mounting', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }))

    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'victor@test.com');
    userEvent.type(passwordInput, 'teste123');

    const loginButton = screen.getByRole('button', { name: /entrar/i});
    
    userEvent.click(loginButton);

    expect(global.fetch).toHaveBeenCalled();
    const { history} = renderWithRouter(<App />)
    console.log(history.location.pathname)
  });

  it('should call currencies API after mounting', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    })

    renderWithRouterAndRedux(<Wallet />, { initialState })

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all')
  });

});