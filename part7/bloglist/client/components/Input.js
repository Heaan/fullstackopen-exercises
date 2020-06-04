import React from 'react';

const Input = ({ text, type, name, handleChange, value, id }) => (
  <>
    {text}
    <input id={id} type={type} name={name} onChange={handleChange} value={value} />
  </>
);

export default Input;
