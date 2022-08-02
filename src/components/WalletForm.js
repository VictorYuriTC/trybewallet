import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CurrencyOptionCard from './CurrencyOptionCard';
import {
  expensePayloadAction,
  fetchCurrencies,
  getTotalValueConvertedToBRL,
} from '../redux/actions';
import getCurrencies from '../services/currenciesAPI';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const {
      dispatchCurrenciesAcronymsToState,
    } = this.props;
    dispatchCurrenciesAcronymsToState();
  }

  onInputChange = ({ target }) => {
    const {
      checked,
      name,
      type,
      value,
    } = target;

    if (type !== 'checkbox') { this.setState({ [name]: value }); }
    if (type === 'checkbox') { this.setState({ [name]: checked }); }

    this.toZeroWhenNegativeNumberOrNaN();
  }

  toZeroWhenNegativeNumberOrNaN = () => {
    const { value } = this.state;
    if (value < 0 || Number.isNaN(value)) { this.setState({ value: 0 }); }
  }

  convertCurrencyToBRL = () => {
    const {
      dispatchTotalValue,
      expenses,
    } = this.props;
    const expensesObjectValues = Object.values(expenses[0].exchangeRates);
    const getSelectedCurrencyData = (selectedCurrency) => expensesObjectValues
      .filter((currency) => currency)
      .find(({ code }) => code === selectedCurrency);
    const expensesValueAndCurrencyData = expenses
      .map(({ currency, value }) => (
        {
          currencyInfo: getSelectedCurrencyData(currency),
          value,
        }));
    const expensesValuesConvertedToBRL = expensesValueAndCurrencyData
      .map(({ currencyInfo, value }) => Number(currencyInfo.ask) * Number(value));
    const totalValueInBRL = (expensesValuesConvertedToBRL
      .reduce((sum, value) => sum + value, 0));
    dispatchTotalValue(totalValueInBRL);
  }

  onClickSaveNewExpense = async () => {
    const {
      dispatchExpenseToState,
    } = this.props;

    const getCurrenciesFromAPI = await getCurrencies();
    const exchangeRatesWithoutUSDT = Object.entries(getCurrenciesFromAPI)
      .filter((rate) => !rate.includes('USDT'));
    /* exchangeRates.USDT = undefined; */
    const exchangeRates = Object.fromEntries(exchangeRatesWithoutUSDT);

    await dispatchExpenseToState({ ...this.state, exchangeRates });

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    }));

    this.convertCurrencyToBRL();
  }

  render() {
    const {
      currencies,
    } = this.props;

    const renderCurrencies = currencies.map((currencyName) => (
      (<CurrencyOptionCard
        key={ currencyName }
        currencyName={ currencyName }
      />)
    ));

    const {
      currency,
      description,
      method,
      tag,
      value,
    } = this.state;

    return (
      <div>

        <label htmlFor="value">
          Perdi quanto?
          <input
            type="number"
            min="0"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.onInputChange }
          />
        </label>

        <label htmlFor="description">
          Gastei no que?
          <input
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.onInputChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda de onde?
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.onInputChange }
          >
            <option>
              Moeda corrente
            </option>
            { renderCurrencies }
          </select>
        </label>

        <label htmlFor="method">
          Paguei de que jeito?
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.onInputChange }
          >
            <option>
              Método de pagamento
            </option>
            <option value="cash">
              Dinheiro
            </option>
            <option value="creditCard">
              Cartão de crédito
            </option>
            <option value="debitCard">
              Cartão de débito
            </option>
          </select>
        </label>

        <label htmlFor="tag">
          Comprei por quê?
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.onInputChange }
          >
            <option>
              Razão da compra
            </option>
            <option value="food">
              Alimentação
            </option>
            <option value="leisure">
              Lazer
            </option>
            <option value="job">
              Trabalho
            </option>
            <option value="transport">
              Transporte
            </option>
            <option value="health">
              Saúde
            </option>
          </select>
        </label>

        <span>
          Tudo bem, põe na minha conta...
        </span>
        <button
          type="button"
          name="saveNewExpenseButton"
          onClick={ this.onClickSaveNewExpense }
        >
          Adicionar despesa
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrenciesAcronymsToState: (payload) => dispatch(fetchCurrencies(payload)),
  dispatchExpenseToState: (payload) => dispatch(expensePayloadAction(payload)),
  dispatchTotalValue: (payload) => dispatch(getTotalValueConvertedToBRL(payload)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchCurrenciesAcronymsToState: PropTypes.func.isRequired,
  dispatchExpenseToState: PropTypes.func.isRequired,
  dispatchTotalValue: PropTypes.func.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
