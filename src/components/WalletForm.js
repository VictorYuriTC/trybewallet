import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenseAction, currenciesAcronymsAction, exchangeRatesAction,
  totalValueInBRLAction,
} from '../redux/actions';
import { FOOD, MONEY, USD } from '../constants/absoluteConstants';

import {
  expensesValueAndCurrencyData,
} from '../constants/functions';
import CurrencyOptionCard from './CurrencyOptionCard';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: USD,
      method: MONEY,
      tag: FOOD,
    };
  }

  componentDidMount() {
    const {
      dispatchCurrenciesAcronyms,
    } = this.props;
    dispatchCurrenciesAcronyms();
  }

  onInputChange = ({ target }) => {
    const {
      name,
      value,
    } = target;

    this.setState({ [name]: value });
  }

  convertArrayOfCurrenciesToBRL = () => {
    const {
      dispatchTotalValueInBRL,
      expenses,
    } = this.props;

    const expensesValuesConvertedToBRL = expensesValueAndCurrencyData(expenses)
      .map(({ currencyInfo, value }) => Number(currencyInfo.ask) * Number(value));

    const totalValueInBRL = (expensesValuesConvertedToBRL
      .reduce((sum, value) => sum + value, 0));

    dispatchTotalValueInBRL(totalValueInBRL);
  }

  onClickSaveNewExpense = async () => {
    const {
      dispatchExchangeRates,
      dispatchAddExpense,
    } = this.props;

    await dispatchExchangeRates();

    const { exchangeRates } = this.props;

    await dispatchAddExpense({ ...this.state, exchangeRates });

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
      currency: USD,
      method: MONEY,
      tag: FOOD,
    }));
    this.convertArrayOfCurrenciesToBRL();
  }

  render() {
    const {
      currencies,
    } = this.props;

    const ADD_EXPENSE = 'Adicionar despesa';

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
            { currencies.map((currencyName) => (
              (
                <CurrencyOptionCard
                  key={ currencyName }
                  currencyName={ currencyName }
                  name={ currencyName }
                  value={ currencyName }
                />
              )
            )) }
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

        <label htmlFor="saveNewExpenseButton">
          Tudo bem, põe na minha conta...
          <button
            id="saveNewExpenseButton"
            type="button"
            name="saveNewExpenseButton"
            onClick={ this.onClickSaveNewExpense }
          >
            { ADD_EXPENSE }
          </button>
        </label>

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
  dispatchCurrenciesAcronyms: (payload) => dispatch(currenciesAcronymsAction(payload)),
  dispatchExchangeRates: (payload) => dispatch(exchangeRatesAction(payload)),
  dispatchAddExpense: (payload) => dispatch(addExpenseAction(payload)),
  dispatchTotalValueInBRL: (payload) => dispatch(totalValueInBRLAction(payload)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchCurrenciesAcronyms: PropTypes.func.isRequired,
  dispatchExchangeRates: PropTypes.func.isRequired,
  dispatchAddExpense: PropTypes.func.isRequired,
  dispatchTotalValueInBRL: PropTypes.func.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
