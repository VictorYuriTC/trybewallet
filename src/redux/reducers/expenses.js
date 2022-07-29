import {
  EXPENSE_ID,
  EXPENSE_VALUE,
  EXPENSE_DESCRIPTION,
  EXPENSE_CURRENCY,
  EXPENSE_METHOD,
  EXPENSE_TAG,
  /* EXCHANGE_RATES, */
} from '../../constants/index';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
  exchangeRates: {},
};

const expenses = (state = INITIAL_STATE, action) => {
  const {
    type,
    id,
    value,
    description,
    currency,
    method,
    tag,
    /* exchangeRates, */
  } = action;

  switch (type) {
  case EXPENSE_ID:
    return {
      ...state,
      id,
    };
  case EXPENSE_VALUE:
    return {
      ...state,
      value,
    };
  case EXPENSE_DESCRIPTION:
    return {
      ...state,
      description,
    };
  case EXPENSE_CURRENCY:
    return {
      ...state,
      currency,
    };
  case EXPENSE_METHOD:
    return {
      ...state,
      method,
    };
  case EXPENSE_TAG:
    return {
      ...state,
      tag,
    };
  default:
    return state;
  }
};

export default expenses;
