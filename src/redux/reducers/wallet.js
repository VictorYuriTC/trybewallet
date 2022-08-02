// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  RECEIVE_CURRENCIES_FAILURE,
  EXPENSE_PAYLOAD,
  REQUEST_EXCHANGE_RATES,
  RECEIVE_EXCHANGE_RATES,
  RECEIVE_EXCHANGE_RATES_FAILURE,
  TOTAL_VALUE_CONVERTED_TO_BRL,
} from '../../constants/index';

const INITIAL_STATE = {
  isLoading: false,
  currencies: [],
  error: '',
  expenses: [],
  totalValueConvertedToBRL: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  const {
    type,
    currencies,
    error,
    payload,
    exchangeRates,
    totalValueConvertedToBRL,
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
      currencies,
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
  case TOTAL_VALUE_CONVERTED_TO_BRL:
    return {
      ...state,
      totalValueConvertedToBRL,
    };
  default:
    return state;
  }
};

export default wallet;
