import React from 'react';

const Person = ({ name, number }) => (
  <div>
    {name} {number}
  </div>
);

const Persons = ({ persons }) => {
  return persons.map((person) => <Person name={person.name} number={person.number} key={person.name} />);
};

export default Persons;
