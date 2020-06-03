import React from 'react';

const Button = ({ styleClass, type, text, handleClick, id }) => (
  <button id={id} className={`btn ${styleClass}`} type={type} onClick={handleClick}>
    {text}
  </button>
);

export default Button;
