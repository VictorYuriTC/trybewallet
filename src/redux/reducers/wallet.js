// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  RECEIVE_CURRENCIES_FAILURE,
  EXPENSE_PAYLOAD,
} from '../../constants/index';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  error: '',
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, currencies, error, payload }) => {
  switch (type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isLoading: !state.isLoading,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies,
    };
  case RECEIVE_CURRENCIES_FAILURE:
    return {
      ...state,
      error,
    };
  case EXPENSE_PAYLOAD:
    return {
      ...state,
      expenses: [...state.expenses, { ...payload }],
    };
  default:
    return state;
  }
};

export default wallet;
