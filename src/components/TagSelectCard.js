import React from 'react';
import PropTypes from 'prop-types';

class TagSelectCard extends React.Component {
  render() {
    const {
      value,
      onChange,
    } = this.props;

    return (
      <label htmlFor="tag">
        Comprei por quê?
        <select
          name="tag"
          value={ value }
          data-testid="tag-input"
          onChange={ onChange }
        >
          <option value="Alimentação">
            Alimentação
          </option>
          <option value="Lazer">
            Lazer
          </option>
          <option value="Trabalho">
            Trabalho
          </option>
          <option value="Transporte">
            Transporte
          </option>
          <option value="Saúde">
            Saúde
          </option>
        </select>
      </label>);
  }
}

TagSelectCard.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TagSelectCard;
