import React from 'react';

const Countries = ({ countries, handleClick }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.numericCode}>
          {country.name}
          <input type={'button'} value={'show'} name={country.name} onClick={handleClick} />
        </div>
      ))}
    </div>
  );
};

export default Countries;
