import React, { useState, useEffect } from 'react';
import Filter from './components/filter';
import PersonForm from './components/person-form';
import Persons from './components/persons';
import personsService from './service/person';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className='success'>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

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
  const successDone = (text, name) => {
    setSuccessMessage(`${text} ${name}`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };
    const isNameExisted = persons.some((person) => person.name === newName);
    if (!isNameExisted) {
      personsService
        .create(person)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
        })
        .then(() => {
          successDone('Added', newName);
          setNewName('');
          setNewNumber('');
        })
        .catch((err) => {
          console.error(err);
        });
      return;
    }
    const confirmStr = `${newName} is already added to phonebook, replace the old number with a new one?`;
    if (isNameExisted && window.confirm(confirmStr)) {
      const id = persons.find((person) => person.name === newName).id;
      personsService
        .update(id, person)
        .then((newPerson) => {
          setPersons(persons.map((person) => (person.id === id ? newPerson : person)));
        })
        .then(() => {
          successDone('Updated', newName);
          setNewName('');
          setNewNumber('');
        })
        .catch((err) => {
          console.error(err);
        });
      return;
    }
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
  const handleDelete = (event) => {
    const id = +event.target.name;
    const deleName = persons.find((person) => person.id === id).name;
    if (window.confirm(`Delete ${deleName} ?`)) {
      personsService
        .dele(id)
        .then((delePerson) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .then(() => {
          successDone('Deleted', deleName);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
