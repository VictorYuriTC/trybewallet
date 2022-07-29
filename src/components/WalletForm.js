import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CurrencyOptionCard from './CurrencyOptionCard';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      expenseAmount: 0,
      expenseDescription: '',
      expensePaymentMethod: '',
      expenseReason: '',
    };
  }

  componentDidMount() {
    const { getCurrenciesDataFromState } = this.props;
    getCurrenciesDataFromState();
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
  }

  onClickSaveNewExpense = () => {
    const { saveNewExpenseDispatch } = this.props;
    const {
      expenseAmount,
      expenseDescription,
      expensePaymentMethod,
      expenseReason,
    } = this.state;

    saveNewExpenseDispatch([
      expenseAmount,
      expenseDescription,
      expensePaymentMethod,
      expenseReason,
    ]);
  }

  render() {
    const { currencies } = this.props;
    const renderCurrencies = currencies.map((currencyName) => (
      (<CurrencyOptionCard
        key={ currencyName }
        currencyName={ currencyName }
      />)
    ));

    return (
      <div>

        <label htmlFor="expenseAmount">
          Perdi quanto?
          <input
            name="expenseAmount"
            data-testid="value-input"
            onChange={ this.onInputChange }
          />
        </label>

        <label htmlFor="expenseDescription">
          Gastei com o que?
          <input
            name="expenseDescription"
            data-testid="description-input"
            onChange={ this.onInputChange }
          />
        </label>

        <select data-testid="currency-input">
          { renderCurrencies }
        </select>

        <label htmlFor="expensePaymentMethod">
          Paguei de que jeito?
          <select
            data-testid="method-input"
            name="expensePaymentMethod"
          >
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

        <label htmlFor="expenseReason">
          Comprei por quê?
          <select
            data-testid="tag-input"
            name="expenseReason"
          >
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
        >
          Adicionar despesa
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesDataFromState: (payload) => dispatch(fetchCurrencies(payload)),
  saveNewExpenseDispatch: (payload) => dispatch(payload),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrenciesDataFromState: PropTypes.func.isRequired,
  saveNewExpenseDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
