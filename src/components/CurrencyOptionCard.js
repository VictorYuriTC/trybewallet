import React from 'react';
import PropTypes from 'prop-types';

class CurrencyOptions extends React.Component {
  render() {
    const { currencyName } = this.props;
    return (
      <option value={ currencyName }>
        { currencyName }
      </option>
    );
  }
}

CurrencyOptions.propTypes = {
  currencyName: PropTypes.string.isRequired,
};

export default CurrencyOptions;
