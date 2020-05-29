import anecdoteService from '../services/anecdotes';

export const voteIt = (anecdote) => {
  return async (dispatch) => {
    const data = await anecdoteService.update(anecdote);
    dispatch({
      type: 'VOTE',
      data,
    });
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

const reducer = (state = [], { type, data }) => {
  switch (type) {
    case 'INIT_ANECDOTES':
      return data;
    case 'VOTE':
      const { id } = data;
      const changedAnecdotes = state.map((item) => (item.id !== id ? item : data));
      return changedAnecdotes;
    case 'NEW_ANECDOTE':
      return [...state, data];
    default:
      return state;
  }
};

export default reducer;
