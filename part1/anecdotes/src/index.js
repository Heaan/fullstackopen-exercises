import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Anecdote = ({ anecdotes, votes, index, text }) => {
  return (
    <>
      <h1>{text}</h1>
      <div>{anecdotes[index]}</div>
      <div>has {votes[index]} votes</div>
    </>
  );
};

const App = ({ anecdotes }) => {
  const votesInit = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votesInit);
  const [most, setMost] = useState(0);

  const getMost = (votes) => {
    const votesDesc = [...votes].sort((a, b) => b - a);
    return votes.indexOf(votesDesc[0]);
  };

  const handleSelect = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected]++;
    const mostNew = getMost(votesCopy);
    setMost(mostNew);
    setVotes(votesCopy);
  };

  return (
    <>
      <Anecdote anecdotes={anecdotes} votes={votes} index={selected} text={'Anecdote of the day'} />
      <Button handleClick={handleVote} text={'vote'} />
      <Button handleClick={handleSelect} text={'next anecdote'} />
      <Anecdote anecdotes={anecdotes} votes={votes} index={most} text={'Anecdote with most votes'} />
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
