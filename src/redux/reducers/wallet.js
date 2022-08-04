// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  RECEIVE_CURRENCIES_FAILURE,
  EXPENSE_PAYLOAD,
  REQUEST_EXCHANGE_RATES,
  RECEIVE_EXCHANGE_RATES,
  RECEIVE_EXCHANGE_RATES_FAILURE,
  TOTAL_VALUE_IN_BRL,
  REMOVE_EXPENSE_FROM_STATE,
  IS_EXPENSE_BEING_EDITED,
} from '../../constants/index';

const INITIAL_STATE = {
  isLoading: false,
  currenciesAcronyms: [],
  error: '',
  expenses: [],
  totalValueInBRL: 0,
  isExpenseBeingEdited: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  const {
    type, currenciesAcronyms, error, payload, exchangeRates, totalValueInBRL, id,
    isExpenseBeingEdited,
  } = action;

  switch (type) {
  case REQUEST_CURRENCIES || REQUEST_EXCHANGE_RATES:
    return {
      ...state,
      isLoading: !state.isLoading,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currenciesAcronyms,
    };
  case RECEIVE_CURRENCIES_FAILURE || RECEIVE_EXCHANGE_RATES_FAILURE:
    return {
      ...state,
      error,
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
