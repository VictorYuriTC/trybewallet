import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    const money = 0;
    const currency = 'BRL';
    return (
      <div>
        <h1 data-testid="email-field">
          { email }
        </h1>
        <h3 data-testid="total-field">
          Money, sweat, money:
          { ` $${money}` }
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
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
