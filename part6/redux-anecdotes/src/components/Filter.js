import React from 'react';
import { connect } from 'react-redux';
import { filterFrom } from '../reducers/filterReducer';

const Filter = (props) => {
  const style = {
    marginBottom: 10,
  };

  const handleChange = (event) => {
    const filter = event.target.value;
    props.filterFrom(filter);
  };

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default connect(null, { filterFrom })(Filter);
