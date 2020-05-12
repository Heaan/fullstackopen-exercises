import React from 'react';

const Input = ({ handleChange, value }) => {
  return (
    <div>
      <input type={'text'} onChange={handleChange} value={value} />
    </div>
  );
};

export default Input;
