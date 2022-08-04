export const USER_EMAIL = 'USER_EMAIL';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const RECEIVE_CURRENCIES_FAILURE = 'RECEIVE_CURRENCIES_FAILURE';

export const RECEIVE_SELECTED_CURRENCY_NAME = 'RECEIVE_SELECTED_CURRENCY_NAME';

export const EXPENSE_PAYLOAD = 'EXPENSE_PAYLOAD';
export const REQUEST_EXCHANGE_RATES = 'REQUEST_EXCHANGE_RATES';
export const RECEIVE_EXCHANGE_RATES = 'RECEIVE_EXCHANGE_RATES';
export const RECEIVE_EXCHANGE_RATES_FAILURE = 'RECEIVE_EXCHANGE_RATES_FAILURE';

export const TOTAL_VALUE_IN_BRL = 'TOTAL_VALUE_IN_BRL';

export const FOOD = 'Alimentação';
export const MONEY = 'Dinheiro';
export const USD = 'USD';

export const getSelectedCurrencyData = (expenses, selectedCurrency) => Object
  .values(expenses[0].exchangeRates)
  .find(({ code }) => code === selectedCurrency);

export const expensesValueAndCurrencyData = (expenses) => expenses
  .map(({ currency, value }) => (
    {
      currencyInfo: getSelectedCurrencyData(expenses, currency),
      value,
    }));

export const REMOVE_EXPENSE_FROM_STATE = 'REMOVE_EXPENSE_FROM_STATE';

export const IS_EXPENSE_BEING_EDITED = 'IS_EXPENSE_BEING_EDITED';
