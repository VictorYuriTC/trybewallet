import ExpenseTableRowCard from "../components/ExpenseTableRowCard";
import { getSelectedCurrencyData } from "../constants/functions";

describe('', () => {
  it('should ', () => {
    getSelectedCurrencyData = (expenses, selectedCurrency) => Object
      .values(expenses[0].exchangeRates)
      .find(({ code }) => code === selectedCurrency);
    expect(getSelectedCurrencyData).toHaveBeenCalled();
  });
});