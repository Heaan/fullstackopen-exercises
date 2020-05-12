import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './components/Input';
import Display from './components/Display';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

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

  const countriesFilter = countries.filter(
    (country) => country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1,
  );

  return (
    <div>
      <Input handleChange={handleFilter} value={filter} />
      <Display countries={countriesFilter} />
    </div>
  );
};

export default App;
