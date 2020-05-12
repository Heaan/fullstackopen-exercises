import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './components/Input';
import Display from './components/Display';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  const countriesFilter = countries.filter(
    (country) => country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1,
  );

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleClick = (event) => {
    setFilter(event.target.name);
  };

  return (
    <div>
      <Input handleChange={handleFilter} value={filter} />
      <Display countries={countriesFilter} handleClick={handleClick} />
    </div>
  );
};

export default App;
