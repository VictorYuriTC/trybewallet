import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TableRowCard extends Component {
  render() {
    const { expense } = this.props;

    const {
      description,
      tag,
      method,
      value,
      currency,
      exchangeRates,
    } = expense;

    const currencyData = Object.values(exchangeRates)
      .find(({ code }) => code === currency);

    const {
      name,
      ask,
    } = currencyData;

    const renderValueConvertedToBRL = (Number(value) * Number(ask))
      .toFixed(2);
    const renderUsedExchange = Number(ask).toFixed(2);
    const renderValue = Number(value).toFixed(2);

    return (
      <tr>
        <td>
          { description }
        </td>
        <td>
          { tag }
        </td>
        <td>
          { method }
        </td>
        <td>
          { renderValue }
        </td>
        <td>
          { name }
        </td>
        <td>
          { renderUsedExchange }
        </td>
        <td>
          { renderValueConvertedToBRL }
        </td>
        <td>
          Real
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TableRowCard.propTypes = {
  expense: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, null)(TableRowCard);
