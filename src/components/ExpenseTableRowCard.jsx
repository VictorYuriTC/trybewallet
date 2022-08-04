import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  isEditing,
  getTotalValueConvertedToBRL,
  removeExpenseFromState,
} from '../redux/actions';

class TableRowCard extends Component {
  constructor() {
    super();

    this.state = {
      isExpenseBeingEdited: true,
    };
  }

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
    const totalValue = () => (valueAfterDeletion < 0 ? 0.00 : valueAfterDeletion);

    dispatchRemovedIdToState(id);
    dispatchTotalValue(totalValue());
  }

  onClickEditExpense = () => {
    const {
      dispatchIsExpenseBeingEdited,
      expense,
      expenses,
    } = this.props;

    const { isExpenseBeingEdited } = this.state;

    const { id } = expense;
    console.log(expenses.find((eachExpense) => eachExpense.id === id));

    dispatchIsExpenseBeingEdited(isExpenseBeingEdited);

    this.setState({
      isExpenseBeingEdited: !isExpenseBeingEdited,
    });
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
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ this.onClickEditExpense }
          >
            Editar despesa
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
  dispatchIsExpenseBeingEdited: (payload) => dispatch(isEditing(payload)),
  dispatchRemovedIdToState: (payload) => dispatch(removeExpenseFromState(payload)),
  dispatchTotalValue: (payload) => dispatch(getTotalValueConvertedToBRL(payload)),
});

TableRowCard.propTypes = {
  dispatchIsExpenseBeingEdited: PropTypes.func.isRequired,
  dispatchRemovedIdToState: PropTypes.func.isRequired,
  dispatchTotalValue: PropTypes.func.isRequired,
  expense: PropTypes.objectOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalValueConvertedToBRL: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRowCard);
