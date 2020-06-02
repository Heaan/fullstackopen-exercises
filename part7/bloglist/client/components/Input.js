import React from 'react';

const Input = ({
  text, type, name, handleChange, value, id,
}) => (
  <div>
    {text}
    :
    <input id={id} type={type} name={name} onChange={handleChange} value={value} />
  </div>
);

export default Input;
