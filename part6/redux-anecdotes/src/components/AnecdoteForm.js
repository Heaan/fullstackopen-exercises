import React from 'react';
import { useDispatch } from 'react-redux';
import { createFrom } from '../reducers/anecdoteReducer';
import { resetNotice } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.new.value;
    dispatch(createFrom(content));
    setTimeout(() => {
      dispatch(resetNotice());
    }, 5000);
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

export default AnecdoteForm;
