import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ExpenseTableRowCard from '../components/ExpenseTableRowCard';
import mockData from './helpers/mockData'

describe('ExpenseTableRowCard component suite tests', () => {
  it('should have a delete button rendered', () => {

  });

  it('should tests rest of inputs', () => {
    const expense = {
      tag: 'Alimentação',
      value: '543',
      method: 'Dinheiro',
      currency: 'USD',
      description: 'Hot-Dog'
    }
    renderWithRouterAndRedux(<ExpenseTableRowCard 
    key={ expense }
    expense={ expense }
    />)

    const editButton = screen.getByTestId('edit-btn');
    const deleteButton = screen.getByTestId('delete-btn');
    const exchangeRates = mockData;

    userEvent.click(editButton);
    userEvent.click(deleteButton);
    const tag = screen.getByText('Alimentação')
    const value = screen.getByText('543');
    const method = screen.getByText('Dinheiro');
    const currency = screen.getByText('USD');
    const description = 'Hot-Dog';

    expect(tag).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  })
});