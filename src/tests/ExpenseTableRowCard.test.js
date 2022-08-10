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
      value: '5',
      method: 'Dinheiro',
      currency: 'USD',
      description: 'Hot-Dog'
    }
    renderWithRouterAndRedux(<ExpenseTableRowCard 
    key={ expense }
    expense={ expense }
    />)
  })
});