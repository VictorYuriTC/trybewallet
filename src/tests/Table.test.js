import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ExpenseTableRowCard from '../components/ExpenseTableRowCard';
import mockData from './helpers/mockData'
import Table from '../components/Table'

describe('', () => {
  it('should ', () => {
    renderWithRouterAndRedux(<Table />)
    const tag = screen.getByText('Tag')
    const method = screen.getByText('Método de pagamento')
    const value = screen.getByText('Valor')
    const description = screen.getByText('Descrição')
    const currency = screen.getByText('Moeda')
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    
  });
});