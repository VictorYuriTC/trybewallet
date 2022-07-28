import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CurrenciesOptions extends React.Component {
  render() {
    const {
      currencyName,
    } = this.props;

    return (
      <div>
        <span>
          { currencyName }
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyName: state.wallet.currencyName,
});

CurrenciesOptions.propTypes = {
  currencyName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(CurrenciesOptions);
