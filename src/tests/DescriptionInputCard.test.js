import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import DescriptionInputCard from '../components/DescriptionInputCard';
import userEvent from '@testing-library/user-event';

describe('DescriptionInputCard component page suite', () => {
  beforeEach(cleanup);
  it('should have a descrption input rendered', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    userEvent.type(emailInput, 'victor@test.com');
    userEvent.type(passwordInput, 'teste123');

    const loginButton = screen.getByRole('button', { name: /entrar/i});
    
    userEvent.click(loginButton);

    const descriptionLabel = screen.getByText('Gastei no quê?')
    const descriptionInput = screen.getByTestId('description-input');

    expect(descriptionLabel).toBeInTheDocument();

    userEvent.type(descriptionInput, 'Hot-dog');
  });
});