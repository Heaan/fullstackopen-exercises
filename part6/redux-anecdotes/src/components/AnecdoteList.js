import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteIt } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

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

  const vote = async (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    const { content, votes } = anecdote;
    dispatch(voteIt({ ...anecdote, votes: votes + 1 }));
    dispatch(setNotification(`you voted '${content}'`, 5));
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
