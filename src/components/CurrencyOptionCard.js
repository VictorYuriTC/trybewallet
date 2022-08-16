import React from 'react';
import PropTypes from 'prop-types';

class CurrencyOptionCard extends React.Component {
  render() {
    const {
      currencyName,
      name,
      value,
    } = this.props;

    return (
      <option
        key={ currencyName }
        value={ value }
        name={ name }
      >
        { currencyName }
      </option>
    );
  }
}

CurrencyOptionCard.propTypes = {
  currencyName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default CurrencyOptionCard;
