import React, { useState, useEffect } from 'react';
import Filter from './components/filter';
import PersonForm from './components/person-form';
import Persons from './components/persons';
import personsService from './service/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const personsToShow = persons.filter((person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const person = {
      name: newName,
      number: newNumber,
    };
    personsService
      .create(person)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson));
      })
      .catch((err) => {
        console.error(err);
      });
    setNewName('');
    setNewNumber('');
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} filter={filter} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
