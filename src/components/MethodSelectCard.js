import React from 'react';
import PropTypes from 'prop-types';

class MethodSelectCard extends React.Component {
  render() {
    const {
      onChange,
      value,
    } = this.props;
    return (
      <label htmlFor="method">
        Paguei de que jeito?
        <select
          name="method"
          value={ value }
          data-testid="method-input"
          onChange={ onChange }
        >
          <option value="Dinheiro">
            Dinheiro
          </option>
          <option value="Cartão de crédito">
            Cartão de crédito
          </option>
          <option value="Cartão de débito">
            Cartão de débito
          </option>
        </select>
      </label>
    );
  }
}

MethodSelectCard.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default MethodSelectCard;
