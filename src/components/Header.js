import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExchangeRates, getTotalValueConvertedToBRL } from '../redux/actions';

class Header extends Component {
  componentDidMount() {
    const { dispatchCurrencyRatesToState } = this.props;
    dispatchCurrencyRatesToState();
  }

  convertCurrencyToBRL = () => {
    const {
      dispatchTotalValue,
      expenses,
      exchangeRates,
    } = this.props;

    const expensesObjectValues = Object.values(exchangeRates);
    const getSelectedCurrencyData = (selectedCurrency) => expensesObjectValues
      .find((expense) => expense.code === selectedCurrency);
    const expensesValueAndCurrencyData = expenses
      .map(({ currency, value }) => (
        {
          currencyInfo: getSelectedCurrencyData(currency),
          value,
        }));
    const expensesValuesConvertedToBRL = expensesValueAndCurrencyData
      .map((item) => Number(item.currencyInfo.ask) * Number(item.value));
    const totalValueInBRL = (expensesValuesConvertedToBRL
      .reduce((sum, value) => sum + value));
    dispatchTotalValue(totalValueInBRL);
  }

  render() {
    const {
      email,
      totalValueConvertedToBRL,
    } = this.props;
    const currency = 'BRL';

    return (
      <div>
        <h1 data-testid="email-field">
          { email }
        </h1>
        <h3 data-testid="total-field">
          { totalValueConvertedToBRL }
        </h3>
        <h3 data-testid="header-currency-field">
          Moeda corrente:
          { ` ${currency}` }
        </h3>
        <button
          onClick={ this.convertCurrencyToBRL }
          type="button"
        >
          Bla
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  exchangeRates: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
  totalValueConvertedToBRL: state.wallet.totalValueConvertedToBRL,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencyRatesToState: (payload) => dispatch(fetchExchangeRates(payload)),
  dispatchTotalValue: (payload) => dispatch(getTotalValueConvertedToBRL(payload)),
});

Header.propTypes = {
  dispatchCurrencyRatesToState: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
