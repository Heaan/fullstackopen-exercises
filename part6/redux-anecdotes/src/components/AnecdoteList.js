import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteIt } from '../reducers/anecdoteReducer';
import { resetNotice } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
      .sort((first, second) => second.votes - first.votes),
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteIt(id));
    setTimeout(() => {
      dispatch(resetNotice());
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote.id)} />
      ))}
    </>
  );
};

export default AnecdoteList;
