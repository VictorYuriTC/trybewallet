import React from 'react';
import PropTypes from 'prop-types';

class ValueInputCard extends React.Component {
  render() {
    const {
      onChange,
      value,
    } = this.props;

    return (
      <label htmlFor="value">
        Perdi quanto?
        <input
          placeholder="Valor"
          type="number"
          min="0"
          name="value"
          value={ value }
          data-testid="value-input"
          onChange={ onChange }
        />
      </label>
    );
  }
}

ValueInputCard.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ValueInputCard;
