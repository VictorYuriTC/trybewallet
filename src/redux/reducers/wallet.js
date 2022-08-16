// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  RECEIVE_CURRENCIES,
  EXPENSE_PAYLOAD,
  RECEIVE_EXCHANGE_RATES,
  TOTAL_VALUE_IN_BRL,
  REMOVE_EXPENSE_FROM_STATE,
  IS_EXPENSE_BEING_EDITED,
} from '../../constants/actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  error: '',
  expenses: [],
  totalValueInBRL: 0,
  isExpenseBeingEdited: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  const {
    type, currencies, payload, exchangeRates, totalValueInBRL, id,
    isExpenseBeingEdited,
  } = action;

  switch (type) {
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies,
    };
  case EXPENSE_PAYLOAD:
    return {
      ...state,
      expenses: [...state.expenses, { ...payload }],
    };
  case RECEIVE_EXCHANGE_RATES:
    return {
      ...state,
      exchangeRates,
    };
  case TOTAL_VALUE_IN_BRL:
    return {
      ...state,
      totalValueInBRL,
    };
  case REMOVE_EXPENSE_FROM_STATE:
    return {
      ...state,
      expenses: [...state.expenses].filter((expense) => expense.id !== id),
    };
  case IS_EXPENSE_BEING_EDITED:
    return {
      ...state,
      isExpenseBeingEdited,
    };
  default:
    return state;
  }
};

export default wallet;
