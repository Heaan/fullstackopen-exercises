import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteIt } from '../reducers/anecdoteReducer';

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
    [...state.anecdotes].sort((first, second) => second.votes - first.votes),
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteIt(id));
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
