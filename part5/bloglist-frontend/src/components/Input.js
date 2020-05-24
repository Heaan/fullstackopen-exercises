/* eslint-disable react/prop-types */
import React from 'react';

const Input = ({
  text, type, name, handleChange, value,
}) => (
  <div>
    {text}:
    <input type={type} name={name} onChange={handleChange} value={value} />
  </div>
);

export default Input;
