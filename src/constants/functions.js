export const getSelectedCurrencyData = (expenses, selectedCurrency) => Object
  .values(expenses[0].exchangeRates)
  .find(({ code }) => code === selectedCurrency);

export const expensesValueAndCurrencyData = (expenses) => expenses
  .map(({ currency, value }) => (
    {
      currencyInfo: getSelectedCurrencyData(expenses, currency),
      value,
    }));

export const toZeroWhenNegativeNumberOrNaN = () => {
  const { value } = this.state;
  if (Number(value) < 0
    || Number.isNaN(value)) {
    this.setState({ value: 0.00 });
  }
};
