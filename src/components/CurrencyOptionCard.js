import React from 'react';
import PropTypes from 'prop-types';

class CurrencyOptionCard extends React.Component {
  render() {
    const { currencyName } = this.props;
    return (
      <option value={ currencyName }>
        { currencyName }
      </option>
    );
  }
}

CurrencyOptionCard.propTypes = {
  currencyName: PropTypes.string.isRequired,
};

export default CurrencyOptionCard;
