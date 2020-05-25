import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  styleClass, type, text, handleClick,
}) => (
  <button className={`btn ${styleClass}`} type={type} onClick={handleClick}>
    {text}
  </button>
);
Button.propTypes = {
  styleClass: PropTypes.string,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default Button;
