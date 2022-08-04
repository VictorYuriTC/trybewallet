export const getSelectedCurrencyData = (expenses, selectedCurrency) => Object
  .values(expenses[0].exchangeRates)
  .find(({ code }) => code === selectedCurrency);

export const expensesValueAndCurrencyData = (expenses) => expenses
  .map(({ currency, value }) => (
    {
      currencyInfo: getSelectedCurrencyData(expenses, currency),
      value,
    }));

export const toZeroWhenNegativeNumberOrNaN = (value) => {
  if (Number(value) < 0
    || Number.isNaN(value)) {
    value = 0.00;
    return value;
  }
};
