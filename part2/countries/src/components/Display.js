import React from 'react';

const Display = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }
  if (countries.length === 1) {
    const { name, capital, population, languages, flag } = countries[0];
    return (
      <div>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>population {population}</p>
        <h2>languages</h2>
        <ul>
          {languages.map((language) => (
            <li key={language.iso639_1}>{language.name}</li>
          ))}
        </ul>
        <img alt={name} src={flag} width={'25%'} />
      </div>
    );
  }
  return (
    <div>
      {countries.map((country) => (
        <div key={country.numericCode}>{country.name}</div>
      ))}
    </div>
  );
};
export default Display;
