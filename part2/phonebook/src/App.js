import React, { useState, useEffect } from 'react';
import Filter from './components/filter';
import PersonForm from './components/person-form';
import Persons from './components/persons';
import personsService from './service/person';

const Notification = ({ messageObj }) => {
  const { success, message } = messageObj;
  if (message === null) {
    return null;
  }
  return <div className={success ? 'success message' : 'error message'}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState({ success: true, message: null });
  const [effect, setEffect] = useState(true);

  useEffect(() => {
    // console.log('effect!');
    personsService
      .getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [effect]);

  const personsToShow = persons.filter((person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  const successDone = (text, name) => {
    setSuccessMessage({ success: true, message: `${text} ${name}` });
    setTimeout(() => {
      setSuccessMessage({ success: true, message: null });
    }, 5000);
  };
  const errorDone = (name) => {
    setSuccessMessage({ success: false, message: `Information of ${name} has already been removed from server` });
    setTimeout(() => {
      setSuccessMessage({ success: true, message: null });
    }, 5000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newNumber,
    };
    // setEffect(!effect);
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
          errorDone(newName);
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
          errorDone(deleName);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageObj={successMessage} />
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
