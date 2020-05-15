import React from 'react';

const Input = ({ text, handleChange, value }) => {
  return (
    <div>
      {text}: <input required={true} type={'text'} onChange={handleChange} value={value} />
    </div>
  );
};

const PersonForm = ({ handleSubmit, handleNameChange, newName, handleNumberChange, newNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Input text={'name'} handleChange={handleNameChange} value={newName} />
      <Input text={'number'} handleChange={handleNumberChange} value={newNumber} />
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
