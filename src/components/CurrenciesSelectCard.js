import React from 'react';
import PropTypes from 'prop-types';

class CurrenciesSelectCard extends React.Component {
  render() {
    const {
      value,
      onChange,
      currenciesAcronyms,
    } = this.props;

    return (
      <label htmlFor="currency">
        Com qual dinheiro?
        <select
          data-testid="currency-input"
          name="currency"
          value={ value }
          onChange={ onChange }
        >
          { currenciesAcronyms }
        </select>
      </label>);
  }
}

CurrenciesSelectCard.propTypes = {
  currenciesAcronyms: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default CurrenciesSelectCard;
