import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTotalValueConvertedToBRL, removeExpenseFromState } from '../redux/actions';

class TableRowCard extends Component {
  // Source: https://thewebdev.info/2022/04/30/how-to-delete-an-item-using-redux-and-javascript/
  onClickDeleteExpense = async () => {
    const {
      dispatchRemovedIdToState,
      dispatchTotalValue,
      expense,
      totalValueConvertedToBRL,
    } = this.props;

    const {
      id,
      value,
      currency,
      exchangeRates,
    } = expense;

    const currencyData = await Object.values(exchangeRates)
      .find(({ code }) => code === currency);

    const { ask } = currencyData;

    const valueConvertedToBRL = (Number(ask) * Number(value)).toFixed(2);
    const valueAfterDeletion = Number(totalValueConvertedToBRL) - valueConvertedToBRL;

    dispatchRemovedIdToState(id);
    dispatchTotalValue(valueAfterDeletion);
  }

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
        <td>
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ this.onClickDeleteExpense }
          >
            Excluir
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  totalValueConvertedToBRL: state.wallet.totalValueConvertedToBRL,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRemovedIdToState: (payload) => dispatch(removeExpenseFromState(payload)),
  dispatchTotalValue: (payload) => dispatch(getTotalValueConvertedToBRL(payload)),
});

TableRowCard.propTypes = {
  dispatchRemovedIdToState: PropTypes.func.isRequired,
  dispatchTotalValue: PropTypes.func.isRequired,
  expense: PropTypes.objectOf(PropTypes.string).isRequired,
  totalValueConvertedToBRL: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRowCard);
