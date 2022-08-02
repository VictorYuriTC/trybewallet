import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchExchangeRates } from '../redux/actions';

class Header extends Component {
  componentDidMount() {
    const { dispatchCurrencyRatesToState } = this.props;
    dispatchCurrencyRatesToState();
  }

  convertCurrencyToBRL = () => {
    const {
      exchangeRates,
      expenses,
    } = this.props;
    console.log(expenses);
  }

  render() {
    const {
      email,
      expenses,
    } = this.props;
    const currency = 'BRL';

    return (
      <div>
        <h1 data-testid="email-field">
          { email }
        </h1>
        <h3 data-testid="total-field">
          { }
        </h3>
        <h3 data-testid="header-currency-field">
          Moeda corrente:
          { ` ${currency}` }
        </h3>
        <button
          onClick={ this.convertCurrencyToBRL }
        >
          Bla
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  exchangeRates: state.wallet.exchangeRates,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencyRatesToState: (payload) => dispatch(fetchExchangeRates(payload)),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
