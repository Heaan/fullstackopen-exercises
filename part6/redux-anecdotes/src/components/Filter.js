import React from 'react';
import { useDispatch } from 'react-redux';
import { filterFrom } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10,
  };

  const handleChange = (event) => {
    const filter = event.target.value;
    dispatch(filterFrom(filter));
  };

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
