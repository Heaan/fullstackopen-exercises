import React from 'react';
import propTypes from 'prop-types';

const Button = ({ type, text, handleClick }) => (
  <button className="btn" type={type} onClick={handleClick}>
    {text}
  </button>
);
Button.propTypes = {
  type: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  handleClick: propTypes.func,
};

export default Button;
