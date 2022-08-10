import React from 'react';
import userEvent from "@testing-library/user-event";
import { screen } from '@testing-library/react'
import { renderWithRouterAndRedux } from "./helpers/renderWith";
import App from '../App';

describe('Login page test suite', () => {
  it('should redirect the user after login', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'victor@test.com');
    userEvent.type(passwordInput, 'teste123');

    const loginButton = screen.getByRole('button', { name: /entrar/i});
    
    userEvent.click(loginButton);
  });
});