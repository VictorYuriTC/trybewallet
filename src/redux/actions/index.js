// Coloque aqui suas actions
import {
  USER_EMAIL,
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  RECEIVE_CURRENCIES_FAILURE,
  EXPENSE_PAYLOAD,
  RECEIVE_SELECTED_CURRENCY_NAME,
  REQUEST_EXCHANGE_RATES,
  RECEIVE_EXCHANGE_RATES,
  RECEIVE_EXCHANGE_RATES_FAILURE,
  TOTAL_VALUE_IN_BRL,
  REMOVE_EXPENSE_FROM_STATE,
  IS_EXPENSE_BEING_EDITED,
} from '../../constants/actionTypes';
import getCurrencies from '../../services/currenciesAPI';

export const userLoginAction = (email) => ({
  type: USER_EMAIL,
  email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const receiveCurrenciesFailure = (error) => ({
  type: RECEIVE_CURRENCIES_FAILURE,
  error,
});

export const currenciesAcronymsAction = () => async (dispatch) => {
  dispatch(requestCurrencies);
  try {
    const currenciesResponse = await getCurrencies();
    const currenciesAcronyms = Object.keys(currenciesResponse);
    currenciesAcronyms.splice(1, 1); // splice method used to remove USDT currency
    dispatch(receiveCurrencies(currenciesAcronyms));
  } catch (error) {
    dispatch(receiveCurrenciesFailure(error));
  }
};

export const receiveCurrencyName = (currencyName) => ({
  type: RECEIVE_SELECTED_CURRENCY_NAME,
  currencyName,
});

export const addExpenseAction = (payload) => ({
  type: EXPENSE_PAYLOAD,
  payload,
});

export const requestExchangeRates = () => ({
  type: REQUEST_EXCHANGE_RATES,
});

export const receiveExchangeRates = (exchangeRates) => ({
  type: RECEIVE_EXCHANGE_RATES,
  exchangeRates,
});

export const receiveExchangeRatesFailure = (error) => ({
  type: RECEIVE_EXCHANGE_RATES_FAILURE,
  error,
});

export const exchangeRatesAction = () => async (dispatch) => {
  dispatch(requestExchangeRates);
  try {
    const currenciesResponse = await getCurrencies();
    dispatch(receiveExchangeRates(currenciesResponse));
  } catch (error) {
    dispatch(receiveCurrenciesFailure(error));
  }
};

export const totalValueInBRLAction = (totalValueInBRL) => ({
  type: TOTAL_VALUE_IN_BRL,
  totalValueInBRL,
});

export const removeExpenseFromState = (id) => ({
  type: REMOVE_EXPENSE_FROM_STATE,
  id,
});

export const isEditing = (isExpenseBeingEdited) => ({
  type: IS_EXPENSE_BEING_EDITED,
  isExpenseBeingEdited,
});
