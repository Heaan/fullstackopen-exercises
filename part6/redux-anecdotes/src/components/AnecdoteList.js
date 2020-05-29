import React from 'react';
import { connect } from 'react-redux';
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
  const anecdotes = props.anecdotes
    .filter((anecdote) => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
    .sort((first, second) => second.votes - first.votes);

  const vote = async (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    const { content, votes } = anecdote;
    props.voteIt({ ...anecdote, votes: votes + 1 });
    props.setNotification(`you voted '${content}'`, 5);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote.id)} />
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  voteIt,
  setNotification,
};

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default ConnectedAnecdoteList;
