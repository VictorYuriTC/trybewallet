// Coloque aqui suas actions
import {
  USER_EMAIL,
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  RECEIVE_CURRENCIES_FAILURE,
  EXPENSE_PAYLOAD,
  REQUEST_EXCHANGE_RATES,
  RECEIVE_EXCHANGE_RATES,
  RECEIVE_EXCHANGE_RATES_FAILURE,
} from '../../constants/index';
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

export const fetchCurrencies = () => async (dispatch) => {
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

export const expensePayloadAction = (payload) => ({
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

export const fetchExchangeRates = () => async (dispatch) => {
  dispatch(requestExchangeRates);
  try {
    const currenciesResponse = await getCurrencies();
    console.log(currenciesResponse);
  } catch (error) {
    dispatch(receiveCurrenciesFailure(error));
  }
};
