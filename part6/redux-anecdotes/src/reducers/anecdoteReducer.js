import anecdoteService from '../services/anecdotes';

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

export const voteIt = (id) => {
  return {
    type: 'VOTE',
    data: {
      id,
    },
  };
};

export const createFrom = (anecdote) => {
  return async (dispatch) => {
    const data = await anecdoteService.create(anecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data,
    });
  };
};

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'VOTE':
      const { id } = action.data;
      const anecdoteToChange = state.find((item) => item.id === id);
      const changedAnecdotes = state.map((item) =>
        item.id !== id ? item : { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 },
      );
      return changedAnecdotes;
    case 'NEW_ANECDOTE':
      const { data } = action;
      return [...state, data];
    default:
      return state;
  }
};

export default reducer;
