import React from 'react';

const Person = ({ name, number, id, handleDelete }) => (
  <div>
    {name} {number}
    <button name={id} type={'button'} onClick={handleDelete}>
      Delete
    </button>
  </div>
);

const Persons = ({ persons, handleDelete }) => {
  return persons.map((person) => (
    <Person name={person.name} number={person.number} key={person.name} id={person.id} handleDelete={handleDelete} />
  ));
};

export default Persons;
