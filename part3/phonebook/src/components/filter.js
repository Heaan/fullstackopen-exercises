import React from 'react';

const Filter = ({ handleChange, filter }) => {
  return (
    <div>
      filter shown with name <input type={'text'} onChange={handleChange} value={filter} />
    </div>
  );
};

export default Filter;
