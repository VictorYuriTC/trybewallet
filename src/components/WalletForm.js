import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CurrencyOptionCard from './CurrencyOptionCard';
import {
  addExpenseAction,
  currenciesAcronymsAction,
  exchangeRatesAction,
  totalValueInBRLAction,
} from '../redux/actions';
import {
  FOOD,
  MONEY,
  USD,
} from '../constants/absoluteConstants';

import {
  expensesValueAndCurrencyData,
  toZeroWhenNegativeNumberOrNaN,
} from '../constants/functions';
import TagSelectCard from './TagSelectCard';
import MethodSelectCard from './MethodSelectCard';
import DescriptionInputCard from './DescriptionInputCard';
import ValueInputCard from './ValueInputCard';
import CurrenciesSelectCard from './CurrenciesSelectCard';

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
      checked,
      name,
      type,
      value,
    } = target;

    if (type !== 'checkbox') {
      this.setState({ [name]: value }, () => this.changeValueInputToZero);
    }
    if (type === 'checkbox') {
      this.setState({ [name]: checked }, () => this.changeValueInputToZero);
    }
  }

  changeValueInputToZero = () => {
    const { value } = this.state;

    const newValue = toZeroWhenNegativeNumberOrNaN(value);

    this.setState({ value: newValue });
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

    // const { id } = this.state;
    // const generateNewId = Number(id) + 1;
    // const newId = generateNewId.toString();
    // created to turn ids into strings, since there safer than using numbers

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

    const renderCurrenciesAcronyms = currencies.map((currencyName) => (
      (<CurrencyOptionCard
        key={ currencyName }
        currencyName={ currencyName }
      />)
    ));

    const { isExpenseBeingEdited } = this.props;

    const ADD_EXPENSE = 'Adicionar despesa';
    const EDIT_EXPENSE = 'Editar despesa';

    const renderButtonText = isExpenseBeingEdited ? EDIT_EXPENSE : ADD_EXPENSE;

    const {
      currency,
      description,
      method,
      tag,
      value,
    } = this.state;

    return (
      <div>

        <ValueInputCard
          value={ value }
          onChange={ this.onInputChange }
        />

        <DescriptionInputCard
          value={ description }
          onChange={ this.onInputChange }
        />

        <CurrenciesSelectCard
          value={ currency }
          onChange={ this.onInputChange }
          currenciesAcronyms={ renderCurrenciesAcronyms }
        />

        <MethodSelectCard
          value={ method }
          onChange={ this.onInputChange }
        />

        <TagSelectCard
          value={ tag }
          onChange={ this.onInputChange }
        />

        <label htmlFor="saveNewExpenseButton">
          Tudo bem, põe na minha conta...
          <button
            type="button"
            name="saveNewExpenseButton"
            onClick={ this.onClickSaveNewExpense }
          >
            { renderButtonText }
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
  isExpenseBeingEdited: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
