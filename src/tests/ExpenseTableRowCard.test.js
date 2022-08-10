import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ExpenseTableRowCard from '../components/ExpenseTableRowCard';

describe('ExpenseTableRowCard component suite tests', () => {
  it('should have a delete button rendered', () => {
    renderWithRouterAndRedux(<ExpenseTableRowCard />);

    const deleteButton = screen.getByTestId('delete-btn')
    const editButton = screen.getByTestId('edit-btn');

    userEvent.click(deleteButton);
    userEvent.click(editButton);
    userEvent.click(editButton);
  });
});