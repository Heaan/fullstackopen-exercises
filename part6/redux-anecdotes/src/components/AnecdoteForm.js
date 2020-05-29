import React from 'react';
import { connect } from 'react-redux';
import { createFrom } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.new.value;
    event.target.new.value = '';
    const anecdote = {
      content,
      votes: 0,
    };
    props.createFrom(anecdote);
    props.setNotification(`you created '${content}'`, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default connect(null, { createFrom, setNotification })(AnecdoteForm);
