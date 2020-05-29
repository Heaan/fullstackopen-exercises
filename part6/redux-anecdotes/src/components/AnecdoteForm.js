import React from 'react';
import { useDispatch } from 'react-redux';
import { createFrom } from '../reducers/anecdoteReducer';
import { resetNotice } from '../reducers/notificationReducer';
import anecdotesService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.new.value;
    event.target.new.value = '';
    const anecdote = {
      content,
      votes: 0,
    };
    const data = await anecdotesService.create(anecdote);
    dispatch(createFrom(data));
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
