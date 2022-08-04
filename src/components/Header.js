import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExchangeRates } from '../redux/actions';

class Header extends Component {
  render() {
    const {
      email,
      totalValueInBRL,
    } = this.props;
    const currency = 'BRL';

    const renderTotalValue = totalValueInBRL.toFixed(2);

    return (
      <div>
        <h1 data-testid="email-field">
          { email }
        </h1>
        <h3 data-testid="total-field">
          { renderTotalValue }
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
  exchangeRates: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
  totalValueInBRL: state.wallet.totalValueInBRL,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencyRatesToState: (payload) => dispatch(fetchExchangeRates(payload)),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValueInBRL: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
