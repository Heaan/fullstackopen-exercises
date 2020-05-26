import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  text, type, name, handleChange, value, id,
}) => (
  <div>
    {text}:
    <input id={id} type={type} name={name} onChange={handleChange} value={value} />
  </div>
);
Input.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string,
};

export default Input;
