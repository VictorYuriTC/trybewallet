import React, { Component } from 'react';
import CurrencyOption from './CurrencyOption';
import requestCurrencies from '../services/currenciesAPI';

export default class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      expenseAmount: 0,
      expenseDescription: '',
    };
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies = async () => {
    const currenciesData = await requestCurrencies();
    console.log(currenciesData);
    return currenciesData;
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

  render() {
    return (
      <div>

        <input
          name="expenseAmount"
          data-testid="value-input"
          onChange={ this.onInputChange }
        />

        <input
          name="expenseDescription"
          data-testid="description-input"
          onChange={ this.onInputChange }
        />

        {/* <select data-testid="currency-input">
          <option value={ CurrencyOption }>
            { CurrencyOption }
          </option>
        </select> */}

        <select data-testid="method-input">
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

        <select data-testid="tag-input">
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

      </div>
    );
  }
}
