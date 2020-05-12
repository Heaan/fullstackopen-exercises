import React from 'react';

const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country;
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
};

export default Country;
