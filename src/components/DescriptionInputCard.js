import React from 'react';
import PropTypes from 'prop-types';

class DescriptionInputCard extends React.Component {
  render() {
    const {
      onChange,
      value,
    } = this.props;
    return (
      <label htmlFor="description">
        Gastei no quê?
        <input
          placeholder="Produto/serviço/outro"
          name="description"
          value={ value }
          data-testid="description-input"
          onChange={ onChange }
        />
      </label>
    );
  }
}

DescriptionInputCard.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default DescriptionInputCard;
