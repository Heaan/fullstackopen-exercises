import React from 'react';
import Country from './Country';
import Countries from './Countries';

const Display = ({ countries, handleClick }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  return <Countries countries={countries} handleClick={handleClick} />;
};
export default Display;
