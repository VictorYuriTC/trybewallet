import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CurrencyOptionCard from './CurrencyOptionCard';
import {
  expensePayloadAction,
  fetchCurrencies,
  fetchExchangeRates,
  getTotalValueConvertedToBRL,
} from '../redux/actions';
import {
  ALIMENTAÇÃO,
  DINHEIRO,
  USD,
  expensesValueAndCurrencyData,
} from '../constants';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: USD,
      method: DINHEIRO,
      tag: ALIMENTAÇÃO,
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

    const expensesValuesConvertedToBRL = expensesValueAndCurrencyData(expenses)
      .map(({ currencyInfo, value }) => Number(currencyInfo.ask) * Number(value));
    const totalValueInBRL = (expensesValuesConvertedToBRL
      .reduce((sum, value) => sum + value, 0));
    dispatchTotalValue(totalValueInBRL);
  }

  onClickSaveNewExpense = async () => {
    const {
      dispatchExchangeRatesToState,
      dispatchExpenseToState,
    } = this.props;
    await dispatchExchangeRatesToState();
    /* const getCurrenciesFromAPI = await getCurrencies();
    const exchangeRatesWithoutUSDT = Object.entries(getCurrenciesFromAPI);
    .filter((rate) => !rate.includes('USDT'));
    exchangeRates.USDT = undefined;
    const exchangeRates = Object.fromEntries(exchangeRatesWithoutUSDT); */
    const { exchangeRates } = this.props;
    await dispatchExpenseToState({ ...this.state, exchangeRates });
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: USD,
      method: DINHEIRO,
      tag: ALIMENTAÇÃO,
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

    /* const { isExpenseBeingEdited } = this.props; */

    const SALVAR_DESPESA = 'Salvar despesa';
    /* const EDITAR_DESPESA = 'Editar despesa'; */

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
            placeholder="Valor"
            type="number"
            min="0"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.onInputChange }
          />
        </label>

        <label htmlFor="description">
          Gastei no quê?
          <input
            placeholder="Produto/serviço/outro"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.onInputChange }
          />
        </label>

        <label htmlFor="currency">
          Com qual dinheiro?
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.onInputChange }
          >
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
            <option value="Dinheiro">
              Dinheiro
            </option>
            <option value="Cartão de crédito">
              Cartão de crédito
            </option>
            <option value="Cartão de débito">
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
            <option value="Alimentação">
              Alimentação
            </option>
            <option value="Lazer">
              Lazer
            </option>
            <option value="Trabalho">
              Trabalho
            </option>
            <option value="Transporte">
              Transporte
            </option>
            <option value="Saúde">
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
          { /* isExpenseBeingEdited
            ? EDITAR_DESPESA
            : */ SALVAR_DESPESA
          }
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  exchangeRates: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
  isExpenseBeingEdited: state.wallet.isExpenseBeingEdited,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrenciesAcronymsToState: (payload) => dispatch(fetchCurrencies(payload)),
  dispatchExchangeRatesToState: (payload) => dispatch(fetchExchangeRates(payload)),
  dispatchExpenseToState: (payload) => dispatch(expensePayloadAction(payload)),
  dispatchTotalValue: (payload) => dispatch(getTotalValueConvertedToBRL(payload)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchCurrenciesAcronymsToState: PropTypes.func.isRequired,
  dispatchExchangeRatesToState: PropTypes.func.isRequired,
  dispatchExpenseToState: PropTypes.func.isRequired,
  dispatchTotalValue: PropTypes.func.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* isExpenseBeingEdited: PropTypes.bool.isRequired, */
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
