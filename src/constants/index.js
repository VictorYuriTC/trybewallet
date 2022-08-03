export const USER_EMAIL = 'USER_EMAIL';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const RECEIVE_CURRENCIES_FAILURE = 'RECEIVE_CURRENCIES_FAILURE';

export const RECEIVE_SELECTED_CURRENCY_NAME = 'RECEIVE_SELECTED_CURRENCY_NAME';

export const EXPENSE_PAYLOAD = 'EXPENSE_PAYLOAD';
export const REQUEST_EXCHANGE_RATES = 'REQUEST_EXCHANGE_RATES';
export const RECEIVE_EXCHANGE_RATES = 'RECEIVE_EXCHANGE_RATES';
export const RECEIVE_EXCHANGE_RATES_FAILURE = 'RECEIVE_EXCHANGE_RATES_FAILURE';

export const TOTAL_VALUE_CONVERTED_TO_BRL = 'TOTAL_VALUE_CONVERTED_TO_BRL';

export const ALIMENTAÇÃO = 'Alimentação';
export const DINHEIRO = 'Dinheiro';
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
