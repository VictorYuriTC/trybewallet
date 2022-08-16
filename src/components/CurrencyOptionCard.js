import React from 'react';
import PropTypes from 'prop-types';

class CurrencyOptionCard extends React.Component {
  render() {
    const {
      currencyName,
      value,
    } = this.props;

    return (
      <option
        key={ currencyName }
        value={ value }
      >
        { currencyName }
      </option>
    );
  }
}

CurrencyOptionCard.propTypes = {
  currencyName: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default CurrencyOptionCard;
