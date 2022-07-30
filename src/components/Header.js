import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const {
      email,
      expenses,
    } = this.props;
    const currency = 'BRL';
    console.log(expenses);

    const renderSpentMoneySum = expenses
      .reduce((acc, { value }) => parseFloat(acc) + parseFloat(value), 0);

    return (
      <div>
        <h1 data-testid="email-field">
          { email }
        </h1>
        <h3 data-testid="total-field">
          { renderSpentMoneySum }
        </h3>
        <h3 data-testid="header-currency-field">
          Moeda corrente:
          { ` ${currency}` }
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
